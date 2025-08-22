import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getMovieById } from "../redux/movies/operations";
import { movieInfo } from "../redux/movies/selectors";
import MovieView from "../components/MovieView/MovieView";
import MovieNav from "../components/MovieNav/MovieNav";
import NavigateBackButton from "../components/NavigateBackButton/NavigateBackButton";
import Loader from "../components/Loader/Loader";

function MovieDetailsPage() {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const info = useSelector(movieInfo);

  useEffect(() => {
    dispatch(getMovieById(movieId));
  }, [dispatch, movieId]);

  return (
    <div className="container">
      {info ? (
        <div>
          <NavigateBackButton />
          <MovieView movieInfo={info} />
          <MovieNav />
          <Outlet />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MovieDetailsPage;
