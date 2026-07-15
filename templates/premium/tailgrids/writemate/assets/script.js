document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector("header");
	const updateHeader = () => {
		header?.classList.toggle("scrolled", window.scrollY > 20);
	};

	window.addEventListener("scroll", updateHeader, { passive: true });
	updateHeader();

	const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
	const mobileMenu = document.getElementById("mobile-menu");

	if (mobileMenuToggle && mobileMenu) {
		mobileMenuToggle.setAttribute("aria-label", "Toggle navigation menu");
		mobileMenuToggle.setAttribute("aria-controls", "mobile-menu");
		mobileMenuToggle.setAttribute("aria-expanded", "false");

		const setMenuOpen = (isOpen) => {
			mobileMenu.classList.toggle("hidden", !isOpen);
			mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
		};

		mobileMenuToggle.addEventListener("click", () => {
			setMenuOpen(mobileMenu.classList.contains("hidden"));
		});

		mobileMenu.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", () => setMenuOpen(false));
		});
	}

	document.querySelectorAll(".faq-btn").forEach((button, index) => {
		const parent = button.closest(".py-6") || button.parentElement;
		const panel = parent?.querySelector(".overflow-hidden");
		const icon = button.querySelector("span");

		if (!panel) return;

		const panelId = `faq-panel-${index + 1}`;
		const isOpen = panel.style.height !== "0px" && panel.style.height !== "";
		panel.id = panelId;
		button.setAttribute("aria-controls", panelId);
		button.setAttribute("aria-expanded", String(isOpen));

		button.addEventListener("click", () => {
			const shouldOpen = button.getAttribute("aria-expanded") !== "true";
			panel.style.height = shouldOpen ? "auto" : "0px";
			panel.style.opacity = shouldOpen ? "1" : "0";
			icon?.classList.toggle("rotate-180", shouldOpen);
			button.setAttribute("aria-expanded", String(shouldOpen));
		});
	});

	const swiperContainer = document.querySelector(".swiper");
	if (swiperContainer && typeof Swiper !== "undefined") {
		swiperContainer.querySelectorAll(".swiper-slide").forEach((slide) => {
			slide.style.width = "";
			slide.style.marginRight = "";
		});

		new Swiper(".swiper", {
			slidesPerView: "auto",
			spaceBetween: 8,
			grabCursor: true,
			loop: true,
			navigation: {
				nextEl: ".what-you-get-next",
				prevEl: ".what-you-get-prev",
			},
		});
	}
});
