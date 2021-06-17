let poster1 = document.getElementById("poster1");
let poster2 = document.getElementById("poster2");
let poster3 = document.getElementById("poster3");
let preloader = document.getElementById("preloader_container");
let home = document.getElementById("home");
let events = document.getElementById("events");
let sponsers = document.getElementById("sponsers");
let team = document.getElementById("team");
let faq = document.getElementById("faq");
let homeSection = document.getElementById("homesec");
let eventsSection = document.getElementById("eventssec");
let index = 0;
let activeTab = 0;

let animationContainer = document.getElementById("preloader_container");

window.addEventListener("load", () => {
  preloader.style.display = "none";
});

window.addEventListener("scroll", () => {
  let h = window.innerHeight;
  if (window.pageYOffset <= h / 2) {
    activeTab = 0;
  } else if (window.pageYOffset <= (h * 3) / 2) {
    activeTab = 1;
  } else if (window.pageYOffset <= (h * 5) / 2) {
    activeTab = 2;
  } else if (window.pageYOffset <= (h * 7) / 2) {
    activeTab = 3;
  } else {
    activeTab = 4;
  }
});

$("li").on("click", function (event) {
  // Make sure this.hash has a value before overriding default behavior

  // Prevent default anchor click behavior
  event.preventDefault();

  // Store hash
  var hash = this.hash;

  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
  $("html, body").animate(
    {
      scrollTop: 500,
    },
    800,
    function () {
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = homeSection;
    }
  );
  // End if
});

events.addEventListener("click", () => {});
sponsers.addEventListener("click", () => {});
team.addEventListener("click", () => {});
faq.addEventListener("click", () => {});

setInterval(() => {
  if (index == 0) {
    poster1.classList.add("fade-class");
    poster2.classList.remove("fade-class");
  } else if (index == 1) {
    poster2.classList.add("fade-class");
    poster3.classList.remove("fade-class");
  } else {
    poster3.classList.add("fade-class");
    poster1.classList.remove("fade-class");
  }
  index++;
  index = index % 3;
}, 4000);
