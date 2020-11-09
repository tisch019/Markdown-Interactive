// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
const vscode = acquireVsCodeApi();
function addAnswer(e) {
    var answer = document.createElement("div");
    answer.classList.add("answer", "row");
    answer.innerHTML = `<input type="checkbox" class="correctAnswer col-1">
                <input type="text" class="form-control answerInput col-10" placeholder="Antwort eingeben">
                <button type="button" class="btn btn-danger col-1" onclick="removeAnswer(event)">Löschen</button>`;
    e.target.parentNode.insertBefore(answer, e.target);
}

function removeAnswer(e) {
    e.target.parentNode.remove();
}

function addQuestion(e) {
    var question = document.createElement("div");
    question.classList.add("question", "row");
    question.innerHTML = `<input type="text" class="form-control questionInput col-11" placeholder="Frage eingeben">
            <button type="button" class="btn btn-danger col-1" onclick="removeQuestion(event)">Löschen</button>
            <div class="answers container-fluid">
                <div class="answer row">
                <input type="checkbox" class="correctAnswer col-1">
                <input type="text" class="form-control answerInput col-10" placeholder="Antwort eingeben">
                <button type="button" class="btn btn-danger col-1" onclick="removeAnswer(event)">Löschen</button>
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
            jsonElement.answers.push([answer.querySelectorAll(".answerInput")[0].value,answer.querySelectorAll(".correctAnswer")[0].checked]);
        })
        mctest.push(jsonElement);
    });
    console.log(mctest);
    sendToVSC("mctest",mctest);
}

function sendToVSC (command, code) {
    vscode.postMessage({
        command: command,
        text: code
    });
}