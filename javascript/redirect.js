
var redirect = function (redirectWithoutTokenChk, loaderContainer) {


    const token = localStorage.getItem("jwt");
    console.log(token);

    if (token) {
        loaderContainer.style.display = "block";

        fetch(`${apiURL}/user/getdetails`, {
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
                        redirectToHomePageAccToToken(isAdmin);
                        break;
                    case 2:
                        redirectToAdminPageAccToToken(isAdmin);
                        break;

                    default:
                        break;
                }
            })
            .catch((err) => {
                console.log(err);
                loaderContainer.style.display = "none";
            });


    } else {
        if (redirectWithoutTokenChk > 0) {
            loaderContainer.style.display = "block";
            window.location.href = "./signupsignin.html";
        }
    }
}

function redirectToHomeOrAdminPageAccToToken(isAdmin) {
    if (isAdmin)
        window.location.href = "./general/admin_main_page.html";
    else window.location.href = "./homepage.html";
}


function redirectToHomePageAccToToken(isAdmin) {
    if (!isAdmin)
        window.location.href = "../homepage.html";
    else
        loaderContainer.style.display = "none";

}


function redirectToAdminPageAccToToken(isAdmin) {
    if (isAdmin)
        window.location.href = "./general/admin_main_page.html";
    else
        loaderContainer.style.display = "none";


}


