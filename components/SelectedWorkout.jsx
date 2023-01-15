import { useEffect, useState, useRef } from "react";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/SelectedWorkout.module.css";
import { FaWeightHanging } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";
import { AiOutlineFieldTime, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const SelectedWorkout = (props) => {
  const [selectedWorkout, setSelectedWorkout] = useState([]);
  const [user] = useAuthState(auth);

  const getWorkout = async () => {
    if (props.workout) {
      const selectedWorkoutRef = doc(db, "Exercises", props.workout);
      const selectedWorkoutSnap = await getDoc(selectedWorkoutRef);

      setSelectedWorkout(selectedWorkoutSnap.data());
    }
  };

  useEffect(() => {
    getWorkout();
    if (selectedWorkout) console.log(selectedWorkout);
  }, [props.workout]);

  const [exercises, setExercises] = useState([
    {
      sets: "",
      reps: "",
      weight: "",
      time: "",
    },
  ]);

  const addExercise = () => {
    setExercises([...exercises, { sets: "", reps: "", weight: "", time: "" }]);
  };

  const handleChange = (e, index) => {
    const newExercises = [...exercises];
    newExercises[index][e.target.name] = e.target.value;
    setExercises(newExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(exercises);

    const allWorkoutRef = collection(db, "AllWorkouts");
    await addDoc(allWorkoutRef, {
      userName: user.displayName,
      userPhoto: user.photoURL,
      userEmail: user.email,
      timeStamp: serverTimestamp(),
      workoutName: selectedWorkout.name,
      exercises: exercises,
    });

    toast.success("Workout Submitted Successfully 💪", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>{selectedWorkout.name}</h2>

      {exercises.map((exercise, index) => (
        <div key={index} className={styles.exerciseContainer}>
          <hr />
          <div className={styles.exerciseNameContainer}>
            <label htmlFor="exerciseName">Exercise Name:</label>
            <select
              name="exerciseName"
              id="exerciseName"
              onChange={(e) => handleChange(e, index)}
            >
              <option value="default">Select a Exercise</option>

              {/* Selection for selected exercises */}
              {selectedWorkout.exerciseList &&
                selectedWorkout.exerciseList.map((exercise, index) => (
                  <option
                    key={index + exercise.exerciseName}
                    value={exercise.exerciseName}
                  >
                    {exercise.exerciseName}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.statsContainer}>
            <label htmlFor={`sets-${index}`}>Set Number</label>
            <input
              type="number"
              id={`sets-${index}`}
              name="sets"
              value={exercise.sets}
              onChange={(e) => handleChange(e, index)}
            />

            <label htmlFor={`time-${index}`}>Time</label>
            <input
              type="time"
              id={`time-${index}`}
              name="time"
              value={exercise.time}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div className={styles.statsContainer}>
            <label htmlFor={`weight-${index}`}>Weight</label>
            <input
              type="number"
              id={`weight-${index}`}
              name="weight"
              value={exercise.weight}
              onChange={(e) => handleChange(e, index)}
            />
            <label htmlFor={`reps-${index}`}>Reps</label>
            <input
              type="number"
              id={`reps-${index}`}
              name="reps"
              value={exercise.reps}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addExercise}
        className={styles.addExerciseButton}
      >
        Add Exercise
      </button>
      <button type="submit" className={styles.submitButton}>
        Submit Workout
      </button>
    </form>
  );
};

export default SelectedWorkout;
