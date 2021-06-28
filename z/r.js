let progress = document.getElementById("Progressbar");
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
  let progressHeight = (window.pageYOffset / totalHeight) * 100;
  progress.style.height = progressHeight + "%";
};
var y = 0;
let scrollPath = document.getElementById("scrollPath");
// scrollPath.addEventListener("mousemove", progressBarScroll);
let isProgressbarActive = false;

function startProgressbarScroll(e) {
  isProgressbarActive = true;
}
function stopProgressbarScroll(e) {
  isProgressbarActive = false;
}

function progressBarScroll(e) {
  if (isProgressbarActive) {
    y = e.clientY;
    console.log(y);
    window.scrollBy(0,  (((y * totalHeight) / window.innerHeight) - window.pageYOffset)/10);
  }
}
scrollPath.addEventListener("mousedown", startProgressbarScroll);
scrollPath.addEventListener("touchstart", startProgressbarScroll);

scrollPath.addEventListener("mousemove", progressBarScroll);
scrollPath.addEventListener("touchmove", progressBarScroll);

scrollPath.addEventListener("mouseleave", stopProgressbarScroll);
scrollPath.addEventListener("mouseup", stopProgressbarScroll);
scrollPath.addEventListener("touchend", stopProgressbarScroll);

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
