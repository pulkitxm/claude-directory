document.addEventListener("DOMContentLoaded", () => {
	// --- Theme Toggle logic ---
	const themeToggle = document.getElementById("theme-toggle");
	const darkIcon = document.getElementById("theme-toggle-dark-icon");
	const lightIcon = document.getElementById("theme-toggle-light-icon");

	function updateThemeIcons() {
		const isLight =
			document.documentElement.getAttribute("data-theme") === "light";
		if (themeToggle && lightIcon && darkIcon) {
			if (isLight) {
				lightIcon.classList.add("hidden");
				darkIcon.classList.remove("hidden");
			} else {
				darkIcon.classList.add("hidden");
				lightIcon.classList.remove("hidden");
			}
		}
	}

	// Initial state check
	updateThemeIcons();

	if (themeToggle) {
		themeToggle.addEventListener("click", () => {
			const currentTheme = document.documentElement.getAttribute("data-theme");
			if (currentTheme === "light") {
				document.documentElement.removeAttribute("data-theme");
				localStorage.setItem("theme", "dark");
			} else {
				document.documentElement.setAttribute("data-theme", "light");
				localStorage.setItem("theme", "light");
			}
			updateThemeIcons();
		});
	}

	// --- Sticky Header logic ---
	const header = document.querySelector("header");
	function checkScroll() {
		if (header) {
			if (window.scrollY > 20) {
				header.classList.add("scrolled");
			} else {
				header.classList.remove("scrolled");
			}
		}
	}
	window.addEventListener("scroll", checkScroll);
	checkScroll(); // Run once in case of initial scroll position

	// --- Mobile Menu Toggle ---
	const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
	const mobileMenu = document.getElementById("mobile-menu");

	if (mobileMenuToggle && mobileMenu) {
		mobileMenuToggle.addEventListener("click", () => {
			mobileMenu.classList.toggle("hidden");
		});

		// Close menu when clicking on any links
		const mobileLinks = mobileMenu.querySelectorAll("a");
		mobileLinks.forEach((link) => {
			link.addEventListener("click", () => {
				mobileMenu.classList.add("hidden");
			});
		});
	}

	// --- FAQ Accordions ---
	const faqButtons = document.querySelectorAll(".faq-btn");
	faqButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const parent = btn.closest(".py-6") || btn.parentElement;
			const panel = parent.querySelector(".overflow-hidden");
			const svgContainer = btn.querySelector("span");
			if (panel) {
				const isCollapsed =
					panel.style.height === "0px" || panel.style.height === "";
				if (isCollapsed) {
					panel.style.height = "auto";
					panel.style.opacity = "1";
					if (svgContainer) svgContainer.classList.add("rotate-180");
				} else {
					panel.style.height = "0px";
					panel.style.opacity = "0";
					if (svgContainer) svgContainer.classList.remove("rotate-180");
				}
			}
		});
	});

	// --- Swiper Carousel (Home Page only) ---
	const swiperContainer = document.querySelector(".swiper");
	if (swiperContainer && typeof Swiper !== "undefined") {
		new Swiper(".swiper", {
			slidesPerView: 1,
			spaceBetween: 24,
			grabCursor: true,
			loop: true,
			navigation: {
				nextEl: ".what-you-get-next",
				prevEl: ".what-you-get-prev",
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
				1280: {
					slidesPerView: 4,
				},
			},
		});
	}
});
