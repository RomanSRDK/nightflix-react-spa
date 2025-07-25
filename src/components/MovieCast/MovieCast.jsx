import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

const BASE_URL_IMG = "https://image.tmdb.org/t/p/w200";

function MovieCast() {
  const [castInfo, setCastInfo] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTQzM2E0M2MwOGVlZGNlM2JiZmNiYjEwZTk2NzFhOSIsIm5iZiI6MTc0OTg5NjUwNi4zOTIsInN1YiI6IjY4NGQ0ZDNhMWQ2YzRhNDc0ZWJiNGE3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QdPDsg81ywDhazmprFyPiSM7lF9J4OAq_E-SSVhqDTw",
      },
    };

    axios.get(url, options).then(({ data }) => setCastInfo(data.cast));
  }, [movieId]);

  return (
    <>
      <ul className={styles.list}>
        {castInfo.map((actor) => (
          <li key={actor.id} className={styles.item}>
            <img
              src={`${BASE_URL_IMG}${actor.profile_path}`}
              alt={actor.original_name}
              className={styles.image}
            />
            <p
              className={styles.text}
            >{`${actor.character} ⁄ ${actor.name}`}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MovieCast;
