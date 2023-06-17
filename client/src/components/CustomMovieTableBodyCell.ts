import { TableCell, styled } from "@mui/material";
import COLORS from "@/constants/colors";

export default styled(TableCell)({
  color: COLORS.tableText,
  borderBottom: `1px solid ${COLORS.tableBodySeparator}`,
  padding: "5px 16px",
  fontSize: "16px",
});
