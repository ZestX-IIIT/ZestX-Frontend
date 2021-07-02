
var redirect = function (redirectWithoutTokenChk, loaderContainer) {


    const token = localStorage.getItem("jwt");

    if (token) {
        loaderContainer.style.display = "block";
        redirectByToken(token, loaderContainer);
    } else {
        if (redirectWithoutTokenChk) {
            loaderContainer.style.display = "block";
            window.location.href = "./signupsignin.html";
        }
    }
}

function redirectByToken(token, loaderContainer) {
    fetch(`${apiURL}/user/getdetails`, {
        method: "GET",
        headers: {
            authorization: token,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.data.is_admin)
                window.location.href = "./general/admin_main_page.html";
            else window.location.href = "./homepage.html";
        })
        .catch((err) => {
            console.log(err);
            loaderContainer.style.display = "none";
        });
}


