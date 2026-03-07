/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

// Initialize Firebase only if API key is present
let app;
let auth: any = null;
let db: any = null;
let storage: any = null;

if (apiKey && apiKey !== 'undefined' && apiKey !== '') {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (err) {
    console.error("Firebase initialization failed:", err);
  }
} else {
  console.warn("Firebase API Key is missing or invalid. Admin features will not work until VITE_FIREBASE_API_KEY is set.");
}

export { auth, db, storage };
export default app;
