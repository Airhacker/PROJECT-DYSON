import { auth, googleAuthProvider } from "../lib/firebase";

const SignIn = () => {

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const signOutButton = () => {

  }

  return <div>
    <button onClick={signInWithGoogle}>Sign In with Google</button>
  </div>
};
export default SignIn;