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
let primary_events_posters =
    document.getElementsByClassName("event_poster_image");
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
let Progressbar = document.getElementById("Progressbar");
let scrollPath = document.getElementById("scrollPath");

let index = 0;
let activeTab = 0;
let festData;
let userData;
let event_ids = [8, 9, 7, 6, 10];

let backBtnFromEventsPage;
let backBtnFromProfilePage;
let backBtnFromEditProfilePage;
let backBtnFromChangePasswordPage;
let forgotPasswordBtnFromChangePasswordPage;
let forgotPasswordBtnFromEditProfilePage;
let editBtn;
let saveBtn;
let updateBtn;
let logoutBtn;
let changePasswordBtn;
let profileBtn = document.getElementById("profile_button");
let ongoingEventContainer;
let pastEventContainer;
let lastToastTimestamp = Date.now();

let hamBurgerMenuButtons;
let currentHMaburgerActiveItemIndex = 0;

window.addEventListener("load", () => {
    setTimeout(() => {
        redirect(2, setup);
    }, 200);
});

function setup() {
    loadData();
    setUpViews();
}
async function loadData() {
    try {
        if (token) {
            const eventDataRes = await fetch(`${apiURL}/fest/getlist`, {
                method: "GET",
                headers: {
                    authorization: token,
                },
            });

            const eventData = await eventDataRes.json();
            festData = eventData.data;

            const userDataRes = await fetch(`${apiURL}/user/getdetails`, {
                method: "GET",
                headers: {
                    authorization: token,
                },
            });

            const userDetails = await userDataRes.json();
            userData = userDetails.data;
            profileBtn.innerHTML = `${userData.user_name[0]}`;
        }
    } catch (err) {
        show_toast(0, "Error occured re-try!");
        console.log(err);
    }
}

