import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import styles from "../../styles/Login.module.css";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { serverTimestamp, setDoc, doc } from "@firebase/firestore";

const Login = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  //Sign in with Google
  const provider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      console.log("Signed in with Google successfully!", user);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log("error signing in with Google");
      console.log(error);
    }
  };

  const updateUser = async () => {
    await setDoc(
      doc(db, "users", user.uid),
      {
        displayName: user.displayName,
        displayPicture: user.photoURL,
        userId: user.uid,
        userEmail: user.email,
        loginTime: serverTimestamp(),
      },
      { merge: true }
    );
  };

  useEffect(() => {
    try {
      if (user) {
        console.log(user);
        updateUser();
        route.push("/");
      }
    } catch (error) {
      console.log("error signing in with Google");
      console.log(error);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <h3>Welcome,</h3>
      <h4>Sign in using one of the following providers</h4>
      <button onClick={GoogleLogin}>
        <FcGoogle />
        Sign in with Google
      </button>
    </div>
  );
};
export default Login;
