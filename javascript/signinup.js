let signup = document.getElementById("signup");
let signin = document.getElementById("signin");
let signincontainer = document.getElementById("signincontainer");
let signupcontainer = document.getElementById("signupcontainer");

signin.addEventListener("click",()=>{
    signincontainer.classList.toggle("display-class");
    signupcontainer.classList.toggle("display-class");
});
signup.addEventListener("click",()=>{
    signincontainer.classList.toggle("display-class");
    signupcontainer.classList.toggle("display-class");
});