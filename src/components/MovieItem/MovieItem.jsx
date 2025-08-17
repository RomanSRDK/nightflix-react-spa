import { Link, useLocation } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import styles from "./MovieItem.module.css";

const BASE_URL_IMG = "https://image.tmdb.org/t/p/w500";

function MovieItem({ movie }) {
  const location = useLocation();
  const year = movie.release_date.split("-");

  return (
    <Link
      to={`/movies/${movie.id}`}
      state={location}
      className={styles.movieItem}
    >
      <div className={styles.posterContainer}>
        <img
          src={`${BASE_URL_IMG}${movie.poster_path}`}
          alt={movie.original_title || movie.title}
          className={styles.poster}
        />
        <div className={styles.rating}>
          <CiStar className={styles.starIcon} />
          <span>{movie.vote_average.toFixed(1)} TMDB</span>
        </div>
        <p className={styles.posterTitle}>
          {movie.title || movie.original_title}
        </p>
        <p className={styles.posterYear}>{year[0]}</p>
      </div>
    </Link>
  );
}

export default MovieItem;