function setUpViews() {
    // window.addEventListener("load", () => {
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

        forgotPasswordBtnFromChangePasswordPage = document.getElementById(
            "forgot_password_at_change_password_page"
        );
        forgotPasswordBtnFromEditProfilePage = document.getElementById(
            "forgot_password_at_edit_profile_page"
        );

        ongoingEventContainer = document.getElementById("OngoingEventsList");
        pastEventContainer = document.getElementById("PastEventsList");

        profileBtn.addEventListener("click", () => {
            if (token) displayProfilepage();
            else {
                show_toast(2, "Please sign-in first!");
                window.location.href = "/signin";
            }
        });

        hamBurgerMenuButtons = [
            document.getElementById("home_hamburger_menu"),
            document.getElementById("events_hamburger_menu"),
            document.getElementById("team_hamburger_menu"),
            document.getElementById("sponsers_hamburger_menu"),
            document.getElementById("faq_hamburger_menu"),
        ];
        setUpHamBurgerMenuOnClickListeners(hamBurgerMenuButtons);
        setCurrentActiveHamburegerMenuTo(0);

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
                    const registerRes = await fetch(`${apiURL}/fest/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: token,
                        },
                        body: JSON.stringify({ id: eventId }),
                    });

                    if (registerRes.status == 400) {
                        displayEvenetspage();
                        show_toast(2, "Please verify your email!");
                        return;
                    }

                    if (registerRes.status == 404) {
                        displayEvenetspage();
                        show_toast(2, "User already registered please refresh!");
                        return;
                    }

                    if (registerRes.status == 500) {
                        displayEvenetspage();
                        show_toast(0, "Error occured Please re-try!");
                        return;
                    }

                    displayEvenetspage();
                    show_toast(1, "User registered successfully!");
                    let userarray = festData.find(
                        (event) => event.fest_id == eventId
                    ).user_id;
                    if (userarray == null) {
                        userarray = [userData.user_id];
                    }
                    else {
                        userarray[userarray.length] = userData.user_id;
                    }
                    if (userData.fest_id == null) {
                        userData.fest_id = [`${eventId}`];
                    }
                    else {
                        userData.fest_id[userData.fest_id.length] = `${eventId}`;
                    }
                    registerBtn.innerHTML = `Unregister`;
                    registerBtn.style.animation = "none";

                } else {
                    const unregisterRes = await fetch(`${apiURL}/fest/unregister`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: token,
                        },
                        body: JSON.stringify({ id: eventId }),
                    });

                    if (unregisterRes.status == 400) {
                        displayEvenetspage();
                        show_toast(2, "Please verify your email!");
                        return;
                    }

                    if (unregisterRes.status == 404) {
                        displayEvenetspage();
                        show_toast(2, "User not registered please refresh!");
                        return;
                    }

                    if (unregisterRes.status == 500) {
                        displayEvenetspage();
                        show_toast(0, "Error occured Please re-try!");
                        return;
                    }

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
            });

            for (let i = 0; i < 5; i++) {
                event_poster_list[i].addEventListener("click", () => {
                    if (slider_event_list[i].checked == true) {
                        if (token) {
                            eventId = event_ids[i];
                            setEventDetails(event_ids[i]);
                            displayEvenetspage();
                        } else {
                            window.location.href = "/signup";
                            show_toast(2, "Please sign-in first!");
                        }
                    }
                });
            }

            backBtnFromEventsPage.addEventListener("click", () => {
                displayMainContainer();
                setActive(0);
                deActive(1);
                deActive(3);
                deActive(4);
                deActive(2);
            });

            backBtnFromProfilePage.addEventListener("click", () => {
                displayMainContainer();
                setActive(0);
                deActive(2);
                deActive(3);
                deActive(4);
                deActive(1);
                profileBtn.innerHTML = `${userData.user_name[0]}`;
            });

            backBtnFromChangePasswordPage.addEventListener("click", () => {
                displayProfilepage();
            });

            backBtnFromEditProfilePage.addEventListener("click", () => {
                displayProfilepage();
            });

            editBtn.addEventListener("click", () => {
                checkAndDisplayContainer(preloader);
                setTimeout(() => {
                    checkAndDisplayContainer(primaryEditProfileContainer);
                }, 200);
                checkAndCloseContainer(primaryChangePasswordContainer);
                checkAndCloseContainer(primaryContainer);
                checkAndCloseContainer(primaryEventsPageContainer);
                checkAndCloseContainer(primaryProfilePageContainer);
                checkAndCloseContainer(nabar_container);
                checkAndCloseContainer(scrollPath);
                checkAndCloseContainer(Progressbar);
                setTimeout(() => {
                    checkAndCloseContainer(preloader);
                }, 1500);
                setUserDetailsInEditPage(userData);
            });

            changePasswordBtn.addEventListener("click", () => {
                checkAndDisplayContainer(preloader);
                setTimeout(() => {
                    checkAndDisplayContainer(primaryChangePasswordContainer)
                }, 200);
                checkAndCloseContainer(primaryChangePasswordContainer);
                checkAndCloseContainer(primaryContainer);
                checkAndCloseContainer(primaryEventsPageContainer);
                checkAndCloseContainer(primaryProfilePageContainer);
                checkAndCloseContainer(nabar_container);
                checkAndCloseContainer(scrollPath);
                checkAndCloseContainer(Progressbar);
                setTimeout(() => {
                    checkAndCloseContainer(preloader);
                }, 1500);
                clearDataInChangePasswordpage();
            });

            forgotPasswordBtnFromChangePasswordPage.addEventListener(
                "click",
                async () => {
                    displayPreloder();
                    const forgotPassRes = await fetch(`${apiURL}/auth/forgotpasswordhomepage`, {
                        method: "GET",
                        headers: {
                            authorization: token,
                        },
                    });
                    if (forgotPassRes.status == 500) {
                        show_toast(0, "Error occured re-try!");
                        displayChangePasswordpage();
                        // console.log(err);
                    } else {
                        show_toast(
                            1,
                            "Link to reset password has been sent to your email-id!"
                        );
                        displayChangePasswordpage();
                    }
                }
            );

            forgotPasswordBtnFromEditProfilePage.addEventListener(
                "click",
                async () => {
                    displayPreloder();
                    const forgotPassRes = await fetch(`${apiURL}/auth/forgotpasswordhomepage`, {
                        method: "GET",
                        headers: {
                            authorization: token,
                        },
                    });

                    if (forgotPassRes.status == 500) {
                        show_toast(0, "Error occured re-try!");
                        displayEditProfilepage();
                        return;
                    }

                    show_toast(1, "Link to reset password has been sent to your email-id!!");
                    displayEditProfilepage();

                }
            );

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

                let passwordValidator = passValidator(newPassword);

                if (newPassword != confirmNewPassword) {
                    return show_toast(2, "Both passwords should be same!");
                }

                if (!passwordValidator[0]) {
                    return show_toast(2, `${passwordValidator[1]}`);
                }

                if (!(oldPassword && newPassword && confirmNewPassword)) {
                    return show_toast(2, "Please fill all details properly!");
                }

                displayPreloder();

                const changePassRes = await fetch(`${apiURL}/user/changepassword`, {
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

                const changePassData = changePassRes.json();

                if (changePassRes.status == 400) {
                    displayChangePasswordpage();
                    show_toast(2, "Incorrect current password!");
                    return;
                }

                if (changePassRes.status == 444) {
                    displayChangePasswordpage();
                    show_toast(2, `${changePassData.error}`);
                    return;
                }

                if (changePassRes.status == 500) {
                    displayChangePasswordpage();
                    show_toast(0, "Internal server error please re-try!");
                    return;
                }

                show_toast(1, "Your password updated successfully!");
                displayProfilepage();

            });

            saveBtn.addEventListener("click", async () => {
                let email = document.getElementById("edit_email").value;
                let user_name = document.getElementById("edit_name").value;
                let mobile = document.getElementById("edit_phone_number").value;
                let password = document.getElementById("password").value;


                if (!(password && email && mobile && user_name)) {
                    return show_toast(2, "Please enter all details properly!");
                }

                if (!validateEmail(email)) {
                    return show_toast(2, "Please Enter a valid email!");
                }

                displayPreloder();
                const updateDetailsRes = await fetch(`${apiURL}/user/updatedetails`, {
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

                if (updateDetailsRes.status == 400) {
                    displayEditProfilepage();
                    show_toast(2, "Incorrect Password!");
                    return;
                }

                if (updateDetailsRes.status == 404) {
                    show_toast(2, "Please Enter a valid email!");
                    preloader.style.display = "none";
                    return;
                }

                if (updateDetailsRes.status == 500) {
                    displayEditProfilepage();
                    show_toast(0, "Internal server error please re-try!");
                    return;
                }

                if (updateDetailsRes.status == 200) {
                    show_toast(1, "Your details updated successfully!");
                    userData.user_name = user_name;
                    userData.mobile = mobile;
                    displayProfilepage();
                    return;
                }

                show_toast(1, "Your details updated successfully! Please verify your updated email-id!");

                userData.user_name = user_name;
                userData.email = email;
                userData.mobile = mobile;
                displayProfilepage();

                const updateDetailsData = await updateDetailsRes.json();
                if (updateDetailsData.token) {
                    localStorage.setItem("jwt", updateDetailsData.token);
                }

            });

            displayMainContainer();

            AOS.init({
                easing: "ease-in-out",
                once: true,
            });

        } catch (err) {
            show_toast(0, "Error occured re-try!");
            console.log(err);
        }
    }, 500);

    // });

    window.addEventListener("scroll", () => {
        let windowHeightHomePage = window.innerHeight;
        if (
            window.pageYOffset <=
            eventsSection.offsetTop - windowHeightHomePage / 2
        ) {
            if (activeTab != 0) {
                activeTab = 0;
                setActive(0);
                deActive(1);
                deActive(2);
            }
        } else if (
            window.pageYOffset <=
            teamSection.offsetTop - windowHeightHomePage / 2
        ) {
            if (activeTab != 1) {
                activeTab = 1;
                setActive(activeTab);
                deActive(0);
                deActive(2);
            }
        } else if (
            window.pageYOffset <=
            sponsersSection.offsetTop - windowHeightHomePage / 2
        ) {
            if (activeTab != 2) {
                activeTab = 2;
                setActive(activeTab);
                deActive(1);
                deActive(3);
            }
        } else if (
            window.pageYOffset <=
            faqSection.offsetTop - windowHeightHomePage / 2
        ) {
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

    home.addEventListener("click", () => {
        homeSection.scrollIntoView({ behavior: "smooth" });
    });
    events.addEventListener("click", () => {
        eventsSection.scrollIntoView({ behavior: "smooth" });
    });
    team.addEventListener("click", () => {
        teamSection.scrollIntoView({ behavior: "smooth" });
    });
    sponsers.addEventListener("click", () => {
        sponsersSection.scrollIntoView({ behavior: "smooth" });
    });
    faq.addEventListener("click", () => {
        faqSection.scrollIntoView({ behavior: "smooth" });
    });
}

function setUpHamBurgerMenuOnClickListeners(hamburgerMenuItems) {
    hamburgerMenuItems[0].addEventListener("click", () => {
        setCurrentActiveHamburegerMenuTo(0);
        homeSection.scrollIntoView({
            behavior: "smooth",
        });
    });
    hamburgerMenuItems[1].addEventListener("click", () => {
        setCurrentActiveHamburegerMenuTo(1);
        eventsSection.scrollIntoView({
            behavior: "smooth",
        });
    });
    hamburgerMenuItems[2].addEventListener("click", () => {
        setCurrentActiveHamburegerMenuTo(2);
        teamSection.scrollIntoView({
            behavior: "smooth",
        });
    });
    hamburgerMenuItems[3].addEventListener("click", () => {
        setCurrentActiveHamburegerMenuTo(3);
        sponsersSection.scrollIntoView({
            behavior: "smooth",
        });
    });
    hamburgerMenuItems[4].addEventListener("click", () => {
        setCurrentActiveHamburegerMenuTo(4);
        faqSection.scrollIntoView({
            behavior: "smooth",
        });
    });
}

function setCurrentActiveHamburegerMenuTo(hamburegerAIndex) {
    hamBurgerMenuButtons[currentHMaburgerActiveItemIndex].style.color = "white";
    currentHMaburgerActiveItemIndex = hamburegerAIndex;
    hamBurgerMenuButtons[hamburegerAIndex].style.color = "pink";
}

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

    if (data == null || !data.includes(userData.user_id)) {
        return false;
    }
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
            toastImage.src = "./assets/_general/success_tick.svg";
            toastFrontMessage.style.backgroundColor = "green";
        } else if (isSuccess == 0) {
            toastImage.src = "./assets/_general/error_cross.svg";
            toastFrontMessage.style.backgroundColor = "red";
        } else {
            toastImage.src = "./assets/_general/neutral_exclamation.svg";
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
        case 8:
            detailsContainer.style.backgroundImage =
                "url('./assets/home_page/events_details/compressed_event_details_webp/hot_stepper_bg.webp'), linear-gradient(180deg, #0e1391 0%, #0e0045 100%)";
            break;
        case 7:
            detailsContainer.style.background =
                "url('./assets/home_page/events_details/compressed_event_details_webp/raise_your_mic_bg.webp'), linear-gradient(180deg, #0e1391 0%, #0e0045 100%)";
            break;
        case 6:
            detailsContainer.style.background =
                "url('./assets/home_page/events_details/compressed_event_details_webp/rangshala_bg.webp'), linear-gradient(180deg, #0e1391 0%, #0e0045 100%)";
            break;
        case 9:
            detailsContainer.style.background =
                "url('./assets/home_page/events_details/compressed_event_details_webp/one_mic_stand_bg.webp'), linear-gradient(180deg, #0e1391 0%, #0e0045 100%)";
            break;
        case 10:
            detailsContainer.style.background =
                "url('./assets/home_page/events_details/compressed_event_details_webp/strokes_bg.webp'), linear-gradient(180deg, #0e1391 0%, #0e0045 100%)";
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
    checkAndDisplayContainer(scrollPath);
    checkAndDisplayContainer(Progressbar);
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
    checkAndCloseContainer(scrollPath);
    checkAndCloseContainer(Progressbar);
}

function displayEvenetspage() {
    checkAndDisplayContainer(primaryEventsPageContainer);
    checkAndCloseContainer(primaryContainer);
    checkAndCloseContainer(preloader);
    checkAndCloseContainer(primaryProfilePageContainer);
    checkAndCloseContainer(primaryEditProfileContainer);
    checkAndCloseContainer(primaryChangePasswordContainer);
    checkAndCloseContainer(nabar_container);
    checkAndCloseContainer(scrollPath);
    checkAndCloseContainer(Progressbar);
}

function displayChangePasswordpage() {
    checkAndDisplayContainer(primaryChangePasswordContainer);
    checkAndCloseContainer(primaryEventsPageContainer);
    checkAndCloseContainer(primaryContainer);
    checkAndCloseContainer(preloader);
    checkAndCloseContainer(primaryProfilePageContainer);
    checkAndCloseContainer(primaryEditProfileContainer);
    checkAndCloseContainer(nabar_container);
    checkAndCloseContainer(scrollPath);
    checkAndCloseContainer(Progressbar);
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
    checkAndCloseContainer(scrollPath);
    checkAndCloseContainer(Progressbar);
}

function displayEditProfilepage() {
    checkAndDisplayContainer(primaryEditProfileContainer);
    checkAndCloseContainer(primaryChangePasswordContainer);
    checkAndCloseContainer(primaryContainer);
    checkAndCloseContainer(preloader);
    checkAndCloseContainer(primaryEventsPageContainer);
    checkAndCloseContainer(primaryProfilePageContainer);
    checkAndCloseContainer(nabar_container);
    checkAndCloseContainer(scrollPath);
    checkAndCloseContainer(Progressbar);
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


var redirect = function (redirectWithoutTokenChk, setUpFun) {

    const token = localStorage.getItem("jwt");
    if (token && token != null) {

        fetch(`https://whispering-ridge-40670.herokuapp.com/user/getdetails`, {
            method: "GET",
            headers: {
                authorization: token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                let isAdmin = data.data.is_admin;
                switch (redirectWithoutTokenChk) {
                    case 0:
                        redirectToHomeOrAdminPageAccToToken(isAdmin);
                        break;
                    case 1:
                        redirectToHomePageAccToToken(isAdmin, setUpFun);
                        break;
                    case 2:
                        redirectToAdminPageAccToToken(isAdmin, setUpFun);
                        break;

                    default:
                        break;
                }
            })
            .catch((err) => {
                console.log(err);
            });


    } else {
        if (redirectWithoutTokenChk > 0) {
            window.location.href = "/signup";
        }
        else {
            setUpFun()

        }
    }
}

