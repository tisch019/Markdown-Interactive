export default function transform(contentType: String, content: any) {
    switch(contentType) { 
        case 'mctest': { 
           //statements;
           let HTMLSnippet: string = '<div class="mctest">';
           let contentJson = JSON.parse(content);
           console.log(contentJson);
           contentJson.forEach(function (question: any) {
               HTMLSnippet += '<div class="questionContainer"><div class="question">' + question.question + '</div><div class="answersContainer">';
               question.answers.forEach(function (answer: any) {
                    HTMLSnippet += '<div><input type="checkbox" class="answer">' + answer[0] + '</div>';
               });
               HTMLSnippet += '</div></div>';
          }); 
           return HTMLSnippet;
        } 
        case 'galery': { 
           //statements; 
           break; 
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