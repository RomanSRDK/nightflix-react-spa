import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";

import { getMovieById } from "../redux/movies/operations";
import { isLoading, movieInfo, moviesError } from "../redux/movies/selectors";

import FavoriteButton from "../components/FavoriteButton/FavoriteButton";
import Loader from "../components/Loader/Loader";
import MovieNav from "../components/MovieNav/MovieNav";
import MovieView from "../components/MovieView/MovieView";
import NavigateBackButton from "../components/NavigateBackButton/NavigateBackButton";

export default function MovieDetailsPage() {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const numericMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(numericMovieId) && numericMovieId > 0;

  const info = useSelector(movieInfo);
  const loading = useSelector(isLoading);
  const error = useSelector(moviesError);

  useEffect(() => {
    if (!isValidMovieId) {
      return;
    }

    dispatch(getMovieById(numericMovieId));
  }, [dispatch, isValidMovieId, numericMovieId]);

  if (!isValidMovieId || error) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="container">
      {loading && <Loader />}

      {info && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "20px",
            }}
          >
            <NavigateBackButton />
            <FavoriteButton />
          </div>
          <MovieView movieInfo={info} />
          <MovieNav />
          <Outlet />
        </div>
      )}
    </div>
  );
}
