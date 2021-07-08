setTimeout(function () {
  let event_slider = document.getElementById("slider");
  if (location.href == "https://zestx.netlify.app/general/slider_event.html") {
    event_slider.style.marginTop = "12vh";
  }

  var slider = document.getElementsByClassName("slide");
  let index_slider = 0;
  var isNotHovering = true;
  let event_poster_image =
    document.getElementsByClassName("event_poster_image");

  let imageContainer = document.getElementsByClassName("image-container");
  let poster1 = document.getElementById("poster1");
  let poster2 = document.getElementById("poster2");
  let poster3 = document.getElementById("poster3");

  imageContainer[0].addEventListener("click", () => {
    eventsSection.scrollIntoView({ behavior: "smooth" });
    poster1.addEventListener("click" , ()=>{
      slider[0].checked = true;
      isNotHovering = false;
    });
    poster2.addEventListener("click" , ()=>{
      slider[2].checked = true;
      isNotHovering = false;
    });poster3.addEventListener("click" , ()=>{
      slider[3].checked = true;
      isNotHovering = false;
    });
  });



  for (var i = 0; i < slider.length; i++) {
    slider[i].addEventListener("change", function () {
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
  }, 4000);

  var slide = document.getElementById("slider");
  slide.addEventListener("mouseover", () => {
    isNotHovering = false;
  });

  slide.addEventListener("mouseout", () => {
    isNotHovering = true;
  });
}, 500);
