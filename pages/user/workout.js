import styles from "../../styles/Workouts.module.css";
import { auth, db } from "../../utils/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import SelectedWorkout from "../../components/SelectedWorkout";

const Workout = () => {
  const [workoutInput, setWorkoutInput] = useState("");
  const [workout, setWorkout] = useState([]);
  const [user] = useAuthState(auth);

  const selectedWorkout = (e) => {
    setWorkoutInput(e.target.value);
    console.log(e.target.value);
  };

  const getWorkouts = async () => {
    const workoutRef = collection(db, "Exercises");
    const q = query(workoutRef, where("id", "==", workoutInput));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        setWorkout(doc.data());
      });
    });

    return unsubscribe;
  };

  useEffect(() => {
    getWorkouts();
  }, [workoutInput]);

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
      {workoutInput !== "" ? (
        <div className={styles.workoutContainer}>
          <SelectedWorkout workout={workout} key={workout} />
        </div>
      ) : null}
    </div>
  );
};
export default Workout;
