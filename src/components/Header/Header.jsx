import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.css";

function Header() {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(isActive ? css.isActive : css.link);
  };

  return (
    <>
      <header className={css.header}>
        <nav className={css.nav}>
          <ul className={css.navList}>
            <li className={css.navItem}>
              <NavLink to="/" className={getActiveLinkClass}>
                Home
              </NavLink>
            </li>
            <li className={css.navItem}>
              <NavLink to="/search" className={getActiveLinkClass}>
                Search Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
