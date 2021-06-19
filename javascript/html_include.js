function includehtmlbyID(containerid) {
  var elmnt, file, xhttp;

  elmnt = document.getElementById(containerid);

  file = elmnt.getAttribute("include_file_path");
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
      }
    };
    xhttp.open("GET", file, true);
    xhttp.send();

    return;
  }

}
