import { collection, addDoc } from "@firebase/firestore";
import { useState } from "react";
import { db } from "../../utils/firebase";

const StrengthPush = () => {
  const [duration, setDuration] = useState(0);
  const [barbellBench, setBarbellBench] = useState([
    {
      name: "Barbell Bench Press",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("THE EXERCISES ARE: ", exercises);

    const workoutRef = collection(db, "AllWorkouts");
    await addDoc(workoutRef, {
      exercises: exercises,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Barbell Bench Press</h2>

        <div>
          <label htmlFor="set">Set 1</label>
        </div>
        <button type="submit">Submit Workout</button>
      </form>
    </div>
  );
};
export default StrengthPush;
