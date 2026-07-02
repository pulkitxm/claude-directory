document.addEventListener("DOMContentLoaded", () => {
	// --- Theme Toggle Logic ---
	const themeToggle = document.getElementById("theme-toggle");
	const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

	function toggleTheme() {
		const isDark = document.documentElement.classList.contains("dark");
		if (isDark) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		}
	}

	if (themeToggle) {
		themeToggle.addEventListener("click", toggleTheme);
	}
	if (mobileThemeToggle) {
		mobileThemeToggle.addEventListener("click", toggleTheme);
	}

	// --- Sticky Header Scroll Logic ---
	const header = document.querySelector("nav");
	function handleScroll() {
		if (window.scrollY > 20) {
			header.classList.add("shadow-md");
			header.classList.remove("py-6");
			header.classList.add("py-3");
		} else {
			header.classList.remove("shadow-md");
			header.classList.add("py-6");
			header.classList.remove("py-3");
		}
	}
	if (header) {
		window.addEventListener("scroll", handleScroll);
		handleScroll();
	}

	// --- Pages Dropdown Toggle (Desktop) ---
	const pagesBtn = document.querySelector("button[aria-haspopup='true']");
	if (pagesBtn) {
		const dropdownMenu = pagesBtn.nextElementSibling;
		const arrowIcon = pagesBtn.querySelector("svg");

		pagesBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			const isExpanded = pagesBtn.getAttribute("aria-expanded") === "true";
			pagesBtn.setAttribute("aria-expanded", !isExpanded);

			if (isExpanded) {
				dropdownMenu.classList.add(
					"pointer-events-none",
					"opacity-0",
					"-translate-y-2",
				);
				dropdownMenu.classList.remove(
					"pointer-events-auto",
					"opacity-100",
					"translate-y-0",
				);
				if (arrowIcon) arrowIcon.classList.remove("rotate-180");
			} else {
				dropdownMenu.classList.remove(
					"pointer-events-none",
					"opacity-0",
					"-translate-y-2",
				);
				dropdownMenu.classList.add(
					"pointer-events-auto",
					"opacity-100",
					"translate-y-0",
				);
				if (arrowIcon) arrowIcon.classList.add("rotate-180");
			}
		});

		// Click outside to close pages dropdown
		document.addEventListener("click", (e) => {
			if (!pagesBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
				pagesBtn.setAttribute("aria-expanded", "false");
				dropdownMenu.classList.add(
					"pointer-events-none",
					"opacity-0",
					"-translate-y-2",
				);
				dropdownMenu.classList.remove(
					"pointer-events-auto",
					"opacity-100",
					"translate-y-0",
				);
				if (arrowIcon) arrowIcon.classList.remove("rotate-180");
			}
		});
	}

	// --- Mobile Menu Toggle ---
	const mobileMenuBtn = document.getElementById("mobile-menu-btn");
	const mobileMenu = document.getElementById("mobile-menu");

	if (mobileMenuBtn && mobileMenu) {
		mobileMenuBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			mobileMenu.classList.toggle("hidden");
		});

		// Close mobile menu when clicking outside
		document.addEventListener("click", (e) => {
			if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
				mobileMenu.classList.add("hidden");
			}
		});
	}

	// --- Back-to-Top Button ---
	const backToTopBtn = document.querySelector('[aria-label="Scroll to top"]');
	if (backToTopBtn) {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 300) {
				backToTopBtn.classList.remove("translate-y-16", "opacity-0");
				backToTopBtn.classList.add("translate-y-0", "opacity-100");
			} else {
				backToTopBtn.classList.add("translate-y-16", "opacity-0");
				backToTopBtn.classList.remove("translate-y-0", "opacity-100");
			}
		});

		backToTopBtn.addEventListener("click", () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		});
	}

	// --- Testimonial Swiper Initialization ---
	if (document.querySelector(".testimonial-swiper")) {
		new Swiper(".testimonial-swiper", {
			slidesPerView: 1,
			spaceBetween: 24,
			loop: true,
			navigation: {
				nextEl: ".testimonial-next",
				prevEl: ".testimonial-prev",
			},
			breakpoints: {
				640: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
			},
		});
	}

	// --- Contact Form Submission Handler ---
	const contactForm = document.querySelector("form");
	if (contactForm && window.location.pathname.includes("contact")) {
		contactForm.addEventListener("submit", (e) => {
			e.preventDefault();
			alert("Thank you for your message! We will get back to you shortly.");
			contactForm.reset();
		});
	}
});
