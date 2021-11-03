import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDFgoQEoj_3QRWogxqSg1AZjiMNo7dP6Zc",
  authDomain: "budget-tracker-25d53.firebaseapp.com",
  projectId: "budget-tracker-25d53",
  storageBucket: "budget-tracker-25d53.appspot.com",
  messagingSenderId: "916757766114",
  appId: "1:916757766114:web:068d03205e9a497ef8e3bb",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
