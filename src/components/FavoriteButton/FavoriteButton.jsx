import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toggleFavorite } from "../../redux/movies/slice";
import { favoriteMovieIds } from "../../redux/movies/selectors";
import styles from "./FavoriteButton.module.css";

function FavoriteButton() {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  const [isBursting, setIsBursting] = useState(false);

  const favorites = useSelector(favoriteMovieIds);
  const numericMovieId = Number(movieId);
  const isFavorite = favorites.includes(numericMovieId);

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      setIsBursting(true);
    }

    dispatch(toggleFavorite(numericMovieId));
  };

  const handleBurstAnimationEnd = () => {
    setIsBursting(false);
  };

  return (
    <button
      type="button"
      onClick={handleFavoriteClick}
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
      aria-label={
        isFavorite ? "Remove movie from favorites" : "Add movie to favorites"
      }
    >
      <span className={styles.iconWrapper}>
        {isFavorite ? <FaHeart /> : <FaRegHeart />}

        {isBursting && (
          <span
            className={styles.burst}
            aria-hidden="true"
            onAnimationEnd={handleBurstAnimationEnd}
          >
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </span>
        )}
      </span>

      <span>{isFavorite ? "In Favorites" : "Add to Favorites"}</span>
    </button>
  );
}

export default FavoriteButton;
