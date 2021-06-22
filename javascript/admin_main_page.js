const apiURL = "https://whispering-ridge-40670.herokuapp.com";
let token = localStorage.getItem("jwt");

let ongoingEventContainer = document.getElementById(
  "container_common_background"
);
let eventListArray = document.getElementsByClassName(
  "primary_event_list_admin_page"
);
let internalUserContainer = document.getElementById("internal_user_list");
let externalUserContainer = document.getElementById("external_user_list");

let ongoingEvents;

fetch(`${apiURL}/fest/ongoingevents`, {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    ongoingEvents = data.data;

    setOngoingEvents(ongoingEvents);
    setEventDetails(ongoingEvents[0]);
    setUserDetails(ongoingEvents[0].user_id, ongoingEvents[0].external_user_id);

    for (let eventInstance of eventListArray) {
      eventInstance.addEventListener("click", () => {
        const event = ongoingEvents.find(
          (item) => item.fest_id == eventInstance.id
        );
        setEventDetails(event);
        setUserDetails(event.user_id, event.external_user_id);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

function setOngoingEvents(array) {
  ongoingEventContainer.innerHTML = "";

  array.forEach((item) => {
    const { fest_id, fest_name, start_date, end_date } = item;

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
    event.classList.add("inner_list");
    event.classList.add("primary_event_list_admin_page");
    event.id = `${fest_id}`;

    const insideHtml = `<h3 class="innerList_h3">${fest_name}</h3>
    <h4 class="innerList_h4">${startDate} - ${endDate}</h4>
    `;

    event.innerHTML = insideHtml;

    ongoingEventContainer.appendChild(event);
  });
}

function setEventDetails(data) {
  let rules = document.getElementById("RulesContentinnerList");
  let description = document.getElementById("DescriptionContentinnerList");
  let prizes = document.getElementById("PrizesContentinnerList");

  rules.innerHTML = `${data.rules}`;
  description.innerHTML = `${data.description}`;
  prizes.innerHTML = `${data.prize}`;
}

function setUserDetails(array1, array2) {
  if (array1.length != 0) {
    fetch(`${apiURL}/user/userdetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ ids: array1.toString() }),
    })
      .then(function (res) {
        if (res.status == 400) {
          alert("You have not access to admin panel!");
        } else if (res.status == 500) {
          alert("Internal server error please re-try!");
        }
        return res.json();
      })
      .then((data) => {
        setInternalUserDetails(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    internalUserContainer.innerHTML = "";
  }
  if (array2 != null) {
    fetch(`${apiURL}/user/exuserdetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ ids: array2.toString() }),
    })
      .then(function (res) {
        if (res.status == 400) {
          alert("You have not access to admin panel!");
        } else if (res.status == 500) {
          alert("Internal server error please re-try!");
        }
        return res.json();
      })
      .then((data) => {
        setExternalUserDetails(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    externalUserContainer.innerHTML = "";
  }
}

function setInternalUserDetails(data) {
  internalUserContainer.innerHTML = "";

  data.forEach((item) => {
    const { user_name, email, mobile } = item;

    const user = document.createElement("div");
    user.classList.add("inner_list_content");

    const insideHtml = `<div class="inner_list">
    <div class="inner_list_content">
        <h3 class="innerList_h3" id="user_name">${user_name}</h3>
        <h4 class="innerList_h4" id="user_details">${email} || ${mobile}</h4>
    </div>
    <img src="../assets/home_page/Admin_page/delete_user_btn.svg" alt="">
</div>
    `;

    user.innerHTML = insideHtml;

    internalUserContainer.appendChild(user);
  });
}

function setExternalUserDetails(data) {
  externalUserContainer.innerHTML = "";

  data.forEach((item) => {
    const { username, email, mobile } = item;

    const user = document.createElement("div");
    user.classList.add("inner_list_content");

    const insideHtml = `<div class="inner_list">
    <div class="inner_list_content">
        <h3 class="innerList_h3" id="user_name">${username}</h3>
        <h4 class="innerList_h4" id="user_details">${email} || ${mobile}</h4>
    </div>
    <img src="../assets/home_page/Admin_page/delete_user_btn.svg" alt="">
</div>
    `;

    user.innerHTML = insideHtml;

    externalUserContainer.appendChild(user);
  });
}
