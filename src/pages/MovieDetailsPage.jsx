import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import MovieView from "../components/MovieView/MovieView";
import MovieNav from "../components/MovieNav/MovieNav";

function MovieDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state || "/movies");

  const [movieInfo, setMovieInfo] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTQzM2E0M2MwOGVlZGNlM2JiZmNiYjEwZTk2NzFhOSIsIm5iZiI6MTc0OTg5NjUwNi4zOTIsInN1YiI6IjY4NGQ0ZDNhMWQ2YzRhNDc0ZWJiNGE3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QdPDsg81ywDhazmprFyPiSM7lF9J4OAq_E-SSVhqDTw",
      },
    };

    axios.get(url, options).then(({ data }) => setMovieInfo(data));
  }, [movieId]);

  return (
    <>
      <Link
        to={backLinkRef.current}
        style={{
          display: "inline-block",
          padding: "8px 16px",
          margin: "24px 0",
          backgroundColor: "#000",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "500",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
          transition: "background-color 0.3s ease",
        }}
      >
        Go Back
      </Link>

      {movieInfo && <MovieView movieInfo={movieInfo} />}
      <MovieNav />
      <Outlet />
    </>
  );
}

export default MovieDetailsPage;
