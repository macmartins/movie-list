import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "../services/movies";
import moviesSlice from "./movies/moviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      // Middleware for Redux Toolkit Query necessary for
      // caching and polling
      moviesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch