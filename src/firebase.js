import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDs4p5Yg2XGRPexrrS5T3zVUTBB7mNIWM0",
  authDomain: "financesbank-e286b.firebaseapp.com",
  projectId: "financesbank-e286b",
  storageBucket: "financesbank-e286b.appspot.com",
  messagingSenderId: "105277534815",
  appId: "1:105277534815:web:cbec9718e0c41c6bf321ea",
  measurementId: "G-4PYBDCH9LJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}