import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toggleFavorite } from "../../redux/movies/slice";
import { favoriteMovieIds } from "../../redux/movies/selectors";
import styles from "./FavoriteButton.module.css";

function FavoriteButton() {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  const favorites = useSelector(favoriteMovieIds);
  const isFavorite = favorites.includes(Number(movieId));

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(Number(movieId)));
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
      {isFavorite ? <FaHeart /> : <CiHeart />}

      <span>{isFavorite ? "In favorites" : "Add to favorites"}</span>
    </button>
  );
}

export default FavoriteButton;
