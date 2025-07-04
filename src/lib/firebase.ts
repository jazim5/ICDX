import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBK7njURm4slibrlQFjPoQZmxUPAYhsljw",
  authDomain: "icdx-71147.firebaseapp.com",
  projectId: "icdx-71147",
  storageBucket: "icdx-71147.firebasestorage.app",
  messagingSenderId: "676375930908",
  appId: "1:676375930908:web:aa9252a2f3f7fd085657d9",
  measurementId: "G-593GQ4C5SK"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };