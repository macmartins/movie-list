import { Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MouseEvent, useMemo, useRef, useState } from "react";
import {
  useListMoviesQuery,
  useListTop10MoviesQuery,
} from "../../services/movies";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import {
  selectPage,
  selectSelectedMovieID,
  selectSort,
  selectYear,
  setIsSelectedYearModalOpen,
  setSelectedMovieID,
  setSort,
  setYear,
} from "../../store/movies/moviesSlice";
import useScrollResize from "../../hooks/resizeHook";
import SORT from "../../enums/sort";
import * as styles from "./styles";
import SelectYear from "../../components/SelectYear/SelectYear";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import DataTable from "../../components/DataTable/DataTable";
import STRINGS from "../../constants/strings";

export default function MovieList() {
  const dispatch = useAppDispatch();

  const page = useAppSelector(selectPage);
  const sort = useAppSelector(selectSort);
  const isTitleSort = useMemo(() => sort === SORT.TITLE, [sort]);
  const year = useAppSelector(selectYear);
  const selectedMovieID = useAppSelector(selectSelectedMovieID);

  const tableEl = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Normal listing
  const {
    data: allMovies,
    isFetching,
    isLoading,
    isError,
  } = useListMoviesQuery({
    page,
    sort: SORT.TITLE,
  });
  // Top 10 listing
  const { data: top10RevenueMovies } = useListTop10MoviesQuery(
    {
      sort,
      year,
    },
    { skip: isTitleSort }
  );
  useScrollResize({ movies: allMovies, isFetching, isLoading, tableEl, isError });
  const theme = useTheme();

  const movies = isTitleSort ? allMovies : top10RevenueMovies;

  const handleTop10RevenueClick = () => {
    dispatch(setSort(!isTitleSort ? SORT.TITLE : SORT.REVENUE));
    dispatch(setYear(undefined));
  };

  const handleTop10RevenueByYearClick = (event: MouseEvent<HTMLElement>) => {
    if (!year) {
      dispatch(setIsSelectedYearModalOpen(true));
      setAnchorEl(event.currentTarget);
    } else {
      dispatch(setSort(SORT.TITLE));
      dispatch(setYear(undefined));
    }
  };

  const handleOnClose = () => dispatch(setSelectedMovieID(undefined));

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h5" sx={styles.title(theme)}>
        <Box component="span" sx={styles.titleContent}>
          {STRINGS.title}
          {isFetching && <CircularProgress size={20} />}
        </Box>
      </Typography>
      <SelectYear anchorEl={anchorEl} />
      <FilterButtons
        handleTop10RevenueClick={handleTop10RevenueClick}
        handleTop10RevenueByYearClick={handleTop10RevenueByYearClick}
      />
      <DataTable data={movies?.result} tableEl={tableEl} />
      {selectedMovieID ? (
        <MovieDetails id={selectedMovieID} onClose={handleOnClose} />
      ) : null}
    </Box>
  );
}
