import { FaRegHeart } from "react-icons/fa";
import styles from "./EmptyFavoritesState.module.css";

function EmptyFavoritesState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon} aria-hidden="true">
        <FaRegHeart />
      </div>

      <div className={styles.emptyContent}>
        <h2 className={styles.emptyTitle}>No favorite movies yet</h2>

        <p className={styles.emptyText}>
          Movies you add to favorites will appear here
        </p>
      </div>
    </div>
  );
}

export default EmptyFavoritesState;
