import { Link, useLocation } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IMG_URL_W500 } from "../../constants/tmdbConstants";
import styles from "./MovieItem.module.css";

function MovieItem({ movie }) {
  const location = useLocation();
  const year = movie.release_date?.split("-");

  const getInitial = (title) => {
    return title ? title : "";
  };

  return (
    <>
      <Link
        to={`/movies/${movie.id}`}
        state={location}
        className={styles.movieItem}
      >
        {movie.poster_path ? (
          <img
            src={`${IMG_URL_W500}${movie.poster_path}`}
            alt={movie.title || movie.original_title}
            className={styles.posterImg}
          />
        ) : (
          <div className={`${styles.imagePlaceholder} ${styles.initials}`}>
            {getInitial(movie.original_title)}
          </div>
        )}

        <p className={styles.posterTitle}>
          {movie.title || movie.original_title}
        </p>
        <div className={styles.infoBtnContainer}>
          <IoInformationCircleOutline className={styles.icon} />
          <span>More info</span>
        </div>
      </Link>

      <p className={styles.posterYear}> {movie.release_date ? year[0] : ""}</p>

      <div className={styles.rating}>
        <CiStar className={styles.icon} />
        {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"} TMDB
      </div>
    </>
  );
}

export default MovieItem;
