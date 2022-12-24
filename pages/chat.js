import styles from "../styles/Chat.module.css";
import { db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AiFillCamera } from "react-icons/ai";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import ChatMessage from "../components/ChatMessage";

const Chat = () => {
  const [text, setText] = useState("");

  return (
    <div className={styles.container}>
      <hr></hr>
      <div className={styles.chatContainer}></div>
      <div className={styles.formContainer}>
        <form>
          {/* input and label for adding images to chat */}
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file" style={{ display: "none" }}>
            <AiFillCamera />
          </label>
          <input
            type="text"
            placeholder="Type a message"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button type="submit" className={styles.submitButton}>
            <BsFillArrowUpCircleFill />
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;
