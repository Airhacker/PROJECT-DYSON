import { auth } from "../utils/firebase";

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} referrerPolicy="no-referrer" />
      <p>hello</p>
    </div>
  );
};

export default ChatMessage;
