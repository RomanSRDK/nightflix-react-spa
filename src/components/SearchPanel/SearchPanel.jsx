import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { getMoviesByName } from "../../redux/movies/operations";

function SearchPanel() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filmName = searchParams.get("name") ?? "";
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
    dispatch(getMoviesByName(debouncedQuery));
  }, [dispatch, debouncedQuery]);

  return (
    <input
      type="text"
      placeholder="Find your movie for tonight"
      value={filmName}
      onChange={changeSearchQuery}
      style={{
        padding: "12px 16px",
        width: "100%",
        maxWidth: "400px",
        margin: "20px 0",
        display: "block",
        fontSize: "16px",
        border: "2px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        transition: "border-color 0.2s ease",
      }}
    />
  );
}

export default SearchPanel;
