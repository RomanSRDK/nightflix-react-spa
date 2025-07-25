import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import clsx from "clsx";

function Header() {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(isActive ? css.isActive : css.link);
  };

  return (
    <>
      <header>
        <nav className={css.nav}>
          <NavLink to="/" className={getActiveLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={getActiveLinkClass}>
            Movies
          </NavLink>
        </nav>
      </header>
    </>
  );
}

export default Header;
