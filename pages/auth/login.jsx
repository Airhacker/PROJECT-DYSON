import {FcGoogle} from "react-icons/fc"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router"

const Login = () => {
  const route = useRouter();

  //Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async() =>{
    try {
      const result = await signInWithPopup(auth, googleProvider)
      route.push("/");
    } catch (error) {
      console.log(error)
    }
  }

  return <div>
    <h3>Welcome,</h3>
    <h4>Sign in using one of the following providers</h4>
    <button onClick={GoogleLogin}><FcGoogle/>Sign in with Google</button>
  </div>;
};
export default Login;