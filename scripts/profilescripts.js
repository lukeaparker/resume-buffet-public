//Profile page Firebase functions
function getInfo() {
    document.getElementById("userName").innerHTML = "loading...";
    document.getElementById("userAccountEmail").innerHTML = "loading...";
    document.getElementById("userDisplayEmail").innerHTML = "loading...";
    document.getElementById("userPassword").innerHTML = "loading...";
    document.getElementById("userPhone").innerHTML = "loading...";
    document.getElementById("userAddress").innerHTML = "loading...";
    if (user != null) {
        console.log("Display user profile information");
        document.getElementById("userName").innerHTML = user.name;
        document.getElementById("newName").value = user.name;
        document.getElementById("userAccountEmail").innerHTML = user.account_email;
        document.getElementById("newAccountEmail").value = user.account_email;
        document.getElementById("userDisplayEmail").innerHTML = user.display_email;
        document.getElementById("newDisplayEmail").value = user.display_email;
        document.getElementById("userPassword").innerHTML = "********";
        document.getElementById("userImage").innerHTML = user.imageName;
        document.getElementById("userPhone").innerHTML = user.phone;
        document.getElementById("newPhone").value = user.phone;
        document.getElementById("userAddress").innerHTML = user.address;
        document.getElementById("newAddress").value = user.address;
        //Images
        document.getElementById("editNameIcon").href = "#";
        document.getElementById("editNameIcon").setAttribute("onclick", "toggleEdit('Name')");
        document.getElementById("editAccountEmailIcon").href = "#";
        document.getElementById("editAccountEmailIcon").setAttribute("onclick", "toggleEdit('AccountEmail')");
        document.getElementById("editDisplayEmailIcon").href = "#";
        document.getElementById("editDisplayEmailIcon").setAttribute("onclick", "toggleEdit('DisplayEmail')");
        document.getElementById("editPasswordIcon").href = "#";
        document.getElementById("editPasswordIcon").setAttribute("onclick", "toggleEdit('Password')");
        document.getElementById("editImageIcon").href = "#";
        document.getElementById("editImageIcon").setAttribute("onclick", "toggleEdit('Image')");
        document.getElementById("editPhoneIcon").href = "#";
        document.getElementById("editPhoneIcon").setAttribute("onclick", "toggleEdit('Phone')");
        document.getElementById("editAddressIcon").href = "#";
        document.getElementById("editAddressIcon").setAttribute("onclick", "toggleEdit('Address')");
    } else {
        // Error handling
        console.log("No user logged in");
        document.getElementById("userName").innerHTML = "";
        document.getElementById("newName").value = "";
        document.getElementById("userAccountEmail").innerHTML = "";
        document.getElementById("newAccountEmail").value = "";
        document.getElementById("userDisplayEmail").innerHTML = "";
        document.getElementById("newDisplayEmail").value = "";
        document.getElementById("userPassword").innerHTML = "";
        document.getElementById("userImage").innerHTML = "";
        document.getElementById("userPhone").innerHTML = "";
        document.getElementById("newPhone").value = "";
        document.getElementById("userAddress").innerHTML = "";
        document.getElementById("newAddress").value = "";
        //Images
        document.getElementById("editNameIcon").removeAttribute("href");
        document.getElementById("editAccountEmailIcon").removeAttribute("href");
        document.getElementById("editDisplayEmailIcon").removeAttribute("href");
        document.getElementById("editPasswordIcon").removeAttribute("href");
        document.getElementById("editRoleIcon").removeAttribute("href");
        document.getElementById("editImageIcon").removeAttribute("href");
        document.getElementById("editPhoneIcon").removeAttribute("href");
        document.getElementById("editAddressIcon").removeAttribute("href");
        
        document.getElementById("editNameIcon").removeAttribute("onclick");
        document.getElementById("editAccountEmailIcon").removeAttribute("onclick");
        document.getElementById("editDisplayEmailIcon").removeAttribute("onclick");
        document.getElementById("editPasswordIcon").removeAttribute("onclick");
        document.getElementById("editImageIcon").removeAttribute("onclick");
        document.getElementById("editPhoneIcon").removeAttribute("onclick");
        document.getElementById("editAddressIcon").removeAttribute("onclick");
        }
}

