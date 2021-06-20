let primaryContainer = document.getElementById(
  "primary_container_for_home_page_content"
);
let primaryEventsPageContainer = document.getElementById(
  "primnary_event_details_container"
);

let slide1;
let slide2;
let slide3;
let slide4;
let slide5;

let poster1 = document.getElementById("poster1");
let poster2 = document.getElementById("poster2");
let poster3 = document.getElementById("poster3");

let preloader = document.getElementById("preloader_container");
const apiURL = "https://whispering-ridge-40670.herokuapp.com";
const token = localStorage.getItem("jwt");

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
// let isRegister = [];
let festData;
let userData;

let primary_events_posters =
  document.getElementsByClassName("event_poster_image");
let animationContainer = document.getElementById("preloader_container");

let backBtnFromEventsPage;

setTimeout(function () {
  backBtnFromEventsPage = document.getElementById(
    "back_btn_from_festival_details_page"
  );
  let registerBtn = document.getElementById("EventRegister");
  let eventId = 0;

  slide1 = document.getElementById("slide1");
  slide2 = document.getElementById("slide2");
  slide3 = document.getElementById("slide3");
  slide4 = document.getElementById("slide4");
  slide5 = document.getElementById("slide5");

  registerBtn.addEventListener("click", () => {
    if (!isRegister(eventId)) {
      fetch(`${apiURL}/fest/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ id: eventId }),
      })
        .then(function (res) {
          if (res.status == 400) {
            alert("Please verify your email!");
          } else if (res.status == 500) {
            alert("Please re-try...");
          } else {
            alert("User registered successfully!");
            let userarray = festData.find(
              (event) => (event.fest_id = eventId)
            ).user_id;
            userarray[userarray.length] = userData.user_id;
            console.log(userarray);
            registerBtn.innerHTML = `Unregister`;
            registerBtn.style.animation = "none";
          }
        })
        .catch((err) => {
          console.log(err);
          preloader.style.display = "none";
        });
    } else {
      fetch(`${apiURL}/fest/unregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ id: eventId }),
      })
        .then(function (res) {
          if (res.status == 400) {
            alert("Please verify your email!");
          } else if (res.status == 500) {
            alert("Please re-try...");
          } else {
            let userarray = festData.find(
              (event) => (event.fest_id = eventId)
            ).user_id;
            const userIndex = userarray.indexOf(userData.user_id);
            if (userIndex > -1) {
              userarray.splice(userIndex, 1);
            }
            alert("User unregistered successfully!");
            setRegisterBtnText(eventId);
          }
        })
        .catch((err) => {
          console.log(err);
          preloader.style.display = "none";
        });
    }
  });

  backBtnFromEventsPage.addEventListener("click", () => {
    displayMainContainer();
  });

  slide1.addEventListener("click", () => {
    eventId = 8;
    setDetails(eventId);
    displayEvenetspage();
  });
  slide2.addEventListener("click", () => {
    eventId = 9;
    setDetails(eventId);
    displayEvenetspage();
  });
  slide3.addEventListener("click", () => {
    eventId = 7;
    setDetails(eventId);
    displayEvenetspage();
  });
  slide4.addEventListener("click", () => {
    eventId = 6;
    setDetails(eventId);
    displayEvenetspage();
  });
  slide5.addEventListener("click", () => {
    eventId = 10;
    setDetails(eventId);
    displayEvenetspage();
  });
}, 200);

fetch(`${apiURL}/fest/getlist`, {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    festData = data.data;
  })
  .catch((err) => {
    console.log(err);
    preloader.style.display = "none";
  });

fetch(`${apiURL}/user/getdetails`, {
  method: "GET",
  headers: {
    authorization: token,
  },
})
  .then((res) => res.json())
  .then((data) => {
    userData = data.data;
  })
  .catch((err) => {
    console.log(err);
    preloader.style.display = "none";
  });

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
  window.scrollTo(0, eventsSection.offsetTop - 75);
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

