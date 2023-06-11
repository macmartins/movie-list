import { SxProps } from "@mui/material";
import COLORS from "../../variables/colors";
import { Theme } from "@emotion/react";

export const modal: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: COLORS.white,
  boxShadow: 24,
  py: "30px",
  px: "60px",
  maxHeight: "90vh",
  overflow: "auto",
};

export const divider: SxProps<Theme> = {
  width: 50,
  borderColor: COLORS.titleUnderline,
  borderWidth: 2,
  mt: 3,
};
