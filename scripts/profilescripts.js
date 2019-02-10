//Profile page Firebase functions
function getInfo() {
    document.getElementById("userName").innerHTML = "loading...";
    document.getElementById("userAccountEmail").innerHTML = "loading...";
    document.getElementById("userPassword").innerHTML = "loading...";
    if (user != null) {
        console.log("Display user profile information");
        document.getElementById("userName").innerHTML = user.name;
        document.getElementById("newName").value = user.name;
        document.getElementById("userAccountEmail").innerHTML = user.account_email;
        document.getElementById("newAccountEmail").value = user.account_email;
        document.getElementById("userPassword").innerHTML = "********";
        document.getElementById("userImage").innerHTML = user.imageName;
        //Images
        document.getElementById("editNameIcon").href = "#";
        document.getElementById("editNameIcon").setAttribute("onclick", "toggleEdit('Name')");
        document.getElementById("editAccountEmailIcon").href = "#";
        document.getElementById("editAccountEmailIcon").setAttribute("onclick", "toggleEdit('AccountEmail')");
        document.getElementById("editPasswordIcon").href = "#";
        document.getElementById("editPasswordIcon").setAttribute("onclick", "toggleEdit('Password')");
        document.getElementById("editImageIcon").href = "#";
        document.getElementById("editImageIcon").setAttribute("onclick", "toggleEdit('Image')");
        
        listSingleLineItems("emails", "listEmails");
        listSingleLineItems("phones", "listPhones");
        listSingleLineItems("addresses", "listAddresses");
        listSingleLineItems("websites", "listWebsites");
        listSingleLineItemsTextbox("summaries", "listSummaries");
        listSingleLineItems("certs", "listCertifications");
    } else {
        // Error handling
        console.log("No user logged in");
        document.getElementById("userName").innerHTML = "";
        document.getElementById("newName").value = "";
        document.getElementById("userAccountEmail").innerHTML = "";
        document.getElementById("newAccountEmail").value = "";
        document.getElementById("userPassword").innerHTML = "";
        document.getElementById("userImage").innerHTML = "";
        //Images
        document.getElementById("editNameIcon").removeAttribute("href");
        document.getElementById("editAccountEmailIcon").removeAttribute("href");
        document.getElementById("editPasswordIcon").removeAttribute("href");
        document.getElementById("editImageIcon").removeAttribute("href");
        
        document.getElementById("editNameIcon").removeAttribute("onclick");
        document.getElementById("editAccountEmailIcon").removeAttribute("onclick");
        document.getElementById("editPasswordIcon").removeAttribute("onclick");
        document.getElementById("editImageIcon").removeAttribute("onclick");
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
                    //addGoodMessage("Name Updated Successfully");
                    toggleEdit("Name");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                    //addBadMessage(error);
                });
                return 0;
            } else {
                console.log("Unable to find user " + user.id);
                //addBadMessage("Unable to find user"+ user.id);
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            //addBadMessage(error);
        });
    }).catch(function(error) {
        // An error happened.
        //addBadMessage(error);
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
                    //addGoodMessage("Account Email Updated Successfully");
                    toggleEdit("AccountEmail");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                    //addBadMessage(error);
                });
                return 0;
            } else {
                console.log("Unable to find user " + user.id);
                //addBadMessage("Unable to find user"+ user.id);
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            //addBadMessage(error);
        });
    }).catch(function(error) {
        // An error happened.
        //addBadMessage(error);
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
                //addGoodMessage("Resume Element Updated Successfully");
                toggleEdit(htmlElement);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                //addBadMessage(error);
            });
            return 0;
        } else {
            console.log("Unable to find user " + user.id);
            //addBadMessage("Unable to find user"+ user.id);
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        //addBadMessage(error);
    });
}

