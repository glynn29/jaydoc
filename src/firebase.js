import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions"

const firebaseConfig = {
    apiKey: "AIzaSyCNIrXFlUc5gEACHuDyJyPPx8oMfa21uKM",
    authDomain: "jaydoc-cb1af.firebaseapp.com",
    databaseURL: "https://jaydoc-cb1af.firebaseio.com",
    projectId: "jaydoc-cb1af",
    storageBucket: "jaydoc-cb1af.appspot.com",
    messagingSenderId: "305560927412",
    appId: "1:305560927412:web:dfcc02a03089b227e3abe1",
    measurementId: "G-5ZVMJCNGDK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth();
export const functions = firebase.functions();
//export const db = firebase.database();
