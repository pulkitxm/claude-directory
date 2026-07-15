document.addEventListener("DOMContentLoaded", () => {
	const animatedElements = document.querySelectorAll('[style*="opacity: 0"]');
	if (animatedElements.length > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					entry.target.style.transition =
						"opacity 0.6s ease, transform 0.6s ease";
					entry.target.style.opacity = "1";
					entry.target.style.transform = "none";
					observer.unobserve(entry.target);
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
		);
		animatedElements.forEach((element) => observer.observe(element));
	}

	const header = document.querySelector("header");
	const updateHeader = () => {
		if (!header) return;
		const isScrolled = window.scrollY > 20;
		header.classList.toggle("scrolled", isScrolled);
		header.classList.toggle("absolute", !isScrolled);
		header.classList.toggle("top-8", !isScrolled);
		header.classList.toggle("fixed", isScrolled);
		header.classList.toggle("top-0", isScrolled);
	};
	window.addEventListener("scroll", updateHeader, { passive: true });
	updateHeader();

	const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
	const mobileMenu = document.getElementById("mobile-menu");
	const setMenuOpen = (open) => {
		if (!mobileMenuToggle || !mobileMenu) return;
		mobileMenu.classList.toggle("hidden", !open);
		mobileMenuToggle.setAttribute("aria-expanded", String(open));
	};
	if (mobileMenuToggle && mobileMenu) {
		mobileMenuToggle.addEventListener("click", () => {
			setMenuOpen(mobileMenu.classList.contains("hidden"));
		});
		mobileMenu.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", () => setMenuOpen(false));
		});
	}

	const toggleFaq = (trigger) => {
		const parent = trigger.closest(".py-6") || trigger.parentElement;
		const panel = parent?.querySelector(".faq-panel");
		const icon = trigger.querySelector(".faq-icon-btn");
		if (!panel) return;
		const expanded = trigger.getAttribute("aria-expanded") !== "true";
		trigger.setAttribute("aria-expanded", String(expanded));
		panel.style.height = expanded ? "auto" : "0px";
		panel.style.opacity = expanded ? "1" : "0";
		icon?.classList.toggle("active", expanded);
	};
	document.querySelectorAll(".faq-trigger").forEach((trigger) => {
		trigger.addEventListener("click", () => toggleFaq(trigger));
		trigger.addEventListener("keydown", (event) => {
			if (event.key !== "Enter" && event.key !== " ") return;
			event.preventDefault();
			toggleFaq(trigger);
		});
	});
});