function updateName() {
    var FBUser = auth.currentUser;
    var newName = document.getElementById("newName").value;
    
    FBUser.updateProfile({
        displayName: newName,
    }).then(function() {
        // Update successful.
        var DBUser = db.collection("users").doc(user.id)
        DBUser.get().then(function(doc) {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                console.log("Updating name for " + user.id);
                userData = doc.data();
                userData.name = newName;
                DBUser.set(userData)
                .then(function() {
                    console.log("Document successfully written!");
                    loadCurrentUser(auth.currentUser, [getInfo]);
                    addGoodMessage("Name Updated Successfully");
                    toggleEdit("Name");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                    addBadMessage(error);
                });
                return 0;
            } else {
                console.log("Unable to find user " + user.id);
                addBadMessage("Unable to find user"+ user.id);
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            addBadMessage(error);
        });
    }).catch(function(error) {
        // An error happened.
        addBadMessage(error);
    });
}

function updateAccountEmail() {
    var FBUser = auth.currentUser;
    var newEmail = document.getElementById("newAccountEmail").value;
    
    FBUser.updateProfile({
        email: newEmail,
    }).then(function() {
        // Update successful.
        var DBUser = db.collection("users").doc(user.id)
        DBUser.get().then(function(doc) {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                console.log("Updating account email for " + user.id);
                userData = doc.data();
                userData.account_email = newEmail;
                DBUser.set(userData)
                .then(function() {
                    console.log("Document successfully written!");
                    loadCurrentUser(auth.currentUser, [getInfo]);
                    addGoodMessage("Account Email Updated Successfully");
                    toggleEdit("AccountEmail");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                    addBadMessage(error);
                });
                return 0;
            } else {
                console.log("Unable to find user " + user.id);
                addBadMessage("Unable to find user"+ user.id);
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            addBadMessage(error);
        });
    }).catch(function(error) {
        // An error happened.
        addBadMessage(error);
    });
}

function updateResumeElement(userElement, htmlElement) {
    var newElement = document.getElementById("new" + htmlElement).value;

    var DBUser = db.collection("users").doc(user.id)
    DBUser.get().then(function(doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            console.log("Updating " + htmlElement +" for " + user.id);
            userData = doc.data();
            userData[userElement] = newElement;
            DBUser.set(userData)
            .then(function() {
                console.log("Document successfully written!");
                loadCurrentUser(auth.currentUser, [getInfo]);
                addGoodMessage("Resume Element Updated Successfully");
                toggleEdit(htmlElement);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                addBadMessage(error);
            });
            return 0;
        } else {
            console.log("Unable to find user " + user.id);
            addBadMessage("Unable to find user"+ user.id);
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        addBadMessage(error);
    });
}

function updatePassword() {
    var user = firebase.auth().currentUser;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword == confirmPassword) {
        user.updatePassword(newPassword).then(function() {
            // Update successful.
            addGoodMessage("Password Updated Successfully");
            getInfo();
            toggleEdit("Password");
        }).catch(function(error) {
            // An error happened.
            addBadMessage(error);
        });
    } else {
        // Mismatch Passwords
        addBadMessage("Warning: Passwords do not match. Please try again.");
    }
}

//Profile page display functions
function toggleEdit(element) {
    if (document.getElementById("edit" + element + "Form").style.display == "none") {
        document.getElementById("edit" + element + "Form").style.display = "";
        document.getElementById("edit" + element + "Icon").style.display = "none";
        document.getElementById("user" + element).style.display = "none";
    } else {
        document.getElementById("edit" + element + "Form").style.display = "none";
        document.getElementById("edit" + element + "Icon").style.display = "";
        document.getElementById("user" + element).style.display = ""; 
    }
}