document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector("header");
	if (header) {
		window.addEventListener("scroll", () => {
			const compact = window.scrollY > 50;
			header.classList.toggle("shadow-sm", compact);
			header.classList.toggle("py-4", !compact);
			header.classList.toggle("lg:py-6", !compact);
			header.classList.toggle("py-3", compact);
			header.classList.toggle("lg:py-4", compact);
		});
	}

	const menuBtn = document.querySelector("header .block.lg\\:hidden button");
	const desktopLinks = [...document.querySelectorAll("header nav ul a")];
	const currentPage = window.location.pathname.split("/").pop() || "index.html";
	desktopLinks.forEach((link) => {
		if (link.getAttribute("href") === currentPage) link.setAttribute("aria-current", "page");
	});

	if (menuBtn && desktopLinks.length) {
		menuBtn.setAttribute("aria-controls", "mobile-drawer");
		menuBtn.setAttribute("aria-expanded", "false");

		const createDrawer = () => {
			const drawer = document.createElement("div");
			drawer.id = "mobile-drawer";
			drawer.className = "hidden lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-white dark:bg-[#070707] z-40 px-6 py-8 border-t border-gray-100 dark:border-gray-800 transition-all duration-300";
			drawer.setAttribute("aria-hidden", "true");
			const links = desktopLinks.map((link) => {
				const label = link.querySelector("span span")?.textContent.trim() || link.textContent.trim();
				const current = link.getAttribute("href") === currentPage ? ' aria-current="page"' : "";
				return `<li><a class="block py-4 text-2xl uppercase text-black dark:text-white border-b border-gray-100 dark:border-gray-800" href="${link.getAttribute("href")}"${current}>${label}</a></li>`;
			}).join("");
			drawer.innerHTML = `<ul class="space-y-2">${links}</ul><a class="mt-8 group w-full py-4 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-base font-medium" href="contact.html">GET STARTED</a>`;
			document.body.appendChild(drawer);
			return drawer;
		};

		const setMenuOpen = (open, restoreFocus) => {
			const drawer = document.getElementById("mobile-drawer") || createDrawer();
			drawer.classList.toggle("hidden", !open);
			drawer.setAttribute("aria-hidden", String(!open));
			menuBtn.setAttribute("aria-expanded", String(open));
			menuBtn.textContent = open ? "CLOSE" : "MENU";
			document.body.style.overflow = open ? "hidden" : "";
			if (restoreFocus) menuBtn.focus();
		};

		menuBtn.addEventListener("click", () => {
			setMenuOpen(menuBtn.getAttribute("aria-expanded") !== "true", false);
		});
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") setMenuOpen(false, true);
		});
		window.addEventListener("resize", () => {
			if (window.innerWidth >= 1024 && menuBtn.getAttribute("aria-expanded") === "true") setMenuOpen(false, false);
		});
	}

	const swiperWrapper = document.querySelector(".testimonial-swiper");
	if (swiperWrapper && typeof Swiper !== "undefined") {
		let prevBtn;
		let nextBtn;
		document.querySelectorAll("button").forEach((button) => {
			const path = button.querySelector("svg path");
			if (!path) return;
			if (path.getAttribute("d")?.includes("12.7083")) {
				prevBtn = button;
				button.classList.add("swiper-button-prev-custom");
				button.setAttribute("aria-label", "Previous testimonial");
			} else {
				nextBtn = button;
				button.classList.add("swiper-button-next-custom");
				button.setAttribute("aria-label", "Next testimonial");
			}
		});
		const swiper = new Swiper(".testimonial-swiper", {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			breakpoints: {
				768: { slidesPerView: 2, spaceBetween: 20 },
				1024: { slidesPerView: 2, spaceBetween: 20 },
			},
		});
		prevBtn?.addEventListener("click", () => swiper.slidePrev());
		nextBtn?.addEventListener("click", () => swiper.slideNext());
	}

	const scrollElements = document.querySelectorAll("[style*='translateY(75px)']");
	if (scrollElements.length) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.style.opacity = "1";
				entry.target.style.transform = "none";
				entry.target.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
				observer.unobserve(entry.target);
			});
		}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
		scrollElements.forEach((element) => observer.observe(element));
	}

	const menuContainer = menuBtn?.closest(".block.lg\\:hidden");
	const actions = menuContainer?.parentElement;
	if (actions) {
		const themeToggle = document.createElement("button");
		themeToggle.className = "theme-toggle-btn group transition-all duration-300";
		themeToggle.setAttribute("aria-label", "Toggle dark mode");
		themeToggle.setAttribute("aria-pressed", String(document.documentElement.getAttribute("data-theme") === "dark"));
		themeToggle.innerHTML = `<svg class="sun-icon hidden dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg><svg class="moon-icon block dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
		actions.insertBefore(themeToggle, menuContainer);
		themeToggle.addEventListener("click", () => {
			const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
			document.documentElement.setAttribute("data-theme", nextTheme);
			localStorage.setItem("theme", nextTheme);
			themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
		});
	}

	document.querySelectorAll("button").forEach((button, index) => {
		if (!button.textContent.trim() && !button.getAttribute("aria-label") && !button.getAttribute("title")) button.setAttribute("aria-label", `Page action ${index + 1}`);
	});
	document.querySelectorAll("input, select, textarea").forEach((field, index) => {
		if (!field.id) field.id = `nexstudio-field-${index + 1}`;
		const label = document.querySelector(`label[for="${field.id}"]`);
		if (!label && !field.getAttribute("aria-label")) field.setAttribute("aria-label", field.getAttribute("placeholder") || field.name || field.type || "Form field");
	});
});
