document.addEventListener("DOMContentLoaded", () => {
	// --- Theme Toggle logic ---
	const themeToggle = document.getElementById("theme-toggle");
	const darkIcon = document.getElementById("theme-toggle-dark-icon");
	const lightIcon = document.getElementById("theme-toggle-light-icon");

	function updateThemeIcons() {
		const isLight =
			document.documentElement.getAttribute("data-theme") === "light";
		if (isLight) {
			lightIcon.classList.add("hidden");
			darkIcon.classList.remove("hidden");
		} else {
			darkIcon.classList.add("hidden");
			lightIcon.classList.remove("hidden");
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
		if (window.scrollY > 20) {
			header.classList.add("scrolled");
		} else {
			header.classList.remove("scrolled");
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

	// --- Scroll reveal (replaces Framer Motion initial states) ---
	const revealEls = document.querySelectorAll('[style*="opacity: 0"]');
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
					e.target.style.opacity = "1";
					e.target.style.transform = "none";
					observer.unobserve(e.target);
				}
			});
		},
		{ rootMargin: "0px 0px -40px 0px" },
	);
	revealEls.forEach((el) => observer.observe(el));

	// --- Swiper Testimonial Carousel ---
	const swiperContainer = document.querySelector(".swiper");
	if (swiperContainer) {
		new Swiper(".swiper", {
			slidesPerView: 1,
			spaceBetween: 24,
			grabCursor: true,
			navigation: {
				nextEl: ".testimonial-button-next",
				prevEl: ".testimonial-button-prev",
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
