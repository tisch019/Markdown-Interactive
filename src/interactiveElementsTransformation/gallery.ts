export default function transform(content: any){ 
    let HTMLSnippet: string = `<div class="gallery">
     <style scoped>
        .gallery{
            margin-top: 30px;
            margin-bottom: 30px;
        }
        .row{
            display:flex;
            flex-wrap: wrap;
            /*justify-content: center;*/
            }

        .column {
            position: relative;
        }
        .column:after {
            content: url("/img/lupe1.png");
            position: absolute;
            left: 0;
            top: 0;
        }    

        .column img{
            margin: 0 20px 0 0;
            max-height: 25vh;
        }

        /* The Modal (background) */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            padding-top: 10px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.8);
        }

        /* Modal Content */
        .modal-content {
            position: relative;
            text-align: center;
            margin: auto;
            padding: 0;
            max-width: 95vw;
        }

        /* The Close Button */
        .close {
            color: white;
            position: absolute;
            top: 10px;
            right: 25px;
            font-size: 35px;
            font-weight: bold;
            z-index: 3;
        }

        .close:hover,
        .close:focus {
            color: #999;
            text-decoration: none;
            cursor: pointer;
        }

        /* Hide the slides by default */
        .mySlides {
            display: none;
            height: 98vh;
            align-items: center;
            justify-content: center;
        }

        .mySlides img{
            box-sizing: border-box;
            padding: 20px;
            max-height: 95vh;
            width: auto;  
            max-width: 95vw;          
            }

        /* Next & previous buttons */
        .prev,
        .next {
            cursor: pointer;
            position: absolute;
            top: 50%;
            width: auto;
            padding: 16px;
            margin-top: -50px;
            color: white;
            font-weight: bold;
            font-size: 20px;
            transition: 0.6s ease;
            border-radius: 0 3px 3px 0;
            user-select: none;
            -webkit-user-select: none;  
        }
        .prev{
            left:10px;
        }
        .next{
            right:10px;
        }

        /* Position the "next button" to the right */
        .next {
            right: 0;
            border-radius: 3px 0 0 3px;
        }

        /* On hover, add a black background color with a little bit see-through */
        .prev:hover,
        .next:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }

        /* Number text (1/3 etc) */
        .numbertext {
            color: #f2f2f2;
            font-size: 12px;
            padding: 8px 12px;
            position: absolute;
            top: 0;
            left: 10px;
        }

        /* Caption text */
        .caption-container {
            text-align: center;
            background-color: black;
            padding: 2px 16px;
            color: white;
        }

        img.demo {
            opacity: 1;
            box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.8);
        }

        .active,
        .demo:hover {
            opacity: 0.8;
        }

        img.hover-shadow {
            transition: 0.3s;
        }

        .hover-shadow:hover {
            box-shadow: 0px  0px 0px 0px rgba(0, 0, 0, 0);
        }
    </style>
    <div class="row">`;
    let contentJson = JSON.parse(content);
    let counter = 1;
    contentJson.forEach(function (galleryElement: any) {
        HTMLSnippet += '<div class="column"> <img src="' + galleryElement.path + '" onclick="openModal(event);currentSlide(event,' + counter + ')" class="hover-shadow"> </div>';
        counter++;
    });
    let quantity = counter-1;
    counter = 1;
    HTMLSnippet += `</div><div id="myModal" class="modal"> <span class="close cursor" onclick="closeModal(event)">&times;</span>
    <div class="modal-content">`;
    contentJson.forEach(function (galleryElement: any) {
        HTMLSnippet += `
        <div class="mySlides">
            <div class="numbertext">${counter} / ${quantity}</div>
            <img src="${galleryElement.path}" >
        </div>`
        counter++;
    });
    HTMLSnippet += `
        <!-- Next/previous controls --> 
        <a class="prev" onclick="plusSlides(event, -1)">&#10094;</a> <a class="next" onclick="plusSlides(event, 1)">&#10095;</a> 
        
        <!-- Caption text -->
        <div class="caption-container">
            <p id="caption"></p>
        </div>
    </div>
    </div>
    <script>
    // Open the Modal
    function openModal(e) {
        e.target.closest('.gallery').querySelectorAll("#myModal")[0].style.display = "block";
    }

    // Close the Modal
    function closeModal(e) {
        e.target.closest('.gallery').querySelectorAll("#myModal")[0].style.display = "none";
    }

    // Next/previous controls
    function plusSlides(e, n) {
    showSlides(e, slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(e, n) {
    showSlides(e, slideIndex = n);
    }

    function showSlides(e, n) {
    var i;
    var modal = e.target.closest('.gallery').querySelectorAll('.modal-content')[0];
    var slides = modal.querySelectorAll(".mySlides");
    var captionText = modal.querySelectorAll("#caption")[0];
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "flex";
    }
    </script></div>`
    return HTMLSnippet;
 } 