export default function transform(contentType: String, content: any) {
    switch(contentType) { 
        case 'mctest': { 
           let HTMLSnippet: string = '<div class="mctest">';
           let contentJson = JSON.parse(content);
           console.log(contentJson);
           contentJson.forEach(function (question: any) {
               HTMLSnippet += '<div class="questionContainer"><div class="question">' + question.question + '</div><div class="answersContainer">';
               question.answers.forEach(function (answer: any) {
                    HTMLSnippet += '<div><input type="checkbox" correct=' + answer[1] + ' class="answer">' + answer[0] + '</div>';
               });
               HTMLSnippet += '</div></div>';
          });
          HTMLSnippet += '<button type="button" id="mctest" onclick="evaluateMultipleChoiceTest(event)">Auswerten</button></div></div>';
          HTMLSnippet += `<script>function evaluateMultipleChoiceTest(e) {
            let questions = e.target.parentNode.querySelectorAll(".questionContainer");
            questions.forEach(function(question) {
                question.querySelectorAll(".answer").forEach(function(answer) {
                    if (String(answer.checked) == answer.getAttribute("correct")) {
                        answer.parentNode.style.backgroundColor = "green";
                    }
                    else {
                        answer.parentNode.style.backgroundColor = "red";
                    }
                });
            });
            }</script>`;
           return HTMLSnippet;
        } 
        case 'gallery':  { 
         let HTMLSnippet: string = '<div class="mctest">';
         let contentJson = JSON.parse(content);
         console.log(contentJson);
         contentJson.forEach(function (question: any) {
             HTMLSnippet += '<div class="questionContainer"><div class="question">' + question.question + '</div><div class="answersContainer">';
             question.answers.forEach(function (answer: any) {
                  HTMLSnippet += '<div><input type="checkbox" correct=' + answer[1] + ' class="answer">' + answer[0] + '</div>';
             });
             HTMLSnippet += '</div></div>';
        });
        HTMLSnippet += '<button type="button" id="mctest" onclick="evaluateMultipleChoiceTest(event)">Auswerten</button></div></div>';
        HTMLSnippet += `<script>function evaluateMultipleChoiceTest(e) {
          let questions = e.target.parentNode.querySelectorAll(".questionContainer");
          questions.forEach(function(question) {
              question.querySelectorAll(".answer").forEach(function(answer) {
                  if (String(answer.checked) == answer.getAttribute("correct")) {
                      answer.parentNode.style.backgroundColor = "green";
                  }
                  else {
                      answer.parentNode.style.backgroundColor = "red";
                  }
              });
          });
            }</script>`;
         return HTMLSnippet;
         } 
        case 'quiz': { 
            //statements; 
            break; 
         } 
        default: { 
            return content;
        } 
     } 
    
        return content;
};