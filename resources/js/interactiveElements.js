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
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";
}

function evaluateMultipleChoiceTest(e) {
    let mctest = e.target.parentNode;
    let questions = mctest.querySelectorAll(".questionContainer");
    let correctAnswers = 0;
    questions.forEach(function (question) {
        let answers = question.querySelectorAll(".answer");
        let correctCount = answers.length;
        answers.forEach(function (answer) {
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
}