// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "toonscard-2c794.firebaseapp.com",
  projectId: "toonscard-2c794",
  storageBucket: "toonscard-2c794.appspot.com",
  messagingSenderId: "80297137745",
  appId: "1:80297137745:web:4bbf68c32cb4e391878a70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);