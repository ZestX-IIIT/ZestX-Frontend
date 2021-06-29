let signup = document.getElementById("signup");
let signin = document.getElementById("signin");
let signincontainer = document.getElementById("signincontainer");
let signupcontainer = document.getElementById("signupcontainer");
let signupBtn = document.getElementById("signupButton");
let signinBtn = document.getElementById("signinButton");
let preloader = document.getElementById("preloader_container");
let bg1 = document.getElementById("bg1");
let bg2 = document.getElementById("bg2");
let bg3 = document.getElementById("bg3");
let bg4 = document.getElementById("bg4");
let text = window.location.hash.substring(1);
let userData;
let lastToastTimestamp = Date.now();
const apiURL = "https://whispering-ridge-40670.herokuapp.com";

window.addEventListener("load", () => {
  closeLoader();
});

function closeLoader() {
  preloader.style.display = "none";
}

signinBtn.addEventListener("click", (event) => {
  event.preventDefault();
  preloader.style.display = "block";
  const email = document.getElementById("signinemail").value;
  const password = document.getElementById("signinpassword").value;

  if (email && password) {
    fetch(`${apiURL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { token } = data;

        if (token) {
          localStorage.setItem("jwt", token);
          fetch(`${apiURL}/user/getdetails`, {
            method: "GET",
            headers: {
              authorization: token,
            },
          })
            .then((res) => res.json())
            .then((data1) => {
              userData = data1.data;
              if (userData.is_admin)
                window.location.href = "./general/admin_main_page.html";
              else window.location.href = "./homepage.html";
            })
            .catch((err) => {
              console.log(err);
              preloader.style.display = "none";
            });
        } else {
          show_toast(2, "Incorrect password or email!");
          preloader.style.display = "none";
        }
      })
      .catch((err) => {
        show_toast(2, "Error occured Re-try!");
        console.log(err);
        preloader.style.display = "none";
      });
  } else {
    show_toast(2, "Please fill all the details properly!");
    preloader.style.display = "none";
  }
});

signupBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("signupemail").value;
  const user_name = document.getElementById("name").value;
  const password = document.getElementById("signuppassword").value;
  const mobile = document.getElementById("mobile").value;
  const confirmPassword = document.getElementById("confirm").value;

  if (password != confirmPassword) {
    show_toast(2, "Passwords not matched with confirm password!");
    return;
  }
  if (password.length < 6) {
    show_toast(2, "Password should be minimum of 6 length!");
    return;
  }
  preloader.style.display = "block";

  if (email && password && user_name && mobile) {
    fetch(`${apiURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, email, password, mobile }),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.data;

        if (token) {
          localStorage.setItem("jwt", token);
          window.location.href = "./homepage.html";
        } else {
          show_toast(2, "User already exist! Please Sign In!");
          preloader.style.display = "none";
        }
      })
      .catch((err) => {
        show_toast(2, "Error occured Re-try!");
        console.log(err);
        preloader.style.display = "none";
      });
  } else {
    show_toast(2, "Please fill all the details properly!");
    preloader.style.display = "none";
  }
});

if (text == "signin") {
  signincontainer.classList.toggle("display-class");
  signincontainer.classList.toggle("opacity-class");
  signupcontainer.classList.toggle("opacity-class");
  signupcontainer.classList.toggle("display-class");
  bg1.classList.toggle("opacity-class");
  bg2.classList.toggle("opacity-class");
  bg3.classList.toggle("opacity-class");
  bg4.classList.toggle("opacity-class");
  bg1.classList.toggle("display-class");
  bg2.classList.toggle("display-class");
  bg3.classList.toggle("display-class");
  bg4.classList.toggle("display-class");
}

signin.addEventListener("click", () => {
  signupcontainer.classList.toggle("opacity-class");
  signincontainer.classList.toggle("opacity-class");
  signupcontainer.classList.toggle("display-class");
  signincontainer.classList.toggle("display-class");
  bg1.classList.toggle("opacity-class");
  bg2.classList.toggle("opacity-class");
  bg3.classList.toggle("opacity-class");
  bg4.classList.toggle("opacity-class");
  bg1.classList.toggle("display-class");
  bg2.classList.toggle("display-class");
  bg3.classList.toggle("display-class");
  bg4.classList.toggle("display-class");
});
signup.addEventListener("click", () => {
  signupcontainer.classList.toggle("opacity-class");
  signincontainer.classList.toggle("opacity-class");
  signupcontainer.classList.toggle("display-class");
  signincontainer.classList.toggle("display-class");
  bg1.classList.toggle("opacity-class");
  bg2.classList.toggle("opacity-class");
  bg3.classList.toggle("opacity-class");
  bg4.classList.toggle("opacity-class");
  bg1.classList.toggle("display-class");
  bg2.classList.toggle("display-class");
  bg3.classList.toggle("display-class");
  bg4.classList.toggle("display-class");
});

function show_toast(isSuccess, message) {

  if (Date.now() - lastToastTimestamp > 5000) {
    let toastAlertMessage = document.getElementById("toastAlertMessage");
    let toastImage = document.getElementById("toastImage");
    let toastFrontMessage = document.getElementById("toastFrontMessage");
    let toastDescriptionMessage = document.getElementById("toastDescriptionMessage");
    let msgLength = message.length + 7;

    document.getElementById("toastAlertMessage").style.setProperty("--foo", `${msgLength}ch`);

    if (isSuccess == 1) {
      toastImage.src = "../assets/_general/success_tick.svg"
      toastFrontMessage.style.backgroundColor = "green"
    }
    else if (isSuccess == 0) {
      toastImage.src = "../assets/_general/error_cross.svg"
      toastFrontMessage.style.backgroundColor = "red"
    }
    else {
      toastImage.src = "../assets/_general/neutral_exclamation.svg"
      toastFrontMessage.style.backgroundColor = "black"
    }
    toastDescriptionMessage.innerText = " ";
    setTimeout(function () {
      toastDescriptionMessage.innerText = message;
    }, 600);
    setTimeout(function () {
      toastDescriptionMessage.innerText = " ";
    }, 4200);
    toastAlertMessage.className = "toastPopUp";
    setTimeout(function () {
      toastAlertMessage.className = toastAlertMessage.className.replace("toastPopUp", "");
    }, 5000);
    lastToastTimestamp = Date.now();
  } else {
    setTimeout(function () {
      show_toast(isSuccess, message);
    }, 5500 - (Date.now() - lastToastTimestamp))
  }
}