import { useState } from "react";
import styles from "../styles/SelectedWorkout.module.css";
import { FaWeightHanging } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";

const SelectedWorkout = (props) => {
  return (
    <div className={styles.container}>
      <h2>{props.workout.name}</h2>

      <form action="" className={styles.formContainer}>
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
                    <input type="number" name="weight" id="weight" />
                    <input type="number" name="reps" id="reps" />
                    <input type={"time"} name="time" id="time" />
                  </div>
                ))}
              </div>
            );
          })}
      </form>
    </div>
  );
};

export default SelectedWorkout;
