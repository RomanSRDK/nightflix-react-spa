import styles from "./RadioToggle.module.css";

function RadioToggle({ timeWindow, onChange }) {
  return (
    <nav className={styles.nav}>
      {/* data-active управляет положением ::after в CSS */}
      <div className={styles.navList} data-active={timeWindow}>
        <input
          type="radio"
          id="day"
          name="period"
          value="day"
          checked={timeWindow === "day"}
          onChange={() => onChange("day")}
          className={styles.input}
        />
        <label htmlFor="day" className={styles.label}>
          Day
        </label>

        <input
          type="radio"
          id="week"
          name="period"
          value="week"
          checked={timeWindow === "week"}
          onChange={() => onChange("week")}
          className={styles.input}
        />
        <label htmlFor="week" className={styles.label}>
          Week
        </label>
      </div>
    </nav>
  );
}

export default RadioToggle;
