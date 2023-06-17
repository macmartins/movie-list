import { SxProps } from "@mui/material";
import COLORS from "@/constants/colors";
import { Theme } from "@emotion/react";

export const modal = { p: 2, color: "white" };

export const content: SxProps<Theme> = {
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

export const closeBtnContainer = {
  position: "absolute",
  right: 30,
  cursor: "pointer",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  color: COLORS.closeIcon,
  "& .MuiSvgIcon-root": {
    color: COLORS.closeIcon,
  },
  "&:hover": {
    flexDirection: "row-reverse",
    color: COLORS.appBar,
    "& .MuiSvgIcon-root": {
      color: COLORS.appBar,
    },
  },
};
