var slider = document.getElementsByClassName("slide")
let index_slider = 0;
var isNotHovering = true

var a = setInterval(() => {
    if (isNotHovering) {
        slider[index_slider].checked = true;
        index_slider++;
        index_slider = index_slider % 5;
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