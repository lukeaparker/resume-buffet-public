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

function getUserJSON(uID) {
    var post = db.collection("users").doc(uID);
    var one = post.get().then(function(doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            return doc.data();
        } else {
            return null;
        }
        
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    return Promise.all([one]);
}

function getResumeJSON(rID) {
    var post = db.collection("resumes").doc(rID);
    var one = post.get().then(function(doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            return doc.data();
        } else {
            return null;
        }
        
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    return Promise.all([one]);
}

function getItemJSON(iID) {
    var post = db.collection("items").doc(iID);
    var one = post.get().then(function(doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            return doc.data();
        } else {
            return null;
        }
        
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    return Promise.all([one]);
}

function createUser(uID, userInfo) {
    var newUser = db.collection("users").doc(uID);
    var one = newUser.get().then(function(doc) {
        if (doc.exists) {
            console.log(uID + " exists");
            return 1;
        } else {
            console.log(uID + " does not exist");
            newUser.set(userInfo)
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            return 0;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    return Promise.all([one]);
}
