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
    listMovies: builder.query<
      ListResponse<Movie>,
      { page: number; sort: string; reset?: boolean }
    >({
      query: ({ page, sort }) =>
        `movies?page=${page ?? 1}&limit=10&sort=${sort}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg: { reset } }) => {
        if (reset) currentCache.result = [];
        currentCache.result.push(...newItems.result);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: () => [{ type: "Movies", id: `PARTIAL-LIST` }],
    }),
  }),
});

export const { useListMoviesQuery } = moviesApi;
