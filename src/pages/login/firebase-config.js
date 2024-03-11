import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqKVk7k0usnHMCLGLy9aCzTTBNmqbzkoA",
  authDomain: "softwareengineeringproje-cd5c9.firebaseapp.com",
  projectId: "softwareengineeringproje-cd5c9",
  storageBucket: "softwareengineeringproje-cd5c9.appspot.com",
  messagingSenderId: "645288509746",
  appId: "1:645288509746:web:595a40d5a9f50e5b54d72b"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);