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
const apiURL = "https://whispering-ridge-40670.herokuapp.com";

window.addEventListener("load", () => {
  preloader.style.display = "none";
});

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
          window.location.href = "./homepage.html";
        } else {
          alert("Enter correct password !");
          preloader.style.display = "none";
        }
      })
      .catch((err) => {
        alert("Error signing in... Re-try...");
        console.log(err);
        preloader.style.display = "none";
      });
  } else {
    alert("Please fill all details !");
    preloader.style.display = "none";
  }
});

signupBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("signupemail").value;
  const name = document.getElementById("name").value;
  const password = document.getElementById("signuppassword").value;
  const mobile = document.getElementById("mobile").value;
  const confirmPassword = document.getElementById("confirm").value;

  if (password != confirmPassword) {
    alert("Passwords don't match!");
    return;
  }
  preloader.style.display = "block";

  if (email && password && name && mobile) {
    fetch(`${apiURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, mobile }),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.data;

        if (token) {
          localStorage.setItem("jwt", token);
          window.location.href = "./homepage.html";
        } else {
          alert("User already exist! Please Sign In!");
          preloader.style.display = "none";
        }
      })
      .catch((err) => {
        alert("Error signing up... Re-try...");
        console.log(err);
        preloader.style.display = "none";
      });
  } else {
    alert("Please fill all the details properly!");
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
