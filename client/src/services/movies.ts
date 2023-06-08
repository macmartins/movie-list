import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Movie {
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
    listMovies: builder.query<ListResponse<Movie>, number | void>({
      query: (page = 1) => `movies?page=${page}&limit=10`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.result.push(...newItems.result);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ id }) => ({
                type: "Movies" as const,
                id,
              })),
              { type: "Movies", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Movies", id: "PARTIAL-LIST" }],
    }),
  }),
});

export const { useListMoviesQuery } = moviesApi;
