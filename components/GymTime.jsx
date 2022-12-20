import styles from "../styles/GymTime.module.css";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
} from "@firebase/firestore";

const GymTime = () => {
  const [time, setTime] = useState("00:00");
  const [previousTime, setPreviousTime] = useState("00:00");

  const collectionRef = collection(db, "GymTime");

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const addTimeToFirebase = () => {
    // adds time from input in firebase collection "GymTime" whenever clicks off of the input
    addDoc(collectionRef, {
      time,
      timestamp: serverTimestamp(),
    });
  };

  const getMostRecentTime = async () => {
    const q = query(collectionRef, orderBy("timestamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPreviousTime(doc.data().time);
      console.log(previousTime);
    });
    setTime(previousTime);
  };

  useEffect(() => {
    getMostRecentTime();
  }, [previousTime]);

  return (
    <div className={styles.container}>
      <span>GYM TIME</span>
      <input
        type="time"
        onChange={handleChange}
        value={time}
        onBlur={() => addTimeToFirebase(time)}
        placeholder={previousTime}
      />
    </div>
  );
};
export default GymTime;
