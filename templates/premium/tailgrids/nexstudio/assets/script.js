document.addEventListener("DOMContentLoaded", () => {
	// Sticky Header Transition
	const header = document.querySelector("header");
	if (header) {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 50) {
				header.classList.add("shadow-sm");
				header.classList.remove("py-4", "lg:py-6");
				header.classList.add("py-3", "lg:py-4");
			} else {
				header.classList.remove("shadow-sm");
				header.classList.add("py-4", "lg:py-6");
				header.classList.remove("py-3", "lg:py-4");
			}
		});
	}

	// Mobile Hamburger Navigation
	const menuBtn = document.querySelector("header button");
	if (menuBtn) {
		// Let's find the nav menu list to show/hide
		const nav = document.querySelector("header nav ul");
		if (nav) {
			const navWrapper = nav.closest("div");

			// We can append a mobile menu container or toggle classes on the existing navbar.
			// Let's toggle a class and build a nice mobile drawer.
			menuBtn.addEventListener("click", () => {
				const isOpen = menuBtn.textContent.trim() === "CLOSE";
				if (isOpen) {
					menuBtn.textContent = "MENU";
					// Hide mobile menu
					const drawer = document.getElementById("mobile-drawer");
					if (drawer) {
						drawer.classList.add("hidden");
					}
				} else {
					menuBtn.textContent = "CLOSE";
					// Show mobile menu
					let drawer = document.getElementById("mobile-drawer");
					if (!drawer) {
						drawer = document.createElement("div");
						drawer.id = "mobile-drawer";
						drawer.className =
							"lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-white dark:bg-[#070707] z-40 px-6 py-8 border-t border-gray-100 dark:border-gray-800 transition-all duration-300";

						const menuLinks = Array.from(
							document.querySelectorAll("header nav ul a"),
						)
							.map((a) => {
								return `<li><a class="block py-4 text-2xl uppercase text-black dark:text-white border-b border-gray-100 dark:border-gray-800" href="${a.getAttribute("href")}">${a.querySelector("span span").textContent}</a></li>`;
							})
							.join("");

						const getStartedBtn = document.querySelector(
							"header nav a[href='/contact']",
						);
						const getStartedHtml = getStartedBtn
							? `<a class="mt-8 group w-full py-4 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-base font-medium" href="/contact">GET STARTED</a>`
							: "";

						drawer.innerHTML = `<ul class="space-y-2">${menuLinks}</ul>${getStartedHtml}`;
						document.body.appendChild(drawer);
					} else {
						drawer.classList.remove("hidden");
					}
				}
			});
		}
	}

	// Swiper Testimonials Slider initialization
	const swiperWrapper = document.querySelector(".testimonial-swiper");
	if (swiperWrapper && typeof Swiper !== "undefined") {
		// Find prev/next buttons
		const buttons =
			document.querySelectorAll(".testimonial-swiper").length > 0
				? document.querySelectorAll("button") // find the circular buttons near the title
				: [];

		let prevBtn, nextBtn;
		buttons.forEach((btn) => {
			const svg = btn.querySelector("svg");
			if (svg) {
				const path = svg.querySelector("path");
				if (path && path.getAttribute("d").includes("12.7083")) {
					prevBtn = btn;
					btn.classList.add("swiper-button-prev-custom");
				} else {
					nextBtn = btn;
					btn.classList.add("swiper-button-next-custom");
				}
			}
		});

		const swiper = new Swiper(".testimonial-swiper", {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1024: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
			},
		});

		if (prevBtn) {
			prevBtn.addEventListener("click", () => {
				swiper.slidePrev();
			});
		}
		if (nextBtn) {
			nextBtn.addEventListener("click", () => {
				swiper.slideNext();
			});
		}
	}

	// Scroll Entrance Intersection Observer
	const scrollElements = document.querySelectorAll(
		"[style*='translateY(75px)']",
	);
	if (scrollElements.length > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.style.opacity = "1";
						entry.target.style.transform = "none";
						entry.target.style.transition =
							"opacity 0.6s ease-out, transform 0.6s ease-out";
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px -50px 0px",
			},
		);

		scrollElements.forEach((el) => {
			observer.observe(el);
		});
	}

	// Add Theme Toggle button into the navbar if not present
	const navFlex = document.querySelector("header nav .flex.items-center");
	if (navFlex) {
		const themeToggle = document.createElement("button");
		themeToggle.className =
			"theme-toggle-btn group transition-all duration-300";
		themeToggle.setAttribute("aria-label", "Toggle dark mode");
		themeToggle.innerHTML = `
			<svg class="sun-icon hidden dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="12" r="5"></circle>
				<line x1="12" y1="1" x2="12" y2="3"></line>
				<line x1="12" y1="21" x2="12" y2="23"></line>
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
				<line x1="1" y1="12" x2="3" y2="12"></line>
				<line x1="21" y1="12" x2="23" y2="12"></line>
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
			</svg>
			<svg class="moon-icon block dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
			</svg>
		`;

		// Insert before the last button or menu toggle
		const menuBtnContainer =
			navFlex.querySelector(".block.lg\\:hidden") || navFlex.lastChild;
		navFlex.insertBefore(themeToggle, menuBtnContainer);

		themeToggle.addEventListener("click", () => {
			const currentTheme =
				document.documentElement.getAttribute("data-theme") || "light";
			const newTheme = currentTheme === "dark" ? "light" : "dark";

			document.documentElement.setAttribute("data-theme", newTheme);
			localStorage.setItem("theme", newTheme);
		});
	}
});
