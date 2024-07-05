// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO_wku_0gKNOWYBI4EpAKfb_qR-LH9WKI",
  authDomain: "movie-recommender-b3b6b.firebaseapp.com",
  projectId: "movie-recommender-b3b6b",
  storageBucket: "movie-recommender-b3b6b.appspot.com",
  messagingSenderId: "913342949376",
  appId: "1:913342949376:web:140edbcb436cd7ee7f50e5",
  measurementId: "G-495NM86JBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//okok
export const auth = getAuth();