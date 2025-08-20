import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";

import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

import { getTrendingMovies } from "../redux/movies/operations";
import { trendingMovies } from "../redux/movies/selectors";
import { setCurrentPage } from "../redux/movies/slice";
import PaginationMui from "../components/PaginationMui/PaginationMui";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const dispatch = useDispatch();
  const movies = useSelector(trendingMovies);

  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
    dispatch(getTrendingMovies({ timeWindow: "day", page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (_, newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <>
      {movies.length > 0 ? (
        <>
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
