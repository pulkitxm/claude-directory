/* Add js-loaded class so fade animations only run with JS */
document.documentElement.classList.add("js-loaded");

/* ===== MOBILE MENU ===== */
const mobileToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileToggle && mobileMenu) {
	mobileToggle.addEventListener("click", () => {
		mobileMenu.classList.toggle("open");
	});

	// Close menu when a link is clicked
	mobileMenu.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			mobileMenu.classList.remove("open");
		});
	});
}

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll(".faq-question").forEach((btn) => {
	btn.addEventListener("click", () => {
		const item = btn.closest(".faq-item");
		const isOpen = item.classList.contains("open");
		// Close all
		document
			.querySelectorAll(".faq-item")
			.forEach((i) => i.classList.remove("open"));
		// Toggle current
		if (!isOpen) {
			item.classList.add("open");
		}
	});
});

/* ===== SCROLL ANIMATIONS ===== */
const fadeEls = document.querySelectorAll(".fade-up");

// Observe with IntersectionObserver for scroll-triggered animations
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Add delay based on position within parent grid
				const siblings = Array.from(entry.target.parentElement?.children || []);
				const idx = siblings.indexOf(entry.target);
				entry.target.style.transitionDelay = `${idx * 0.08}s`;
				entry.target.classList.add("visible");
				observer.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0.05,
		rootMargin: "0px 0px -5% 0px",
	},
);

fadeEls.forEach((el) => observer.observe(el));

// Fallback: after 500ms, mark everything visible (for crawlers/screenshots)
setTimeout(() => {
	fadeEls.forEach((el) => el.classList.add("visible"));
}, 500);

/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", (e) => {
		const href = anchor.getAttribute("href");
		if (href === "#") return;
		const target = document.querySelector(href);
		if (target) {
			e.preventDefault();
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	});
});

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.querySelector(".navbar-wrapper");

window.addEventListener(
	"scroll",
	() => {
		if (window.scrollY > 50) {
			navbar.style.top = "0.25rem";
		} else {
			navbar.style.top = "0.5rem";
		}
	},
	{ passive: true },
);
