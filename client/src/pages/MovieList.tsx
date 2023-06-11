import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Backdrop,
  Popover,
  ToggleButton,
  IconButton,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import COLORS from "../variables/colors";
import {
  MouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  useListMoviesQuery,
  useListTop10MoviesQuery,
} from "../services/movies";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FONTS from "../variables/fonts";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import RefreshIcon from "../assets/refresh.svg";

const CustomTableCell = styled(TableCell)({
  color: COLORS.tableHead,
  borderBottom: `1px solid ${COLORS.tableHead}60`,
  paddingBottom: 0,
});

const CustomToggleButton = styled(ToggleButton)({
  border: `1px solid ${COLORS.buttonBorder}`,
  color: COLORS.buttonText,
  textTransform: "none",
  fontSize: 12,
  fontFamily: "'Robot Light', sans-serif",
  borderRadius: 20,
  lineHeight: 1,
  "&.Mui-selected,&.Mui-selected:hover": {
    backgroundColor: COLORS.buttonToggled,
  },
});

export default function MovieList() {
  const tableEl = useRef<HTMLDivElement | null>(null);
  const [distanceBottom, setDistanceBottom] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("title:1");
  const [year, setYear] = useState<number>();
  const [selectedMovieID, setSelectedMovieID] = useState<number>();
  const [isSelectYearOpen, setIsSelectYearOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // Normal listing
  const {
    data: allMovies,
    isFetching,
    isLoading,
  } = useListMoviesQuery({
    page,
    sort: "title:1",
  });

  // Top 10
  const { data: top10RevenueMovies } = useListTop10MoviesQuery(
    {
      sort,
      year,
    },
    { skip: sort.includes("title") }
  );

  const movies = sort.includes("title") ? allMovies : top10RevenueMovies;

  const theme = useTheme();

  const scrollListener = useCallback(() => {
    if (tableEl.current) {
      const bottom =
        tableEl.current.scrollHeight - tableEl.current.clientHeight;

      if (!distanceBottom) {
        setDistanceBottom(Math.round(bottom * 0.2));
      }
      if (
        tableEl.current.scrollTop > bottom - distanceBottom &&
        page < Number(movies?.totalPages) &&
        sort.includes("title") &&
        !isFetching
      ) {
        setPage(page + 1);
      }
    }
    // Add the ignore because there's a bug where if page is a dependency, it will setPage x2
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distanceBottom, movies?.totalPages, sort, isFetching]);

  useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef?.addEventListener("scroll", scrollListener);
    return () => {
      tableRef?.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  useEffect(() => {
    const scrollHeight = tableEl?.current?.scrollHeight;
    const clientHeight = tableEl?.current?.clientHeight;
    if (
      scrollHeight &&
      clientHeight &&
      !(scrollHeight > clientHeight) &&
      !isFetching &&
      !isLoading
    ) {
      setPage(page + 1);
    }
    // Adding the 'page' dependency will cause it to run immediately and skip a page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading]);

  const handleTop10RevenueClick = () => {
    if (sort.includes("revenue")) {
      setSort("title:1");
    } else {
      setSort("revenue:-1");
    }
    setYear(undefined);
  };

  const handleTop10RevenueByYearClick = (event: MouseEvent<HTMLElement>) => {
    if (!year) {
      setIsSelectYearOpen(true);
      setAnchorEl(event.currentTarget);
    } else {
      setSort("title:1");
      setYear(undefined);
    }
  };

  const getYears = (startYear = 1990) => {
    const currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1990;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  };

  return (
    <Box sx={{ my: 3 }}>
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.secondary.main,
          my: 3,
        }}
      >
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          Movie ranking
          {isFetching && <CircularProgress size={20} />}
        </Box>
      </Typography>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSelectYearOpen}
        onClick={() => setIsSelectYearOpen(false)}
      >
        <Popover
          open={isSelectYearOpen}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: 200,
              textAlign: "center",
              paddingTop: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: COLORS.buttonTextOpacity,
                pb: 1,
                fontSize: 14,
              }}
            >
              Select a year
            </Typography>
            {getYears()
              .reverse()
              .map((year) => (
                <Typography
                  key={`year-${year}`}
                  variant="body1"
                  sx={{
                    color: COLORS.tableText,
                    fontSize: 20,
                    fontFamily: FONTS.medium,
                    cursor: "pointer",
                    lineHeight: 1.8,
                    "&:hover": {
                      backgroundColor: COLORS.tableSeparator,
                    },
                  }}
                  onClick={() => {
                    setYear(year);
                    setSort("revenue:-1");
                  }}
                >
                  {year}
                </Typography>
              ))}
          </Box>
        </Popover>
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          pb: 2,
        }}
      >
        <CustomToggleButton
          value="top10Revenue"
          selected={sort.includes("revenue") && !year}
          onClick={handleTop10RevenueClick}
        >
          Top 10 Revenue
        </CustomToggleButton>
        <CustomToggleButton
          value="top10RevenueByYear"
          selected={(sort.includes("revenue") && !!year) || isSelectYearOpen}
          onClick={handleTop10RevenueByYearClick}
        >
          Top 10 Revenue {year ?? "by Year"}
        </CustomToggleButton>
        {!sort.includes("title") ? (
          <Box
            component="img"
            src={RefreshIcon}
            alt="Reset"
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              setSort("title:1");
              setYear(undefined);
            }}
          />
        ) : null}
      </Box>
      <TableContainer ref={tableEl} sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <CustomTableCell sx={{ maxWidth: 1 }}>Ranking</CustomTableCell>
              <CustomTableCell>Title</CustomTableCell>
              <CustomTableCell>Year</CustomTableCell>
              <CustomTableCell>Revenue</CustomTableCell>
              <CustomTableCell></CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies?.result?.map((row, i) => (
              <TableRow
                key={`movie-${i}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {new Date(row.release_date).getFullYear()}
                </TableCell>
                <TableCell component="th" scope="row">
                  ${row.revenue?.toLocaleString("en-US")}
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton onClick={() => setSelectedMovieID(row.id)}>
                    <VisibilityIcon
                      sx={{
                        color: COLORS.tableSeparator,
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedMovieID ? (
        <MovieDetails
          id={selectedMovieID}
          onClose={() => setSelectedMovieID(undefined)}
        />
      ) : null}
    </Box>
  );
}
