document.addEventListener("DOMContentLoaded", () => {
	// --- Scroll entrance animations ---
	const animatedEls = document.querySelectorAll('[style*="opacity: 0"]');
	if (animatedEls.length > 0) {
		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const el = entry.target;
						el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
						el.style.opacity = "1";
						el.style.transform = "none";
						revealObserver.unobserve(el);
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
		);
		animatedEls.forEach((el) => revealObserver.observe(el));
	}

	// --- Theme Toggle logic ---
	const themeToggle = document.getElementById("theme-toggle");
	const darkIcon = document.getElementById("theme-toggle-dark-icon");
	const lightIcon = document.getElementById("theme-toggle-light-icon");

	function updateThemeIcons() {
		const isLight =
			document.documentElement.getAttribute("data-theme") !== "dark";
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
			if (currentTheme === "dark") {
				document.documentElement.removeAttribute("data-theme");
				localStorage.setItem("theme", "light");
			} else {
				document.documentElement.setAttribute("data-theme", "dark");
				localStorage.setItem("theme", "dark");
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
				header.classList.remove("absolute", "top-8");
				header.classList.add("fixed", "top-0");
			} else {
				header.classList.remove("scrolled");
				header.classList.add("absolute", "top-8");
				header.classList.remove("fixed", "top-0");
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
	const faqTriggers = document.querySelectorAll(".faq-trigger");
	faqTriggers.forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const parent = trigger.closest(".py-6") || trigger.parentElement;
			const panel = parent.querySelector(".faq-panel");
			const iconBtn = trigger.querySelector(".faq-icon-btn");
			if (panel) {
				const isCollapsed =
					panel.style.height === "0px" || panel.style.height === "";
				if (isCollapsed) {
					panel.style.height = "auto";
					panel.style.opacity = "1";
					if (iconBtn) iconBtn.classList.add("active");
				} else {
					panel.style.height = "0px";
					panel.style.opacity = "0";
					if (iconBtn) iconBtn.classList.remove("active");
				}
			}
		});
	});
});
