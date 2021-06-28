let toastAlertMessage = document.getElementById("toastAlertMessage");
let toastImage = document.getElementById("toastImage");
let toastFrontMessage = document.getElementById("toastFrontMessage");
let toastDescriptionMessage = document.getElementById("toastDescriptionMessage");
let isSuccess , message;

function launch_toast(isSuccess , message) {
    if(isSuccess == true){
        toastImage.src = "../assets/_general/success_tick.svg"
        toastFrontMessage.style.backgroundColor = "green"
    }
    else{
        toastImage.src = "../assets/_general/error_cross.svg"
        toastFrontMessage.style.backgroundColor = "red"
    }
    toastDescriptionMessage.innerText = message;
    toastAlertMessage.className = "toastPopUp";
  setTimeout(function () {
    toastAlertMessage.className = toastAlertMessage.className.replace("toastPopUp", "");
  }, 5000);
}
