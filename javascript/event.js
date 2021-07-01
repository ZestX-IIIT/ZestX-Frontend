setTimeout(function () {
  var slider = document.getElementsByClassName("slide");
  let index_slider = 0;
  var isNotHovering = true;

  for (var i = 0; i < slider.length; i++) {
    console.log(i);
    slider[i].addEventListener('change', function () {
      console.log("hehe");
      for (let i = 0; i < slider.length; i++) {
        if (slider[i].checked) {
          index_slider = i;
          break;
        }
      }
    });
  }

  var a = setInterval(() => {
    if (isNotHovering) {
      slider[index_slider].checked = true;
      index_slider++;
      index_slider = index_slider % 5;
    }
  }, 2500);

  var slide = document.getElementById("slider");
  slide.addEventListener("mouseover", () => {
    isNotHovering = false;
  });

  slide.addEventListener("mouseout", () => {
    isNotHovering = true;
  });
}, 500);
