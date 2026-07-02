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
			if (isDark) {
				if (logo.src.includes("logo-black.svg")) {
					logo.src = logo.src.replace("logo-black.svg", "logo.svg");
				}
			} else {
				if (
					logo.src.includes("logo.svg") &&
					!logo.src.includes("logo-black.svg")
				) {
					logo.src = logo.src.replace("logo.svg", "logo-black.svg");
				}
			}
		});
	}
	updateLogo(currentTheme === "dark");

	// --- 2. Sticky Scroll Header ---
	const header = document.querySelector("header");
	if (header) {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 50) {
				header.classList.add(
					"shadow-md",
					"bg-background-50/80",
					"backdrop-blur-md",
				);
				header.classList.remove("xl:py-8");
				header.classList.add("py-4");
			} else {
				header.classList.remove(
					"shadow-md",
					"bg-background-50/80",
					"backdrop-blur-md",
					"py-4",
				);
				header.classList.add("xl:py-8");
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

	// --- 4. Scroll Reveal Intersection Observer ---
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

	// --- 5. Testimonials Slider (Swiper clone) ---
	const swiperWrapper = document.querySelector(".swiper-wrapper");
	const swiperSlides = document.querySelectorAll(".swiper-slide");
	const prevBtn = document.querySelector(".swiper-button-prev");
	const nextBtn = document.querySelector(".swiper-button-next");

	if (swiperWrapper && swiperSlides.length > 0 && prevBtn && nextBtn) {
		swiperWrapper.style.display = "flex";
		swiperWrapper.style.transition = "transform 0.4s ease";

		let currentIndex = 0;

		function getVisibleCount() {
			if (window.innerWidth >= 1024) return 3;
			if (window.innerWidth >= 640) return 2;
			return 1;
		}

		function updateSlider() {
			const visibleCount = getVisibleCount();
			const maxIndex = Math.max(0, swiperSlides.length - visibleCount);
			if (currentIndex > maxIndex) currentIndex = maxIndex;
			if (currentIndex < 0) currentIndex = 0;

			prevBtn.disabled = currentIndex === 0;
			if (currentIndex === 0) {
				prevBtn.classList.add("swiper-button-disabled");
			} else {
				prevBtn.classList.remove("swiper-button-disabled");
			}

			nextBtn.disabled = currentIndex === maxIndex;
			if (currentIndex === maxIndex) {
				nextBtn.classList.add("swiper-button-disabled");
			} else {
				nextBtn.classList.remove("swiper-button-disabled");
			}

			const slideWidth = swiperSlides[0].getBoundingClientRect().width;
			const margin = 20;
			const offset = currentIndex * (slideWidth + margin);
			swiperWrapper.style.transform = `translateX(-${offset}px)`;
		}

		prevBtn.addEventListener("click", () => {
			if (currentIndex > 0) {
				currentIndex--;
				updateSlider();
			}
		});

		nextBtn.addEventListener("click", () => {
			const visibleCount = getVisibleCount();
			const maxIndex = swiperSlides.length - visibleCount;
			if (currentIndex < maxIndex) {
				currentIndex++;
				updateSlider();
			}
		});

		window.addEventListener("resize", () => {
			updateSlider();
		});

		setTimeout(updateSlider, 100);
	}
});
