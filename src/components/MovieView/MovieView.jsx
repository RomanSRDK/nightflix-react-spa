import styles from "./MovieView.module.css";
const BASE_URL_IMG = "https://image.tmdb.org/t/p/original";

function MovieView({ movieInfo }) {
  return (
    <div className={styles.container}>
      <img
        className={styles.poster}
        src={`${BASE_URL_IMG}${movieInfo.poster_path}`}
        alt={movieInfo.title}
      />

      <div className={styles.details}>
        <h1 className={styles.title}>{movieInfo.title}</h1>

        <ul className={styles.infoList}>
          <li className={styles.bgimage}>
            {/* <img
              src={`https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}`}
            /> */}
          </li>
          <li>
            <strong>Release Date:</strong> {movieInfo.release_date}
          </li>
          <li>
            <strong>Tagline:</strong> {movieInfo.tagline}
          </li>
          <li>
            <strong>Genres:</strong>
            {movieInfo.genres?.map(({ name }) => name).join(", ")}
          </li>
          <li>
            <strong>Rating:</strong> {Number(movieInfo.vote_average).toFixed(1)}
          </li>
          <li>
            <strong>Duration:</strong> {Math.floor(movieInfo.runtime / 60)} h.{" "}
            {movieInfo.runtime % 60} mins.
          </li>
          <li>
            <strong>Overview:</strong> {movieInfo.overview}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MovieView;
