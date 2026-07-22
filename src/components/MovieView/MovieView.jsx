import { useParams } from "react-router-dom";
import TrailerBtn from "../TrailerBtn/TrailerBtn";
import { CiStar } from "react-icons/ci";
import { LuClock4 } from "react-icons/lu";
import { BASE_URL_IMG } from "../../constants/tmdbConstants";
import styles from "./MovieView.module.css";

function MovieView({ movieInfo }) {
  const { movieId } = useParams();

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Release date unavailable";
    }
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitial = (title) => {
    return title ? title : "";
  };

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
        {movieInfo.poster_path ? (
          <img
            className={styles.poster}
            src={`${BASE_URL_IMG}${movieInfo.poster_path}`}
            alt={movieInfo.title}
          />
        ) : (
          <div className={`${styles.imagePlaceholder} ${styles.initials}`}>
            {getInitial(movieInfo.title)}
          </div>
        )}

        <ul className={styles.infoList}>
          <li className={styles.year}>{formatDate(movieInfo.release_date)}</li>
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
              </div>
              {" / "}
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
            <span className={styles.movieBudget}>
              {movieInfo.budget > 0
                ? `$ ${movieInfo.budget
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                : "N/A"}
            </span>
          </div>
        </li>

        <li className={styles.detailCard}>
          <h2 className={styles.detailLabel}>Production Studios</h2>
          <div className={styles.detailValue}>
            <ul className={styles.studiosList}>
              {movieInfo.production_companies.length > 0 ? (
                <>
                  {movieInfo.production_companies.map((company) => (
                    <li key={company.id} className={styles.studio}>
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
