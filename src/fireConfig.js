import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtc8ux_4mXZIcepw5nj34da5uvbbPdnZA",
  authDomain: "firecommerce-5314f.firebaseapp.com",
  projectId: "firecommerce-5314f",
  storageBucket: "firecommerce-5314f.appspot.com",
  messagingSenderId: "345797704518",
  appId: "1:345797704518:web:3ab73866071dc3247e4347",
  measurementId: "G-WKFX7SLVFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;