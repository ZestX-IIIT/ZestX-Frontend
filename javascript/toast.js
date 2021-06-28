let toastAlertMessage = document.getElementById("toastAlertMessage");

function launch_toast() {
    toastAlertMessage.className = "toastPopUp";
  setTimeout(function () {
    toastAlertMessage.className = toastAlertMessage.className.replace("toastPopUp", "");
  }, 5000);
}
