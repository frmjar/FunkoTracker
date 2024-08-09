// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYisbbOMKm8BFfDUfWsmZjgMjgYLkT4N4",
  authDomain: "funkotraker.firebaseapp.com",
  projectId: "funkotraker",
  storageBucket: "funkotraker.appspot.com",
  messagingSenderId: "183793983060",
  appId: "1:183793983060:web:1a85be4f449926dfefd7c1",
  measurementId: "G-SHH9HF9BMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);