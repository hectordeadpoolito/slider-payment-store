import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";  

const firebaseConfig = {
    apiKey: "AIzaSyAid7gHeF9ZpS1l6p5jGsyKDau3mIQJdeo",
    authDomain: "ecommerce-store-4d115.firebaseapp.com",
    projectId: "ecommerce-store-4d115",
    storageBucket: "ecommerce-store-4d115.appspot.com",
    messagingSenderId: "1006036021782",
    appId: "1:1006036021782:web:33d2dd167a1573ea4cbb37",
    measurementId: "G-S1M79K05X6"
  };

  initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  export {auth, db, storage};