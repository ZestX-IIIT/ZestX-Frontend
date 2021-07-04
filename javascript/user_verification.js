
let second = document.getElementById("secs");
let timeLeft = 8;

function countdown() {
    timeLeft--;
    document.getElementById("secs").innerHTML = String(timeLeft) + " sec";
    if (timeLeft > 0) {
        setTimeout(countdown, 1000);
    }
};

setTimeout(countdown, 1000);