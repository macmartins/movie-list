import { TableCell, styled } from "@mui/material";
import COLORS from "../constants/colors";

export default styled(TableCell)({
  color: COLORS.tableHead,
  borderBottom: `1px solid ${COLORS.tableHead}60`,
  paddingBottom: 0,
});
