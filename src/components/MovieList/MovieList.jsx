import MovieItem from "../MovieItem/MovieItem";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  return (
    <main>
      <section>
        <div className="container">
          <ul className={styles.list}>
            {movies.map((movie) => (
              <li key={movie.id} className={styles.item}>
                <MovieItem movie={movie} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default MovieList;
