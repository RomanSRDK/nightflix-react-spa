import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import styles from "./NavigateBackButton.module.css";

function NavigateBackButton() {
  const location = useLocation();

  const backLinkRef = useRef(location.state || "/");

  return (
    <Link to={backLinkRef.current} className={styles.backButton}>
      <BiArrowBack />
      Back
    </Link>
  );
}

export default NavigateBackButton;
