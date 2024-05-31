// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtSDMNnQ-3wrnQf2wi4RVwhHEodkVFMp0",
  authDomain: "householdts-e2c10.firebaseapp.com",
  projectId: "householdts-e2c10",
  storageBucket: "householdts-e2c10.appspot.com",
  messagingSenderId: "524788172723",
  appId: "1:524788172723:web:e7ddcc80af3167d86dedc6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
