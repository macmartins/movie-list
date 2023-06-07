import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AppBar = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: 50,
        position: "sticky",
        top: 0,
        backgroundColor: theme.palette.primary.main,
      }}
    />
  );
};

export default AppBar;
