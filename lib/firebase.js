// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn4eVsoVZ7x7h9SPu70vda3aSwRgbSS9E",
  authDomain: "bdtoon-ca7ae.firebaseapp.com",
  projectId: "bdtoon-ca7ae",
  storageBucket: "bdtoon-ca7ae.firebasestorage.app",
  messagingSenderId: "1023873095242",
  appId: "1:1023873095242:web:68c0e39f878e479fc278b3",
  measurementId: "G-Q2QT9X6Z5R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
