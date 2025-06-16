// utils/firebase.js

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGVlAEtPENy-tnv1KUpO1kRVxo5QplgMk",
  authDomain: "restaurant-menu-auth-f6673.firebaseapp.com",
  projectId: "restaurant-menu-auth-f6673",
  storageBucket: "restaurant-menu-auth-f6673.firebasestorage.app",
  messagingSenderId: "271586688192",
  appId: "1:271586688192:web:81bc4ea85962bc1a604125",
  measurementId: "G-95D4S7SL6V"
};

// Avoid re-initializing in dev (for hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Auth instance (for login/signup)
export const auth = getAuth(app);