function redirectToHomeOrAdminPageAccToToken(isAdmin) {
    if (isAdmin)
        window.location.href = "/admin";
    else window.location.href = "/home";
}

function redirectToHomePageAccToToken(isAdmin, setUpFun) {
    if (!isAdmin)
        window.location.href = "/home";
    else
        setUpFun()
}

function redirectToAdminPageAccToToken(isAdmin, setUpFun) {
    if (isAdmin)
        window.location.href = "/admin";
    else
        setUpFun()
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
setTimeout(function () {
    let event_slider = document.getElementById("slider")
    if (location.href == "https://zestx.netlify.app/general/slider_event.html") {
        event_slider.style.marginTop = "12vh"
    }
    var slider = document.getElementsByClassName("slide");
    let index_slider = 0;
    var isNotHovering = true;


    let imageContainer = document.getElementsByClassName("image-container");
    let poster1 = document.getElementById("poster1");
    let poster2 = document.getElementById("poster2");
    let poster3 = document.getElementById("poster3");
    imageContainer[0].addEventListener("click", () => {
        eventsSection.scrollIntoView({ behavior: "smooth" });
        poster1.addEventListener("click", () => {
            slider[0].checked = true;
            isNotHovering = false;
        });
        poster2.addEventListener("click", () => {
            slider[2].checked = true;
            isNotHovering = false;
        }); poster3.addEventListener("click", () => {
            slider[3].checked = true;
            isNotHovering = false;
        });
    });



    for (var i = 0; i < slider.length; i++) {
        slider[i].addEventListener('change', function () {
            for (let i = 0; i < slider.length; i++) {
                if (slider[i].checked) {
                    index_slider = i;
                    break;
                }
            }
        });
    }

    var a = setInterval(() => {
        if (isNotHovering) {
            slider[index_slider].checked = true;
            index_slider++;
            index_slider = index_slider % 5;
        }
    }, 4000);

    var slide = document.getElementById("slider");
    slide.addEventListener("mouseover", () => {
        isNotHovering = false;
    });

    slide.addEventListener("mouseout", () => {
        isNotHovering = true;
    });
}, 500);

/*! lazysizes - v5.3.2 */ ! function (e) {
    var t = function (u, D, f) {
        "use strict";
        var k, H;
        if (function () {
            var e;
            var t = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                fastLoadedClass: "ls-is-cached",
                iframeLoadMode: 0,
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: true,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: true,
                ricTimeout: 0,
                throttleDelay: 125
            };
            H = u.lazySizesConfig || u.lazysizesConfig || {};
            for (e in t) {
                if (!(e in H)) {
                    H[e] = t[e]
                }
            }
        }(), !D || !D.getElementsByClassName) {
            return {
                init: function () { },
                cfg: H,
                noSupport: true
            }
        }
        var O = D.documentElement,
            i = u.HTMLPictureElement,
            P = "addEventListener",
            $ = "getAttribute",
            q = u[P].bind(u),
            I = u.setTimeout,
            U = u.requestAnimationFrame || I,
            o = u.requestIdleCallback,
            j = /^picture$/i,
            r = ["load", "error", "lazyincluded", "_lazyloaded"],
            a = {},
            G = Array.prototype.forEach,
            J = function (e, t) {
                if (!a[t]) {
                    a[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")
                }
                return a[t].test(e[$]("class") || "") && a[t]
            },
            K = function (e, t) {
                if (!J(e, t)) {
                    e.setAttribute("class", (e[$]("class") || "").trim() + " " + t)
                }
            },
            Q = function (e, t) {
                var a;
                if (a = J(e, t)) {
                    e.setAttribute("class", (e[$]("class") || "").replace(a, " "))
                }
            },
            V = function (t, a, e) {
                var i = e ? P : "removeEventListener";
                if (e) {
                    V(t, a)
                }
                r.forEach(function (e) {
                    t[i](e, a)
                })
            },
            X = function (e, t, a, i, r) {
                var n = D.createEvent("Event");
                if (!a) {
                    a = {}
                }
                a.instance = k;
                n.initEvent(t, !i, !r);
                n.detail = a;
                e.dispatchEvent(n);
                return n
            },
            Y = function (e, t) {
                var a;
                if (!i && (a = u.picturefill || H.pf)) {
                    if (t && t.src && !e[$]("srcset")) {
                        e.setAttribute("srcset", t.src)
                    }
                    a({
                        reevaluate: true,
                        elements: [e]
                    })
                } else if (t && t.src) {
                    e.src = t.src
                }
            },
            Z = function (e, t) {
                return (getComputedStyle(e, null) || {})[t]
            },
            s = function (e, t, a) {
                a = a || e.offsetWidth;
                while (a < H.minSize && t && !e._lazysizesWidth) {
                    a = t.offsetWidth;
                    t = t.parentNode
                }
                return a
            },
            ee = function () {
                var a, i;
                var t = [];
                var r = [];
                var n = t;
                var s = function () {
                    var e = n;
                    n = t.length ? r : t;
                    a = true;
                    i = false;
                    while (e.length) {
                        e.shift()()
                    }
                    a = false
                };
                var e = function (e, t) {
                    if (a && !t) {
                        e.apply(this, arguments)
                    } else {
                        n.push(e);
                        if (!i) {
                            i = true;
                            (D.hidden ? I : U)(s)
                        }
                    }
                };
                e._lsFlush = s;
                return e
            }(),
            te = function (a, e) {
                return e ? function () {
                    ee(a)
                } : function () {
                    var e = this;
                    var t = arguments;
                    ee(function () {
                        a.apply(e, t)
                    })
                }
            },
            ae = function (e) {
                var a;
                var i = 0;
                var r = H.throttleDelay;
                var n = H.ricTimeout;
                var t = function () {
                    a = false;
                    i = f.now();
                    e()
                };
                var s = o && n > 49 ? function () {
                    o(t, {
                        timeout: n
                    });
                    if (n !== H.ricTimeout) {
                        n = H.ricTimeout
                    }
                } : te(function () {
                    I(t)
                }, true);
                return function (e) {
                    var t;
                    if (e = e === true) {
                        n = 33
                    }
                    if (a) {
                        return
                    }
                    a = true;
                    t = r - (f.now() - i);
                    if (t < 0) {
                        t = 0
                    }
                    if (e || t < 9) {
                        s()
                    } else {
                        I(s, t)
                    }
                }
            },
            ie = function (e) {
                var t, a;
                var i = 99;
                var r = function () {
                    t = null;
                    e()
                };
                var n = function () {
                    var e = f.now() - a;
                    if (e < i) {
                        I(n, i - e)
                    } else {
                        (o || r)(r)
                    }
                };
                return function () {
                    a = f.now();
                    if (!t) {
                        t = I(n, i)
                    }
                }
            },
            e = function () {
                var v, m, c, h, e;
                var y, z, g, p, C, b, A;
                var n = /^img$/i;
                var d = /^iframe$/i;
                var E = "onscroll" in u && !/(gle|ing)bot/.test(navigator.userAgent);
                var _ = 0;
                var w = 0;
                var M = 0;
                var N = -1;
                var L = function (e) {
                    M--;
                    if (!e || M < 0 || !e.target) {
                        M = 0
                    }
                };
                var x = function (e) {
                    if (A == null) {
                        A = Z(D.body, "visibility") == "hidden"
                    }
                    return A || !(Z(e.parentNode, "visibility") == "hidden" && Z(e, "visibility") == "hidden")
                };
                var W = function (e, t) {
                    var a;
                    var i = e;
                    var r = x(e);
                    g -= t;
                    b += t;
                    p -= t;
                    C += t;
                    while (r && (i = i.offsetParent) && i != D.body && i != O) {
                        r = (Z(i, "opacity") || 1) > 0;
                        if (r && Z(i, "overflow") != "visible") {
                            a = i.getBoundingClientRect();
                            r = C > a.left && p < a.right && b > a.top - 1 && g < a.bottom + 1
                        }
                    }
                    return r
                };
                var t = function () {
                    var e, t, a, i, r, n, s, o, l, u, f, c;
                    var d = k.elements;
                    if ((h = H.loadMode) && M < 8 && (e = d.length)) {
                        t = 0;
                        N++;
                        for (; t < e; t++) {
                            if (!d[t] || d[t]._lazyRace) {
                                continue
                            }
                            if (!E || k.prematureUnveil && k.prematureUnveil(d[t])) {
                                R(d[t]);
                                continue
                            }
                            if (!(o = d[t][$]("data-expand")) || !(n = o * 1)) {
                                n = w
                            }
                            if (!u) {
                                u = !H.expand || H.expand < 1 ? O.clientHeight > 500 && O.clientWidth > 500 ? 500 : 370 : H.expand;
                                k._defEx = u;
                                f = u * H.expFactor;
                                c = H.hFac;
                                A = null;
                                if (w < f && M < 1 && N > 2 && h > 2 && !D.hidden) {
                                    w = f;
                                    N = 0
                                } else if (h > 1 && N > 1 && M < 6) {
                                    w = u
                                } else {
                                    w = _
                                }
                            }
                            if (l !== n) {
                                y = innerWidth + n * c;
                                z = innerHeight + n;
                                s = n * -1;
                                l = n
                            }
                            a = d[t].getBoundingClientRect();
                            if ((b = a.bottom) >= s && (g = a.top) <= z && (C = a.right) >= s * c && (p = a.left) <= y && (b || C || p || g) && (H.loadHidden || x(d[t])) && (m && M < 3 && !o && (h < 3 || N < 4) || W(d[t], n))) {
                                R(d[t]);
                                r = true;
                                if (M > 9) {
                                    break
                                }
                            } else if (!r && m && !i && M < 4 && N < 4 && h > 2 && (v[0] || H.preloadAfterLoad) && (v[0] || !o && (b || C || p || g || d[t][$](H.sizesAttr) != "auto"))) {
                                i = v[0] || d[t]
                            }
                        }
                        if (i && !r) {
                            R(i)
                        }
                    }
                };
                var a = ae(t);
                var S = function (e) {
                    var t = e.target;
                    if (t._lazyCache) {
                        delete t._lazyCache;
                        return
                    }
                    L(e);
                    K(t, H.loadedClass);
                    Q(t, H.loadingClass);
                    V(t, B);
                    X(t, "lazyloaded")
                };
                var i = te(S);
                var B = function (e) {
                    i({
                        target: e.target
                    })
                };
                var T = function (e, t) {
                    var a = e.getAttribute("data-load-mode") || H.iframeLoadMode;
                    if (a == 0) {
                        e.contentWindow.location.replace(t)
                    } else if (a == 1) {
                        e.src = t
                    }
                };
                var F = function (e) {
                    var t;
                    var a = e[$](H.srcsetAttr);
                    if (t = H.customMedia[e[$]("data-media") || e[$]("media")]) {
                        e.setAttribute("media", t)
                    }
                    if (a) {
                        e.setAttribute("srcset", a)
                    }
                };
                var s = te(function (t, e, a, i, r) {
                    var n, s, o, l, u, f;
                    if (!(u = X(t, "lazybeforeunveil", e)).defaultPrevented) {
                        if (i) {
                            if (a) {
                                K(t, H.autosizesClass)
                            } else {
                                t.setAttribute("sizes", i)
                            }
                        }
                        s = t[$](H.srcsetAttr);
                        n = t[$](H.srcAttr);
                        if (r) {
                            o = t.parentNode;
                            l = o && j.test(o.nodeName || "")
                        }
                        f = e.firesLoad || "src" in t && (s || n || l);
                        u = {
                            target: t
                        };
                        K(t, H.loadingClass);
                        if (f) {
                            clearTimeout(c);
                            c = I(L, 2500);
                            V(t, B, true)
                        }
                        if (l) {
                            G.call(o.getElementsByTagName("source"), F)
                        }
                        if (s) {
                            t.setAttribute("srcset", s)
                        } else if (n && !l) {
                            if (d.test(t.nodeName)) {
                                T(t, n)
                            } else {
                                t.src = n
                            }
                        }
                        if (r && (s || l)) {
                            Y(t, {
                                src: n
                            })
                        }
                    }
                    if (t._lazyRace) {
                        delete t._lazyRace
                    }
                    Q(t, H.lazyClass);
                    ee(function () {
                        var e = t.complete && t.naturalWidth > 1;
                        if (!f || e) {
                            if (e) {
                                K(t, H.fastLoadedClass)
                            }
                            S(u);
                            t._lazyCache = true;
                            I(function () {
                                if ("_lazyCache" in t) {
                                    delete t._lazyCache
                                }
                            }, 9)
                        }
                        if (t.loading == "lazy") {
                            M--
                        }
                    }, true)
                });
                var R = function (e) {
                    if (e._lazyRace) {
                        return
                    }
                    var t;
                    var a = n.test(e.nodeName);
                    var i = a && (e[$](H.sizesAttr) || e[$]("sizes"));
                    var r = i == "auto";
                    if ((r || !m) && a && (e[$]("src") || e.srcset) && !e.complete && !J(e, H.errorClass) && J(e, H.lazyClass)) {
                        return
                    }
                    t = X(e, "lazyunveilread").detail;
                    if (r) {
                        re.updateElem(e, true, e.offsetWidth)
                    }
                    e._lazyRace = true;
                    M++;
                    s(e, t, r, i, a)
                };
                var r = ie(function () {
                    H.loadMode = 3;
                    a()
                });
                var o = function () {
                    if (H.loadMode == 3) {
                        H.loadMode = 2
                    }
                    r()
                };
                var l = function () {
                    if (m) {
                        return
                    }
                    if (f.now() - e < 999) {
                        I(l, 999);
                        return
                    }
                    m = true;
                    H.loadMode = 3;
                    a();
                    q("scroll", o, true)
                };
                return {
                    _: function () {
                        e = f.now();
                        k.elements = D.getElementsByClassName(H.lazyClass);
                        v = D.getElementsByClassName(H.lazyClass + " " + H.preloadClass);
                        q("scroll", a, true);
                        q("resize", a, true);
                        q("pageshow", function (e) {
                            if (e.persisted) {
                                var t = D.querySelectorAll("." + H.loadingClass);
                                if (t.length && t.forEach) {
                                    U(function () {
                                        t.forEach(function (e) {
                                            if (e.complete) {
                                                R(e)
                                            }
                                        })
                                    })
                                }
                            }
                        });
                        if (u.MutationObserver) {
                            new MutationObserver(a).observe(O, {
                                childList: true,
                                subtree: true,
                                attributes: true
                            })
                        } else {
                            O[P]("DOMNodeInserted", a, true);
                            O[P]("DOMAttrModified", a, true);
                            setInterval(a, 999)
                        }
                        q("hashchange", a, true);
                        ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function (e) {
                            D[P](e, a, true)
                        });
                        if (/d$|^c/.test(D.readyState)) {
                            l()
                        } else {
                            q("load", l);
                            D[P]("DOMContentLoaded", a);
                            I(l, 2e4)
                        }
                        if (k.elements.length) {
                            t();
                            ee._lsFlush()
                        } else {
                            a()
                        }
                    },
                    checkElems: a,
                    unveil: R,
                    _aLSL: o
                }
            }(),
            re = function () {
                var a;
                var n = te(function (e, t, a, i) {
                    var r, n, s;
                    e._lazysizesWidth = i;
                    i += "px";
                    e.setAttribute("sizes", i);
                    if (j.test(t.nodeName || "")) {
                        r = t.getElementsByTagName("source");
                        for (n = 0, s = r.length; n < s; n++) {
                            r[n].setAttribute("sizes", i)
                        }
                    }
                    if (!a.detail.dataAttr) {
                        Y(e, a.detail)
                    }
                });
                var i = function (e, t, a) {
                    var i;
                    var r = e.parentNode;
                    if (r) {
                        a = s(e, r, a);
                        i = X(e, "lazybeforesizes", {
                            width: a,
                            dataAttr: !!t
                        });
                        if (!i.defaultPrevented) {
                            a = i.detail.width;
                            if (a && a !== e._lazysizesWidth) {
                                n(e, r, i, a)
                            }
                        }
                    }
                };
                var e = function () {
                    var e;
                    var t = a.length;
                    if (t) {
                        e = 0;
                        for (; e < t; e++) {
                            i(a[e])
                        }
                    }
                };
                var t = ie(e);
                return {
                    _: function () {
                        a = D.getElementsByClassName(H.autosizesClass);
                        q("resize", t)
                    },
                    checkElems: t,
                    updateElem: i
                }
            }(),
            t = function () {
                if (!t.i && D.getElementsByClassName) {
                    t.i = true;
                    re._();
                    e._()
                }
            };
        return I(function () {
            H.init && t()
        }), k = {
            cfg: H,
            autoSizer: re,
            loader: e,
            init: t,
            uP: Y,
            aC: K,
            rC: Q,
            hC: J,
            fire: X,
            gW: s,
            rAF: ee
        }
    }(e, e.document, Date);
    e.lazySizes = t, "object" == typeof module && module.exports && (module.exports = t)
}("undefined" != typeof window ? window : {});

