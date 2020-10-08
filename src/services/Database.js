import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCfVHHk-StotV9omjcBy56ngtniVX4vdu4",
  authDomain: "untitled-punchy-game.firebaseapp.com",
  databaseURL: "https://untitled-punchy-game.firebaseio.com",
  projectId: "untitled-punchy-game",
  storageBucket: "untitled-punchy-game.appspot.com",
  messagingSenderId: "809487299129",
  appId: "1:809487299129:web:7192b59c7e9feac79d13e8",
  measurementId: "G-Y8Y9EDH8E5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
