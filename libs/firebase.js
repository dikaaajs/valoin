// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgNeUmTZJzP1h2PQ53U1FLzgcIyDdn1OQ",
  authDomain: "valoin.firebaseapp.com",
  projectId: "valoin",
  storageBucket: "valoin.appspot.com",
  messagingSenderId: "458244864610",
  appId: "1:458244864610:web:ce19d1552524ee210bef3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
