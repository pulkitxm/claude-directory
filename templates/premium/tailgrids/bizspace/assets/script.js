document.addEventListener("DOMContentLoaded", () => {
	[...document.querySelectorAll("h1")].slice(1).forEach((heading) => {
		const replacement = document.createElement("h2");
		for (const attribute of heading.attributes) replacement.setAttribute(attribute.name, attribute.value);
		replacement.innerHTML = heading.innerHTML;
		heading.replaceWith(replacement);
	});
	document.querySelectorAll("button").forEach((button) => {
		if ((button.getAttribute("aria-label") || "").trim() || (button.textContent || "").trim() || button.getAttribute("title")) return;
		button.setAttribute("aria-label", "Interactive control");
	});
	document.querySelectorAll("input, textarea, select").forEach((field) => {
		if (field.getAttribute("aria-label") || field.closest("label") || (field.id && document.querySelector(`label[for="${field.id}"]`))) return;
		field.setAttribute("aria-label", field.getAttribute("placeholder") || field.getAttribute("name") || field.getAttribute("type") || "Form field");
	});

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


	const pagesBtn = document.querySelector("button[aria-haspopup='true']");
	if (pagesBtn) {
		const dropdownMenu = pagesBtn.nextElementSibling;
		const arrowIcon = pagesBtn.querySelector("svg");
		const closePagesMenu = () => {
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
		};

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


			document.addEventListener("click", (e) => {
			if (!pagesBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
				closePagesMenu();
			}
		});
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && pagesBtn.getAttribute("aria-expanded") === "true") {
				closePagesMenu();
				pagesBtn.focus();
			}
		});
	}


	const mobileMenuBtn = document.getElementById("mobile-menu-btn");
	const mobileMenu = document.getElementById("mobile-menu");

	if (mobileMenuBtn && mobileMenu) {
		mobileMenuBtn.setAttribute("aria-controls", "mobile-menu");
		mobileMenuBtn.setAttribute("aria-expanded", "false");
		mobileMenuBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			mobileMenu.classList.toggle("hidden");
			mobileMenuBtn.setAttribute("aria-expanded", String(!mobileMenu.classList.contains("hidden")));
		});


		document.addEventListener("click", (e) => {
			if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
				mobileMenu.classList.add("hidden");
				mobileMenuBtn.setAttribute("aria-expanded", "false");
			}
		});
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
				mobileMenu.classList.add("hidden");
				mobileMenuBtn.setAttribute("aria-expanded", "false");
				mobileMenuBtn.focus();
			}
		});
	}


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


	const contactForm = document.querySelector("form");
	if (contactForm && window.location.pathname.includes("contact")) {
		contactForm.addEventListener("submit", (e) => {
			e.preventDefault();
			alert("Thank you for your message! We will get back to you shortly.");
			contactForm.reset();
		});
	}
});
