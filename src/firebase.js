import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/analytics"

//mine
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

//jaydoc
// const firebaseConfig = {
//     apiKey: "AIzaSyCjIzISiutPfbiQ6qfDISc0BpXJProKZuU",
//     authDomain: "jaydoc-4412a.firebaseapp.com",
//     databaseURL: "https://jaydoc-4412a.firebaseio.com",
//     projectId: "jaydoc-4412a",
//     storageBucket: "jaydoc-4412a.appspot.com",
//     messagingSenderId: "485284873564",
//     appId: "1:485284873564:web:5bc115260f05e60ff96d99",
//     measurementId: "G-XHZPTM07ML"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth();
export const functions = firebase.functions();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics();

