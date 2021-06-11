let footer = document.getElementsByClassName("footer");
let arrow = document.getElementsByClassName("arrow");
let main = document.getElementsByClassName("main");
let down = true;
let count = 0;
arrow[0].addEventListener("click", () => {
    main[0].classList.toggle("main-opacity");
    count++;
    if(count%4==1){
        arrow[0].classList.toggle("scale");
        arrow[0].classList.toggle("rotate");
        arrow[0].classList.toggle("rotate2");
    }
    else if(count%4==2){
        arrow[0].classList.toggle("rotate");
        arrow[0].classList.toggle("rotate2");
        setTimeout(()=>{
            arrow[0].classList.toggle("scale");
        },700)
    }
    else if(count%4==3){
        arrow[0].classList.toggle("scale");
        arrow[0].classList.toggle("rotate2");
        arrow[0].classList.toggle("rotate");
    }
    else if(count%4==0){
        arrow[0].classList.toggle("rotate");
        arrow[0].classList.toggle("rotate2");
        setTimeout(()=>{
            arrow[0].classList.toggle("scale");
        },700)
    }
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
