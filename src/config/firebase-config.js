// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, doc,where, getDocs,query,collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB02vuRsOkaap0pZuFZLM4zkriJtYjwM3o",
  authDomain: "learnit-40f0d.firebaseapp.com",
  projectId: "learnit-40f0d",
  storageBucket: "learnit-40f0d.firebasestorage.app",
  messagingSenderId: "12713901328",
  appId: "1:12713901328:web:3dda1ec5dcb9069b06b995",
  measurementId: "G-Q2VLG8DS3C"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, setDoc, doc, where,getDocs,query,collection };