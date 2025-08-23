import MovieList from "../components/MovieList/MovieList";
import { useSelector } from "react-redux";
import { foundMovies } from "../redux/movies/selectors";
import SearchPanel from "../components/SearchPanel/SearchPanel";
import PaginationMui from "../components/PaginationMui/PaginationMui";

function SearchPage() {
  const foundMoviesByName = useSelector(foundMovies);

  return (
    <>
      <SearchPanel />
      {foundMoviesByName.length > 0 && (
        <>
          <MovieList movies={foundMoviesByName} />
          <PaginationMui />
        </>
      )}
    </>
  );
}

export default SearchPage;
