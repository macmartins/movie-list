import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { COLORS } from "../variables/colors";
import { useEffect, useState } from "react";

const CustomTableCell = styled(TableCell)({
  color: COLORS.tableHead,
  borderBottom: `1px solid ${COLORS.tableHead}60`,
  padding: 0,
});

export default function MovieList() {
  const theme = useTheme();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api2")
      .then((res) => {
        return res.json();
      })
      .then((data) => setData(data.message))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box sx={{ my: 3 }}>
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.secondary.main,
          my: 3,
        }}
      >
        Movie ranking
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell sx={{ paddingLeft: 1, maxWidth: "1px" }}>
                Ranking
              </CustomTableCell>
              <CustomTableCell sx={{ maxWidth: 20 }}>Title</CustomTableCell>
              <CustomTableCell sx={{ maxWidth: 15 }}>Year</CustomTableCell>
              <CustomTableCell sx={{ maxWidth: 30 }}>Revenue</CustomTableCell>
              <CustomTableCell></CustomTableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
}
