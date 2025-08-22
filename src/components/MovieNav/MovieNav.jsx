import { NavLink } from "react-router-dom";
import css from "./MovieNav.module.css";
import clsx from "clsx";

function MovieNav() {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(isActive ? css.isActive : css.link);
  };

  return (
    <div className={css.navContainer}>
      <ul className={css.siteNav}>
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
