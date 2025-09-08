import MovieList from "../components/MovieList/MovieList";
import { useSelector } from "react-redux";
import { foundMovies, isSearched } from "../redux/movies/selectors";
import SearchPanel from "../components/SearchPanel/SearchPanel";
import PaginationMui from "../components/PaginationMui/PaginationMui";

function SearchPage() {
  const foundMoviesByName = useSelector(foundMovies);
  const hasSearched = useSelector(isSearched);

  return (
    <>
      <SearchPanel />
      {foundMoviesByName.length > 0 ? (
        <>
          <MovieList movies={foundMoviesByName} />
          <PaginationMui />
        </>
      ) : hasSearched ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            margin: "40px auto",
            padding: "60px 40px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            maxWidth: "500px",
            boxShadow:
              "0 4px 12px rgba(0, 0, 0, 0.1), 0 12px 24px rgba(0, 0, 0, 0.12)",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "24px",
              opacity: "0.6",
            }}
          >
            🎬
          </div>
          <h2
            style={{
              color: "#ebeef5",
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            No Results Found
          </h2>
          <p
            style={{
              color: "#b0bec5",
              fontSize: "16px",
              textAlign: "center",
              lineHeight: "1.5",
              margin: "0",
            }}
          >
            Try adjusting your search terms or explore different movies
          </p>
        </div>
      ) : null}
    </>
  );
}

export default SearchPage;
