import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABfoavsbHDE0pXymGB1U9bxW3Un23qraY",
    authDomain: "taskify-a53de.firebaseapp.com",
    projectId: "taskify-a53de",
    storageBucket: "taskify-a53de.appspot.com",
    messagingSenderId: "1040351033785",
    appId: "1:1040351033785:web:a428f5d0628d764ce15e68",
    measurementId: "G-RXD4EYJ7M7"
};  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);