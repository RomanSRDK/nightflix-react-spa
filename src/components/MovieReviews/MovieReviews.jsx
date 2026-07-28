import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviews } from "../../redux/movies/operations";
import { reviewsInfo } from "../../redux/movies/selectors";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { MdRateReview } from "react-icons/md";
import styles from "./MovieReviews.module.css";

function MovieReviews() {
  const dispatch = useDispatch();
  const reviews = useSelector(reviewsInfo);

  const { movieId } = useParams();
  const [reviewsPerPage, setReviewsPerPage] = useState(2);

  const handleLoadMore = () => {
    setReviewsPerPage((prev) => prev + 2);
  };

  const visibleReviews = reviews.slice(0, reviewsPerPage);

  useEffect(() => {
    dispatch(getReviews(movieId));
  }, [dispatch, movieId]);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <>
      <span className={`${styles.numberOfReviews} ${styles.withIcon}`}>
        <MdRateReview /> {reviews.length} Reviews
      </span>
      <ul className={styles.list}>
        {visibleReviews.map((review) => (
          <li key={review.id} className={styles.item}>
            <div className={styles.avatarContainer}>
              <span className={styles.reviewAvatar}>
                {getInitial(review.author)}
              </span>
              <p className={styles.author}>{review.author}</p>
            </div>

            <p className={styles.content}>{review.content}</p>
          </li>
        ))}
      </ul>
      {reviewsPerPage < reviews.length && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </>
  );
}

export default MovieReviews;
