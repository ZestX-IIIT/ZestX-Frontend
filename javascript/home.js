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

var nav = document.getElementById("navelements");
var line = $("<div />").addClass("line");

line.appendTo(nav);

var active = nav.find(".active");
var pos = 0;
var wid = 0;

if (active.length) {
  pos = active.position().left;
  wid = active.width();
  line.css({
    left: pos,
    width: wid,
  });
}

nav.find("ul li a").click(function (e) {
  e.preventDefault();
  if (!$(this).parent().hasClass("active") && !nav.hasClass("animate")) {
    nav.addClass("animate");

    var _this = $(this);

    nav.find("ul li").removeClass("active");

    var position = _this.parent().position();
    var width = _this.parent().width();

    if (position.left >= pos) {
      line.animate(
        {
          width: position.left - pos + width,
        },
        300,
        function () {
          line.animate(
            {
              width: width,
              left: position.left,
            },
            150,
            function () {
              nav.removeClass("animate");
            }
          );
          _this.parent().addClass("active");
        }
      );
    } else {
      line.animate(
        {
          left: position.left,
          width: pos - position.left + wid,
        },
        300,
        function () {
          line.animate(
            {
              width: width,
            },
            150,
            function () {
              nav.removeClass("animate");
            }
          );
          _this.parent().addClass("active");
        }
      );
    }

    pos = position.left;
    wid = width;
  }
});

home.addEventListener("click", () => {});

events.addEventListener("click", () => {});
team.addEventListener("click", () => {});
sponsers.addEventListener("click", () => {});
faq.addEventListener("click", () => {});

$('a[href^="#"]').on("click", function (e) {
  // e.preventDefault();

  var target = this.hash,
    $target = $(target);

  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $target.offset().top - 70,
      },
      900,
      "swing",
      function () {
        window.location.hash = target;
      }
    );
});

function toggleActiveTab(tabIndex) {
  switch (activeTab) {
    case 0:
      home.classList.toggle("navactive");
      break;
    case 1:
      events.classList.toggle("navactive");
      break;
    case 2:
      team.classList.toggle("navactive");

      break;
    case 3:
      sponsers.classList.toggle("navactive");

      break;
    case 4:
      faq.classList.toggle("navactive");

      break;
  }
}

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
