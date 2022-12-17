import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Login = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  //Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (user) {
        route.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  return (
    <div>
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