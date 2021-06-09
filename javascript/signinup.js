let signup = document.getElementById("signup");
let signin = document.getElementById("signin");
let signincontainer = document.getElementById("signincontainer");
let signupcontainer = document.getElementById("signupcontainer");
let bg1 = document.getElementById("bg1")
let bg2 = document.getElementById("bg2")
let bg3 = document.getElementById("bg3")
let bg4 = document.getElementById("bg4")

signin.addEventListener("click",()=>{
    signincontainer.classList.toggle("display-class");
    signincontainer.classList.toggle("opacity-class");
    signupcontainer.classList.toggle("opacity-class");
    signupcontainer.classList.toggle("display-class");
    bg1.classList.toggle("opacity-class")
    bg2.classList.toggle("opacity-class")
    bg3.classList.toggle("opacity-class")
    bg4.classList.toggle("opacity-class")
    bg1.classList.toggle("display-class")
    bg2.classList.toggle("display-class")
    bg3.classList.toggle("display-class")
    bg4.classList.toggle("display-class")
});
signup.addEventListener("click",()=>{
    signincontainer.classList.toggle("display-class");
    signupcontainer.classList.toggle("display-class");
    signincontainer.classList.toggle("opacity-class");
    signupcontainer.classList.toggle("opacity-class");  
    bg1.classList.toggle("opacity-class")
    bg2.classList.toggle("opacity-class")
    bg3.classList.toggle("opacity-class")
    bg4.classList.toggle("opacity-class")
    bg1.classList.toggle("display-class")
    bg2.classList.toggle("display-class")
    bg3.classList.toggle("display-class")
    bg4.classList.toggle("display-class")  
});
