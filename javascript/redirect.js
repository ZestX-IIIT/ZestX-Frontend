
var redirect = function (redirectWithoutTokenChk, loaderContainer, setUpFun) {


    const token = localStorage.getItem("jwt");
    console.log(loaderContainer);

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
                        redirectToHomePageAccToToken(isAdmin, setUpFun, loaderContainer);
                        break;
                    case 2:
                        redirectToAdminPageAccToToken(isAdmin, setUpFun, loaderContainer);
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
            window.location.href = "../signupsignin.html";
        }
        else {
            loaderContainer.style.display = "none";
            setUpFun()

        }
    }
}

function redirectToHomeOrAdminPageAccToToken(isAdmin) {
    if (isAdmin)
        window.location.href = "./general/admin_main_page.html";
    else window.location.href = "./homepage.html";
}


function redirectToHomePageAccToToken(isAdmin, setUpFun, loaderContainer) {
    if (!isAdmin)
        window.location.href = "../homepage.html";
    else
        loaderContainer.style.display = "none";
    setUpFun()
}

function redirectToAdminPageAccToToken(isAdmin, setUpFun, loaderContainer) {
    if (isAdmin)
        window.location.href = "./general/admin_main_page.html";
    else
        loaderContainer.style.display = "none";
    setUpFun()
}