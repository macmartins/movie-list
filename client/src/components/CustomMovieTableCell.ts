import { TableCell, styled } from "@mui/material";
import COLORS from "@/constants/colors";

export default styled(TableCell)({
  color: COLORS.tableHead,
  borderBottom: `1px solid ${COLORS.tableHead}60`,
  padding: "0 16px",
  fontSize: "10px",
  fontWeight: 600,
});
