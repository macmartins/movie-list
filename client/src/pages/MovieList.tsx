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
  Button,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { COLORS } from "../variables/colors";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useListMoviesQuery } from "../services/movies";

const CustomTableCell = styled(TableCell)({
  color: COLORS.tableHead,
  borderBottom: `1px solid ${COLORS.tableHead}60`,
  paddingBottom: 0,
});

export default function MovieList() {
  const tableEl = useRef<HTMLDivElement | null>(null);
  const [distanceBottom, setDistanceBottom] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("title:1");
  const [reset, setReset] = useState(false);
  const { data: movies, isFetching } = useListMoviesQuery({
    page,
    sort,
    reset,
  });

  const theme = useTheme();

  const scrollListener = useCallback(() => {
    if (tableEl.current) {
      const bottom =
        tableEl.current.scrollHeight - tableEl.current.clientHeight;

      if (!distanceBottom) {
        setDistanceBottom(Math.round(bottom * 0.01));
      }
      if (
        tableEl.current.scrollTop > bottom - distanceBottom &&
        page < Number(movies?.totalPages) &&
        sort.includes("title") &&
        !isFetching
      ) {
        setPage(page + 1);
        setReset(false);
      }
    }
  }, [distanceBottom, page, movies?.totalPages, sort, isFetching]);

  useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef?.addEventListener("scroll", scrollListener);
    return () => {
      tableRef?.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  const handleTop10RevenueClick = () => {
    setReset(true);
    setPage(1);
    setSort("revenue:-1");
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
      <Button onClick={handleTop10RevenueClick}>Top 10 Revenue</Button>
      <Button
        onClick={() => {
          setReset(true);
          setPage(1);
          setSort("title:1");
        }}
      >
        Top 10 Revenue by Year
      </Button>
      <TableContainer ref={tableEl} sx={{ maxHeight: "40vh" }}>
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
                <TableCell component="th" scope="row"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
