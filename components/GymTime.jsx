import styles from "../styles/GymTime.module.css";

const GymTime = () => {
  return (
    <div className={styles.container}>
      <span>GYM TIME</span>
      <input type="time" />
    </div>
  );
};
export default GymTime;
