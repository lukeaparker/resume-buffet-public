// Checks if the user is logged in or not
// Displays the login link if they are not
// Displays the profile link if they are
function loginoutnav() {
    if (user) {
        // User is signed in.
        console.log("User is logged in");
        document.getElementById("login-nav").style.display = "none";
        document.getElementById("account-nav").style.display = "block";
        document.getElementById("logout-nav").style.display = "block";
    } else {
        console.log("User is not logged in");
        document.getElementById("login-nav").style.display = "block";
        document.getElementById("account-nav").style.display = "none";
        document.getElementById("logout").style.display = "none";
    }
    document.getElementById("lphref").style.display = "block";
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