import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { selectPage, selectSort, setPage } from "../store/movies/moviesSlice";
import ListResponse from "../interfaces/listResponse.interface";
import Movie from "../interfaces/movies.interface";

export default function useScrollResize({
  movies,
  tableEl,
  isFetching,
  isLoading,
  isError,
}: {
  movies?: ListResponse<
    Pick<Movie, "id" | "title" | "release_date" | "revenue">
  >;
  tableEl: React.MutableRefObject<HTMLDivElement | null>;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
}) {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const sort = useAppSelector(selectSort);
  const [distanceBottom, setDistanceBottom] = useState(0);

  const scrollListener = useCallback(() => {
    if (tableEl.current) {
      const bottom =
        tableEl.current.scrollHeight - tableEl.current.clientHeight;

      if (!distanceBottom) {
        setDistanceBottom(Math.round(bottom * 0.2));
      }
      if (
        tableEl.current.scrollTop > bottom - distanceBottom &&
        page < Number(movies?.totalPages) &&
        sort.includes("title") &&
        !isFetching
      ) {
        console.log("page set + 1");
        dispatch(setPage(page + 1));
      }
    }
    // Add the ignore because there's a bug where if page is a dependency, it will setPage x2
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distanceBottom, movies?.totalPages, sort, isFetching]);

  useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef?.addEventListener("scroll", scrollListener);
    return () => {
      tableRef?.removeEventListener("scroll", scrollListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollListener]);

  useEffect(() => {
    const scrollHeight = tableEl?.current?.scrollHeight;
    const clientHeight = tableEl?.current?.clientHeight;
    if (
      scrollHeight &&
      clientHeight &&
      !(scrollHeight > clientHeight) &&
      !isFetching &&
      !isLoading &&
      !isError
    ) {
      dispatch(setPage(page + 1));
    }
    // Adding the 'page' dependency will cause it to run immediately and skip a page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading]);
}
