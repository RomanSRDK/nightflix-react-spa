import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { IoClose } from "react-icons/io5";
import { getMoviesByName } from "../../redux/movies/operations";
import { clearFoundMovies } from "../../redux/movies/slice";
import styles from "./SearchPanel.module.css";

function SearchPanel() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get("name") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [debouncedQuery] = useDebounce(searchQuery.trim(), 700);

  const changeSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    if (debouncedQuery === queryFromUrl) {
      return;
    }

    if (!debouncedQuery) {
      setSearchParams({}, { replace: true });
      return;
    }

    setSearchParams(
      {
        name: debouncedQuery,
        page: "1",
      },
      { replace: true },
    );
  }, [debouncedQuery, queryFromUrl, setSearchParams]);

  useEffect(() => {
    if (!queryFromUrl) {
      dispatch(clearFoundMovies());
      return;
    }

    dispatch(
      getMoviesByName({
        debouncedQuery: queryFromUrl,
        page,
      }),
    );
  }, [dispatch, queryFromUrl, page]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="search"
        placeholder="Find your movie for tonight"
        value={searchQuery}
        onChange={changeSearchQuery}
        className={styles.searchInput}
        aria-label="Search for a movie"
      />

      {searchQuery && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={clearSearchQuery}
          aria-label="Clear search"
        >
          <IoClose aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default SearchPanel;
