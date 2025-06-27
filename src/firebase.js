import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBs0Aae1soKGLY7TXYv8aod_z1WNgwnSWA",
  authDomain: "farmer-government-scheme-33e1c.firebaseapp.com",
  projectId: "farmer-government-scheme-33e1c",
  storageBucket: "farmer-government-scheme-33e1c.firebasestorage.app",
  messagingSenderId: "306101927063",
  appId: "1:306101927063:web:2ca017bd3eec8b5289bdd2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)