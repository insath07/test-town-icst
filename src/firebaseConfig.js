// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByCWT3GnOs0oVfuP6-jqGZNAovQ7Feijs",
  authDomain: "burgerapp-75758.firebaseapp.com",
  projectId: "burgerapp-75758",
  storageBucket: "burgerapp-75758.firebasestorage.app",
  messagingSenderId: "893839842474",
  appId: "1:893839842474:web:7dbcaa6e1bd0768a19c4d3",
  measurementId: "G-6HNP4RPYWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);