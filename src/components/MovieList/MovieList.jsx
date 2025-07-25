import { Link, useLocation } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <BiCameraMovie className={styles.icon} />
          <Link
            to={`/movies/${movie.id}`}
            className={styles.link}
            state={location}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
