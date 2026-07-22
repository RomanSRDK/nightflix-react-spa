import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

import { getTrendingMovies } from "../redux/movies/operations";
import { isLoading, trendingMovies } from "../redux/movies/selectors";

import PaginationMui from "../components/PaginationMui/PaginationMui";
import TrendingPanel from "../components/TrendingPanel/TrendingPanel";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [timeWindow, setTimeWindow] = useState("day");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const movies = useSelector(trendingMovies);

  useEffect(() => {
    dispatch(getTrendingMovies({ timeWindow, page }));
  }, [dispatch, page, timeWindow]);

  const handleTimeWindowChange = (newTimeWindow) => {
    setTimeWindow(newTimeWindow);
    setSearchParams({ page: "1" });
  };

  return (
    <>
      <TrendingPanel
        timeWindow={timeWindow}
        onChange={handleTimeWindowChange}
      />
      {loading && <Loader />}
      {movies.length > 0 && (
        <>
          <MovieList movies={movies} />
          <PaginationMui />
        </>
      )}
    </>
  );
}
