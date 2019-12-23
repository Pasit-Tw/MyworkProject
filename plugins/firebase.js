import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyCicENDsV5JSU9WUjXjuCokCeyWN0WR9WU",
    authDomain: "cs313projecttup.firebaseapp.com",
    databaseURL: "https://cs313projecttup.firebaseio.com",
    projectId: "cs313projecttup",
    storageBucket: "cs313projecttup.appspot.com",
    messagingSenderId: "244772995551",
    appId: "1:244772995551:web:986d982ff241881b66846a"

  }
  firebase.initializeApp(config)
}

export const FirebaseStore = firebase.firestore() 

