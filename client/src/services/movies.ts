import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Movie from "@/interfaces/movie.interface";
import ListResponse from "@/interfaces/listResponse.interface";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    listMovies: builder.query<
      ListResponse<Pick<Movie, "id" | "title" | "release_date" | "revenue">>,
      { page: number; sort: string }
    >({
      query: ({ page, sort }) =>
        `movies?page=${
          page ?? 1
        }&limit=10&sort=${sort}&fields=id&fields=title&fields=release_date&fields=revenue`,
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
    getMovieById: builder.query<Movie, number>({
      query: (id) => `movies/${id}`,
    }),
  }),
});

export const {
  useListMoviesQuery,
  useListTop10MoviesQuery,
  useGetMovieByIdQuery,
} = moviesApi;
