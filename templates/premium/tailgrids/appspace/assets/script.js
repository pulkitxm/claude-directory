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
	document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()));

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




		});
	}


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


	const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
	const mobileMenu = document.getElementById("mobile-menu");

	if (mobileMenuToggle && mobileMenu) {
		mobileMenuToggle.setAttribute("aria-controls", "mobile-menu");
		mobileMenuToggle.setAttribute("aria-expanded", "false");
		mobileMenuToggle.addEventListener("click", (e) => {
			e.stopPropagation();
			mobileMenu.classList.toggle("hidden");
			mobileMenuToggle.setAttribute("aria-expanded", String(!mobileMenu.classList.contains("hidden")));
		});


		document.addEventListener("click", (e) => {
			if (
				mobileMenu &&
				!mobileMenu.contains(e.target) &&
				e.target !== mobileMenuToggle
			) {
				mobileMenu.classList.add("hidden");
				mobileMenuToggle.setAttribute("aria-expanded", "false");
			}
		});
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
				mobileMenu.classList.add("hidden");
				mobileMenuToggle.setAttribute("aria-expanded", "false");
				mobileMenuToggle.focus();
			}
		});
	}


	const faqAccordions = document.querySelectorAll(
		"section div.max-w-xl.lg\\:max-w-3xl div.space-y-3 > div",
	);
	faqAccordions.forEach((faqItem) => {
		const btn = faqItem.querySelector("button");
		const contentWrapper = faqItem.querySelector("div.grid");
		const svg = btn ? btn.querySelector("svg") : null;

		if (btn && contentWrapper) {
			btn.addEventListener("click", () => {
				const isExpanded = btn.getAttribute("aria-expanded") === "true";


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
