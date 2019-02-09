var user;
function loadCurrentUser(authCurrentUser, callback) {
    if (authCurrentUser == null) {
        user = null;
        //console.log("No user logged in");
        for (var i = 0; callback != null && i < callback.length; i++) {
            callback[i]();
        }
    } else {
        userID = authCurrentUser.uid;
        var userPromise = getUserJSON(userID);
        userPromise.then(function(userData) {
            if (userData[0] != null) {
                user = userData[0];
                //console.log("user: " + user);
                for (var i = 0; callback != null && i < callback.length; i++) {
                    callback[i]()
                }
            } else {
                //console.log("Adding new user");
                var userInfo = {
                    "id": userID,
                    "name": authCurrentUser.displayName,
                    "account-email": authCurrentUser.email,
                    "display-email": authCurrentUser.email,
                }
                var promise = createUser(userID, userInfo);
                promise.then(function() {
                    loadCurrentUser(authCurrentUser);
                    //Popup
                })
            }
        });
    }
}

// Checks if the user is logged in or not
// Displays the login link if they are not
// Displays the profile link if they are
function loginoutnav() {
    if (user) {
        // User is signed in.
        console.log("User is logged in");
        document.getElementById("login-nav").style.display = "none";
        document.getElementById("profile-nav").style.display = "block";
        document.getElementById("logout-nav").style.display = "block";
    } else {
        console.log("User is not logged in");
        document.getElementById("login-nav").style.display = "block";
        document.getElementById("profile-nav").style.display = "none";
        document.getElementById("logout-nav").style.display = "none";
    }
}

// Logs the user out
function logout() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        // addGoodMessage("Logged Out Successfully");
        window.location.href = '../index.html#logout'
    }, function(error) {
        console.error('Sign Out Error', error);
        
    });
}