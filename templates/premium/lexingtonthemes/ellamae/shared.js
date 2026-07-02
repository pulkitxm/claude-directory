// Shared navigation behavior for Ella Mae® clone

// Mobile menu
document.addEventListener("DOMContentLoaded", function () {
	const menuToggle = document.getElementById("menu-toggle");
	const menuClose = document.getElementById("menu-close");
	const navMenu = document.getElementById("navigation-menu");

	function openMenu() {
		if (navMenu) {
			navMenu.classList.add("open");
			document.body.style.overflow = "hidden";
		}
	}
	function closeMenu() {
		if (navMenu) {
			navMenu.classList.remove("open");
			document.body.style.overflow = "";
		}
	}

	if (menuToggle) menuToggle.addEventListener("click", openMenu);
	if (menuClose) menuClose.addEventListener("click", closeMenu);
	if (navMenu)
		navMenu.addEventListener("click", function (e) {
			if (e.target === navMenu) closeMenu();
		});
});
