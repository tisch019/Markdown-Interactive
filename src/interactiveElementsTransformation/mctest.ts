const YAML = require('yaml');

export default function transform(content: any){
    let htmlSnippet: string = '<div class="mctest">';
    let contentYaml = YAML.parse(content);
    let count = 1;
    let question: keyof typeof contentYaml;
    for (question in contentYaml) {
        htmlSnippet += `<div class="questionContainer"><div class="question"> ${count}.) ${question}</div><div class="answersContainer">`;
        let answers = contentYaml[question];
        let answer: keyof typeof answers;
        for (answer in answers) {
            htmlSnippet += `<div><input type="checkbox" correct=${answers[answer]} class="answer">${answer}</div>`;
        }
        htmlSnippet += '</div></div>';
        count++;
    }
    htmlSnippet += '<button type="button" id="mctest" onclick="evaluateMultipleChoiceTest(event)">Auswerten</button><div class="result"></div></div></div>';
    return htmlSnippet;
 } 