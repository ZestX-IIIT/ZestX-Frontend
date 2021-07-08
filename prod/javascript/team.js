setTimeout(() => {

    let imageHolder = document.getElementsByClassName("imageHolder");
    let outerContainer = document.getElementsByClassName("outerContainer");
    let github_icons = document.getElementsByClassName("team_section_github");
    let linkedin_icons = document.getElementsByClassName("team_section_linkedin");
    let mail_icons = document.getElementsByClassName("team_section_mail");

    let teamMembers = document.getElementsByClassName("teamMembers");
    let teamContent = document.getElementsByClassName("teamContent");

    for (let i = 1; i < github_icons.length; i += 2) {
        github_icons[i].addEventListener("click", () => {
            switch (i) {
                case 1:
                    window.open('https://github.com/kunaljain0212', '_blank');
                    break;
                case 3:
                case 11:
                    window.open('https://github.com/manishprivet', '_blank');
                    break;
                case 5:
                    window.open('https://github.com/TheNinza', '_blank');
                    break;
                case 7:
                    window.open('https://github.com/hs2361', '_blank');
                    break;
                case 9:
                    window.open('https://github.com/parthlaw', '_blank');
                    break;
                case 13:
                case 23:
                    window.open('https://github.com/akashgupta1909', '_blank');
                    break;
                case 15:
                case 21:
                    window.open('https://github.com/HarshilMendpara', '_blank');
                    break;
                case 17:
                case 19:
                    window.open('https://github.com/RajVarsani', '_blank');
                    break;
            }
        });
    }

    for (let i = 1; i < linkedin_icons.length; i += 2) {
        linkedin_icons[i].addEventListener("click", () => {
            switch (i) {
                case 1:
                    window.open('https://www.linkedin.com/in/kunaljain0212/', '_blank');
                    break;
                case 3:
                case 11:
                    window.open('https://www.linkedin.com/in/manishprivet/', '_blank');
                    break;
                case 5:
                    window.open('https://www.linkedin.com/in/theninza/', '_blank');
                    break;
                case 7:
                    window.open('https://www.linkedin.com/in/sharmaharsh23/', '_blank');
                    break;
                case 9:
                    window.open('https://www.linkedin.com/in/parthlaw/', '_blank');
                    break;
                case 13:
                case 23:
                    window.open('https://www.linkedin.com/in/akash-gupta-ab03721b8/', '_blank');
                    break;
                case 15:
                case 21:
                    window.open('https://www.linkedin.com/in/harshil-mendpara/', '_blank');
                    break;
                case 17:
                case 19:
                    window.open('https://www.linkedin.com/in/raj-varsani-404/', '_blank');
                    break;
            }
        });
    }

    for (let i = 1; i < mail_icons.length; i += 2) {
        mail_icons[i].addEventListener("click", () => {
            switch (i) {
                case 1:
                    window.open('mailto:jainkunal209@gmail.com', '_blank');
                    break;
                case 3:
                case 11:
                    window.open('mailto:manishprivet808@gmail.com', '_blank');
                    break;
                case 5:
                    window.open('mailto:niks.a3198@gmail.com', '_blank');
                    break;
                case 7:
                    window.open('mailto:harshhsharma23@gmail.com', '_blank');
                    break;
                case 9:
                    window.open('mailto:parthlaw24@gmail.com', '_blank');
                    break;
                case 13:
                case 23:
                    window.open('mailto:akash.gupta.anup@gmail.com', '_blank');
                    break;
                case 15:
                case 21:
                    window.open('mailto:hsmendpara2003@gmail.com', '_blank');
                    break;
                case 17:
                case 19:
                    window.open('mailto:varasaniraj5@gmail.com', '_blank');
                    break;
            }
        });
    }

    for (let i = 0; i < imageHolder.length; i++) {
        outerContainer[i].addEventListener("mouseenter", () => {
            imageHolder[i].classList.add("imageHolder_toggle");
            mail_icons[2 * i].style.opacity = 1;
            github_icons[2 * i].style.opacity = 1;
            linkedin_icons[2 * i].style.opacity = 1;
        });
        outerContainer[i].addEventListener("mouseleave", () => {
            imageHolder[i].classList.remove("imageHolder_toggle");
            mail_icons[2 * i].style.opacity = 0;
            github_icons[2 * i].style.opacity = 0;
            linkedin_icons[2 * i].style.opacity = 0;
        });
    }

    for (let i = 0; i < github_icons.length; i = i + 2) {
        github_icons[i + 1].addEventListener("mouseenter", () => {
            github_icons[i + 1].style.opacity = 1;
            github_icons[i].style.opacity = 0;
        });
        github_icons[i + 1].addEventListener("mouseleave", () => {
            github_icons[i + 1].style.opacity = 0;
            github_icons[i].style.opacity = 1;
        });
        mail_icons[i + 1].addEventListener("mouseenter", () => {
            mail_icons[i + 1].style.opacity = 1;
            mail_icons[i].style.opacity = 0;
        });
        mail_icons[i + 1].addEventListener("mouseleave", () => {
            mail_icons[i + 1].style.opacity = 0;
            mail_icons[i].style.opacity = 1;
        });
        linkedin_icons[i + 1].addEventListener("mouseenter", () => {
            linkedin_icons[i + 1].style.opacity = 1;
            linkedin_icons[i].style.opacity = 0;
        });
        linkedin_icons[i + 1].addEventListener("mouseleave", () => {
            linkedin_icons[i + 1].style.opacity = 0;
            linkedin_icons[i].style.opacity = 1;
        });

    }
    for (let i = 0; i < teamMembers.length; i++) {
        teamContent[i].addEventListener("click", () => {
            for (let j = 0; j < teamMembers.length; j++) {
                if (j == i) {
                    teamMembers[j].classList.add("teamMembers_active");
                    teamContent[j].classList.add("teamContentActive")
                } else {
                    teamMembers[j].classList.remove("teamMembers_active");
                    teamContent[j].classList.remove("teamContentActive")
                }
            }
        });
    }
}, 200)