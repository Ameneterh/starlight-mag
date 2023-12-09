// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "starlight-mern.firebaseapp.com",
  projectId: "starlight-mern",
  storageBucket: "starlight-mern.appspot.com",
  messagingSenderId: "114705401139",
  appId: "1:114705401139:web:d5915e80f6ccfe88acaa46",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
