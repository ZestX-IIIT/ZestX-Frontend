var slider = document.getElementsByClassName("slide")
let index = 0;
var isNotHovering = true

var a = setInterval(() => {
    if (isNotHovering) {
        slider[index].checked = true;
        index++;
        index = index % 5;
    }
}, 2500)


var slide = document.getElementById("slider");
slide.addEventListener('mouseover', () => {
    console.log('hello')
    isNotHovering = false
})

slide.addEventListener('mouseout', () => {
    isNotHovering = true
})