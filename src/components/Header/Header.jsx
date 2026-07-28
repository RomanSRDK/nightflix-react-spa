import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Header.module.css";

function Header() {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(isActive ? styles.isActive : styles.link);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink to="/" className={getActiveLinkClass}>
                Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/search" className={getActiveLinkClass}>
                Search Movies
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/favorites" className={getActiveLinkClass}>
                Favorites
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/movie-assistant" className={getActiveLinkClass}>
                NightFlix AI
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
