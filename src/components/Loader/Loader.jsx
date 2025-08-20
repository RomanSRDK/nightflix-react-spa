import { DotLoader } from "react-spinners";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loaderBackdrop}>
      <DotLoader color={"#ffb74d"} />
    </div>
  );
};

export default Loader;
