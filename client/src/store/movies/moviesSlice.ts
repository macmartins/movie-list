import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import SORT from "@/enums/sort";
import MoviesState from "@/interfaces/moviesState.interface";

const initialState = {
  page: 1,
  sort: SORT.TITLE,
  isSelectYearModalOpen: false,
} as MoviesState;

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSort(state, action: PayloadAction<SORT>) {
      state.sort = action.payload;
    },
    setIsSelectedYearModalOpen(state, action: PayloadAction<boolean>) {
      state.isSelectYearModalOpen = action.payload;
    },
    setYear(state, action: PayloadAction<number | undefined>) {
      state.year = action.payload;
    },
    setSelectedMovieID(state, action: PayloadAction<number | undefined>) {
      state.selectedMovieID = action.payload;
    },
  },
});

export const selectPage = (state: RootState) => state.movies.page;
export const selectSort = (state: RootState) => state.movies.sort;
export const selectIsSelectYearModalOpen = (state: RootState) =>
  state.movies.isSelectYearModalOpen;
export const selectYear = (state: RootState) => state.movies.year;
export const selectSelectedMovieID = (state: RootState) =>
  state.movies.selectedMovieID;

export const {
  setPage,
  setSort,
  setIsSelectedYearModalOpen,
  setSelectedMovieID,
  setYear,
} = moviesSlice.actions;
export default moviesSlice.reducer;
