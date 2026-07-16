/* ======================================================
   PTIS DIGITAL FORM
   Firebase Configuration
====================================================== */

const firebaseConfig = {

    apiKey: "AIzaSyC4yHaI699oUnvrRGUDgZSoea1IQtG7ZQ4",

    authDomain: "ptis-digital-form.firebaseapp.com",

    projectId: "ptis-digital-form",

    storageBucket: "ptis-digital-form.firebasestorage.app",

    messagingSenderId: "611840042605",

    appId: "1:611840042605:web:6d887b7d57f61f791a8164"

};

/* Initialize Firebase */

firebase.initializeApp(firebaseConfig);

/* Firebase Services */

const auth = firebase.auth();

const db = firebase.firestore();

const storage = firebase.storage();

/* Test Connection */

console.log("====================================");
console.log(" PTIS DIGITAL FORM");
console.log(" Firebase Connected Successfully");
console.log("====================================");

console.log(firebase.app().options);