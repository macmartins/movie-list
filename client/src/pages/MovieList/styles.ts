import { PopoverOrigin, Theme } from "@mui/material";

export const title = (theme: Theme) => ({
  color: theme.palette.secondary.main,
  my: 3,
});

export const titleContent = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

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
