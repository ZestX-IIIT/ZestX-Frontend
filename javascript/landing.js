let signupButton = document.getElementById("signupbutton");
let signinButton = document.getElementById("signin");
let footer = document.getElementsByClassName("footer");
let arrow = document.getElementsByClassName("arrow");
let main = document.getElementsByClassName("main");
let down = true;

signupButton.addEventListener("click", () => {
  window.location.href = "./signupsignin.html" + "#" + "signup";
});

signinButton.addEventListener("click", () => {
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
  arrow[0].classList.toggle("rotate2");
  arrow[0].classList.toggle("rotate");
  setTimeout(() => {
    arrow[0].classList.toggle("scale");
  }, 700);

  let upwards = 275;
  let b = setInterval(() => {
    console.log(upwards);
    upwards = upwards - 5;
    scrollBy(0, -5);
    console.log(upwards);
    if (upwards <= 0) {
      clearInterval(b);
      footer[0].classList.toggle("display-none");
    }
  }, 8);
}

function expandFooter() {
  down = false;

  main[0].classList.toggle("main-opacity");
  arrow[0].classList.toggle("rotate");
  arrow[0].classList.toggle("rotate2");
  arrow[0].classList.toggle("scale");

  footer[0].classList.toggle("display-none");
  let distance = 275;
  let a = setInterval(() => {
    console.log(distance);
    distance = distance - 5;
    scrollBy(0, 5);
    console.log(distance);
    if (distance <= 0) {
      clearInterval(a);
    }
  }, 8);
}
