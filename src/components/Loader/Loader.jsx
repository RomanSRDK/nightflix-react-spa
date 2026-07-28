import { DotLoader } from "react-spinners";
import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.loaderBackdrop}>
      <DotLoader color={"#ffb74d"} />
    </div>
  );
};

export default Loader;
