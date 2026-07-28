import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./MovieNav.module.css";

function MovieNav() {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(isActive ? styles.isActive : styles.link);
  };

  return (
    <div className={styles.navContainer}>
      <ul className={styles.siteNav}>
        <li>
          <NavLink to="cast" className={getActiveLinkClass}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={getActiveLinkClass}>
            Reviews
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MovieNav;
