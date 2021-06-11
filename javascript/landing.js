let footer = document.getElementsByClassName("footer");
let arrow = document.getElementsByClassName("arrow");
let down = true;

arrow[0].addEventListener("click", () => {
    arrow[0].classList.toggle("scale");
    arrow[0].classList.toggle("rotate");
    
    if (down) {
        footer[0].classList.toggle("display-none");
        let distance = 275;
        let a = setInterval(() => {
            console.log(distance);
            distance = distance - 5;
            scrollBy(0, 5);
            console.log(distance);
            if (distance <= 0) {
                clearInterval(a);
                down = false;
            }
        }, 8);
    } else {
        let upwards = 275;
        let b = setInterval(() => {
            console.log(upwards);
            upwards = upwards - 5;
            scrollBy(0, -5);
            console.log(upwards);
            if (upwards <= 0) {
                clearInterval(b);
                down = true;
                footer[0].classList.toggle("display-none");
            }
        }, 8);
    }
});
