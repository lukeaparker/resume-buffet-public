// Initialize Firebase
var db;
var auth;
var masterTID = "t-ECRMT";
function initializeFirebase() {
    var config = {
        apiKey: "AIzaSyATh0-Y57g345S5v1jwAHbboFp99E3EW_4",
        authDomain: "calvinhacks19-gcp.firebaseapp.com",
        databaseURL: "https://calvinhacks19-gcp.firebaseio.com",
        projectId: "calvinhacks19-gcp",
        storageBucket: "calvinhacks19-gcp.appspot.com",
        messagingSenderId: "915538048011"
    };
    firebase.initializeApp(config);
    auth = firebase.auth();
    db = firebase.firestore();
}

initializeFirebase();