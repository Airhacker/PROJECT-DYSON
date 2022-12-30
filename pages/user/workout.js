import styles from "../../styles/Workouts.module.css";
import { auth, db } from "../../utils/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import StrengthPush from "../../components/workouts/StrengthPush";
import StrengthPull from "../../components/workouts/StrengthPull";

const Workout = () => {
  const [workoutInput, setWorkoutInput] = useState("");
  const [user] = useAuthState(auth);

  const selectedWorkout = (e) => {
    setWorkoutInput(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Workouts</h1>

      {user ? (
        <select
          name="workouts"
          id="workouts"
          onChange={selectedWorkout}
          className={styles.workoutSelector}
        >
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

      {workoutInput === "pushStrength" && <StrengthPush />}
      {workoutInput === "pullStrength" && <StrengthPull />}
    </div>
  );
};
export default Workout;
