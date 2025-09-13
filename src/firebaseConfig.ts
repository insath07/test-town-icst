// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";   // for authentication
import { getFirestore } from "firebase/firestore"; // if you use Firestore

// 👇 unga config paste pannunga
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

// Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
