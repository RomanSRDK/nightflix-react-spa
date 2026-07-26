import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { getMoviesByName } from "../../redux/movies/operations";
import { clearFoundMovies } from "../../redux/movies/slice";
import styles from "./SearchPanel.module.css";

function SearchPanel() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filmName = searchParams.get("name") ?? "";
  const page = parseInt(searchParams.get("page")) || 1;

  const [debouncedQuery] = useDebounce(filmName, 1000);

  const changeSearchQuery = (evt) => {
    const newQuery = evt.target.value;
    const nextSearchParams = new URLSearchParams(searchParams);

    if (newQuery !== "") {
      nextSearchParams.set("name", newQuery);
      nextSearchParams.set("page", "1");
    } else {
      nextSearchParams.delete("name");
      nextSearchParams.delete("page");
    }

    setSearchParams(nextSearchParams, { replace: true });
  };

  useEffect(() => {
    if (!debouncedQuery) {
      dispatch(clearFoundMovies());
      return;
    }

    if (debouncedQuery !== filmName) {
      return;
    }

    dispatch(getMoviesByName({ debouncedQuery, page }));
  }, [dispatch, debouncedQuery, filmName, page]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Find your movie for tonight"
        value={filmName}
        onChange={changeSearchQuery}
        className={styles.searchInput}
      />
    </div>
  );
}

export default SearchPanel;
