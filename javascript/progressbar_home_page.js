
setTimeout(function () {

  let progress = document.getElementById("Progressbar");
  let totalHeight;
  let windowWidth = window.innerWidth;
  let limit = windowWidth - 100;
  let limit2 = windowWidth - 20;
  let coloer_grediet_value_1;
  let coloer_grediet_value_2;

  updateProgressBar()
  window.onscroll = function () {
    updateProgressBar()
  };

  function updateProgressBar() {
    totalHeight = document.body.scrollHeight - window.innerHeight;
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
    coloer_grediet_value_1 = (210 - 150 * window.pageYOffset / totalHeight) + "," + (14 + 250) + "," + 236
    coloer_grediet_value_2 = 11 + "," + 189 + "," + 202
    progress.style.background = "linear-gradient(to top, rgb(" + coloer_grediet_value_1 + "), rgb(" + coloer_grediet_value_2 + "))";

  }

  var y = 0;
  function startProgressbarScroll(e) {
    limit = windowWidth - 200;
    limit2 = windowWidth - 20;
    if (e.clientX > limit2) {
      isProgressbarActive = true;
      progressBarScroll(e)
    }

  }
  function stopProgressbarScroll(e) {
    isProgressbarActive = false;
  }

  function progressBarScroll(e) {
    if (isProgressbarActive) {
      if (e.clientX > limit) {
        y = e.clientY;
        window.scrollBy(0, (((y * totalHeight) / window.innerHeight) - window.pageYOffset) / 10);
      }
    }


  }

  document.addEventListener("mousedown", startProgressbarScroll);
  document.addEventListener("touchstart", startProgressbarScroll);

  document.addEventListener("mousemove", progressBarScroll);
  document.addEventListener("touchmove", progressBarScroll);

  document.addEventListener("mouseleave", stopProgressbarScroll);
  document.addEventListener("mouseup", stopProgressbarScroll);
  document.addEventListener("touchend", stopProgressbarScroll);


}, 200);
