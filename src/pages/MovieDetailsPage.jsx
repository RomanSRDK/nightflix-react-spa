import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import MovieView from "../components/MovieView/MovieView";
import MovieNav from "../components/MovieNav/MovieNav";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById } from "../redux/movies/operations";
import { movieInfo } from "../redux/movies/selectors";
import NavigateBackButton from "../components/NavigateBackButton/NavigateBackButton";

function MovieDetailsPage() {
  const info = useSelector(movieInfo);

  const { movieId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieById(movieId));
  }, [dispatch, movieId]);

  return (
    <>
      {/* <NavigateBackButton /> */}
      {info && (
        <>
          <MovieView movieInfo={info} />
          {/* <MovieNav /> */}
          {/* <Outlet /> */}
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
