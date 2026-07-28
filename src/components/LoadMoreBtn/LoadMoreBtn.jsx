import styles from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={styles.loadMoreBtn}>
      Load more
    </button>
  );
}

export default LoadMoreBtn;
