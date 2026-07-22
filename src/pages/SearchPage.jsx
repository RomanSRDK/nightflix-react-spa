import MovieList from "../components/MovieList/MovieList";
import { useSelector } from "react-redux";
import { foundMovies, isLoading, isSearched } from "../redux/movies/selectors";
import SearchPanel from "../components/SearchPanel/SearchPanel";
import MovieNotFound from "../components/MovieNotFound/MovieNotFound";
import PaginationMui from "../components/PaginationMui/PaginationMui";
import Loader from "../components/Loader/Loader";

export default function SearchPage() {
  const foundMoviesByName = useSelector(foundMovies);
  const loading = useSelector(isLoading);
  const hasSearched = useSelector(isSearched);

  return (
    <>
      <SearchPanel />

      {loading && <Loader />}

      {foundMoviesByName.length > 0 ? (
        <>
          <MovieList movies={foundMoviesByName} />
          <PaginationMui />
        </>
      ) : hasSearched ? (
        <MovieNotFound />
      ) : null}
    </>
  );
}
