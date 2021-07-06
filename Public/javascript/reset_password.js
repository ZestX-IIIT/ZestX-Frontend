let resetBtn = document.getElementById("ResetButton");
const apiURL = "https://whispering-ridge-40670.herokuapp.com";
let params = new URLSearchParams(location.search);
const userToken = params.get('token');

resetBtn.addEventListener("click", async () => {
    let password = document.getElementById("reset_password").value;
    let confirmPassword = document.getElementById("confirm_reset_password").value;

    if (password != confirmPassword) {
        alert("Confirm password not matched with password!");
    } else if (password.length < 6) {
        alert("Password should be minimum of 6 length!");
    } else {
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
            alert("Internal server error please re-try!")
        }

    }
})