function updatePassword() {
    var user = firebase.auth().currentUser;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword == confirmPassword) {
        user.updatePassword(newPassword).then(function() {
            // Update successful.
            //addGoodMessage("Password Updated Successfully");
            getInfo();
            toggleEdit("Password");
        }).catch(function(error) {
            // An error happened.
            //addBadMessage(error);
        });
    } else {
        // Mismatch Passwords
        //addBadMessage("Warning: Passwords do not match. Please try again.");
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

function listSingleLineItems(userType, htmlType) {
    document.getElementById(htmlType).innerHTML = "";
    for (var i = 0; i < user[userType].length; i++) {
        iID = user[userType][i];
        var websitePromise = getItemJSON(iID);
        websitePromise.then(function(item) {
            var value = item[0].value;
            var id = item[0].id
            var form = '<div class="profile-line contentBackground addPadding noScroll"><div class="floatLeft"><a id="edit' + id + 'Icon" href="#" onclick="toggleEdit(\'' + id + '\');"><i class="far fa-edit"></i></a><strong> </strong><span id="user' + id + '">' + value + '</span></div><br /><form id="edit' + id + 'Form" style="display: none;"><input type="text" name="new' + id + '" id="new' + id + '" value="' + value + '" style="width: calc(100vw - 400px);" class="surroundSpace fullWidth textStyle" /> <input type="button" onclick="updateSingleLineItem(\'' + id + '\');" value="Update" class="btn btn-outline-info surroundSpace" /><input type="button" onclick="deleteItem(\'websites\', \'' + id + '\');" value="Delete" class="btn btn-outline-info surroundSpace" /><input type="button" onclick="toggleEdit(\'' + id + '\');" value="Cancel" class="btn btn-outline-info surroundSpace" /></form></div>';
            document.getElementById(htmlType).innerHTML += form;
        });
    }
}

function listSingleLineItemsTextbox(userType, htmlType) {
    document.getElementById(htmlType).innerHTML = "";
    for (var i = 0; i < user[userType].length; i++) {
        iID = user[userType][i];
        var websitePromise = getItemJSON(iID);
        websitePromise.then(function(item) {
            var value = item[0].value;
            var id = item[0].id
            var form = '<div class="profile-line contentBackground addPadding noScroll"><div class="floatLeft"><a id="edit' + id + 'Icon" href="#" onclick="toggleEdit(\'' + id + '\');"><i class="far fa-edit"></i></a><strong> </strong><span id="user' + id + '">' + value + '</span></div><br /><form id="edit' + id + 'Form" style="display: none;"><textarea name="new' + id + '" id="new' + id + '" value="' + value + '" style="width: calc(100vw - 400px); height: 100px class="surroundSpace fullWidth textStyle">' + value + '</textarea> <input type="button" onclick="updateSingleLineItem(\'' + id + '\');" value="Update" class="btn btn-outline-info surroundSpace" /><input type="button" onclick="deleteItem(\'websites\', \'' + id + '\');" value="Delete" class="btn btn-outline-info surroundSpace" /><input type="button" onclick="toggleEdit(\'' + id + '\');" value="Cancel" class="btn btn-outline-info surroundSpace" /></form></div>';
            document.getElementById(htmlType).innerHTML += form;
        });
    }
}

function updateSingleLineItem(iID) {
    var newItem = document.getElementById("new" + iID).value;

    var DBUser = db.collection("items").doc(iID)
    DBUser.get().then(function(doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            console.log("Updating " + iID);
            itemData = doc.data();
            itemData["value"] = newItem;
            DBUser.set(itemData)
            .then(function() {
                console.log("Document successfully written!");
                loadCurrentUser(auth.currentUser, [getInfo]);
                //addGoodMessage("Item Updated Successfully");
                toggleEdit(iID);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                //addBadMessage(error);
            });
            return 0;
        } else {
            console.log("Unable to find user " + user.id);
            //addBadMessage("Unable to find user"+ user.id);
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        //addBadMessage(error);
    });
}

function deleteItem(userType, iID) {
    var DBUser = db.collection("users").doc(user.id)
    DBUser.get().then(function(doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            console.log("Deleting" +iID + " for " + user.id);
            userData = doc.data();
            userData[userType] = removeIDFromArray(userData[userType],iID);
            DBUser.set(userData)
            .then(function() {
                console.log("Document successfully written!");
                db.collection("items").doc(iID).delete().then(function() {
                    console.log("Document successfully deleted!");
                    loadCurrentUser(auth.currentUser, [getInfo]);
                    //addGoodMessage("Element Removed Successfully");
                    toggleEdit(iID);
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                //addBadMessage(error);
            });
            return 0;
        } else {
            console.log("Unable to find user " + user.id);
            //addBadMessage("Unable to find user"+ user.id);
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        //addBadMessage(error);
    });
}

function addSingleLineItem(userType, typeIDCode, htmlType) {
    iID = typeIDCode + "-" + generateID(10);
    var newItem = db.collection("items").doc(iID);
    console.log(iID + " reserved");
    var two;
    var one = newItem.get().then(function(doc) {
        if (doc.exists) {
            console.log(iID + " exists");
            console.log("Duplicate ID. Trying again...");
            addSingleLineItem(userType, typeIDCode, htmlType)
        } else {
            console.log(iID + " does not exist");
            newItem.set({
                "id": iID,
                "value": document.getElementById("new" + htmlType).value
            })
            .then(function() {
                console.log("Document successfully written!");
                var DBUser = db.collection("users").doc(user.id);
                two = DBUser.get().then(function(doc) {
                    if (doc.exists) {
                        // console.log("Document data:", doc.data());
                        userData = doc.data();
                        userData[userType].push(iID);
                        DBUser.set(userData)
                        .then(function() {
                            console.log("Document successfully written!");
                            loadCurrentUser(auth.currentUser, [getInfo]);
                            //addGoodMessage("Element Added Successfully");
                            document.getElementById("new" + htmlType).value = "";
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                        return 0;
                    } else {
                        console.log("Error: parent does not exist!");
                        return 1;
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            }).catch(function(error) {
                console.error("Error writing document: ", error);
            });
            return 0;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    return Promise.all([one,two]);
}
