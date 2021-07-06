let signupButton = document.getElementById("signupbutton");
let signinButton = document.getElementById("signin");
let footer = document.getElementsByClassName("footer");
let preloader = document.getElementById("preloader_container");
let arrow = document.getElementsByClassName("arrow");
let main = document.getElementsByClassName("main");
const apiURL = "https://whispering-ridge-40670.herokuapp.com";
let down = true;

setTimeout(() => {
  redirect(0, setUpLandingPage)
}, 200);


function setUpLandingPage() {



  signupButton.addEventListener("click", () => {
    // preloader.style.display = "block";
    displayPreloaderContainerLandingPage()
    window.location.href = "./signupsignin.html" + "#" + "signup";
  });

  signinButton.addEventListener("click", () => {
    // preloader.style.display = "block";
    displayPreloaderContainerLandingPage()
    window.location.href = "./signupsignin.html" + "#" + "signin";
  });


  arrow[0].addEventListener("click", () => {
    toggleFooterStates();
  });



  window.onkeydown = function (e) {
    if (e.keyCode === 27) {
      // ESC key trigger to collpase
      if (!down) {
        collapseFooter();
      }
    } else if (e.keyCode === 70) {
      // F key trigger to Expand/collpase both
      toggleFooterStates();
    }
  };

  // preloader.style.display = "none";
  displayMainContainerLandingPage();
setTimeout(() => {
  AOS.init({
    easing: 'ease-in-out',
    duration: 600,
    once: true,
  });
}, 100);
}


function toggleFooterStates() {
  if (down) {
    expandFooter();
  } else {
    collapseFooter();
  }
}

function collapseFooter() {
  down = true;

  main[0].classList.toggle("main-opacity");
  arrow[0].classList.toggle("rotate_footer_arrow_2");
  arrow[0].classList.toggle("rotate_footer_arrow");
  setTimeout(() => {
    arrow[0].classList.toggle("scale");
  }, 700);

  let upwards = 275;
  let b = setInterval(() => {
    upwards = upwards - 5;
    scrollBy(0, -5);
    if (upwards <= 0) {
      clearInterval(b);
      footer[0].classList.toggle("display-none");
    }
  }, 8);
}

function expandFooter() {
  down = false;

  main[0].classList.toggle("main-opacity");
  arrow[0].classList.toggle("rotate_footer_arrow");
  arrow[0].classList.toggle("rotate_footer_arrow_2");
  arrow[0].classList.toggle("scale");

  footer[0].classList.toggle("display-none");
  let distance = 275;
  let a = setInterval(() => {

    distance = distance - 5;
    scrollBy(0, 5);
    if (distance <= 0) {
      clearInterval(a);
    }
  }, 8);
}
function displayMainContainerLandingPage(){
  checkAndDisplayContainer(main[0]);
  checkAndCloseContainer(preloader);
}
function displayPreloaderContainerLandingPage(){
  checkAndCloseContainer(main[0]);
  checkAndDisplayContainer(preloader);
}
function checkAndCloseContainer(container) {
  if (container.classList.contains("display_to_block")) {
    container.classList.remove("display_to_block");
  }
  container.classList.add("display_to_none");

  if (container.style.display != "none") {
    container.classList.add("display_to_none");

    setTimeout(function () {
      container.style.display = "none";
      container.style.opacity = 0;
    }, 500);
  }
}

function checkAndDisplayContainer(container) {
  if (container == footer[0]) {
    container.style.display = "flex";
  } 
  else {
    container.style.display = "block";
  }
  container.style.opacity = 1;
  if (container.classList.contains("display_to_none")) {
    container.classList.remove("display_to_none");
  }
  container.classList.add("display_to_block");
}
