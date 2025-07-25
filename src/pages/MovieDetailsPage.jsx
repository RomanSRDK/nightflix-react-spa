import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import MovieView from "../components/MovieView/MovieView";
import MovieNav from "../components/MovieNav/MovieNav";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById } from "../redux/trendingMovies/operations";
import { movieInfo } from "../redux/trendingMovies/selectors";

function MovieDetailsPage() {
  const info = useSelector(movieInfo);
  const location = useLocation();
  const backLinkRef = useRef(location.state || "/movies");
  const { movieId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieById(movieId));
  }, [dispatch, movieId]);

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

      {info && <MovieView movieInfo={info} />}
      <MovieNav />
      <Outlet />
    </>
  );
}

export default MovieDetailsPage;
