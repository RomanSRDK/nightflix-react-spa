import { NavLink } from "react-router-dom";
import css from "./MovieNav.module.css";
import clsx from "clsx";

function MovieNav() {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(isActive ? css.isActive : css.link);
  };

  return (
    <>
      <ul className={css.list}>
        <NavLink to="cast" className={getActiveLinkClass}>
          Cast
        </NavLink>

        <NavLink to="reviews" className={getActiveLinkClass}>
          Reviews
        </NavLink>
      </ul>
    </>
  );
}

export default MovieNav;
