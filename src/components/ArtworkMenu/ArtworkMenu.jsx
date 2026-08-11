import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuImageDown, LuExternalLink } from "react-icons/lu";
import { BASE_URL_IMG } from "../../constants/tmdbConstants";
import styles from "./ArtworkMenu.module.css";

function ArtworkMenu({ movieInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const collection = movieInfo.belongs_to_collection;

  const hasArtwork =
    movieInfo.poster_path ||
    movieInfo.backdrop_path ||
    collection?.poster_path ||
    collection?.backdrop_path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!hasArtwork) {
    return null;
  }

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prevState) => !prevState)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <LuImageDown aria-hidden="true" />
        <span>Artwork</span>
        <LuChevronDown
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu">
          <p className={styles.groupTitle}>Movie</p>

          {movieInfo.poster_path && (
            <a
              className={styles.menuItem}
              href={`${BASE_URL_IMG}${movieInfo.poster_path}`}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <span>Poster</span>
              <LuExternalLink aria-hidden="true" />
            </a>
          )}

          {movieInfo.backdrop_path && (
            <a
              className={styles.menuItem}
              href={`${BASE_URL_IMG}${movieInfo.backdrop_path}`}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <span>Backdrop</span>
              <LuExternalLink aria-hidden="true" />
            </a>
          )}

          {collection &&
            (collection.poster_path || collection.backdrop_path) && (
              <>
                <div className={styles.separator} />

                <p className={styles.groupTitle}>
                  {collection.name || "Collection"}
                </p>

                {collection.poster_path && (
                  <a
                    className={styles.menuItem}
                    href={`${BASE_URL_IMG}${collection.poster_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Collection Poster</span>
                    <LuExternalLink aria-hidden="true" />
                  </a>
                )}

                {collection.backdrop_path && (
                  <a
                    className={styles.menuItem}
                    href={`${BASE_URL_IMG}${collection.backdrop_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Collection Backdrop</span>
                    <LuExternalLink aria-hidden="true" />
                  </a>
                )}
              </>
            )}
        </div>
      )}
    </div>
  );
}

export default ArtworkMenu;
