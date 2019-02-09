// Initialize Firebase
var db;
var auth;
var masterTID = "t-ECRMT";
function initializeFirebase() {
    var config = {
        apiKey: "AIzaSyAP6CteQ8w8WiC71Z071mrJ58xhO16WHxM",
        authDomain: "spartahacksv-gcp.firebaseapp.com",
        databaseURL: "https://spartahacksv-gcp.firebaseio.com",
        projectId: "spartahacksv-gcp",
        storageBucket: "spartahacksv-gcp.appspot.com",
        messagingSenderId: "612257089466"
    };
    firebase.initializeApp(config);
    auth = firebase.auth();
    db = firebase.firestore();
}

initializeFirebase();