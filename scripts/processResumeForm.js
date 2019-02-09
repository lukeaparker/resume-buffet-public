// Takes JSON and autopopulates input form

let JSON = {
    "name": "Test Resume",
    "websiteID": ["web-1", "web-2", "web-3"],
    "websiteValue": ["linkedin", "github", "twitter"],
    "websiteIsChecked": [true, false, false],
    "skillID": ["skill-1", "skill-2", "skill-3"],
    "skillValue": ["knitting", "swimming"],
    "skillIsChecked": [true, false, false],
    "emailID": ["skill-1", "skill-2", "skill-3"],
    "emailValue": ["knitting", "swimming"],
    "emailIsChecked": [true, false, false],
    "phoneID": ["skill-1", "skill-2", "skill-3"],
    "phoneValue": ["knitting", "swimming"],
    "phoneIsChecked": [false, false, false],
    "addressID": ["skill-1", "skill-2", "skill-3"],
    "addressValue": ["knitting", "swimming"],
    "addressIsChecked": [true, false, true],
    "summaryID": ["skill-1", "skill-2", "skill-3"],
    "summaryValue": ["knitting", "no"],
    "summaryIsChecked": [true, false, false],
    "certID": ["skill-1", "skill-2", "skill-3"],
    "certValue": ["knitting", "jazz"],
    "certIsChecked": [true, true, false]
}

// uppercase first letter of a string
function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// function for processing specific forms

function processSingleForm(container, formType) {
    container.innerHTML = "<label><h3>" + ucFirst(formType) + "</h3></label><br>"
    for (let i = 0; i < JSON[formType + "ID"].length; i++) {
        let inputContainerDiv = document.createElement("div");
        inputContainerDiv.classList.add("form-check");

        let input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("form-check-input");
        input.id = JSON[formType + "ID"][i];
        input.checked = JSON[formType + "IsChecked"][i];
        input.value = "";

        let label = document.createElement("label");
        label.classList.add("form-check-label");
        label.setAttribute("for", JSON[formType + "ID"][i]);
        label.innerHTML = JSON[formType + "Value"][i] + "<br>";

        container.appendChild(inputContainerDiv);
        inputContainerDiv.appendChild(input);
        inputContainerDiv.appendChild(label);
    }
}

// main

function processResumeForm() {

    // try

    document.getElementById("generatedInputElementsGoHere").innerHTML = "<label for='resumeName'><h3>Résumé version</h3></label>" +
        "<div class='form-group'><input type='text' placeholder='Résumé for Apple, Résumé for Samsung' class='form-control' id='resumeName'></div>";

    for (let i = 1; i < 7; i++) {

        let container = document.createElement("div");
        document.getElementById("generatedInputElementsGoHere").appendChild(container);

        switch (i) {
            case 1:
                processSingleForm(container, "email");
                break;
            case 2:
                processSingleForm(container, "phone");
                break;
            case 3:
                processSingleForm(container, "address");
                break;
            case 4:
                processSingleForm(container, "website");
                break;
            case 5:
                processSingleForm(container, "cert");
                break;
            case 6:
                processSingleForm(container, "skill");
                break;
            case 7:
                processSingleForm(container, "summary");
                break;
            default:
                break;
        }

    }

}

