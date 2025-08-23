import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { getMoviesByName } from "../../redux/movies/operations";
import styles from "./SearchPanel.module.css";

function SearchPanel() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filmName = searchParams.get("name") ?? "";
  const page = parseInt(searchParams.get("page")) || 1;

  const [debouncedQuery] = useDebounce(filmName, 300);

  const changeSearchQuery = (evt) => {
    const newQuery = evt.target.value;
    const nextSearchParams = new URLSearchParams(searchParams);
    if (newQuery !== "") {
      nextSearchParams.set("name", newQuery);
    } else {
      nextSearchParams.delete("name");
    }
    setSearchParams(nextSearchParams);
  };

  useEffect(() => {
    if (!debouncedQuery) return;
    dispatch(getMoviesByName({ debouncedQuery, page }));
  }, [dispatch, debouncedQuery, page]);

  return (
    <>
      <input
        type="text"
        placeholder="Find your movie for tonight"
        value={filmName}
        onChange={changeSearchQuery}
        className={styles.searchInput}
      />
    </>
  );
}

export default SearchPanel;
