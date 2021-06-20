let primaryContainer = document.getElementById(
  "primary_container_for_home_page_content"
);
let primaryEventsPageContainer = document.getElementById(
  "primnary_event_details_container"
);
let primaryProfilePageContainer = document.getElementById(
  "primnary_profile_details_container"
);
let primaryEditProfileContainer = document.getElementById(
  "primnary_edit_profile_container"
);
let preloader = document.getElementById("preloader_container");

let slider_event_list;
let event_poster_list;

let poster1 = document.getElementById("poster1");
let poster2 = document.getElementById("poster2");
let poster3 = document.getElementById("poster3");

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
let festData;
let userData;

let primary_events_posters =
  document.getElementsByClassName("event_poster_image");

let backBtnFromEventsPage;
let backBtnFromProfilePage;
let backBtnFromEditProfilePage;
let editBtn;
let profileBtn = document.getElementById("profile_button");

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

profileBtn.addEventListener("click", () => {
  displayProfilepage();
  setUserDetails(userData);
});

window.addEventListener("load", () => {
  preloader.style.display = "none";

  setTimeout(function () {
    backBtnFromEventsPage = document.getElementById(
      "back_btn_from_festival_details_page"
    );
    backBtnFromProfilePage = document.getElementById(
      "back_btn_from_profile_details_page"
    );
    backBtnFromEditProfilePage = document.getElementById(
      "back_btn_from_edit_profile_page"
    );
    editBtn = document.getElementById("EditButton");
    let registerBtn = document.getElementById("EventRegister");
    let eventId = 0;

    slider_event_list = document.getElementsByClassName("slide");
    event_poster_list = document.getElementsByClassName("event_poster_image");
    let event_ids = [8, 9, 7, 6, 10];

    registerBtn.addEventListener("click", () => {
      displayPreloder();
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
              displayEvenetspage();
              alert("Please verify your email!");
            } else if (res.status == 500) {
              displayEvenetspage();
              alert("Please re-try...");
            } else {
              displayEvenetspage();
              alert("User registered successfully!");
              let userarray = festData.find(
                (event) => event.fest_id == eventId
              ).user_id;
              userarray[userarray.length] = userData.user_id;
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
              displayEvenetspage();
              alert("Please verify your email!");
            } else if (res.status == 500) {
              displayEvenetspage();
              alert("Please re-try...");
            } else {
              displayEvenetspage();
              let userarray = festData.find(
                (event) => event.fest_id == eventId
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
    backBtnFromProfilePage.addEventListener("click", () => {
      displayMainContainer();
    });
    backBtnFromEditProfilePage.addEventListener("click", () => {
      displayProfilepage();
      setUserDetails(userData);
    });
    editBtn.addEventListener("click", () => {
      displayEditProfilepage();
      setUserDetailsInEditPage(userData);
    });
    for (let i = 0; i < 5; i++) {
      event_poster_list[i].addEventListener("click", () => {
        if (slider_event_list[i].checked == true) {
          eventId = event_ids[i];
          setEventDetails(event_ids[i]);
          displayEvenetspage();
        }
      });
    }
  }, 500);
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

function setUserDetails(data) {
  let name = document.getElementById("name");
  name.value = `${data.user_name}`;
  let mobile = document.getElementById("phone_number");
  mobile.value = `${data.mobile}`;
  let email = document.getElementById("email");
  email.value = `${data.email}`;
}

function setUserDetailsInEditPage(data) {
  let name = document.getElementById("edit_name");
  name.value = `${data.user_name}`;
  let mobile = document.getElementById("edit_phone_number");
  mobile.value = `${data.mobile}`;
  let email = document.getElementById("edit_email");
  email.value = `${data.email}`;
}

function setEventDetails(id) {
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
  checkAndCloseContainer(preloader);
  checkAndCloseContainer(primaryProfilePageContainer);
  checkAndCloseContainer(primaryEditProfileContainer);
}

function displayPreloder() {
  checkAndDisplayContainer(preloader);
  checkAndCloseContainer(primaryEventsPageContainer);
  checkAndCloseContainer(primaryContainer);
  checkAndCloseContainer(primaryProfilePageContainer);
  checkAndCloseContainer(primaryEditProfileContainer);
}

function displayEvenetspage() {
  checkAndDisplayContainer(primaryEventsPageContainer);
  checkAndCloseContainer(primaryContainer);
  checkAndCloseContainer(preloader);
  checkAndCloseContainer(primaryProfilePageContainer);
  checkAndCloseContainer(primaryEditProfileContainer);
}

function displayProfilepage() {
  checkAndDisplayContainer(primaryProfilePageContainer);
  checkAndCloseContainer(primaryContainer);
  checkAndCloseContainer(preloader);
  checkAndCloseContainer(primaryEventsPageContainer);
  checkAndCloseContainer(primaryEditProfileContainer);
}

function displayEditProfilepage() {
  checkAndDisplayContainer(primaryEditProfileContainer);
  checkAndCloseContainer(primaryContainer);
  checkAndCloseContainer(preloader);
  checkAndCloseContainer(primaryEventsPageContainer);
  checkAndCloseContainer(primaryProfilePageContainer);
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
