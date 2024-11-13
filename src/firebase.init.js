// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApNGaHwOkXwPS_G3AVTvu4CHuvEi58I8o",
  authDomain: "email-password-auth-42a06.firebaseapp.com",
  projectId: "email-password-auth-42a06",
  storageBucket: "email-password-auth-42a06.firebasestorage.app",
  messagingSenderId: "119657896079",
  appId: "1:119657896079:web:20edc2b5e5c925a70ab8fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);