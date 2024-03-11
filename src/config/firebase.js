import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCsaTqZIAghmpYP-dYwkntRFNSVqbj4RE8",
    authDomain: "brian-trailer.firebaseapp.com",
    projectId: "brian-trailer",
    storageBucket: "brian-trailer.appspot.com",
    messagingSenderId: "791800652785",
    appId: "1:791800652785:web:b904c010fe8249e31a5a50",
    measurementId: "G-52GKHQDX7L"
  };


firebase.initializeApp(firebaseConfig);

export default firebase;