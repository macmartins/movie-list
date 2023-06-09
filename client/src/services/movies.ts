import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Movie {
  id: number;
  title: string;
  revenue: number;
  release_date: string;
}

interface ListResponse<T> {
  currentPage: number;
  totalPages: number;
  result: T[];
}

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    listMovies: builder.query<
      ListResponse<Movie>,
      { page: number; sort: string }
    >({
      query: ({ page, sort }) =>
        `movies?page=${page ?? 1}&limit=10&sort=${sort}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.result.push(...newItems.result);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    listTop10Movies: builder.query<
      ListResponse<Movie>,
      { sort: string; year?: number }
    >({
      query: ({ sort, year }) =>
        `movies?page=1&limit=10&sort=${sort}${year ? `&year=${year}` : ""}`,
    }),
  }),
});

export const { useListMoviesQuery, useListTop10MoviesQuery } = moviesApi;
