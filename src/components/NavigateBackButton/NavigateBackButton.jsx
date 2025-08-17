import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavigateBackButton.module.css";

function NavigateBackButton() {
  const location = useLocation();
  const backLinkRef = useRef(location.state || "/movies");

  return (
    <Link to={backLinkRef.current} className={styles.goBackLink}>
      Go Back
    </Link>
  );
}

export default NavigateBackButton;
