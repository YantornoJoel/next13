// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASe_API,
  authDomain: "next13-project-jy.firebaseapp.com",
  projectId: "next13-project-jy",
  storageBucket: "next13-project-jy.appspot.com",
  messagingSenderId: "1646864417",
  appId: "1:1646864417:web:a461e680e7cbb984041b60",
  measurementId: "G-4HP7BYFXKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app