import styles from "./MovieNotFound.module.css";

function MovieNotFound() {
  return (
    <div className={styles.movieNotFound}>
      <div className={styles.movieNotFoundIcon}>🎬</div>
      <h2 className={styles.movieNotFoundTitle}>No Results Found</h2>
      <p className={styles.movieNotFoundText}>
        Enter a different title for the movie
      </p>
    </div>
  );
}

export default MovieNotFound;
