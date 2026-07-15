document.addEventListener("DOMContentLoaded", () => {
	const currentPage = window.location.pathname.split("/").pop() || "index.html";
	document.querySelectorAll("header a[href]").forEach((link) => {
		if (link.getAttribute("href") === currentPage) link.setAttribute("aria-current", "page");
	});

	const themeToggle = document.getElementById("theme-toggle");
	if (themeToggle) {
		themeToggle.setAttribute("aria-pressed", String(document.documentElement.classList.contains("dark")));
		themeToggle.addEventListener("click", () => {
			themeToggle.setAttribute("aria-pressed", String(document.documentElement.classList.contains("dark")));
		});
	}

	const menuButton = document.querySelector("header button.md\\:hidden");
	const mobileMenu = document.getElementById("mobile-menu-overlay");
	if (menuButton && mobileMenu) {
		const closeButton = mobileMenu.querySelector("button");
		menuButton.setAttribute("aria-controls", "mobile-menu-overlay");
		menuButton.setAttribute("aria-expanded", "false");
		menuButton.setAttribute("aria-label", "Open navigation");
		mobileMenu.setAttribute("aria-hidden", "true");
		if (closeButton) closeButton.setAttribute("aria-label", "Close navigation");

		const setOpen = (open, restoreFocus) => {
			mobileMenu.classList.toggle("opacity-0", !open);
			mobileMenu.classList.toggle("pointer-events-none", !open);
			mobileMenu.setAttribute("aria-hidden", String(!open));
			menuButton.setAttribute("aria-expanded", String(open));
			menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
			document.body.style.overflow = open ? "hidden" : "";
			if (restoreFocus) menuButton.focus();
		};

		menuButton.addEventListener("click", () => setOpen(true, false));
		closeButton?.addEventListener("click", () => setOpen(false, true));
		mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false, false)));
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") setOpen(false, true);
		});
		window.addEventListener("resize", () => {
			if (window.innerWidth >= 768 && menuButton.getAttribute("aria-expanded") === "true") setOpen(false, false);
		});
	}

	document.querySelectorAll("button").forEach((button, index) => {
		if (!button.textContent.trim() && !button.getAttribute("aria-label") && !button.getAttribute("title")) button.setAttribute("aria-label", `Page action ${index + 1}`);
	});
	document.querySelectorAll("input, select, textarea").forEach((field, index) => {
		if (!field.id) field.id = `originx-field-${index + 1}`;
		const label = document.querySelector(`label[for="${field.id}"]`);
		if (!label && !field.getAttribute("aria-label")) field.setAttribute("aria-label", field.getAttribute("placeholder") || field.name || field.type || "Form field");
	});
});
