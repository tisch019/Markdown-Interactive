import mctest from './interactiveElementsTransformation/mctest';
import gallery from './interactiveElementsTransformation/gallery';
import map from './interactiveElementsTransformation/map';

export default function transform(contentType: String, content: any) {
    switch(contentType) { 
        case 'mctest': { 
           return mctest(content);
        } 
        case 'gallery':  {
         return gallery(content);
         } 
        case 'map': { 
            return map(content);
         } 
        default: { 
            return content;
        } 
     }
};