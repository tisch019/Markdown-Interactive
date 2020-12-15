const YAML = require('yaml');

export default function transform(content: any){ 
    let htmlSnippet: string = `<div class="gallery">
    <div class="row">`;
    let contentYaml = YAML.parse(content);
    let counter = 1;
    let description: keyof typeof contentYaml;
    for (description in contentYaml) {
        htmlSnippet += `<div class="column"> <img src="${contentYaml[description]}" onclick="openModal(event);currentSlide(event,${counter})" class="hover-shadow"> </div>`;
        counter++;
    }
    let quantity = counter-1;
    counter = 1;
    htmlSnippet += `</div><div id="myModal" class="modal"> <span class="close cursor" onclick="closeModal(event)">&times;</span>
    <div class="modal-content">`;
    for (description in contentYaml) {
        htmlSnippet += `
        <div class="mySlides">
            <div class="numbertext">${counter} / ${quantity}</div>
            <img src="${contentYaml[description]}" >
        </div>`;
        counter++;
    }
    htmlSnippet += `
        <!-- Next/previous controls --> 
        <a class="prev" onclick="plusSlides(event, -1)">&#10094;</a> <a class="next" onclick="plusSlides(event, 1)">&#10095;</a> 
        
        <!-- Caption text -->
        <div class="caption-container">
            <p id="caption"></p>
        </div>
    </div>
    </div>
    </div>`;
    return htmlSnippet;
 } 