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
let exUsername;
let deleteBtn;
let exEmail;
let exMobile;
let event_id;
let ongoingEvents;
let internalUserData = [];
let externalUserData = [];
let isFirstTime = true;

let setup = async () => {

    try {
        const res1 = await fetch(`${apiURL}/fest/ongoingevents`, {
            method: "GET",
        });
        if (res1.status == 500) {
            alert("Internal server error please re-try!");
        } else {
            const data1 = await res1.json();
            ongoingEvents = data1.data;
            event_id = ongoingEvents[0].fest_id;
            setOngoingEvents(ongoingEvents);
            setEventDetails(ongoingEvents[0]);
            setUserDetails(ongoingEvents[0].user_id, ongoingEvents[0].external_user_id);
            for (let eventInstance of eventListArray) {
                eventInstance.addEventListener("click", () => {
                    eventInstance.classList.add("active_event");
                    checkAndCloseContainer(internalUserContainer);
                    checkAndCloseContainer(externalUserContainer);
                    const event = ongoingEvents.find(
                        (item) => item.fest_id == eventInstance.id
                    );
                    setEventDetails(event);
                    setUserDetails(event.user_id, event.external_user_id);
                });
            }
        }

        backBtnFromAddUserPage = document.getElementById("back_btn_from_add_user_page");
        addUserBtnFromAddUserPage = document.getElementById("Add_user_button");

        addUserBtnFromAddUserPage.addEventListener("click", async () => {
            exUsername = document.getElementById("name").value;
            exEmail = document.getElementById("email").value;
            exMobile = document.getElementById("phone_number").value;

            if (exUsername && (exEmail || exMobile)) {
                displayPreloder();
                const res2 = await fetch(`${apiURL}/fest/adduser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                    },
                    body: JSON.stringify({ event_id, username: exUsername, email: exEmail, mobile: exMobile }),
                });
                if (res2.status == 400) {
                    alert("You have not access to admin panel!");
                    displayAdminAddUserPage();
                } else if (res2.status == 500) {
                    alert("Internal server error please re-try!");
                    displayAdminAddUserPage();
                } else {
                    const res3 = await fetch(`${apiURL}/fest/ongoingevents`, {
                        method: "GET",
                    })
                    if (res3.status == 500) {
                        alert("Internal server error please re-try!");
                    } else {
                        const data2 = await res1.json();
                        ongoingEvents = data2.data;

                        const event = ongoingEvents.find(
                            (item) => item.fest_id == event_id
                        );
                        setUserDetails(event.user_id, event.external_user_id);
                        alert("User added successfully!");
                        displayAdminMainpage();
                    }
                }
            } else if (exUsername.length == 0) {
                alert("Please fill name!");
            } else {
                alert("Please fill atleast one of email and phone number!");
            }
        })

        backBtnFromAddUserPage.addEventListener("click", () => {
            displayAdminMainpage();
        })

    } catch (err) {
        alert("error occured re-try!");
        console.log(err);
    }
}

setup();

// setTimeout(function () {
// }, 100);

addUserBtnFromMainPage.addEventListener("click", () => {
    displayAdminAddUserPage();
})


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
    let venue = document.getElementById("VenueContentinnerList");

    rules.innerHTML = `${data.rules}`;
    description.innerHTML = `${data.description}`;
    prizes.innerHTML = `${data.prize}`;
    venue.innerHTML = `${data.venue}`;
}

let setUserDetails = async (array1, array2) => {
    try {
        if (array1.length != 0) {
            const res1 = await fetch(`${apiURL}/user/userdetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
                body: JSON.stringify({ ids: array1.toString() }),
            });
            if (res1.status == 400) {
                alert("You have not access to admin panel!");
            } else if (res1.status == 500) {
                alert("Internal server error please re-try!");
            } else {

                const data1 = await res1.json();
                setInternalUserDetails(data1.data);
                checkAndDisplayContainer(internalUserContainer);
            }
        } else {
            internalUserContainer.innerHTML = "";
            checkAndDisplayContainer(internalUserContainer);
        }
        if (array2 != null) {
            const res2 = await fetch(`${apiURL}/user/exuserdetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
                body: JSON.stringify({ ids: array2.toString() }),
            });
            if (res2.status == 400) {
                alert("You have not access to admin panel!");
            } else if (res2.status == 500) {
                alert("Internal server error please re-try!");
            } else {

                const data2 = await res2.json();

                setExternalUserDetails(data2.data);
                if (isFirstTime) {
                    setTimeout(function () {
                        displayAdminMainpage();
                    }, 100);
                    isFirstTime = false;
                } else {
                    checkAndDisplayContainer(externalUserContainer);
                }
            }

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
    } catch (err) {
        alert("error occured re-try!");
        console.log(err);
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
    <img id="delete_button" src="../assets/home_page/Admin_page/delete_user_btn.svg" alt="">
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
        <img id="delete_button" src="../assets/home_page/Admin_page/delete_user_btn.svg" alt="">
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
