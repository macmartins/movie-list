import Movie from "./movie.interface";
import { MutableRefObject } from "react";

export default interface DataTableProps {
  data?: Pick<Movie, "title" | "id" | "release_date" | "revenue">[];
  tableEl: MutableRefObject<HTMLDivElement | null>;
}
