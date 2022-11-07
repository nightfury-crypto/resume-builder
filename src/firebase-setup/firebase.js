// import firebase from "firebase"  

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLBtrJs8foP7OaTxQmvKHUSoh9DHFwf4g",
  authDomain: "resume-build-a2569.firebaseapp.com",
  projectId: "resume-build-a2569",
  storageBucket: "resume-build-a2569.appspot.com",
  messagingSenderId: "479106639658",
  appId: "1:479106639658:web:516550e5244a20b044e053"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);  
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default db;
