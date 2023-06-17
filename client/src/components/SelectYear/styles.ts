import { PopoverOrigin, Theme } from "@mui/material";
import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";

export const backdrop = (theme: Theme) => ({
  color: "#fff",
  zIndex: theme.zIndex.drawer + 1,
});

export const popoverAnchor: PopoverOrigin = {
  vertical: "top",
  horizontal: "right",
};

export const popoverTransform: PopoverOrigin = {
  vertical: "top",
  horizontal: "left",
};

export const filtersContainer = {
  display: "flex",
  flexDirection: "column",
  minWidth: 200,
  textAlign: "center",
  paddingTop: 2,
};

export const label = {
  color: COLORS.buttonTextOpacity,
  pb: 1,
  fontSize: 14,
};

export const year = {
  color: COLORS.tableText,
  fontSize: 20,
  fontFamily: FONTS.medium,
  cursor: "pointer",
  lineHeight: 1.8,
  "&:hover": {
    backgroundColor: COLORS.tableSeparator,
  },
};
