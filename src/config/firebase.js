// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
 apiKey: "AIzaSyAGE9L418meKmFWd0NE41tpwavTZPDVwmY",
  authDomain: "trackcoder-b83d2.firebaseapp.com",
  projectId: "trackcoder-b83d2",
  storageBucket: "trackcoder-b83d2.firebasestorage.app",
  messagingSenderId: "38840405860",
  appId: "1:38840405860:web:bbc7348f2a71dc10f7b471"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export default app;