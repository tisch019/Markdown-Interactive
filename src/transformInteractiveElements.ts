import mctest from './interactiveElementsTransformation/mctest';
import gallery from './interactiveElementsTransformation/gallery';

export default function transform(contentType: String, content: any) {
    switch(contentType) { 
        case 'mctest': { 
           return mctest(content);
        } 
        case 'gallery':  {
         return gallery(content);
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