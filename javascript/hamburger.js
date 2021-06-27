let hamburgermenuMainContainer = document.getElementById("hamburgermenuMainContainer");
let HamburgerMenuNavList = document.getElementById("HamburgerMenuNavList");
let HBMBackground = document.getElementById("HBMBackground");

function onClickMenu(){
	hamburgermenuMainContainer.classList.toggle("Toggle_class");
	HamburgerMenuNavList.classList.toggle("Toggle_class");
	HBMBackground.classList.toggle("Toggle_class_background");
}
