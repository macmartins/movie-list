import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "../services/movies";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      // Middleware for Redux Toolkit Query necessary for
      // caching and polling
      moviesApi.middleware
    ),
});
