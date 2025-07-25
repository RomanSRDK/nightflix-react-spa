import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";

function MovieReviews() {
  const [reviewsInfo, setReviewsInfo] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;
    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTQzM2E0M2MwOGVlZGNlM2JiZmNiYjEwZTk2NzFhOSIsIm5iZiI6MTc0OTg5NjUwNi4zOTIsInN1YiI6IjY4NGQ0ZDNhMWQ2YzRhNDc0ZWJiNGE3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QdPDsg81ywDhazmprFyPiSM7lF9J4OAq_E-SSVhqDTw",
      },
    };

    axios.get(url, options).then(({ data }) => setReviewsInfo(data.results));
  }, [movieId]);

  return (
    <>
      <ul className={styles.list}>
        {reviewsInfo.map((review) => (
          <li key={review.id} className={styles.item}>
            <p className={styles.author}>{review.author}</p>
            <p className={styles.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MovieReviews;