setTimeout(() => {

    let imageHolder = document.getElementsByClassName("imageHolder");
    let outerContainer = document.getElementsByClassName("outerContainer");
    let github_icons = document.getElementsByClassName("team_section_github");
    let linkedin_icons = document.getElementsByClassName("team_section_linkedin");
    let mail_icons = document.getElementsByClassName("team_section_mail");

    let teamMembers = document.getElementsByClassName("teamMembers");
    let teamContent = document.getElementsByClassName("teamContent");

    for (let i = 1; i < github_icons.length; i += 2) {
        github_icons[i].addEventListener("click", () => {
            switch (i) {
                case 1:
                    window.open('https://github.com/kunaljain0212', '_blank');
                    break;
                case 3:
                case 11:
                    window.open('https://github.com/manishprivet', '_blank');
                    break;
                case 5:
                    window.open('https://github.com/TheNinza', '_blank');
                    break;
                case 7:
                    window.open('https://github.com/hs2361', '_blank');
                    break;
                case 9:
                    window.open('https://github.com/parthlaw', '_blank');
                    break;
                case 13:
                case 23:
                    window.open('https://github.com/akashgupta1909', '_blank');
                    break;
                case 15:
                case 21:
                    window.open('https://github.com/HarshilMendpara', '_blank');
                    break;
                case 17:
                case 19:
                    window.open('https://github.com/RajVarsani', '_blank');
                    break;
            }
        });
    }

    for (let i = 1; i < linkedin_icons.length; i += 2) {
        linkedin_icons[i].addEventListener("click", () => {
            switch (i) {
                case 1:
                    window.open('https://www.linkedin.com/in/kunaljain0212/', '_blank');
                    break;
                case 3:
                case 11:
                    window.open('https://www.linkedin.com/in/manishprivet/', '_blank');
                    break;
                case 5:
                    window.open('https://www.linkedin.com/in/theninza/', '_blank');
                    break;
                case 7:
                    window.open('https://www.linkedin.com/in/sharmaharsh23/', '_blank');
                    break;
                case 9:
                    window.open('https://www.linkedin.com/in/parthlaw/', '_blank');
                    break;
                case 13:
                case 23:
                    window.open('https://www.linkedin.com/in/akash-gupta-ab03721b8/', '_blank');
                    break;
                case 15:
                case 21:
                    window.open('https://www.linkedin.com/in/harshil-mendpara/', '_blank');
                    break;
                case 17:
                case 19:
                    window.open('https://www.linkedin.com/in/raj-varsani-404/', '_blank');
                    break;
            }
        });
    }

    for (let i = 1; i < mail_icons.length; i += 2) {
        mail_icons[i].addEventListener("click", () => {
            switch (i) {
                case 1:
                    window.open('mailto:jainkunal209@gmail.com', '_blank');
                    break;
                case 3:
                case 11:
                    window.open('mailto:manishprivet808@gmail.com', '_blank');
                    break;
                case 5:
                    window.open('mailto:niks.a3198@gmail.com', '_blank');
                    break;
                case 7:
                    window.open('mailto:harshhsharma23@gmail.com', '_blank');
                    break;
                case 9:
                    window.open('mailto:parthlaw24@gmail.com', '_blank');
                    break;
                case 13:
                case 23:
                    window.open('mailto:akash.gupta.anup@gmail.com', '_blank');
                    break;
                case 15:
                case 21:
                    window.open('mailto:hsmendpara2003@gmail.com', '_blank');
                    break;
                case 17:
                case 19:
                    window.open('mailto:varasaniraj5@gmail.com', '_blank');
                    break;
            }
        });
    }

    for (let i = 0; i < imageHolder.length; i++) {
        outerContainer[i].addEventListener("mouseenter", () => {
            imageHolder[i].classList.add("imageHolder_toggle");
            mail_icons[2 * i].style.opacity = 1;
            github_icons[2 * i].style.opacity = 1;
            linkedin_icons[2 * i].style.opacity = 1;
        });
        outerContainer[i].addEventListener("mouseleave", () => {
            imageHolder[i].classList.remove("imageHolder_toggle");
            mail_icons[2 * i].style.opacity = 0;
            github_icons[2 * i].style.opacity = 0;
            linkedin_icons[2 * i].style.opacity = 0;
        });
    }

    for (let i = 0; i < github_icons.length; i = i + 2) {
        github_icons[i + 1].addEventListener("mouseenter", () => {
            github_icons[i + 1].style.opacity = 1;
            github_icons[i].style.opacity = 0;
        });
        github_icons[i + 1].addEventListener("mouseleave", () => {
            github_icons[i + 1].style.opacity = 0;
            github_icons[i].style.opacity = 1;
        });
        mail_icons[i + 1].addEventListener("mouseenter", () => {
            mail_icons[i + 1].style.opacity = 1;
            mail_icons[i].style.opacity = 0;
        });
        mail_icons[i + 1].addEventListener("mouseleave", () => {
            mail_icons[i + 1].style.opacity = 0;
            mail_icons[i].style.opacity = 1;
        });
        linkedin_icons[i + 1].addEventListener("mouseenter", () => {
            linkedin_icons[i + 1].style.opacity = 1;
            linkedin_icons[i].style.opacity = 0;
        });
        linkedin_icons[i + 1].addEventListener("mouseleave", () => {
            linkedin_icons[i + 1].style.opacity = 0;
            linkedin_icons[i].style.opacity = 1;
        });

    }
    for (let i = 0; i < teamMembers.length; i++) {
        teamContent[i].addEventListener("click", () => {
            for (let j = 0; j < teamMembers.length; j++) {
                if (j == i) {
                    teamMembers[j].classList.add("teamMembers_active");
                    teamContent[j].classList.add("teamContentActive")
                } else {
                    teamMembers[j].classList.remove("teamMembers_active");
                    teamContent[j].classList.remove("teamContentActive")
                }
            }
        });
    }
}, 200)
setTimeout(function () {
    var FAQQuestion = document.getElementsByClassName("FAQQuestion");
    var FAQArrowDown = document.getElementsByClassName("FAQArrowDown");
    const FAQ_not_expanded_check_index = [];

    for (let i = 0; i < FAQQuestion.length; i++) {
        FAQ_not_expanded_check_index[i] = true;
        FAQQuestion[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
            if (FAQ_not_expanded_check_index[i]) {
                FAQArrowDown[i].classList.remove("ArrowRotate2");
                FAQArrowDown[i].classList.add("ArrowRotate");
                FAQ_not_expanded_check_index[i] = false;
            } else {
                FAQArrowDown[i].classList.remove("ArrowRotate");
                FAQArrowDown[i].classList.add("ArrowRotate2");
                FAQ_not_expanded_check_index[i] = true;
            }
        });
    }

}, 500);
setTimeout(function () {

    let hamburgermenuMainContainer = document.getElementById("hamburgermenuMainContainer");
    let HamburgerMenuNavList = document.getElementById("HamburgerMenuNavList");
    let HBMBackground = document.getElementById("HBMBackground");
    let hamburgerMenuBars = document.getElementById("hamburgerMenuBars");
    let isOpen = false;

    hamburgerMenuBars.addEventListener("click", hamburgerdisplay);

    function hamburgerdisplay() {


        if (isOpen) {
            HamburgerMenuNavList.classList.toggle("Toggle_class_anim");
            isOpen = false
        } else {
            setTimeout(function () {
                HamburgerMenuNavList.classList.toggle("Toggle_class_anim");
            }, 300);
            isOpen = true
        }
        hamburgermenuMainContainer.classList.toggle("Toggle_class");
        HBMBackground.classList.toggle("Toggle_class_background");
    }
}, 500);
setTimeout(function () {

    let progress = document.getElementById("Progressbar");
    let totalHeight;
    let windowWidth = window.innerWidth;
    let limit = windowWidth - 100;
    let limit2 = windowWidth - 20;
    let color_grediet_value_1 = [50, 15, 60];
    let color_grediet_value_1_min_arr = [50, 15, 60]
    let color_grediet_value_1_max_arr = [250, 155, 160]

    updateProgressBar()
    window.onscroll = function () {
        updateProgressBar()
    };

    function updateProgressBar() {
        totalHeight = document.body.scrollHeight - window.innerHeight;
        let progressHeight = (window.pageYOffset / totalHeight) * 100;
        progress.style.height = progressHeight + "%";
        updateGredientByIndex(window.pageYOffset / totalHeight)

    }
    function updateGredientByIndex(viewportFrectionIndex) {
        for (let i = 0; i < color_grediet_value_1.length; i++) {
            color_grediet_value_1[i] = color_grediet_value_1_min_arr[i] + (viewportFrectionIndex * (color_grediet_value_1_max_arr[i]))
        }
    }

    var y = 0;
    let isProgressbarActive = false;
    function startProgressbarScroll(e) {
        limit = windowWidth - 200;
        limit2 = windowWidth - 20;
        if (e.clientX > limit2) {
            isProgressbarActive = true;
            progressBarScroll(e)
        }
    }
    function stopProgressbarScroll(e) {
        isProgressbarActive = false;
    }

    function progressBarScroll(e) {
        if (isProgressbarActive) {
            if (e.clientX > limit) {
                y = e.clientY;
                window.scrollBy(0, (((y * totalHeight) / window.innerHeight) - window.pageYOffset) / 10);
            }
        }
    }

    document.addEventListener("mousedown", startProgressbarScroll);
    document.addEventListener("touchstart", startProgressbarScroll);

    document.addEventListener("mousemove", progressBarScroll);
    document.addEventListener("touchmove", progressBarScroll);

    document.addEventListener("mouseleave", stopProgressbarScroll);
    document.addEventListener("mouseup", stopProgressbarScroll);
    document.addEventListener("touchend", stopProgressbarScroll);

}, 200);
let regularExpression = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

