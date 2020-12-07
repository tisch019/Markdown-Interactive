export default function transform(content: any){
    let htmlSnippet: string = '<div class="mctest">';
    let contentJson = JSON.parse(content);
    contentJson.forEach(function (question: any) {
        htmlSnippet += '<div class="questionContainer"><div class="question">' + question.question + '</div><div class="answersContainer">';
        question.answers.forEach(function (answer: any) {
             htmlSnippet += '<div><input type="checkbox" correct=' + answer[1] + ' class="answer">' + answer[0] + '</div>';
        });
        htmlSnippet += '</div></div>';
    });
    htmlSnippet += '<button type="button" id="mctest" onclick="evaluateMultipleChoiceTest(event)">Auswerten</button><div class="result"></div></div></div>';
    return htmlSnippet;
 } 