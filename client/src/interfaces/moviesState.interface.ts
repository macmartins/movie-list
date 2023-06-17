import SORT from "@/enums/sort";

export default interface MoviesState {
  page: number;
  sort: SORT;
  year?: number;
  selectedMovieID?: number;
  isSelectYearModalOpen: boolean;
}
