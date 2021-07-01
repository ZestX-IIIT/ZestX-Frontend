
let imageHolder = document.getElementsByClassName("imageHolder");
let outerContainer = document.getElementsByClassName("outerContainer");

let github_icons = document.getElementsByClassName("team_section_github");
let linkedin_icons = document.getElementsByClassName("team_section_linkedin");
let mail_icons = document.getElementsByClassName("team_section_mail");

// let team_section_hover_icons_not_hover_github = document.getElementsByClassName("team_section_hover_icons_not_hover_github");
// let team_section_hover_icons_not_hover_linkedin = document.getElementsByClassName("team_section_hover_icons_not_hover_linkedin");
// let team_section_hover_icons_not_hover_mail = document.getElementsByClassName("team_section_mail");
// let team_section_hover_icons_under_hover_github = document.getElementsByClassName("team_section_hover_icons_under_hover_github")

// console.log(github_icons);

for (let i = 0; i < imageHolder.length; i++) {
    outerContainer[i].addEventListener("mouseenter", () => {
        imageHolder[i].classList.add("imageHolder_toggle");
        mail_icons[2*i].style.opacity = 1;
        github_icons[2*i].style.opacity = 1;
        linkedin_icons[2*i].style.opacity = 1;
    })
    outerContainer[i].addEventListener("mouseleave", () => {
        imageHolder[i].classList.remove("imageHolder_toggle");
        mail_icons[2*i].style.opacity = 0;
        github_icons[2*i].style.opacity = 0;
        linkedin_icons[2*i].style.opacity = 0;
    })
}

for (let i = 0; i < github_icons.length; i=i+2) {
    github_icons[i+1].addEventListener("mouseenter", () => {
        github_icons[i+1].style.opacity = 1;
        github_icons[i].style.opacity = 0;
    })
    github_icons[i+1].addEventListener("mouseleave", () => {
        github_icons[i+1].style.opacity = 0;
        github_icons[i].style.opacity = 1;
    })
    mail_icons[i+1].addEventListener("mouseenter", () => {
        mail_icons[i+1].style.opacity = 1;
        mail_icons[i].style.opacity = 0;
    })
    mail_icons[i+1].addEventListener("mouseleave", () => {
        mail_icons[i+1].style.opacity = 0;
        mail_icons[i].style.opacity = 1;
    })
    linkedin_icons[i+1].addEventListener("mouseenter", () => {
        linkedin_icons[i+1].style.opacity = 1;
        linkedin_icons[i].style.opacity = 0;
    })
    linkedin_icons[i+1].addEventListener("mouseleave", () => {
        linkedin_icons[i+1].style.opacity = 0;
        linkedin_icons[i].style.opacity = 1;
    })
}
