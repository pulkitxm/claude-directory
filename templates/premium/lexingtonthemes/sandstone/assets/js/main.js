// Sandstone — Shared JS

// Mobile menu toggle
(function () {
	const toggle = document.getElementById("mobile-menu-toggle");
	const menu = document.getElementById("mobile-menu");
	const menuInner = document.getElementById("mobile-menu-inner");
	const closedIcon = toggle?.querySelector("[data-closed-icon]");
	const openIcon = toggle?.querySelector("[data-open-icon]");
	let isOpen = false;

	function setMenu(open) {
		isOpen = open;
		const state = open ? "open" : "closed";
		toggle?.setAttribute("aria-expanded", open);
		menu?.setAttribute("aria-hidden", !open);
		menu?.setAttribute("data-menu-state", state);
		toggle?.setAttribute("data-menu-state", state);
		closedIcon?.classList.toggle("hidden", open);
		openIcon?.classList.toggle("hidden", !open);
		if (menuInner) {
			menuInner.style.height = open ? `${menuInner.scrollHeight}px` : "0px";
			if (open) {
				menuInner.addEventListener("transitionend", function handler(e) {
					if (e.propertyName === "height") {
						menuInner.style.height = "auto";
						menuInner.removeEventListener("transitionend", handler);
					}
				});
			}
		}
	}

	toggle?.addEventListener("click", () => setMenu(!isOpen));

	document.addEventListener("click", (e) => {
		if (isOpen && !menu?.contains(e.target) && !toggle?.contains(e.target)) {
			setMenu(false);
		}
	});
})();

// Search modal
(function () {
	const searchButton = document.getElementById("searchButton");
	const searchModal = document.getElementById("searchModal");
	const searchClose = document.getElementById("searchClose");
	const searchInput = document.getElementById("searchInput");

	searchButton?.addEventListener("click", () => {
		searchModal?.classList.remove("hidden");
		setTimeout(() => searchInput?.focus(), 50);
	});

	searchClose?.addEventListener("click", () => {
		searchModal?.classList.add("hidden");
	});

	searchModal?.addEventListener("click", (e) => {
		if (e.target === searchModal) searchModal.classList.add("hidden");
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") searchModal?.classList.add("hidden");
	});
})();

// Back to top button
(function () {
	const btn = document.getElementById("back-to-top");
	if (!btn) return;
	window.addEventListener("scroll", () => {
		btn.style.opacity = window.scrollY > 300 ? "1" : "0";
		btn.style.pointerEvents = window.scrollY > 300 ? "auto" : "none";
	});
	btn.addEventListener("click", () =>
		window.scrollTo({ top: 0, behavior: "smooth" }),
	);
})();
