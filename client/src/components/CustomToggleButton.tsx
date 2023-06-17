import { ToggleButton, styled } from "@mui/material";
import COLORS from "@/constants/colors";

const CustomToggleButton = styled(ToggleButton)({
  border: `1px solid ${COLORS.buttonBorder}`,
  color: COLORS.buttonText,
  textTransform: "none",
  fontSize: 12,
  fontFamily: "'Robot Light', sans-serif",
  borderRadius: 20,
  lineHeight: 1,
  "&.Mui-selected,&.Mui-selected:hover": {
    backgroundColor: COLORS.buttonToggled,
  },
});

export default CustomToggleButton;
