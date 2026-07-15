function toggleFaq(questionEl) {
	const item = questionEl.closest(".faq-item");
	const isOpen = item.classList.contains("open");
	document
		.querySelectorAll(".faq-item")
		.forEach((el) => el.classList.remove("open"));
	if (!isOpen) {
		item.classList.add("open");
	}
}
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
function initBlogFilters() {
	const filterBtns = document.querySelectorAll(".blog-filter-btn");
	const search = document.querySelector(".blog-search");

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

	if (search) {
		search.addEventListener("input", () => {
			const query = search.value.trim().toLowerCase();
			document.querySelectorAll(".blog-card").forEach((card) => {
				card.style.display = card.textContent.toLowerCase().includes(query) ? "" : "none";
			});
		});
	}
}
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
document.addEventListener("DOMContentLoaded", () => {
	initScrollReveal();
	initBlogFilters();
	initNavScroll();
	initSmoothScroll();
	document.querySelectorAll(".faq-question").forEach((question, index) => {
		const answer = question.nextElementSibling;
		if (!answer) return;
		answer.id = `faq-answer-${index + 1}`;
		question.setAttribute("role", "button");
		question.setAttribute("tabindex", "0");
		question.setAttribute("aria-controls", answer.id);
		question.setAttribute("aria-expanded", "false");
		question.addEventListener("click", () => question.setAttribute("aria-expanded", String(question.closest(".faq-item").classList.contains("open"))));
		question.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				question.click();
			}
		});
	});
});
