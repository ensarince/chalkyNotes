// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCa7WiAp3bq8vXQKXRiLIfgCbI5LACyFl4",
    authDomain: "chalkynotes.firebaseapp.com",
    projectId: "chalkynotes",
    storageBucket: "chalkynotes.appspot.com",
    messagingSenderId: "740962427455",
    appId: "1:740962427455:web:3df9bf242a869b8787ce8a",
    measurementId: "G-QTFPGCMSNM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
