import styles from "../styles/Chat.module.css";
import { db, auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import { AiFillCamera } from "react-icons/ai";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import ChatMessage from "../components/ChatMessage";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth);
  const messageRef = collection(db, "messages");
  const q = query(messageRef, orderBy("submitTime", "asc"), limitToLast(100));
  const messagesEndRef = useRef();

  const isNotEmpty = !text ? styles.dontSend : styles.okToSend;

  const getMessages = async () => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  useEffect(() => {
    getMessages();
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitMessage = (e) => {
    e.preventDefault();

    // stop function if message is empty
    if (!text) return;

    addDoc(messageRef, {
      text: text,
      submitTime: serverTimestamp(),
      displayName: user.displayName,
      displayImage: user.photoURL,
      userID: user.uid,
    });
    setText("");
  };

  return (
    <div className={styles.container}>
      <hr></hr>
      <div className={styles.chatContainer}>
        {messages.map((message) => (
          <ChatMessage {...message} key={message.id}></ChatMessage>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={submitMessage}>
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
          <button type="submit" className={isNotEmpty} onSubmit={submitMessage}>
            <BsFillArrowUpCircleFill />
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;
