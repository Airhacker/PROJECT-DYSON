import styles from "../styles/ChatMessage.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const ChatMessage = ({ children, displayImage, displayName, text, userID }) => {
  const [user] = useAuthState(auth);

  const messageClass = userID === user.uid ? styles.sender : styles.reciever;

  return (
    <div className={`${styles.container} ${messageClass}`}>
      <div className={styles.imageContainer}>
        <img src={displayImage} referrerPolicy="no-referrer" />
      </div>
      <div className={styles.textContainer}>
        <h3>{displayName}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};
export default ChatMessage;
