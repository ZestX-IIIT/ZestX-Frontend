let faq_down_arrow = document.getElementById("faq_down_arrow");
let FAQQuestionsContainer = document.getElementsByClassName("FAQQuestionsContainer");
let AnswerOfQuestion = document.getElementsByClassName("AnswerOfQuestion");
let arrowDiv = document.getElementsByClassName("arrowDiv");

faq_down_arrow.addEventListener("click" , ()=>{
    FAQQuestionsContainer[0].classList.toggle("FAQQuestionsContainerHeight")
    AnswerOfQuestion[0].classList.toggle("AnswerOfQuestionOpacity")
    arrowDiv[0].classList.toggle("FAQQuestionsContainerHeight")
});