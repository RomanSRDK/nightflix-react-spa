import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFavoriteMovies } from "../redux/movies/slice";
import { getFavoriteMovies } from "../redux/movies/operations";
import {
  favoriteMovieIds,
  favoriteMovies,
  isFavoritesLoading,
} from "../redux/movies/selectors";
import EmptyFavoritesState from "../components/EmptyFavoritesState/EmptyFavoritesState";
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

function FavoritesPage() {
  const dispatch = useDispatch();

  const favoriteIds = useSelector(favoriteMovieIds);
  const movies = useSelector(favoriteMovies);
  const loading = useSelector(isFavoritesLoading);

  useEffect(() => {
    if (favoriteIds.length > 0) {
      dispatch(getFavoriteMovies(favoriteIds));
    } else {
      dispatch(clearFavoriteMovies());
    }
  }, [dispatch, favoriteIds]);

  return (
    <main className="container">
      {loading && <Loader />}

      {!loading && favoriteIds.length === 0 && <EmptyFavoritesState />}

      {!loading && favoriteIds.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}

export default FavoritesPage;
