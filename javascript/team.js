// setTimeout(()=>{
    
let imageHolder = document.getElementsByClassName("imageHolder");
let outerContainer = document.getElementsByClassName("outerContainer");
let team_section_hover_icons_not_hover_github = document.getElementsByClassName("team_section_hover_icons_not_hover_github");
let team_section_hover_icons_not_hover_linkedin = document.getElementsByClassName("team_section_hover_icons_not_hover_linkedin");
let team_section_hover_icons_not_hover_mail = document.getElementsByClassName("team_section_mail");
let team_section_hover_icons_under_hover_github = document.getElementsByClassName("team_section_hover_icons_under_hover_github")
for(let i=0; i<imageHolder.length;i++){
    outerContainer[i].addEventListener("mouseenter" , ()=>{
        imageHolder[i].classList.add("imageHolder_toggle");
        team_section_hover_icons_not_hover_mail[i].style.opacity = 1;
        team_section_hover_icons_not_hover_github[i].style.opacity = 1;
        team_section_hover_icons_not_hover_linkedin[i].style.opacity = 1;
    })
    outerContainer[i].addEventListener("mouseleave" , ()=>{
        imageHolder[i].classList.remove("imageHolder_toggle");
        team_section_hover_icons_not_hover_mail[i].style.opacity = 0;
        team_section_hover_icons_not_hover_github[i].style.opacity = 0;
        team_section_hover_icons_not_hover_linkedin[i].style.opacity = 0;
    })
    
    team_section_hover_icons_not_hover_github[i].addEventListener("mouseover" , ()=>{
        // this.style.opacity = 0;
        // team_section_hover_icons_under_hover_github[i].style.opacity = 1;
        console.log("hello");
    })
}
// },200);
