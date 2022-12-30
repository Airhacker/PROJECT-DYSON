import { useState } from "react";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/SelectedWorkout.module.css";
import { FaWeightHanging } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";

const SelectedWorkout = (props) => {
  const [workoutComplete, setWorkoutComplete] = useState([]);
  const [weight, setWeight] = useState([]);
  const [reps, setReps] = useState([]);
  const [time, setTime] = useState([]);

  const [user] = useAuthState(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allWorkoutRef = collection(db, "AllWorkouts");

    await addDoc(allWorkoutRef, {
      userName: user.displayName,
      userPhoto: user.photoURL,
      workoutName: props.workout.name,
      workout: props.workout.exerciseList.map((exercise) => {
        return {
          name: exercise.name,
          sets: exercise.sets.map((set) => {
            console.log(weight);

            return {
              weight: weight[set],
              reps: e.target.reps.value,
              time: e.target.time.value,
            };
          }),
        };
      }),
    });

    toast.success("Workout completed! 🏋️‍♂️", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
  };

  return (
    <div className={styles.container}>
      <h2>{props.workout.name}</h2>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {props.workout.exerciseList &&
          props.workout.exerciseList.map((exercise) => {
            return (
              <div
                key={exercise + exercise.name}
                className={styles.exerciseContainer}
              >
                <hr />
                <h3>{exercise.name}</h3>
                <div className={styles.spanContainer}>
                  <span>Sets</span>
                  <span>
                    <FaWeightHanging /> Weight
                  </span>
                  <span>
                    <BsArrowRepeat /> Reps
                  </span>
                  <span>
                    <AiOutlineFieldTime /> Time
                  </span>
                </div>
                {exercise.sets.map((set) => (
                  <div key={exercise + set} className={styles.inputContainer}>
                    <span>{set}</span>
                    <input
                      type="number"
                      name="weight"
                      onBlur={(e) => setWeight([...weight, e.target.value])}
                    />
                    <input type="number" name="reps" />
                    <input type={"time"} name="time" />
                  </div>
                ))}
              </div>
            );
          })}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SelectedWorkout;
