let resetBtn = document.getElementById("ResetButton");
const apiURL = "https://zestx.centralindia.cloudapp.azure.com";
let params = new URLSearchParams(location.search);
const userToken = params.get('token');
let lastToastTimestamp = Date.now();

resetBtn.addEventListener("click", async () => {
    let password = document.getElementById("reset_password").value;
    let confirmPassword = document.getElementById("confirm_reset_password").value;

    if (password != confirmPassword) {
        return show_toast(2, "Confirm password not matched with password!");
    }

    let passwordValidator = passValidator(password);

    if (!passwordValidator[0]) {
        return show_toast(2, `${passwordValidator[1]}`);
    }

    const res = await fetch(`${apiURL}/user/forgotpassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, userToken }),
    });

    if (res.status == 200) {
        window.location.href = "../signupsignin.html#signin";
    } else {
        show_toast(2, "Internal server error please re-try!")
    }
})

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
