document.addEventListener("DOMContentLoaded", () => {
	// --- 1. Theme Toggle ---
	const toggleThemeBtns = document.querySelectorAll(
		'button[aria-label="Toggle theme"]',
	);
	const currentTheme =
		localStorage.getItem("theme") ||
		(window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light");

	if (currentTheme === "dark") {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}

	toggleThemeBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const isDark = document.documentElement.classList.toggle("dark");
			localStorage.setItem("theme", isDark ? "dark" : "light");
			updateLogo(isDark);
		});
	});

	function updateLogo(isDark) {
		const logos = document.querySelectorAll('img[src*="logo"]');
		logos.forEach((logo) => {
			// Tailgrids logo typically uses tailgrids-logo.svg (which looks good in both or needs dark variant)
			// Let's check if there is a dark logo variant or if it uses the same logo.
			// If tailgrids-logo.svg is suitable for both, we keep it. If they have special dark logo, we swap it.
			// Let's keep it as is unless visual loop diffs it.
		});
	}

	// --- 2. Sticky Scroll Header ---
	const header = document.querySelector("nav");
	if (header) {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 50) {
				header.classList.add(
					"shadow-md",
					"bg-background-50/90",
					"backdrop-blur-md",
					"border-base-100",
				);
				header.classList.remove("border-transparent");
			} else {
				header.classList.remove(
					"shadow-md",
					"bg-background-50/90",
					"backdrop-blur-md",
					"border-base-100",
				);
				header.classList.add("border-transparent");
			}
		});
	}

	// --- 3. Mobile Navigation Drawer ---
	const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
	const mobileMenu = document.getElementById("mobile-menu");

	if (mobileMenuToggle && mobileMenu) {
		mobileMenuToggle.addEventListener("click", (e) => {
			e.stopPropagation();
			mobileMenu.classList.toggle("hidden");
		});

		// Close mobile menu when clicking outside
		document.addEventListener("click", (e) => {
			if (
				mobileMenu &&
				!mobileMenu.contains(e.target) &&
				e.target !== mobileMenuToggle
			) {
				mobileMenu.classList.add("hidden");
			}
		});
	}

	// --- 4. FAQ Accordion ---
	const faqAccordions = document.querySelectorAll(
		"section div.max-w-xl.lg:max-w-3xl div.space-y-3 > div",
	);
	faqAccordions.forEach((faqItem) => {
		const btn = faqItem.querySelector("button");
		const contentWrapper = faqItem.querySelector("div.grid");
		const svg = btn ? btn.querySelector("svg") : null;

		if (btn && contentWrapper) {
			btn.addEventListener("click", () => {
				const isExpanded = btn.getAttribute("aria-expanded") === "true";

				// Close all other accordions
				faqAccordions.forEach((otherItem) => {
					const otherBtn = otherItem.querySelector("button");
					const otherContent = otherItem.querySelector("div.grid");
					const otherSvg = otherBtn ? otherBtn.querySelector("svg") : null;

					if (otherBtn && otherContent) {
						otherBtn.setAttribute("aria-expanded", "false");
						otherContent.className =
							"grid transition-all duration-300 ease-in-out grid-rows-[0fr] opacity-0";
						if (otherSvg) {
							otherSvg.classList.remove("rotate-180");
						}
					}
				});

				// Toggle this one
				if (isExpanded) {
					btn.setAttribute("aria-expanded", "false");
					contentWrapper.className =
						"grid transition-all duration-300 ease-in-out grid-rows-[0fr] opacity-0";
					if (svg) {
						svg.classList.remove("rotate-180");
					}
				} else {
					btn.setAttribute("aria-expanded", "true");
					contentWrapper.className =
						"grid transition-all duration-300 ease-in-out grid-rows-[1fr] opacity-100";
					if (svg) {
						svg.classList.add("rotate-180");
					}
				}
			});
		}
	});

	// --- 5. Scroll Reveal ---
	// Cleanly reveal elements that have style opacity: 0
	const animateElements = document.querySelectorAll(
		'[style*="opacity: 0"], [style*="opacity:0"]',
	);
	if (animateElements.length > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const el = entry.target;
						el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
						el.style.opacity = "1";
						el.style.transform = "none";
						observer.unobserve(el);
					}
				});
			},
			{ threshold: 0.15 },
		);
		animateElements.forEach((el) => observer.observe(el));
	}
});
