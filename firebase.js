// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgbUo3nlBCzZPgi7qp5_JmJ_JXHPPDhvc",
  authDomain: "rn-insta-clone-3ac3d.firebaseapp.com",
  projectId: "rn-insta-clone-3ac3d",
  storageBucket: "rn-insta-clone-3ac3d.appspot.com",
  messagingSenderId: "311466626483",
  appId: "1:311466626483:web:356e93081c34e56c0f0fc6",
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebase.firestore();
export { firebase, db };
