let primaryContainer = document.getElementById("primary_container_for_home_page_content");
let primaryEventsPageContainer = document.getElementById("primnary_event_details_container");


let slide1 = document.getElementById("slide1")
let slide2 = document.getElementById("slide2")





let poster1 = document.getElementById("poster1");
let poster2 = document.getElementById("poster2");
let poster3 = document.getElementById("poster3");
let preloader = document.getElementById("preloader_container");
let home = document.getElementById("home");
let events = document.getElementById("events");
let sponsers = document.getElementById("sponsers");
let team = document.getElementById("team");
let faq = document.getElementById("faq");
let dot = document.getElementById("dot");
let homeSection = document.getElementById("homesec");
let eventsSection = document.getElementById("eventssec");
let teamSection = document.getElementById("teamsec");
let sponsersSection = document.getElementById("sponser_container");
let faqSection = document.getElementById("faqsec");
let index = 0;
let activeTab = 0;

let primary_events_posters = document.getElementsByClassName("event_poster_image")
let animationContainer = document.getElementById("preloader_container");

setTimeout(function () {
  let registerEventButton = document.getElementById("EventRegister")

  registerEventButton.addEventListener("click", () => {
    displayMainContainer()
  });

}, 200);

window.addEventListener("load", () => {
  preloader.style.display = "none";
});

window.addEventListener("scroll", () => {
  let h = window.innerHeight;
  if (window.pageYOffset <= h / 2) {
    if (activeTab != 0) {
      activeTab = 0;
      setActive(0);
      deActive(1);
      deActive(2);
    }
  } else if (window.pageYOffset <= (h * 3) / 2) {
    if (activeTab != 1) {
      activeTab = 1;
      setActive(activeTab);
      deActive(0);
      deActive(2);
    }
  } else if (window.pageYOffset <= (h * 5) / 2) {
    if (activeTab != 2) {
      activeTab = 2;
      setActive(activeTab);
      deActive(1);
      deActive(3);
    }
  } else if (window.pageYOffset <= (h * 7) / 2) {
    if (activeTab != 3) {
      activeTab = 3;
      setActive(activeTab);
      deActive(2);
      deActive(4);
    }
  } else {
    if (activeTab != 4) {
      activeTab = 4;
      setActive(activeTab);
      deActive(3);
    }
  }
});

home.addEventListener("click", () => {
  window.scrollTo(0, homeSection.offsetTop - 125);
});
events.addEventListener("click", () => {
  window.scrollTo(0, eventsSection.offsetTop - 50);
});
team.addEventListener("click", () => {
  window.scrollTo(0, teamSection.offsetTop);
});
sponsers.addEventListener("click", () => {
  window.scrollTo(0, sponsersSection.offsetTop - 160);
});
faq.addEventListener("click", () => {
  window.scrollTo(0, faqSection.offsetTop);
});

function deActive(tabIndex) {
  switch (tabIndex) {
    case 0:
      dot.classList.remove("dothome");
      home.classList.remove("navactive");
      break;
    case 1:
      dot.classList.remove("dotevents");
      events.classList.remove("navactive");
      break;
    case 2:
      dot.classList.remove("dotteam");
      team.classList.remove("navactive");

      break;
    case 3:
      dot.classList.remove("dotsponsers");
      sponsers.classList.remove("navactive");

      break;
    case 4:
      dot.classList.remove("dotfaq");
      faq.classList.remove("navactive");

      break;
  }
}
function setActive(tabIndex) {
  switch (tabIndex) {
    case 0:
      home.classList.add("navactive");
      dot.classList.add("dothome");
      break;
    case 1:
      events.classList.add("navactive");
      dot.classList.add("dotevents");
      break;
    case 2:
      team.classList.add("navactive");
      dot.classList.add("dotteam");
      break;
    case 3:
      sponsers.classList.add("navactive");
      dot.classList.add("dotsponsers");
      break;
    case 4:
      faq.classList.add("navactive");
      dot.classList.add("dotfaq");
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


function displayMainContainer() {
  checkAndDisplayContainer(primaryContainer)
  checkAndCloseContainer(primaryEventsPageContainer)
}

function displayEvenetspage(data) {
  checkAndDisplayContainer(primaryEventsPageContainer)
  checkAndCloseContainer(primaryContainer)
}



function checkAndCloseContainer(container) {

  if (container.classList.contains("display_to_block")) {
    container.classList.remove("display_to_block")
  }
  container.classList.add("display_to_none")

  setTimeout(function () {
    container.style.display = "none";
    container.style.opacity = 0;
  }, 500);

}

function checkAndDisplayContainer(container) {

  container.style.display = "block"
  container.style.opacity = 1

  if (container.classList.contains("display_to_none")) {
    container.classList.remove("display_to_none")
  }
  container.classList.add("display_to_block")
}

slide1.addEventListener("click", () => {
  displayEvenetspage()
});
slide2.addEventListener("click", () => {
  displayEvenetspage()
});
