import { db } from "../utils/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const SelectedWorkout = (props) => {
  const [workouts, setWorkouts] = useState([]);

  const getWorkout = async () => {
    const workoutRef = collection(db, "Exercises");
    const workoutSnapshot = await getDocs(workoutRef);
    const workoutList = workoutSnapshot.docs.map((doc) => doc.data());
    setWorkouts(workoutList);
  };

  useEffect(() => {
    getWorkout();
    console.log(workouts);
  }, [props.workout]);

  const handleSubmit = (e) => {};

  return (
    <div>
      <form onSubmit={handleSubmit}></form>
    </div>
  );
};

export default SelectedWorkout;
