let progress = document.getElementById("Progressbar");
let totalHeight = document.body.scrollHeight - window.innerHeight;
let windowWidth = window.innerWidth;
let limit = windowWidth - 100;
let limit2 = windowWidth - 20;
let coloer_grediet_value_1;
let coloer_grediet_value_2;
window.onscroll = function () {
  let progressHeight = (window.pageYOffset / totalHeight) * 100;
  progress.style.height = progressHeight + "%";

  coloer_grediet_value_1 = (210 - 150 * window.pageYOffset / totalHeight) + "," + (14  + 250)  + "," + 236
  coloer_grediet_value_2 = 11 + "," + 189 + "," + 202
  progress.style.background = "linear-gradient(to top, rgb(" + coloer_grediet_value_1 + "), rgb(" + coloer_grediet_value_2 + "))";

};
var y = 0;
let scrollPath = document.getElementById("scrollPath");
let scrollPath2 = document.getElementById("scrollPath2");
// scrollPath.addEventListener("mousemove", progressBarScroll);
let isProgressbarActive = false;

let timeTemp = Date.now()
console.log(timeTemp);


console.log(scrollPath2);

function startProgressbarScroll(e) {

  if (e.clientX > limit2) {
  isProgressbarActive = true;
  console.log("true")
  progressBarScroll(e)
  }

}
function stopProgressbarScroll(e) {
  isProgressbarActive = false;
  console.log("false")
}

function progressBarScroll(e) {
  // console.log(Date.now() - timeTemp)
  // if (Date.now() - timeTemp > 200) {
  if (isProgressbarActive) {
    if (e.clientX > limit) {
      y = e.clientY;
      window.scrollBy(0, (((y * totalHeight) / window.innerHeight) - window.pageYOffset) / 10);
    }
  }
  // timeTemp = Date.now()
  // }

}

document.addEventListener("mousedown", startProgressbarScroll);
document.addEventListener("touchstart", startProgressbarScroll);

document.addEventListener("mousemove", progressBarScroll);
document.addEventListener("touchmove", progressBarScroll);

document.addEventListener("mouseleave", stopProgressbarScroll);
document.addEventListener("mouseup", stopProgressbarScroll);
document.addEventListener("touchend", stopProgressbarScroll);

// let isDown = false;
// let startX;
// let scrollLeft;
// const slider = document.querySelector('.items');

// const end = () => {
// 	isDown = false;
//   slider.classList.remove('active');
// }

// const start = (e) => {
//   isDown = true;
//   slider.classList.add('active');
//   startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
//   scrollLeft = slider.scrollLeft;
// }

// const move = (e) => {
// 	if(!isDown) return;

//   e.preventDefault();
//   const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
//   const dist = (x - startX);
//   slider.scrollLeft = scrollLeft - dist;
// }

// (() => {
// 	slider.addEventListener('mousedown', start);
// 	slider.addEventListener('touchstart', start);

// 	slider.addEventListener('mousemove', move);
// 	slider.addEventListener('touchmove', move);

// 	slider.addEventListener('mouseleave', end);
// 	slider.addEventListener('mouseup', end);
// 	slider.addEventListener('touchend', end);
// })();
