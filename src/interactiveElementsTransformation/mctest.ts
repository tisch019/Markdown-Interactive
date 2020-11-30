export default function transform(content: any){
    let htmlSnippet: string = '<div class="mctest">';
    let contentJson = JSON.parse(content);
    console.log(contentJson);
    contentJson.forEach(function (question: any) {
        htmlSnippet += '<div class="questionContainer"><div class="question">' + question.question + '</div><div class="answersContainer">';
        question.answers.forEach(function (answer: any) {
             htmlSnippet += '<div><input type="checkbox" correct=' + answer[1] + ' class="answer">' + answer[0] + '</div>';
        });
        htmlSnippet += '</div></div>';
    });
    htmlSnippet += '<button type="button" id="mctest" onclick="evaluateMultipleChoiceTest(event)">Auswerten</button><div class="result"></div></div></div>';
    htmlSnippet += `<script>function evaluateMultipleChoiceTest(e) {
        let mctest = e.target.parentNode;
        let questions = mctest.querySelectorAll(".questionContainer");
        let correctAnswers = 0;
        questions.forEach(function(question) {
            let answers = question.querySelectorAll(".answer");
            let correctCount = answers.length;
            answers.forEach(function(answer) {
                if (String(answer.checked) == answer.getAttribute("correct")) {
                    correctCount--;
                }
            });
            if (correctCount == 0) {
                question.style.backgroundColor = "green";
                correctAnswers++;
            }
            else {
                question.style.backgroundColor = "red";
            }
        });
        mctest.querySelectorAll(".result")[0].innerHTML = correctAnswers + " von " + questions.length + " richtig beantwortet!";
        
        }</script>`;
    return htmlSnippet;
 } 