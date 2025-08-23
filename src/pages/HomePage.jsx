import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

import { getTrendingMovies } from "../redux/movies/operations";
import { trendingMovies } from "../redux/movies/selectors";

import PaginationMui from "../components/PaginationMui/PaginationMui";
import TrendingPanel from "../components/TrendingPanel/TrendingPanel";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [timeWindow, setTimeWindow] = useState("day");

  const dispatch = useDispatch();
  const movies = useSelector(trendingMovies);

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(getTrendingMovies({ timeWindow, page }));
  }, [dispatch, page, timeWindow]);

  return (
    <>
      {movies.length > 0 ? (
        <>
          <TrendingPanel timeWindow={timeWindow} onChange={setTimeWindow} />
          <MovieList movies={movies} />
          <PaginationMui />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default HomePage;
