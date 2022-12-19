import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import styles from "../styles/Quote.module.css";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import {
  addDoc,
  collection,
  orderBy,
  serverTimestamp,
  limit,
  query,
  getDocs,
} from "firebase/firestore";

const Quote = () => {
  const [text, setText] = useState("");
  const [quote, setQuote] = useState("");

  const collectionRef = collection(db, "Quotes");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addTextToFirebase = () => {
    // adds text from text area in firebase collection "Quotes" whenever clicks off of the text area
    // const collectionRef = collection(db, "Quotes");
    addDoc(collectionRef, {
      text,
      timestamp: serverTimestamp(),
    });
  };

  const getMostRecentQuote = async () => {
    const q = query(collectionRef, orderBy("timestamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setQuote(doc.data().text);
    });
  };

  useEffect(() => {
    getMostRecentQuote();
  }, []);

  return (
    <section className={styles.container}>
      <p>Quote of the day</p>
      <form className={styles.quoteContainer}>
        <ImQuotesLeft className={styles.quoteLeft} />
        <TextareaAutosize
          minRows={1}
          maxRows={3}
          placeholder={quote}
          value={text}
          onChange={handleChange}
          onBlur={() => addTextToFirebase(text)}
        />
        <ImQuotesRight className={styles.quoteRight} />
      </form>
    </section>
  );
};
export default Quote;