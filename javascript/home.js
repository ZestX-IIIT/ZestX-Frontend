let nabar_container = document.getElementById("nabar_container");
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
let primaryChangePasswordContainer = document.getElementById(
  "primnary_change_password_container"
);
let preloader = document.getElementById("preloader_container");

let slider_event_list;
let event_poster_list;

let poster1 = document.getElementById("poster1");
let poster2 = document.getElementById("poster2");
let poster3 = document.getElementById("poster3");

const apiURL = "https://whispering-ridge-40670.herokuapp.com";
let token = localStorage.getItem("jwt");

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
let event_ids = [8, 9, 7, 6, 10];

let primary_events_posters =
  document.getElementsByClassName("event_poster_image");

let backBtnFromEventsPage;
let backBtnFromProfilePage;
let backBtnFromEditProfilePage;
let backBtnFromChangePasswordPage;
let editBtn;
let saveBtn;
let updateBtn;
let logoutBtn;
let changePasswordBtn;
let profileBtn = document.getElementById("profile_button");
let ongoingEventContainer;
let pastEventContainer;
let lastToastTimestamp = Date.now();

setup();

async function setup() {
  try {
    const res1 = await fetch(`${apiURL}/fest/getlist`, {
      method: "GET",
    });

    const data1 = await res1.json();
    festData = data1.data;

    const res2 = await fetch(`${apiURL}/user/getdetails`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    });

    const data2 = await res2.json();
    userData = data2.data;
    profileBtn.innerHTML = `${userData.user_name[0]}`;
  } catch (err) {
    show_toast(0, "Error occured re-try!");
    console.log(err);
  }
}

