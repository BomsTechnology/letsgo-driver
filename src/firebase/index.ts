import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCn0PH34kAtv0pOdrtDRNzt1VZ6A_w1BQs",
  authDomain: "yowyob-letsgo.firebaseapp.com",
  projectId: "yowyob-letsgo",
  storageBucket: "yowyob-letsgo.appspot.com",
  messagingSenderId: "897477021790",
  appId: "1:897477021790:web:8305b73eb2dee9b8abe4cf"
};

const initializeFirebase = initializeApp(firebaseConfig);

const firebaseStorage = getStorage(initializeFirebase);

export { initializeFirebase, firebaseStorage };


