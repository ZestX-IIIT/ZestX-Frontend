let signupButton = document.getElementById("signupbutton");
let signinButton = document.getElementById("signin");
let footer = document.getElementsByClassName("footer");
let preloader = document.getElementById("preloader_container");
let arrow = document.getElementsByClassName("arrow");
let main = document.getElementsByClassName("main");
const apiURL = "https://whispering-ridge-40670.herokuapp.com";
let down = true;
import { redirect } from './redirect';
import { includehtmlbyID } from './html_include';

setTimeout(() => {
  redirect(0, setUpLandingPage)
}, 200);

includehtmlbyID("preloader_container");

function setUpLandingPage() {



  signupButton.addEventListener("click", () => {
    preloader.style.display = "block";
    window.location.href = "./signupsignin.html" + "#" + "signup";
  });

  signinButton.addEventListener("click", () => {
    preloader.style.display = "block";
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

  preloader.style.display = "none";


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
