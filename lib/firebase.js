import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA3bujV-ogKWRQOLS-y1ck6e_X2iKaMFAA",
  authDomain: "gigachad-workout-app.firebaseapp.com",
  projectId: "gigachad-workout-app",
  storageBucket: "gigachad-workout-app.appspot.com",
  messagingSenderId: "222197614398",
  appId: "1:222197614398:web:d91efc963ce9cc5b690e6f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();