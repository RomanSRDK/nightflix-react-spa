import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "../components/MovieList/MovieList";
import { getTrendingMovies } from "../redux/trendingMovies/operations";
import { isLoading, trendingMovies } from "../redux/trendingMovies/selectors";

function HomePage() {
  const timeWindow = "week";

  const dispatch = useDispatch();
  const movies = useSelector(trendingMovies);
  const loading = useSelector(isLoading);

  useEffect(() => {
    dispatch(getTrendingMovies(timeWindow));
  }, [dispatch]);

  return (
    <>
      {loading && <strong>Loading...</strong>}
      <h1>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}

export default HomePage;
