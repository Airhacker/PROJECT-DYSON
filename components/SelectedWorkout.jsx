import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const SelectedWorkout = (props) => {
  const [workout, setWorkout] = useState([]);

  const getWorkouts = async () => {
    const workoutRef = collection(db, "Exercises");
    const q = query(workoutRef, where("id", "==", props.workout));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        setWorkout(doc.data());
      });
    });

    return unsubscribe;
  };

  useEffect(() => {
    console.log("the props are", props.workout);
    getWorkouts();
  }, [props.workout]);

  return (
    <div>
      <h1>{workout.name}</h1>
      <p>{workout.id}</p>
      {workout.exerciseList &&
        workout.exerciseList.map((exercise) => <p>{exercise}</p>)}
    </div>
  );
};

export default SelectedWorkout;
