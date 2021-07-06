let signup = document.getElementById("signup");
let signin = document.getElementById("signin");
let signincontainer = document.getElementById("signincontainer");
let signupcontainer = document.getElementById("signupcontainer");
let signupBtn = document.getElementById("signupButton");
let signinBtn = document.getElementById("signinButton");
let forgotPasswordBtn = document.getElementById("forgot_password");
let preloader = document.getElementById("preloader_container");
let bg1 = document.getElementById("bg1");
let bg2 = document.getElementById("bg2");
let bg3 = document.getElementById("bg3");
let bg4 = document.getElementById("bg4");
let text = window.location.hash.substring(1);
let userData;
let lastToastTimestamp = Date.now();
let regularExpression = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
const apiURL = "https://whispering-ridge-40670.herokuapp.com";

setTimeout(() => {
  redirect(0, setUpSignInSignUpPage)
}, 200);

function setUpSignInSignUpPage() {

  signinBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    preloader.style.display = "block";
    const email = document.getElementById("signinemail").value;
    const password = document.getElementById("signinpassword").value;

    if (email && password) {
      try {

        const signinRes = await fetch(`${apiURL}/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const signinData = await signinRes.json();

        if (signinRes.status == 400) {
          show_toast(2, "User does not exists, Please sign up!");
          preloader.style.display = "none";
        } else if (signinRes.status == 444) {
          show_toast(2, "Enter correct password!");
          preloader.style.display = "none";

        } else if (signinRes.status == 500) {
          show_toast(0, "Internal server error please re-try!");
          preloader.style.display = "none";
        } else {

          const { token } = signinData;

          localStorage.setItem("jwt", token);
          const userDataRes = await fetch(`${apiURL}/user/getdetails`, {
            method: "GET",
            headers: {
              authorization: token,
            },
          });

          const userDetails = await userDataRes.json();
          userData = userDetails.data;

          if (userData.is_admin)
            window.location.href = "./general/admin_main_page.html";
          else window.location.href = "./homepage.html";

        }
      } catch (error) {
        console.log(error);
        show_toast(0, "Internal server error please re-try!");
        preloader.style.display = "none";
      }
    } else {
      show_toast(2, "Please fill all the details properly!");
      preloader.style.display = "none";
    }
  });

  signupBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("signupemail").value;
    const user_name = document.getElementById("name").value;
    const password = document.getElementById("signuppassword").value;
    const mobile = document.getElementById("mobile").value;
    const confirmPassword = document.getElementById("confirm").value;

    if (!(email && password && user_name && mobile)) {
      show_toast(2, "Please fill all the details properly!");
      preloader.style.display = "none";
      return;
    }

    if (mobile.length != 10) {
      show_toast(2, "Mobile no. should be of 10 length!");
      return;
    }

    if (password != confirmPassword) {
      show_toast(2, "Passwords not matched with confirm password!");
      return;
    }

    if (password.length < 6) {
      show_toast(2, "Password should be minimum of 6 length!");
      return;
    }

    if (password.search(/[A-Z]/) < 0) {
      show_toast(2, "Password should contain atleast 1 uppercase letter!");
      return;
    }

    if (password.search(/[a-z]/) < 0) {
      show_toast(2, "Password should contain atleast 1 lowercase letter!");
      return;
    }

    if (password.search(/[0-9]/) < 0) {
      show_toast(2, "Password should contain atleast 1 digit!");
      return;
    }

    if (password.search(' ') != -1) {
      show_toast(2, "Password should not contain any spaces!");
      return;
    }

    if (!regularExpression.test(password)) {
      show_toast(2, "Password should contain atleast 1 special character!");
      return;
    }

    if (password.length > 20) {
      show_toast(2, "Password should be maximum of 20 length!");
      return;
    }
    preloader.style.display = "block";

    const signupRes = await fetch(`${apiURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, email, password, mobile }),
    });

    const signupData = await signupRes.json();

    if (signupRes.status == 400) {
      show_toast(2, "User already exists, Please sign in!");
      preloader.style.display = "none";
    } else if (signupRes.status == 444) {
      show_toast(2, `${signupData.error}`);
      preloader.style.display = "none";
    } else if (signupRes.status == 500) {
      show_toast(0, "Internal server error please re-try!");
      preloader.style.display = "none";
    } else {
      const token = signupData.data;
      localStorage.setItem("jwt", token);
      window.location.href = "./homepage.html";
    }
  });

  forgotPasswordBtn.addEventListener("click", async () => {
    preloader.style.display = "block";

    const email = document.getElementById("signinemail").value;

    const res4 = await fetch(`${apiURL}/auth/forgotpasswordsignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res4.status == 400) {
      preloader.style.display = "none";
      show_toast(2, "Please enter registered email-id!");
    } else if (res4.status == 500) {
      preloader.style.display = "none";
      show_toast(0, "Error occured re-try!");
      console.log(err);
    } else {
      preloader.style.display = "none";
      show_toast(1, "Link to reset password has been sent to your email-id!");
    }
  })

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



  preloader.style.display = "none";

  AOS.init({
    easing: 'ease-in-out',
    once: true,
    duration: 600,
  });
}

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