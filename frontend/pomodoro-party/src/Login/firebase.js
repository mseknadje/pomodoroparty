import { initializeApp} from 'firebase/app';
import {getDatabase, ref, set} from "firebase/database"
import {useState} from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt2DsPS8W08PghNlU2ZBBYGu3-FOOWK4o",
  authDomain: "pomodoro-party-8e414.firebaseapp.com",
  projectId: "pomodoro-party-8e414",
  storageBucket: "pomodoro-party-8e414.appspot.com",
  messagingSenderId: "453359878600",
  appId: "1:453359878600:web:f9a9eb37226975477f40fd",
  measurementId: "G-QSSKPMYF1S",
  // Edits for Realtime database
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://pomodoro-party-8e414-default-rtdb.firebaseio.com/",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
let user;

// Setting up realtime database
const database = getDatabase();
const reference = ref(database, "timer");

// function that updates timer in realtime database
export function updateTimer(username, startTime, sessionLength) {
  set(reference, {
    user: username,
    start_time: startTime,
    session_length: sessionLength
});
}
updateTimer("sabrina", "5", "100");


const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};


export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  user
};
