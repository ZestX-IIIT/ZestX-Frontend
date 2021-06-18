let faq_down_arrow = document.getElementsByClassName("faq_down_arrow");
let FAQQuestionsContainer = document.getElementsByClassName("FAQQuestionsContainer");
let AnswerOfQuestion = document.getElementsByClassName("AnswerOfQuestion");
let arrowDiv = document.getElementsByClassName("arrowDiv");
let FAQOuterContainer = document.getElementsByClassName("FAQOuterContainer");

for(let i=0; i<faq_down_arrow.length;i++){
faq_down_arrow[i].addEventListener("click" , ()=>{
    FAQQuestionsContainer[i].classList.toggle("FAQQuestionsContainerHeight")
    AnswerOfQuestion[i].classList.toggle("AnswerOfQuestionOpacity")
    FAQOuterContainer[i].classList.toggle("FAQOuterContainerHeight")
});
console.log("hellp");
}
