/* Shape.AI Scheduling Template — main.js */

// ===== FAQ ACCORDION =====
function toggleFaq(questionEl) {
	const item = questionEl.closest(".faq-item");
	const isOpen = item.classList.contains("open");

	// Close all
	document
		.querySelectorAll(".faq-item")
		.forEach((el) => el.classList.remove("open"));

	// Open clicked if it wasn't open
	if (!isOpen) {
		item.classList.add("open");
	}
}

// ===== SCROLL REVEAL =====
// Elements are always visible; we add a CSS animation class when they enter the viewport
function initScrollReveal() {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("animate-in");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
	);

	document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ===== BLOG FILTERS =====
function initBlogFilters() {
	const filterBtns = document.querySelectorAll(".blog-filter-btn");

	filterBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			filterBtns.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");

			const filter = btn.textContent.trim().toLowerCase();
			const cards = document.querySelectorAll(".blog-card");

			cards.forEach((card) => {
				if (filter === "all") {
					card.style.display = "";
					return;
				}
				const tag = card.querySelector(".blog-tag");
				if (tag && tag.textContent.trim().toLowerCase() === filter) {
					card.style.display = "";
				} else {
					card.style.display = "none";
				}
			});
		});
	});
}

// ===== NAV SCROLL SHADOW =====
function initNavScroll() {
	const nav = document.querySelector(".nav");
	if (!nav) return;

	window.addEventListener(
		"scroll",
		() => {
			if (window.scrollY > 20) {
				nav.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
				nav.style.background = "rgba(255, 255, 255, 0.85)";
			} else {
				nav.style.boxShadow = "transparent 0px 0px 0px";
				nav.style.background = "rgba(255, 255, 255, 0.5)";
			}
		},
		{ passive: true },
	);
}

// ===== SMOOTH ANCHOR SCROLL =====
function initSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", (e) => {
			const target = document.querySelector(anchor.getAttribute("href"));
			if (target) {
				e.preventDefault();
				const navHeight = 80;
				const top =
					target.getBoundingClientRect().top + window.scrollY - navHeight;
				window.scrollTo({ top, behavior: "smooth" });
			}
		});
	});
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
	initScrollReveal();
	initBlogFilters();
	initNavScroll();
	initSmoothScroll();
});
