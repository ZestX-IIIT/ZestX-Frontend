var slider = document.getElementsByClassName("slide")
let index = 0;

var a = setInterval(()=>{
    slider[index].checked = true;
    index++;
    index = index%5;
},2500)
var slide = document.getElementById("slider");
slide.addEventListener('mouseover' , ()=>{
    console.log('hello')
    clearInterval(a)
})

slide.addEventListener('mouseout' , ()=>{
    a = setInterval(()=>{
        slider[index].checked = true;
        index++;
        index = index%5;
    },2500)
})