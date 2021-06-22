const apiURL = "https://whispering-ridge-40670.herokuapp.com";
let token = localStorage.getItem("jwt");

let ongoingEventContainer = document.getElementById(
    "container_common_background"
);
let eventListArray = document.getElementsByClassName(
    "primary_event_list_admin_page"
);

let adminMainPage = document.getElementById("admin_main_page_container");
let preloader = document.getElementById("admin_preloader_container");
let adminAddUserPage = document.getElementById("admin_add_user_page_container");
let internalUserContainer = document.getElementById("internal_user_list");
let externalUserContainer = document.getElementById("external_user_list");
let addUserBtnFromMainPage = document.getElementById("secondh2");

let backBtnFromAddUserPage;
let addUserBtnFromAddUserPage;
let username;
let email;
let mobile;
let ongoingEvents;
let isFirstTime = true;

setTimeout(function () {

    backBtnFromAddUserPage = document.getElementById("back_btn_from_add_user_page");
    addUserBtnFromAddUserPage = document.getElementById("Add_user_button");
    username = document.getElementById("name").value;
    email = document.getElementById("email").value;
    mobile = document.getElementById("phone_number").value;

    addUserBtnFromAddUserPage.addEventListener("click", () => {
        console.log(username, email, mobile);

        if (username && (email || mobile)) {
            displayPreloder();
            fetch(`${apiURL}/fest/adduser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
                body: JSON.stringify({ username, email, mobile }),
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
                    alert("User added successfully!");
                    displayAdminMainpage();
                })
                .catch((err) => {
                    console.log(err);
                });

        } else if (username.length == 0) {
            alert("Please fill name!");
        } else {
            alert("Please fill atleast one of email and phone number!");
        }
    })

    backBtnFromAddUserPage.addEventListener("click", () => {
        displayAdminMainpage();
    })

}, 100);

addUserBtnFromMainPage.addEventListener("click", () => {
    displayAdminAddUserPage();
})

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
                checkAndCloseContainer(internalUserContainer);
                checkAndCloseContainer(externalUserContainer);
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
                checkAndDisplayContainer(internalUserContainer);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        internalUserContainer.innerHTML = "";
        checkAndDisplayContainer(internalUserContainer);
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
                if (isFirstTime) {
                    setTimeout(function () {
                        displayAdminMainpage();
                    }, 100);
                    isFirstTime = false;
                } else {
                    checkAndDisplayContainer(externalUserContainer);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        externalUserContainer.innerHTML = "";
        if (isFirstTime) {
            setTimeout(function () {
                displayAdminMainpage();
            }, 100);
            isFirstTime = false;
        } else {
            checkAndDisplayContainer(externalUserContainer);
        }
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
        let insideHtml;

        if (email && mobile) {
            insideHtml = `<div class="inner_list">
        <div class="inner_list_content">
            <h3 class="innerList_h3" id="user_name">${username}</h3>
            <h4 class="innerList_h4" id="user_details">${email} || ${mobile}</h4>
        </div>
        <img src="../assets/home_page/Admin_page/delete_user_btn.svg" alt="">
    </div>
        `;
        } else {
            insideHtml = `<div class="inner_list">
        <div class="inner_list_content">
            <h3 class="innerList_h3" id="user_name">${username}</h3>
            <h4 class="innerList_h4" id="user_details">${email} ${mobile}</h4>
        </div>
        <img src="../assets/home_page/Admin_page/delete_user_btn.svg" alt="">
    </div>
        `;
        }

        user.innerHTML = insideHtml;

        externalUserContainer.appendChild(user);
    });
}

function displayAdminMainpage() {
    checkAndCloseContainer(preloader);
    checkAndDisplayContainer(adminMainPage);
    checkAndCloseContainer(adminAddUserPage);
}

function displayPreloder() {
    checkAndDisplayContainer(preloader);
    checkAndCloseContainer(adminMainPage);
    checkAndCloseContainer(adminAddUserPage);
}

function displayAdminAddUserPage() {
    checkAndDisplayContainer(adminAddUserPage);
    checkAndCloseContainer(adminMainPage);
    checkAndCloseContainer(preloader);
}

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
    container.style.display = "block";
    container.style.opacity = 1;
    if (container.classList.contains("display_to_none")) {
        container.classList.remove("display_to_none");
    }
    container.classList.add("display_to_block");
}
