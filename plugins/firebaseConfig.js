import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

if (!firebase.apps.length) {
const config = {
  apiKey: "AIzaSyDjYDy7UJyPSNKgcR3w7y3ePuJu3KDwrHQ",
  authDomain: "worktest-e7fde.firebaseapp.com",
  databaseURL: "https://worktest-e7fde.firebaseio.com",
  projectId: "worktest-e7fde",
  storageBucket: "worktest-e7fde.appspot.com",
  messagingSenderId: "889522988078",
  appId: "1:889522988078:web:1d5948b1ea0efcf1b7abbf"
  }
  firebase.initializeApp(config)
}

 export const db = firebase.firestore();
 export const storage = firebase.storage();

 export const storageRef = firebase.storage().ref();

 export const imagesRef = storageRef.child('images/');