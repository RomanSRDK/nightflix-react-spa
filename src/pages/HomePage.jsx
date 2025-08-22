import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";

import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

import { getTrendingMovies } from "../redux/movies/operations";
import { trendingMovies } from "../redux/movies/selectors";
import { setCurrentPage } from "../redux/movies/slice";

import PaginationMui from "../components/PaginationMui/PaginationMui";
import TrendingPanel from "../components/TrendingPanel/TrendingPanel";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [timeWindow, setTimeWindow] = useState("day");

  const dispatch = useDispatch();
  const movies = useSelector(trendingMovies);

  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
    dispatch(getTrendingMovies({ timeWindow, currentPage }));
  }, [dispatch, currentPage, timeWindow]);

  const handlePageChange = (_, newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <>
      {movies.length > 0 ? (
        <>
          <TrendingPanel timeWindow={timeWindow} onChange={setTimeWindow} />
          <MovieList movies={movies} />
          <PaginationMui
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default HomePage;
