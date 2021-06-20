setTimeout(function () {
  var FAQQuestion = document.getElementsByClassName("FAQQuestion");
  var FAQArrowDown = document.getElementsByClassName("FAQArrowDown");
  var i;
  let count = true;

  for (i = 0; i < FAQQuestion.length; i++) {
    FAQArrowDown[i].addEventListener("click", function () {
      if (count == true) {
        this.classList.add("ArrowRotate");
        this.classList.remove("ArrowRotate2");
        count = false;
        console.log("1")
      }
      else {
        this.classList.add("ArrowRotate2");
        this.classList.remove("ArrowRotate");
        count = true;
        console.log("2")
      }
    });
    FAQQuestion[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}, 200);
