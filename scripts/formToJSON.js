function createNewFirebaseJSON() {
    var FirebaseJSON = {
        "id": document.getElementById("selectResume").value,
        "name": document.getElementById("selectResume").options[document.getElementById("selectResume").selectedIndex].text,
        "emailID": [],
        "emailIncluded": [],
        "phoneID": [],
        "phoneIncluded": [],
        "addressID": [],
        "addressIncluded": [],
        "websiteID": [],
        "websiteIncluded": [],
        "summaryID": [],
        "summaryIncluded": [],
        "certID": [],
        "certIncluded": [],
    }
    var itemCodes = ["email-","phone-","address-","web-","sum-","cert-"];
    var categories = ["email","phone","address","website","summary","cert"];
    var elements = document.getElementsByClassName("form-check-input");
    offset = 0;
    //console.log(elements);
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].id.indexOf(itemCodes[offset]) > -1) {
            FirebaseJSON[categories[offset] + "ID"].push(elements[i].id);
            FirebaseJSON[categories[offset] + "Included"].push(elements[i].checked);
        } else {
            offset++;
            i--;
        }
        
    }
    return FirebaseJSON;
}

function saveResume() {
    rID = "r-" + generateID(10)
    var FirebaseJSON = createNewFirebaseJSON();
    FirebaseJSON.id = rID;
    FirebaseJSON.name = document.getElementById("resumeName").value;
    console.log(FirebaseJSON);
    var newResume = db.collection("resumes").doc(rID);
    console.log(rID + " reserved");
    var two;
    var one = newResume.get().then(function(doc) {
        if (doc.exists) {
            console.log(rID + " exists");
            console.log("Duplicate ID. Trying again...");
            saveResume();
        } else {
            console.log(rID + " does not exist");
            newResume.set(FirebaseJSON)
            .then(function() {
                console.log("Document successfully written!");
                var DBUser = db.collection("users").doc(user.id);
                two = DBUser.get().then(function(doc) {
                    if (doc.exists) {
                        // console.log("Document data:", doc.data());
                        userData = doc.data();
                        userData["resumes"] = removeIDFromArray(rID);
                        userData["resumes"].unshift(rID);
                        DBUser.set(userData)
                        .then(function() {
                            console.log("Document successfully written!");
                            //addGoodMessage("Element Added Successfully");
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
