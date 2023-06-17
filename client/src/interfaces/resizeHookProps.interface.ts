import ListResponse from "./listResponse.interface";
import Movie from "./movie.interface";

export default interface ResizeHooksProps {
  movies?: ListResponse<
    Pick<Movie, "id" | "title" | "release_date" | "revenue">
  >;
  tableEl: React.MutableRefObject<HTMLDivElement | null>;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
}
