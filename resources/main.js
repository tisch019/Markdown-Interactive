// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
const vscode = acquireVsCodeApi();
function addAnswer(e) {
    var answer = document.createElement("div");
    answer.classList.add("answer", "row");
    answer.innerHTML = `<input type="checkbox" class="correctAnswer col-1">
                <input type="text" class="form-control answerInput col-9" placeholder="Antwort eingeben">
                <button type="button" class="btn btn-danger col-2" onclick="removeAnswer(event)">Löschen</button>`;
    e.target.parentNode.insertBefore(answer, e.target);
}

function removeAnswer(e) {
    e.target.parentNode.remove();
}

function addQuestion(e) {
    var question = document.createElement("div");
    question.classList.add("question", "row");
    question.innerHTML = `<input type="text" class="form-control questionInput col-10" placeholder="Frage eingeben">
            <button type="button" class="btn btn-danger col-2" onclick="removeQuestion(event)">Löschen</button>
            <div class="answers container-fluid">
                <div class="answer row">
                <input type="checkbox" class="correctAnswer col-1">
                <input type="text" class="form-control answerInput col-9" placeholder="Antwort eingeben">
                <button type="button" class="btn btn-danger col-2" onclick="removeAnswer(event)">Löschen</button>
                </div>
                <button type="button" class="btn btn-success" onclick="addAnswer(event)">Antwort
                hinzufügen</button>
            </div>`;
    e.target.parentNode.insertBefore(question, e.target);
}

function removeQuestion(e) {
    e.target.parentNode.remove();
}

function parseMultipleChoiceTest() {
    let mctest = [];
    let questions = document.querySelectorAll(".question");
    questions.forEach(function(question) {
        let jsonElement = {};
        jsonElement.question = question.getElementsByClassName("questionInput")[0].value;
        let allAnswers = question.querySelectorAll(".answer");
        jsonElement.answers = [];
        allAnswers.forEach(function(answer) {
            jsonElement.answers.push(
                [
                    answer.querySelectorAll(".answerInput")[0].value,
                    answer.querySelectorAll(".correctAnswer")[0].checked
                ]
            );
        });
        mctest.push(jsonElement);
    });
    console.log("test");
    sendToVSC("mctest",mctest);
}

function addGalleryElement(e) {
    var galleryElement = document.createElement("div");
    galleryElement.classList.add("galleryElement", "row");
    galleryElement.innerHTML = `<input type="text" class="form-control imgPathInput col-12 mt-2" placeholder="Bild URL eingeben">
    <input type="text" class="form-control imgDescriptionInput col-12 mt-2" placeholder="Bild Beschreibung eingeben">
    <button type="button" class="btn btn-danger col-2 mt-2" onclick="removeGalleryElement(event)">Löschen</button>`;
    e.target.parentNode.insertBefore(galleryElement, e.target);
}

function removeGalleryElement(e) {
    e.target.parentNode.remove();
}

function parseGallery() {
    let gallery = [];
    let galleryElements = document.querySelectorAll(".galleryElement");
    galleryElements.forEach(function(galleryElement) {
        let jsonElement = {};
        jsonElement.path = galleryElement.getElementsByClassName("imgPathInput")[0].value;
        jsonElement.description = galleryElement.getElementsByClassName("imgDescriptionInput")[0].value;
        gallery.push(jsonElement);
    });
    sendToVSC("gallery",gallery);
}

function syncronizeRangeInputField (sliderSelector, inputSelector) {
    const slider = document.querySelector(sliderSelector);
    const output = document.querySelector(inputSelector);
    output.value = slider.value;
    slider.addEventListener ("input", function () {
        output.value = this.value;
    });
    output.addEventListener ("input", function () {
        console.log(slider.value);
        slider.value = this.value;
        console.log(slider.value);
    });
}

function sendToVSC (command, code) {
    vscode.postMessage({
        command: command,
        text: code
    });
}

function init(){
    syncronizeRangeInputField ("#map-width", ".map-width-input");
    syncronizeRangeInputField ("#map-height", ".map-height-input");
}