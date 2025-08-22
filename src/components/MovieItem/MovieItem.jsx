import { Link, useLocation } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import styles from "./MovieItem.module.css";

const BASE_URL_IMG = "https://image.tmdb.org/t/p/w500";

function MovieItem({ movie }) {
  const location = useLocation();
  // const year = movie.release_date?.split("-");

  return (
    <>
      <Link
        to={`/movies/${movie.id}`}
        state={location}
        className={styles.movieItem}
      >
        <img
          src={`${BASE_URL_IMG}${movie.poster_path}`}
          alt={movie.title || movie.original_title}
          className={styles.posterImg}
        />
        <p className={styles.posterTitle}>
          {movie.title || movie.original_title}
        </p>
        <div className={styles.infoBtnContainer}>
          <IoInformationCircleOutline className={styles.icon} />
          <span>More info</span>
        </div>
      </Link>

      <p className={styles.posterYear}> {movie.release_date}</p>
      {/* {year[0]} */}

      <div className={styles.rating}>
        <CiStar className={styles.icon} />
        {/* <span>{movie.vote_average.toFixed(1)} TMDB</span> */}
      </div>
    </>
  );
}

export default MovieItem;
