
let second = document.getElementById("secs");
let timeLeft = 5;
const apiURL = "https://whispering-ridge-40670.herokuapp.com/user/verifyuser";
let params = new URLSearchParams(location.search);
const userToken = params.get('token');
const token = localStorage.getItem("jwt");

async function countdown() {
    second.innerHTML = String(timeLeft) + " sec";
    if (timeLeft > 0) {
        setTimeout(countdown, 1000);
    }
    if (timeLeft == 0) {
        verifyUser();
    }
    timeLeft--;
};

async function verifyUser() {
    localStorage.setItem("jwt", userToken);
    const res = await fetch(`${apiURL}/${userToken}`, { method: "GET", });
    if (res.status == 200) {
        window.location.href = "../homepage.html";
    } else {
        second.innerHTML = `Not redirected? <a href="" id="re_try">click here</a>`
    }
}

setTimeout(countdown, 1000);