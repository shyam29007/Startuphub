// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD178njo0F72fitLp1Uybn4aQos9Z24gXU",
  authDomain: "team-builder-82e25.firebaseapp.com",
  projectId: "team-builder-82e25",
  storageBucket: "team-builder-82e25.firebasestorage.app",
  messagingSenderId: "545172649441",
  appId: "1:545172649441:web:28d85d634a72cb10178ea0",
  measurementId: "G-9TBB3SX3N8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);