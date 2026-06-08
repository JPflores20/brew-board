import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCtD4houtwdnE5TCZhioqHdGNdWxlo5ej8",
  authDomain: "brew-f4449.firebaseapp.com",
  projectId: "brew-f4449",
  storageBucket: "brew-f4449.firebasestorage.app",
  messagingSenderId: "704034679076",
  appId: "1:704034679076:web:c8000c1dcbf4bb154fabb1",
  measurementId: "G-QDJR04C6WJ"
};

export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
