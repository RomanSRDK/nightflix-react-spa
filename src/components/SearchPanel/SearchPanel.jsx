import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { getMoviesByName } from "../../redux/movies/operations";
import styles from "./SearchPanel.module.css";
import { clearFoundMovies } from "../../redux/movies/slice";

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

// function SearchPanel() {
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const query = searchParams.get("name") ?? "";
//   const page = parseInt(searchParams.get("page")) || 1;

//   const [filmName, setFilmName] = useState(query);

//   const changeSearchQuery = (evt) => {
//     setFilmName(evt.target.value);
//   };

//   const handleSearch = () => {
//     const nextSearchParams = new URLSearchParams(searchParams);

//     if (filmName.trim()) {
//       nextSearchParams.set("name", filmName.trim());
//       nextSearchParams.set("page", 1);
//       setSearchParams(nextSearchParams);

//       dispatch(getMoviesByName({ query, page }));
//       setFilmName("");
//     } else {
//       nextSearchParams.delete("name");
//       nextSearchParams.delete("page");

//       dispatch(clearFoundMovies());
//     }
//   };

//   const handleKeyPress = (evt) => {
//     if (evt.key === "Enter") {
//       handleSearch();
//     }
//   };

//   useEffect(() => {
//     if (query && page > 1) {
//       dispatch(getMoviesByName({ query: query.trim(), page }));
//     }
//   }, [page, query, dispatch]);

//   return (
//     <div className={styles.searchContainer}>
//       <input
//         type="text"
//         placeholder="Find your movie for tonight"
//         value={filmName}
//         onChange={changeSearchQuery}
//         onKeyDown={handleKeyPress}
//         className={styles.searchInput}
//       />
//       <button onClick={handleSearch} className={styles.searchButton}>
//         Search
//       </button>
//     </div>
//   );
// }

// export default SearchPanel;
