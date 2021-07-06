setTimeout(function () {

let hamburgermenuMainContainer = document.getElementById("hamburgermenuMainContainer");
let HamburgerMenuNavList = document.getElementById("HamburgerMenuNavList");
let HBMBackground = document.getElementById("HBMBackground");
let hamburgerMenuBars = document.getElementById("hamburgerMenuBars");
let isOpen = false;

hamburgerMenuBars.addEventListener("click" , hamburgerdisplay);

function hamburgerdisplay() {


	if (isOpen) {
		HamburgerMenuNavList.classList.toggle("Toggle_class_anim");
		isOpen = false
	} else {
		setTimeout(function () {
			HamburgerMenuNavList.classList.toggle("Toggle_class_anim");
		}, 300);
		isOpen = true
	}
	hamburgermenuMainContainer.classList.toggle("Toggle_class");
	HBMBackground.classList.toggle("Toggle_class_background");
}
}, 500);
