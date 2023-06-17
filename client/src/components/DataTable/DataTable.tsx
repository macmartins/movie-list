import {
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CustomMovieTableCell from "../CustomMovieTableCell";
import columns from "./columns";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setSelectedMovieID } from "@/store/movies/moviesSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import COLORS from "@/constants/colors";
import CustomMovieTableBodyCell from "../CustomMovieTableBodyCell";
import DataTableProps from "@/interfaces/dataTableProps.interface";

export default function DataTable({ data, tableEl }: DataTableProps) {
  const dispatch = useAppDispatch();

  const handleEyeClick = (id: number) => {
    dispatch(setSelectedMovieID(id));
  };
  return (
    <TableContainer ref={tableEl} sx={{ maxHeight: "70vh" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((c, i) => (
              <CustomMovieTableCell
                width={c.width}
                key={`column-${c.label}`}
                sx={{
                  textAlign: i === 0 ? "center" : "left",
                }}
              >
                {c.label.toUpperCase()}
              </CustomMovieTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, i) => (
            <TableRow
              key={`movie-${i}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <CustomMovieTableBodyCell
                sx={{
                  textAlign: "center",
                }}
              >
                {i + 1}
              </CustomMovieTableBodyCell>
              <CustomMovieTableBodyCell>{row.title}</CustomMovieTableBodyCell>
              <CustomMovieTableBodyCell>
                {new Date(row.release_date).getFullYear()}
              </CustomMovieTableBodyCell>
              <CustomMovieTableBodyCell>
                ${row.revenue?.toLocaleString("en-US")}
              </CustomMovieTableBodyCell>
              <CustomMovieTableBodyCell>
                <IconButton onClick={() => handleEyeClick(row.id)}>
                  <VisibilityIcon
                    sx={{
                      color: COLORS.tableSeparator,
                    }}
                  />
                </IconButton>
              </CustomMovieTableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
