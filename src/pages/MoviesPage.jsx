import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import axios from "axios";
import MovieList from "../components/MovieList/MovieList";

function MoviesPage() {
  const [foundMovies, setFoundMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const filmName = searchParams.get("name") ?? "";
  const [debouncedQuery] = useDebounce(filmName, 300);

  useEffect(() => {
    if (!debouncedQuery) return;
    setIsLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${debouncedQuery}`;
    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTQzM2E0M2MwOGVlZGNlM2JiZmNiYjEwZTk2NzFhOSIsIm5iZiI6MTc0OTg5NjUwNi4zOTIsInN1YiI6IjY4NGQ0ZDNhMWQ2YzRhNDc0ZWJiNGE3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QdPDsg81ywDhazmprFyPiSM7lF9J4OAq_E-SSVhqDTw",
      },
    };

    axios
      .get(url, options)
      .then(({ data }) => setFoundMovies(data.results))
      .finally(() => setIsLoading(false));
  }, [debouncedQuery]);

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

  return (
    <>
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
      {isLoading && <strong>Loading...</strong>}
      {foundMovies.length > 0 && <MovieList movies={foundMovies} />}
    </>
  );
}

export default MoviesPage;