function passValidator(password) {
    let boolValue = false;
    let message;

    if (password.length < 6) {
        message = 'Password should be minimum of 6 length!';
        return [boolValue, message];
    }

    if (password.length > 20) {
        message = 'Password should be maximum of 20 length!';
        return [boolValue, message];
    }

    if (password.search(/[A-Z]/) < 0) {
        message = 'Password should contain atleast 1 uppercase letter!';
        return [boolValue, message];
    }

    if (password.search(/[a-z]/) < 0) {
        message = 'Password should contain atleast 1 lowercase letter!';
        return [boolValue, message];
    }

    if (password.search(/[0-9]/) < 0) {
        message = 'Password should contain atleast 1 digit!';
        return [boolValue, message];
    }

    if (password.search(' ') != -1) {
        message = 'Password should not contain any spaces!';
        return [boolValue, message];
    }

    if (!regularExpression.test(password)) {
        message = 'Password should contain atleast 1 special character!';
        return [boolValue, message];
    }

    return [true, "Success"];

}




setTimeout(() => {

    var userEditProfileAnimation = bodymovin.loadAnimation({
        container: document.getElementById('user_edit_profile_anim_container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/user_edit_profile_page_anim/high_res/user_edit_profile_page_anim.json'
    })
    var userChangePasswordAnimation = bodymovin.loadAnimation({
        container: document.getElementById('change_user_password_page_anim_container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/security_anim_edit_password_page/high-res/security_anim_data.json'
    })

}, 500);

