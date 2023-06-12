import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MutableRefObject } from "react";
import CustomMovieTableCell from "../CustomMovieTableCell";
import columns from "./columns";
import Movie from "../../interfaces/movies.interface";
import { useAppDispatch } from "../../hooks/storeHooks";
import { setSelectedMovieID } from "../../store/movies/moviesSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import COLORS from "../../constants/colors";

export default function DataTable({
  data,
  tableEl,
}: {
  data?: Pick<Movie, "title" | "id" | "release_date" | "revenue">[];
  tableEl: MutableRefObject<HTMLDivElement | null>;
}) {
  const dispatch = useAppDispatch();

  const handleEyeClick = (id: number) => {
    dispatch(setSelectedMovieID(id));
  };
  return (
    <TableContainer ref={tableEl} sx={{ maxHeight: "70vh" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <CustomMovieTableCell>{c}</CustomMovieTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, i) => (
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
                <IconButton onClick={() => handleEyeClick(row.id)}>
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
  );
}
