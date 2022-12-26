import { db } from "../utils/firebase";
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
import { toast } from "react-toastify";

const Quote = () => {
  const [text, setText] = useState("");
  const [quote, setQuote] = useState("");

  const collectionRef = collection(db, "Quotes");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addTextToFirebase = () => {
    if (text.length > 0) {
      // adds text from text area in firebase collection "Quotes" whenever clicks off of the text area
      addDoc(collectionRef, {
        text,
        timestamp: serverTimestamp(),
      });

      // toast notification for when quote is updated
      toast.success("Quote of the day updated! 😁", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    } else {
      toast.error("Please type something to update the quote! 😭", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    }
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
