
setTimeout(function () {

  let progress = document.getElementById("Progressbar");
  let totalHeight;
  let windowWidth = window.innerWidth;
  let limit = windowWidth - 100;
  let limit2 = windowWidth - 20;
  let color_grediet_value_1 = [50, 15, 60];
  let color_grediet_value_2 = [40, 15, 100];
  let color_grediet_value_1_min_arr = [50, 15, 60]
  let color_grediet_value_1_max_arr = [250, 155, 160]
  let color_grediet_value_2_min_arr = [40, 15, 100]
  let color_grediet_value_2_max_arr = [250, 115, 160]

  updateProgressBar()
  window.onscroll = function () {
    updateProgressBar()
  };

  function updateProgressBar() {
    totalHeight = document.body.scrollHeight - window.innerHeight;
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
    // progress.style.background = "linear-gradient(to top, rgb(210, 14, 236), rgb(11, 189, 202))";
    updateGredientByIndex(window.pageYOffset / totalHeight)
    // progress.style.background = "linear-gradient(to top, rgb(" + color_grediet_value_1 + "), rgb(" + color_grediet_value_2 + "))";

  }
  function updateGredientByIndex(viewportFrectionIndex) {
    for (let i = 0; i < color_grediet_value_1.length; i++) {
      // console.log(viewportFrectionIndex * (color_grediet_value_1_max_arr[i]));
      color_grediet_value_1[i] = color_grediet_value_1_min_arr[i] + (viewportFrectionIndex * (color_grediet_value_1_max_arr[i]))
    }
  }

  var y = 0;
  let isProgressbarActive = false;
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
