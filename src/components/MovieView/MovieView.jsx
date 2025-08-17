import { CiStar } from "react-icons/ci";
import { LuClock4 } from "react-icons/lu";
import styles from "./MovieView.module.css";

const BASE_URL_IMG = "https://image.tmdb.org/t/p/original";

function MovieView({ movieInfo }) {
  const year = movieInfo.release_date.split("-");
  return (
    <div className="container">
      <div className={styles.backgroundContainer}>
        <img
          className={styles.mainImg}
          src={`${BASE_URL_IMG}${movieInfo.backdrop_path}`}
          alt={movieInfo.title}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.container}>
        <img
          className={styles.poster}
          src={`${BASE_URL_IMG}${movieInfo.poster_path}`}
          alt={movieInfo.title}
        />

        <div className={styles.details}>
          <ul className={styles.infoList}>
            <li>{year[0]}</li>
            <li>
              <h1 className={styles.title}>{movieInfo.title}</h1>
            </li>
            <li>
              {"\u00AB"}
              {movieInfo.tagline}
              {"\u00BB"}
            </li>
            <li>
              {movieInfo.genres?.map(({ name }) => name).join(" \u2022 ")}
            </li>
            <li>{movieInfo.overview}</li>
            <div className={styles.description}>
              <li>
                <LuClock4 /> {Math.floor(movieInfo.runtime / 60)} h.{" "}
                {movieInfo.runtime % 60} mins.
              </li>
              <li>
                <strong>TMDB Average rating / Votes:</strong>
                <div className={styles.rating}>
                  <CiStar className={styles.starIcon} />
                  {movieInfo.vote_average.toFixed(1)}
                </div>{" "}
                {" / "} {movieInfo.vote_count}
              </li>
            </div>
            <div className={styles.desc}>
              <li>
                <strong>Budget:</strong>
                {`$ ${movieInfo.budget}`}
              </li>
              <li>
                <strong>Movie Studios:</strong>
                {movieInfo.production_companies
                  .map((company) => company.name)
                  .join(" \u2022 ")}
              </li>
              <li>
                <strong>Countries:</strong>
                {movieInfo.production_countries
                  .map((country) => country.name)
                  .join(" \u2022 ")}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MovieView;
