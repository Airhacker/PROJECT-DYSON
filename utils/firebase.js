// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3bujV-ogKWRQOLS-y1ck6e_X2iKaMFAA",
  authDomain: "gigachad-workout-app.firebaseapp.com",
  projectId: "gigachad-workout-app",
  storageBucket: "gigachad-workout-app.appspot.com",
  messagingSenderId: "222197614398",
  appId: "1:222197614398:web:d91efc963ce9cc5b690e6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