window.addEventListener("load", () => {
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
    backBtnFromChangePasswordPage = document.getElementById(
      "back_btn_from_change_password_page"
    );

    ongoingEventContainer = document.getElementById("OngoingEventsList");
    pastEventContainer = document.getElementById("PastEventsList");

    profileBtn.addEventListener("click", () => {
      displayProfilepage();
    });

    editBtn = document.getElementById("EditButton");
    saveBtn = document.getElementById("SaveButton");
    updateBtn = document.getElementById("UpdateButton");
    changePasswordBtn = document.getElementById("ChangePasswordButton");
    logoutBtn = document.getElementById("LogoutButton");

    let registerBtn = document.getElementById("EventRegister");
    let eventId = 0;

    slider_event_list = document.getElementsByClassName("slide");
    event_poster_list = document.getElementsByClassName("event_poster_image");

    try {
      registerBtn.addEventListener("click", async () => {
        displayPreloder();

        if (!isRegister(eventId)) {
          const res3 = await fetch(`${apiURL}/fest/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
            body: JSON.stringify({ id: eventId }),
          });
          if (res3.status == 400) {
            displayEvenetspage();
            show_toast(2, "Please verify your email!");
          } else if (res3.status == 500) {
            displayEvenetspage();
            show_toast(0, "Error occured Please re-try!");
          } else {
            displayEvenetspage();
            show_toast(1, "User registered successfully!");
            let userarray = festData.find(
              (event) => event.fest_id == eventId
            ).user_id;
            userarray[userarray.length] = userData.user_id;
            userData.fest_id[userData.fest_id.length] = `${eventId}`;
            registerBtn.innerHTML = `Unregister`;
            registerBtn.style.animation = "none";
          }
        } else {
          const res4 = await fetch(`${apiURL}/fest/unregister`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
            body: JSON.stringify({ id: eventId }),
          });
          if (res4.status == 400) {
            displayEvenetspage();
            show_toast(2, "Please verify your email!");
          } else if (res4.status == 500) {
            displayEvenetspage();
            show_toast(0, "Error occured Please re-try!");
          } else {
            displayEvenetspage();
            let userarray = festData.find(
              (event) => event.fest_id == eventId
            ).user_id;
            const userIndex = userarray.indexOf(userData.user_id);
            const eventIndex = userData.fest_id.indexOf(`${eventId}`);
            if (userIndex > -1) {
              userarray.splice(userIndex, 1);
            }
            if (eventIndex > -1) {
              userData.fest_id.splice(eventIndex, 1);
            }
            show_toast(1, "User unregistered successfully!");
            setRegisterBtnText(eventId);
          }
        }
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

      backBtnFromEventsPage.addEventListener("click", () => {
        displayMainContainer();
      });

      backBtnFromProfilePage.addEventListener("click", () => {
        displayMainContainer();
        profileBtn.innerHTML = `${userData.user_name[0]}`;
      });

      backBtnFromChangePasswordPage.addEventListener("click", () => {
        displayProfilepage();
      });

      backBtnFromEditProfilePage.addEventListener("click", () => {
        displayProfilepage();
      });

      editBtn.addEventListener("click", () => {
        displayEditProfilepage();
        setUserDetailsInEditPage(userData);
      });

      changePasswordBtn.addEventListener("click", () => {
        displayChangePasswordpage();
        clearDataInChangePasswordpage();
      });

      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("jwt");
        location.href = "/";
      });

      updateBtn.addEventListener("click", async () => {
        let oldPassword = document.getElementById("current_password").value;
        let newPassword = document.getElementById("new_password").value;
        let confirmNewPassword = document.getElementById(
          "confirm_new_password"
        ).value;

        if (newPassword != confirmNewPassword) {
          show_toast(2, "Confirm new password not matched with new password!");
        } else if (newPassword.length < 6) {
          show_toast(2, "Password should be minimum of 6 length!");
        } else if (oldPassword && newPassword && confirmNewPassword) {
          displayPreloder();

          const res6 = await fetch(`${apiURL}/user/changepassword`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              oldPassword,
              newPassword,
            }),
          });

          if (res6.status == 400) {
            displayChangePasswordpage();
            show_toast(2, "Incorrect current password!");
          } else if (res6.status == 500) {
            displayChangePasswordpage();
            show_toast(0, "Internal server error please re-try!");
          } else {
            show_toast(1, "Your password updated successfully!");
            displayProfilepage();
          }
        } else {
          show_toast(2, "Please enter all details properly!");
        }
      });

      saveBtn.addEventListener("click", async () => {
        let email = document.getElementById("edit_email").value;
        let user_name = document.getElementById("edit_name").value;
        let mobile = document.getElementById("edit_phone_number").value;
        let password = document.getElementById("password").value;

        if (password && email && mobile && user_name) {
          displayPreloder();

          const res5 = await fetch(`${apiURL}/user/updatedetails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              user_name,
              email,
              password,
              mobile,
            }),
          });

          if (res5.status == 400) {
            displayEditProfilepage();
            show_toast(2, "Incorrect Password!");
          } else if (res5.status == 500) {
            displayEditProfilepage();
            show_toast(0, "Internal server error please re-try!");
          } else if (res5.status == 200) {
            show_toast(1, "Your details updated successfully!");
            userData.user_name = user_name;
            userData.mobile = mobile;
            displayProfilepage();
          } else {
            show_toast(
              1,
              "Your details updated successfully! Please verify your updated email-id!"
            );

            userData.user_name = user_name;
            userData.email = email;
            userData.mobile = mobile;
            displayProfilepage();
          }

          const data5 = await res5.json();
          if (data5.token) {
            localStorage.setItem("jwt", data5.token);
          }
        } else {
          show_toast(2, "Please enter all details properly!");
        }
      });
    } catch (err) {
      show_toast(0, "Error occured re-try!");
      console.log(err);
    }
  }, 500);

  displayMainContainer();
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
// let current_offset_height = homeSection.offsetTop - 125;
// let current_active_tab = 0;
// let smooth_setinterval;
// function smooth_scroll_home_page(target_height) {
//   if (target_height > current_offset_height) {
//     smooth_setinterval = setInterval(() => {
//       current_offset_height = current_offset_height + 1;
//       scrollBy(0, 1);
//       if (target_height <= current_offset_height) {
//         clearInterval(smooth_setinterval);
//       }
//     }, 1);
//   } else if (target_height < current_offset_height) {
//     smooth_setinterval = setInterval(() => {
//       current_offset_height = current_offset_height - 1;
//       scrollBy(0, -1);
//       if (target_height >= current_offset_height) {
//         clearInterval(smooth_setinterval);
//       }
//     }, 1);
//   }
//   else {
//     return;
//   }
// }
console.log(teamSection.offsetHeight);
home.addEventListener("click", () => {
  homeSection.scrollIntoView( {behavior: "smooth"})
  // window.scrollTo(0, homeSection.offsetHeight);
  // smooth_scroll_home_page(homeSection.offsetTop - 125);
  // console.log(current_active_tab);
});
events.addEventListener("click", () => {
  eventsSection.scrollIntoView({behavior: "smooth"})
  
  // window.scrollTo(0, eventsSection.offsetHeight);
  // smooth_scroll_home_page(eventsSection.offsetTop - 75);
  // console.log(current_active_tab);
});
team.addEventListener("click", () => {
  teamSection.scrollIntoView({behavior: "smooth"})
  // window.scrollTo(0, teamSection.offsetHeight);
  // smooth_scroll_home_page(teamSection.offsetTop);
  // console.log(current_active_tab);
});
sponsers.addEventListener("click", () => {
  // window.scrollTo(0, sponsersSection.offsetHeight);
  // smooth_scroll_home_page(sponsersSection.offsetTop);
  // console.log(current_active_tab);
  sponsersSection.scrollIntoView({behavior: "smooth"})
});
faq.addEventListener("click", () => {
  // window.scrollTo(0, faqSection.offsetHeight);
  // smooth_scroll_home_page(faqSection.offsetTop);
  // console.log(current_active_tab);
  faqSection.scrollIntoView({behavior: "smooth"})
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
  let mobile = document.getElementById("phone_number");
  let email = document.getElementById("email");
  name.value = `${data.user_name}`;
  mobile.value = `${data.mobile}`;
  email.value = `${data.email}`;

  let ongoingEventsArray = [];
  let pastEventsArray = [];

  if (data.fest_id == null) {
    return;
  } else {
    festData.forEach((event) => {
      if (data.fest_id.includes(`${event.fest_id}`)) {
        if (Date.now() < parseInt(event.end_date)) {
          ongoingEventsArray[ongoingEventsArray.length] = event;
        } else {
          pastEventsArray[pastEventsArray.length] = event;
        }
      }
    });
    addEvents(ongoingEventsArray, pastEventsArray);
  }
}

function addEvents(array1, array2) {
  ongoingEventContainer.innerHTML = "";
  pastEventContainer.innerHTML = "";

  array1.forEach((item) => {
    const { fest_name, start_date, end_date } = item;

    var sDate = new Date(parseInt(start_date));
    var eDate = new Date(parseInt(end_date));
    let startDate =
      sDate.getDate() +
      "-" +
      (sDate.getMonth() + 1) +
      "-" +
      sDate.getFullYear();
    let endDate =
      eDate.getDate() +
      "-" +
      (eDate.getMonth() + 1) +
      "-" +
      eDate.getFullYear();

    const event = document.createElement("div");
    event.classList.add("EventList");
    event.id = "Event_1";

    const insideHtml = `<h2>${fest_name}</h2>
    <h4>${startDate} - ${endDate}</h4>
    
    `;

    event.innerHTML = insideHtml;

    ongoingEventContainer.appendChild(event);
  });
  array2.forEach((item) => {
    const { fest_name, description, start_date, end_date } = item;

    var sDate = new Date(parseInt(start_date));
    var eDate = new Date(parseInt(end_date));
    let startDate =
      sDate.getDate() +
      "-" +
      (sDate.getMonth() + 1) +
      "-" +
      sDate.getFullYear();
    let endDate =
      eDate.getDate() +
      "-" +
      (eDate.getMonth() + 1) +
      "-" +
      eDate.getFullYear();

    const event = document.createElement("div");
    event.classList.add("EventList");
    event.id = "Event_1";

    const insideHtml = `<h2>${fest_name}</h2>
    <h4>${startDate} - ${endDate}</h4>
    
    `;

    event.innerHTML = insideHtml;
    pastEventContainer.appendChild(event);
  });
}

function clearDataInChangePasswordpage() {
  let oldPassword = document.getElementById("current_password");
  oldPassword.value = "";
  let newPassword = document.getElementById("new_password");
  newPassword.value = "";
  let confirmNewPassword = document.getElementById("confirm_new_password");
  confirmNewPassword.value = "";
}

function show_toast(isSuccess, message) {
  if (Date.now() - lastToastTimestamp > 5000) {
    let toastAlertMessage = document.getElementById("toastAlertMessage");
    let toastImage = document.getElementById("toastImage");
    let toastFrontMessage = document.getElementById("toastFrontMessage");
    let toastDescriptionMessage = document.getElementById(
      "toastDescriptionMessage"
    );
    let msgLength = message.length + 7;

    document
      .getElementById("toastAlertMessage")
      .style.setProperty("--foo", `${msgLength}ch`);

    if (isSuccess == 1) {
      toastImage.src = "../assets/_general/success_tick.svg";
      toastFrontMessage.style.backgroundColor = "green";
    } else if (isSuccess == 0) {
      toastImage.src = "../assets/_general/error_cross.svg";
      toastFrontMessage.style.backgroundColor = "red";
    } else {
      toastImage.src = "../assets/_general/neutral_exclamation.svg";
      toastFrontMessage.style.backgroundColor = "black";
    }
    toastDescriptionMessage.innerText = " ";
    setTimeout(function () {
      toastDescriptionMessage.innerText = message;
    }, 600);
    setTimeout(function () {
      toastDescriptionMessage.innerText = " ";
    }, 4200);
    toastAlertMessage.className = "toastPopUp";
    setTimeout(function () {
      toastAlertMessage.className = toastAlertMessage.className.replace(
        "toastPopUp",
        ""
      );
    }, 5000);
    lastToastTimestamp = Date.now();
  } else {
    setTimeout(function () {
      show_toast(isSuccess, message);
    }, 5500 - (Date.now() - lastToastTimestamp));
  }
}

function setUserDetailsInEditPage(data) {
  let name = document.getElementById("edit_name");
  name.value = `${data.user_name}`;
  let mobile = document.getElementById("edit_phone_number");
  mobile.value = `${data.mobile}`;
  let email = document.getElementById("edit_email");
  email.value = `${data.email}`;
  let password = document.getElementById("password");
  password.value = "";
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
  checkAndDisplayContainer(nabar_container);
  checkAndCloseContainer(primaryEventsPageContainer);
  checkAndCloseContainer(preloader);
  checkAndCloseContainer(primaryProfilePageContainer);
  checkAndCloseContainer(primaryChangePasswordContainer);
  checkAndCloseContainer(primaryEditProfileContainer);
}

function displayPreloder() {
  checkAndDisplayContainer(preloader);
  checkAndCloseContainer(primaryEventsPageContainer);
  checkAndCloseContainer(primaryContainer);
  checkAndCloseContainer(primaryProfilePageContainer);
  checkAndCloseContainer(primaryEditProfileContainer);
  checkAndCloseContainer(primaryChangePasswordContainer);
  checkAndCloseContainer(nabar_container);
}

function displayEvenetspage() {
  checkAndDisplayContainer(primaryEventsPageContainer);
  checkAndCloseContainer(primaryContainer);
  checkAndCloseContainer(preloader);
  checkAndCloseContainer(primaryProfilePageContainer);
  checkAndCloseContainer(primaryEditProfileContainer);
  checkAndCloseContainer(primaryChangePasswordContainer);
  checkAndCloseContainer(nabar_container);
}

function displayChangePasswordpage() {
  checkAndDisplayContainer(primaryChangePasswordContainer);
  checkAndCloseContainer(primaryEventsPageContainer);
  checkAndCloseContainer(primaryContainer);
  checkAndCloseContainer(preloader);
  checkAndCloseContainer(primaryProfilePageContainer);
  checkAndCloseContainer(primaryEditProfileContainer);
  checkAndCloseContainer(nabar_container);
}

function displayProfilepage() {
  setUserDetails(userData);
  checkAndDisplayContainer(primaryProfilePageContainer);
  checkAndCloseContainer(primaryChangePasswordContainer);
  checkAndCloseContainer(primaryContainer);
  checkAndCloseContainer(preloader);
  checkAndCloseContainer(primaryEventsPageContainer);
  checkAndCloseContainer(primaryEditProfileContainer);
  checkAndCloseContainer(nabar_container);
}

function displayEditProfilepage() {
  checkAndDisplayContainer(primaryEditProfileContainer);
  checkAndCloseContainer(primaryChangePasswordContainer);
  checkAndCloseContainer(primaryContainer);
  checkAndCloseContainer(preloader);
  checkAndCloseContainer(primaryEventsPageContainer);
  checkAndCloseContainer(primaryProfilePageContainer);
  checkAndCloseContainer(nabar_container);
}

// Functions for cleaner APIs for toggeling beetween pages

function checkAndCloseContainer(container) {
  if (container.classList.contains("display_to_block")) {
    container.classList.remove("display_to_block");
  }
  container.classList.add("display_to_none");

  if (container.style.display != "none") {
    container.classList.add("display_to_none");

    setTimeout(function () {
      container.style.display = "none";
      container.style.opacity = 0;
    }, 500);
  }
}

function checkAndDisplayContainer(container) {
  if (container == primaryContainer) {
    container.style.display = "grid";
  } else if (container == nabar_container) {
    container.style.display = "flex";
  } else {
    container.style.display = "block";
  }
  container.style.opacity = 1;
  if (container.classList.contains("display_to_none")) {
    container.classList.remove("display_to_none");
  }
  container.classList.add("display_to_block");
}
