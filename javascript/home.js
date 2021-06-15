let poster1 = document.getElementById("poster1");
let poster2 = document.getElementById("poster2");
let poster3 = document.getElementById("poster3");
let index = 0;
setInterval(()=>{
    if(index==0){
        poster1.classList.add("fade-class");
        poster2.classList.remove("fade-class");
    }
    else if(index == 1){
        poster2.classList.add("fade-class");
        poster3.classList.remove("fade-class");
    }
    else{
        poster3.classList.add("fade-class");
        poster1.classList.remove("fade-class");
    }
    index++;
    index = index%3;
},4000);