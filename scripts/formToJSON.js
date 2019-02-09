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
    FirebaseJSON.name = document.getElementById("ResumeName").value;
    console.log(FirebaseJSON);
}
