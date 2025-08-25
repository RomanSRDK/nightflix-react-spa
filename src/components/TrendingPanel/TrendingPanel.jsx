import RadioToggle from "../RadioToggle/RadioToggle";
import styles from "./TrendingPanel.module.css";

function TrendingPanel({ timeWindow, onChange }) {
  return (
    <div className="container">
      <div className={styles.titleToggle}>
        <h1 className={styles.title}>Trending movies</h1>
        <RadioToggle timeWindow={timeWindow} onChange={onChange} />
      </div>
    </div>
  );
}

export default TrendingPanel;
