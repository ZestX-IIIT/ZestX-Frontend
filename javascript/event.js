
setTimeout(function () {
  let event_slider = document.getElementById("slider")
  if (location.href == "https://zestx.netlify.app/general/slider_event.html") {
    event_slider.style.marginTop = "12vh"
  }
  var slider = document.getElementsByClassName("slide");
  let index_slider = 0;
  var isNotHovering = true;
  let event_poster_image = document.getElementsByClassName("event_poster_image");

  for (var i = 0; i < slider.length; i++) {
    slider[i].addEventListener('change', function () {
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
