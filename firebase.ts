import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzGzz6evMD606rLDWG7FzsjZ-5YOjFV7U",
  authDomain: "joonexa-c-final.firebaseapp.com",
  projectId: "joonexa-c-final",
  storageBucket: "joonexa-c-final.firebasestorage.app",
  messagingSenderId: "676741187314",
  appId: "1:676741187314:web:732472839cbdffc46cf26b",
  measurementId: "G-VWD4SMYRFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser environment
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
