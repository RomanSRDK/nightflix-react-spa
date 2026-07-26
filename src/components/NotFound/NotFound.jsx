import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.code}>404</p>

        <h1 className={styles.title}>Page Not Found</h1>

        <p className={styles.description}>
          The page you are looking for does not exist, has been moved, or is
          temporarily unavailable.
        </p>

        <p className={styles.redirectText}>
          You will be automatically redirected to the{" "}
          <Link className={styles.homeLink} to="/">
            Home
          </Link>{" "}
          page in a few seconds…
        </p>
      </div>
    </main>
  );
}

export default NotFound;
