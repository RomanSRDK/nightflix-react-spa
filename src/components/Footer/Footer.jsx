import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Developed by Roman Serdiuk ·{" "}
        <Link
          className={styles.link}
          to="https://github.com/RomanSRDK/nightflix-react-spa"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </p>
    </footer>
  );
}
