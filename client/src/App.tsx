import { Box, ThemeProvider } from "@mui/material";
import MovieList from "./pages/MovieList/MovieList";
import theme from "./theme";
import AppBar from "./components/AppBar/AppBar";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppBar />
          <Box
            sx={{
              margin: "0 auto",
              maxWidth: "70vw",
            }}
          >
            <MovieList />
          </Box>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
