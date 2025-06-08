// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-vid-gen-2d498.firebaseapp.com",
  projectId: "ai-vid-gen-2d498",
  storageBucket: "ai-vid-gen-2d498.firebasestorage.app",
  messagingSenderId: "463477325138",
  appId: "1:463477325138:web:26365899f427e49d71ce8b",
  measurementId: "G-T5R5HZ3SYQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
