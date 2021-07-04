let scrolling_terms_condition_content = document.getElementsByClassName("scrolling_terms_condition_content");
let terms_conditon_landing = document.getElementsByClassName("terms_conditon_landing");
let termsAndConditon = document.getElementById("terms-and-conditon");
let privacyPolicy = document.getElementById("privacy-policy");
let cookiePolicy = document.getElementById("cookie-policy");
let activeTabTnCPage = 0;

let urlLink = new URL(location.href);
let terms_conditon_landing_index = urlLink.searchParams.get("id");
if (terms_conditon_landing_index == null) {
  terms_conditon_landing_index = 0;
}
terms_conditon_landing[terms_conditon_landing_index].scrollIntoView({ behavior: "smooth" });

for (let i = 0; i < scrolling_terms_condition_content.length; i++) {
  scrolling_terms_condition_content[i].addEventListener("click", () => {
    terms_conditon_landing[i].scrollIntoView({ behavior: "smooth" });
    // preloader.style.display = "block";
  })
}
window.addEventListener("scroll", () => {
  let window_height = window.innerHeight;
  // console.log(terms_conditon_landing[1].offsetTop);
  if (window.pageYOffset <= terms_conditon_landing[1].offsetTop - (window_height / 2)) {
    if (activeTabTnCPage != 0) {
      activeTabTnCPage = 0;
      setActive(0);
      deActive(1);
      deActive(2);
    }
  } else if (window.pageYOffset <= terms_conditon_landing[2].offsetTop - (window_height / 2)) {
    if (activeTabTnCPage != 1) {
      activeTabTnCPage = 1;
      setActive(activeTabTnCPage);
      deActive(0);
      deActive(2);
    }
  } else if (window.pageYOffset > terms_conditon_landing[2].offsetTop - (window_height / 2)) {
    if (activeTabTnCPage != 2) {
      activeTabTnCPage = 2;
      setActive(activeTabTnCPage);
      deActive(1);
      deActive(3);
    }
  }
});
function deActive(tabIndex) {
  switch (tabIndex) {
    case 0:
      termsAndConditon.classList.remove("scrolling_terms_condition_content_active");
      break;
    case 1:
      privacyPolicy.classList.remove("scrolling_terms_condition_content_active");
      break;
    case 2:
      cookiePolicy.classList.remove("scrolling_terms_condition_content_active");
      break;

  }
}
function setActive(tabIndex) {
  switch (tabIndex) {
    case 0:
      termsAndConditon.classList.add("scrolling_terms_condition_content_active");
      break;
    case 1:
      privacyPolicy.classList.add("scrolling_terms_condition_content_active");
      break;
    case 2:
      cookiePolicy.classList.add("scrolling_terms_condition_content_active");
      break;
  }
}
