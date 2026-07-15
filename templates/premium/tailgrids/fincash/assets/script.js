document.addEventListener("DOMContentLoaded", () => {
	const headings = [...document.querySelectorAll("h1")];
	if (!headings.length) {
		const main = document.querySelector("main") || document.body;
		const heading = document.createElement("h1");
		heading.className = "sr-only";
		heading.textContent = document.title.split("|")[0].trim();
		main.prepend(heading);
	} else {
		headings.slice(1).forEach((heading) => {
			const replacement = document.createElement("h2");
			for (const attribute of heading.attributes) replacement.setAttribute(attribute.name, attribute.value);
			replacement.innerHTML = heading.innerHTML;
			heading.replaceWith(replacement);
		});
	}

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


	const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
	const mobileMenu = document.getElementById("mobile-menu");

	if (mobileMenuToggle && mobileMenu) {
		const mobileThemeToggle = document.createElement("button");
		mobileThemeToggle.type = "button";
		mobileThemeToggle.className = "mx-auto rounded-full border border-white/20 px-5 py-3 text-sm text-white";
		mobileThemeToggle.textContent = "Toggle theme";
		mobileThemeToggle.addEventListener("click", () => themeToggle?.click());
		mobileMenu.append(mobileThemeToggle);
		const closeMobileMenu = (restoreFocus = false) => {
			mobileMenu.classList.add("hidden");
			mobileMenuToggle.setAttribute("aria-expanded", "false");
			if (restoreFocus) mobileMenuToggle.focus();
		};
		mobileMenuToggle.setAttribute("aria-controls", "mobile-menu");
		mobileMenuToggle.setAttribute("aria-expanded", "false");
		mobileMenuToggle.addEventListener("click", () => {
			mobileMenu.classList.toggle("hidden");
			mobileMenuToggle.setAttribute("aria-expanded", String(!mobileMenu.classList.contains("hidden")));
		});


		const mobileLinks = mobileMenu.querySelectorAll("a");
		mobileLinks.forEach((link) => {
			link.addEventListener("click", () => {
				closeMobileMenu();
			});
		});
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && !mobileMenu.classList.contains("hidden")) closeMobileMenu(true);
		});
	}

	document.querySelectorAll("nav a").forEach((link) => {
		const href = link.getAttribute("href");
		if (href && new URL(href, location.href).pathname === location.pathname) link.setAttribute("aria-current", "page");
	});
	document.querySelectorAll("button").forEach((button) => {
		if (button.getAttribute("aria-label") || button.getAttribute("title") || (button.textContent || "").trim()) return;
		button.setAttribute("aria-label", "Interactive control");
	});
	document.querySelectorAll("input, textarea, select").forEach((field) => {
		if (field.getAttribute("aria-label") || field.closest("label") || (field.id && document.querySelector(`label[for="${field.id}"]`))) return;
		field.setAttribute("aria-label", field.getAttribute("placeholder") || field.getAttribute("name") || field.id || field.getAttribute("type") || "Form field");
	});


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
