import styles from "../../styles/Workouts.module.css";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import SelectedWorkout from "../../components/SelectedWorkout";

const Workout = () => {
  const [workout, setWorkout] = useState("");
  const [user] = useAuthState(auth);

  const selectedWorkout = (e) => {
    setWorkout(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Workouts</h1>

      {user ? (
        <select name="workouts" id="workouts" onChange={selectedWorkout}>
          <option value="default">Select a workout</option>

          <optgroup label="Strength">
            <option value="pushStrength">Push</option>
            <option value="pullStrength">Pull</option>
            <option value="legsStrength">Legs</option>
          </optgroup>

          <optgroup label="Hypertrophy">
            <option value="pushHypertrophy">Push </option>
            <option value="pullHypertrophy">Pull </option>
            <option value="legsHypertrophy">Legs </option>
          </optgroup>
        </select>
      ) : (
        <p>Please sign in to view workouts</p>
      )}

      <div className={styles.workoutContainer}>
        <SelectedWorkout workout={workout}></SelectedWorkout>
      </div>
    </div>
  );
};
export default Workout;
