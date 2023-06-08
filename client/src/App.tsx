import { Box, ThemeProvider } from "@mui/material";
import MovieList from "./pages/MovieList";
import theme from "./theme";
import AppBar from "./components/AppBar/AppBar";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: 1280,
          }}
        >
          <MovieList />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