function setRegisterBtnText(id) {
  const data = festData.find((item) => item.fest_id == id);
  let registerBtn = document.getElementById("EventRegister");
  registerBtn.style.animation =
    "bg_transition 0.4s ease-in-out alternate infinite";
  if (data.price == 0) {
    registerBtn.innerHTML = `register(free)`;
  } else {
    registerBtn.innerHTML = `register(${data.price})`;
  }
}

function isRegister(id) {
  const data = festData.find((item) => item.fest_id == id).user_id;
  if (data == null || !data.includes(userData.user_id)) return false;
  return true;
}

function setDetails(id) {
  const data = festData.find((item) => item.fest_id == id);

  let detailsContainer = document.getElementById("EventDetailsContainer");
  let name = document.getElementById("EventName");
  let date = document.getElementById("EventDate");
  let rules = document.getElementById("EventRulesContent");
  let description = document.getElementById("EventDescription");
  let prizes = document.getElementById("EventPrizesContent");
  let registerBtn = document.getElementById("EventRegister");
  let userArray = data.user_id;
  var sDate = new Date(parseInt(data.start_date));
  var eDate = new Date(parseInt(data.end_date));
  let startDate =
    sDate.getDate() + "-" + (sDate.getMonth() + 1) + "-" + sDate.getFullYear();
  let endDate =
    eDate.getDate() + "-" + (eDate.getMonth() + 1) + "-" + eDate.getFullYear();

  switch (id) {
    case 6:
      detailsContainer.style.backgroundImage =
        "url('../assets/home_page/events_details/rangshala_bg.svg'), linear-gradient(180deg, #0e1391 0%, #0e0045 100%)";
      break;
    case 7:
      detailsContainer.style.background =
        "url('../assets/home_page/events_details/raise_your_mic_bg.svg'), linear-gradient(180deg, #0e1391 0%, #0e0045 100%)";
      break;
    case 8:
      detailsContainer.style.background =
        "url('../assets/home_page/events_details/hot_stepper_bg.svg'), linear-gradient(180deg, #0e1391 0%, #0e0045 100%)";
      break;
    case 9:
      detailsContainer.style.background =
        "url('../assets/home_page/events_details/one_mic_stand_bg.svg'), linear-gradient(180deg, #0e1391 0%, #0e0045 100%)";
      break;
    case 10:
      detailsContainer.style.background =
        "url('../assets/home_page/events_details/strokes_bg.svg'), linear-gradient(180deg, #0e1391 0%, #0e0045 100%)";
      break;
  }

  name.innerHTML = `${data.fest_name}`;
  rules.innerHTML = `${data.rules}`;
  description.innerHTML = `${data.description}`;
  prizes.innerHTML = `${data.prize}`;
  date.innerHTML = `${startDate} - ${endDate}`;

  if (userArray == null || !userArray.includes(userData.user_id)) {
    registerBtn.style.animation =
      "bg_transition 0.4s ease-in-out alternate infinite";
    if (data.price == 0) {
      registerBtn.innerHTML = `register(free)`;
    } else {
      registerBtn.innerHTML = `register(${data.price})`;
    }
  } else {
    registerBtn.style.animation = "none";
    registerBtn.innerHTML = `unregister`;
  }
}

function displayMainContainer() {
  checkAndDisplayContainer(primaryContainer);
  checkAndCloseContainer(primaryEventsPageContainer);
}

function displayEvenetspage(data) {
  checkAndDisplayContainer(primaryEventsPageContainer);
  checkAndCloseContainer(primaryContainer);
}

// Functions for cleaner APIs for toggeling beetween pages

function checkAndCloseContainer(container) {
  if (container.classList.contains("display_to_block")) {
    container.classList.remove("display_to_block");
  }
  container.classList.add("display_to_none");

  setTimeout(function () {
    container.style.display = "none";
    container.style.opacity = 0;
  }, 500);
}

function checkAndDisplayContainer(container) {
  container.style.display = "block";
  container.style.opacity = 1;

  if (container.classList.contains("display_to_none")) {
    container.classList.remove("display_to_none");
  }
  container.classList.add("display_to_block");
}
