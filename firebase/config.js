import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2LtCcxpgBt5xcZwjYq0c8IPCslZAyqz8",
  authDomain: "react-native-project-728b9.firebaseapp.com",
  projectId: "react-native-project-728b9",
  storageBucket: "react-native-project-728b9.appspot.com",
  messagingSenderId: "615068901718",
  appId: "1:615068901718:web:14326012769eff354d76f7",
  measurementId: "G-VKJCCF9T57",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
