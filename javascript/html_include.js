function includehtmlbyID(containerid) {
  var i, elmnt, file, xhttp;

  elmnt = document.getElementById(containerid);

  file = elmnt.getAttribute("html_container");
  if (file) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          elmnt.innerHTML = this.responseText;
        }
        if (this.status == 404) {
          elmnt.innerHTML = "Page not found.";
        }

        elmnt.removeAttribute("html_container");
      }
    };
    xhttp.open("GET", file, true);
    xhttp.send();

    return;
  }

}
