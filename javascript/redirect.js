
var redirect = function (redirectWithoutTokenChk, setUpFun) {

    const token = localStorage.getItem("jwt");
    console.log(token);
    console.log(redirectWithoutTokenChk);
    if (token) {

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
            window.location.href = "../signupsignin.html";
        }
        else {
            setUpFun()

        }
    }
}

function redirectToHomeOrAdminPageAccToToken(isAdmin) {
    if (isAdmin)
        window.location.href = "./general/admin_main_page.html";
    else window.location.href = "./homepage.html";
}

function redirectToHomePageAccToToken(isAdmin, setUpFun) {
    if (!isAdmin)
        window.location.href = "../homepage.html";
    else
        setUpFun()
}

function redirectToAdminPageAccToToken(isAdmin, setUpFun) {
    if (isAdmin)
        window.location.href = "./general/admin_main_page.html";
    else
        setUpFun()
}