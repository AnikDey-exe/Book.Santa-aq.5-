import firebase from 'firebase';

require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyCEC5YHJXZr9opnYy8IRzRg92-zW6CujGA",
  authDomain: "book-santa-a176c.firebaseapp.com",
  databaseURL: "https://book-santa-a176c-default-rtdb.firebaseio.com",
  projectId: "book-santa-a176c",
  storageBucket: "book-santa-a176c.appspot.com",
  messagingSenderId: "726916992193",
  appId: "1:726916992193:web:76472f959c1726d5cd9840"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 export default firebase.firestore();