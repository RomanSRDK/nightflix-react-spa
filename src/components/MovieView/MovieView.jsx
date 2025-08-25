import { CiStar } from "react-icons/ci";
import { LuClock4 } from "react-icons/lu";
import { useParams } from "react-router-dom";
import TrailerBtn from "../TrailerBtn/TrailerBtn";
import styles from "./MovieView.module.css";

function MovieView({ movieInfo }) {
  const BASE_URL_IMG = "https://image.tmdb.org/t/p/original";
  const year = movieInfo.release_date.split("-");

  const { movieId } = useParams();

  return (
    <div>
      {/* Fixed background */}
      <div className={styles.backgroundContainer}>
        {movieInfo.backdrop_path && (
          <img
            className={styles.mainImg}
            src={`${BASE_URL_IMG}${movieInfo.backdrop_path}`}
            alt={movieInfo.title}
          />
        )}
        <div className={styles.overlay}></div>
      </div>

      {/* Content */}
      <div className={styles.container}>
        <img
          className={styles.poster}
          src={`${BASE_URL_IMG}${movieInfo.poster_path}`}
          alt={movieInfo.title}
        />

        <ul className={styles.infoList}>
          <li className={styles.year}>{year[0]}</li>
          <li>
            <h1 className={styles.title}>{movieInfo.title}</h1>
          </li>
          <li className={styles.tagLine}>
            {movieInfo.tagline.length > 0 ? (
              <>
                {"\u00AB"}
                {movieInfo.tagline.endsWith(".")
                  ? movieInfo.tagline.slice(0, -1)
                  : movieInfo.tagline}
                {"\u00BB"}
              </>
            ) : (
              ""
            )}
          </li>
          <li className={styles.genres}>
            {movieInfo.genres?.map(({ id, name }) => (
              <div key={id} className={styles.genre}>
                <span>{name}</span>
              </div>
            ))}
          </li>
          <li className={styles.overview}>{movieInfo.overview}</li>

          <div className={styles.stats}>
            <li>
              <div className={styles.rating}>
                <CiStar className={styles.starIcon} />
                {movieInfo.vote_average.toFixed(1)}
              </div>{" "}
              {" / "}{" "}
              {movieInfo.vote_count
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              Votes
            </li>
            <li>
              {movieInfo.runtime > 0 ? (
                <>
                  <LuClock4 /> {Math.floor(movieInfo.runtime / 60)}h{" "}
                  {movieInfo.runtime % 60} mins
                </>
              ) : (
                <>
                  <LuClock4 /> {"N/A"}
                </>
              )}
            </li>
          </div>

          <li>
            <TrailerBtn movieId={movieId} />
          </li>
        </ul>
      </div>

      <ul className={styles.detailsGrid}>
        <li className={styles.detailCard}>
          <h2 className={styles.detailLabel}>Budget</h2>
          <div className={styles.detailValue}>
            {movieInfo.budget > 0
              ? `$ ${movieInfo.budget
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              : "N/A"}
          </div>
        </li>

        <li className={styles.detailCard}>
          <h2 className={styles.detailLabel}>Production Studios</h2>
          <div className={styles.detailValue}>
            <ul className={styles.studiosList}>
              {movieInfo.production_companies.length > 0 ? (
                <>
                  {movieInfo.production_companies.map((company, index) => (
                    <li key={index} className={styles.studio}>
                      {company.name}
                    </li>
                  ))}
                </>
              ) : (
                "N/A"
              )}
            </ul>
          </div>
        </li>

        <li className={styles.detailCard}>
          <h2 className={styles.detailLabel}>Countries</h2>
          <div className={styles.detailValue}>
            <ul className={styles.countriesList}>
              {movieInfo.production_countries.length > 0 ? (
                <>
                  {movieInfo.production_countries.map((country, index) => (
                    <li key={index} className={styles.countryFlag}>
                      {country.name}
                    </li>
                  ))}
                </>
              ) : (
                "N/A"
              )}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default MovieView;
