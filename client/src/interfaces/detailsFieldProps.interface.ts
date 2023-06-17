import { SxProps, Theme } from "@mui/material";
export default interface DetailsFieldProps {
  title: string;
  value?: string | number;
  valueSX?: SxProps<Theme>;
}
