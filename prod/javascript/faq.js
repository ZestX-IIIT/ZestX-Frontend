setTimeout(function () {
    var FAQQuestion = document.getElementsByClassName("FAQQuestion");
    var FAQArrowDown = document.getElementsByClassName("FAQArrowDown");
    const FAQ_not_expanded_check_index = [];

    for (let i = 0; i < FAQQuestion.length; i++) {
        FAQ_not_expanded_check_index[i] = true;
        FAQQuestion[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
            if (FAQ_not_expanded_check_index[i]) {
                FAQArrowDown[i].classList.remove("ArrowRotate2");
                FAQArrowDown[i].classList.add("ArrowRotate");
                FAQ_not_expanded_check_index[i] = false;
            } else {
                FAQArrowDown[i].classList.remove("ArrowRotate");
                FAQArrowDown[i].classList.add("ArrowRotate2");
                FAQ_not_expanded_check_index[i] = true;
            }
        });
    }
}, 500);
