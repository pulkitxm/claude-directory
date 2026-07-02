// Alfred — Shared Navigation JS
document.addEventListener("DOMContentLoaded", function () {
	// Mobile nav toggle
	const navToggle = document.getElementById("navToggle");
	const navMenu = document.getElementById("navMenu");
	const menuIcon = document.getElementById("menuIcon");
	const closeIcon = document.getElementById("closeIcon");

	if (navToggle && navMenu) {
		navToggle.addEventListener("click", () => {
			const isOpen = navMenu.classList.contains("open");
			navMenu.classList.toggle("open", !isOpen);
			menuIcon.classList.toggle("hidden", !isOpen);
			closeIcon.classList.toggle("hidden", isOpen);
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && navMenu.classList.contains("open")) {
				navMenu.classList.remove("open");
				menuIcon.classList.remove("hidden");
				closeIcon.classList.add("hidden");
			}
		});
	}

	// Dropdown menus
	document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
		const menuId = btn.dataset.menuButton;
		const menu = document.getElementById(menuId);
		if (!menu) return;

		btn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const isOpen = menu.classList.contains("open");

			// Close all dropdowns
			document
				.querySelectorAll(".dropdown-menu")
				.forEach((m) => m.classList.remove("open"));
			document
				.querySelectorAll(".flyout-menu")
				.forEach((m) => m.classList.remove("open"));

			if (!isOpen) {
				menu.classList.add("open");
			}
		});
	});

	// Flyout submenu (Resources)
	const flyoutTrigger = document.querySelector(
		'[aria-controls="second-flyout-submenu"]',
	);
	const flyoutMenu = document.getElementById("second-flyout-submenu");

	if (flyoutTrigger && flyoutMenu) {
		flyoutTrigger.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const isOpen = flyoutMenu.classList.contains("open");
			document
				.querySelectorAll(".flyout-menu")
				.forEach((m) => m.classList.remove("open"));
			if (!isOpen) {
				flyoutMenu.classList.add("open");
			}
		});
	}

	// Close on outside click
	document.addEventListener("click", (e) => {
		if (
			!e.target.closest(".dropdown-toggle") &&
			!e.target.closest(".dropdown-menu") &&
			!e.target.closest('[aria-controls="second-flyout-submenu"]') &&
			!e.target.closest("#second-flyout-submenu")
		) {
			document
				.querySelectorAll(".dropdown-menu, .flyout-menu")
				.forEach((m) => m.classList.remove("open"));
		}
	});
});
