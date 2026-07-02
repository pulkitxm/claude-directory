// Theme toggle
const root = document.documentElement;
document.getElementById("themeToggle").addEventListener("click", () => {
	const next = root.classList.contains("dark") ? "light" : "dark";
	root.classList.remove("light", "dark");
	root.classList.add(next);
	try {
		localStorage.setItem("theme", next);
	} catch (e) {}
});

// Mobile menu
const ham = document.getElementById("hamburger");
const menu = document.getElementById("mobileMenu");
ham.addEventListener("click", () => menu.classList.toggle("open"));
menu
	.querySelectorAll("a")
	.forEach((a) =>
		a.addEventListener("click", () => menu.classList.remove("open")),
	);

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
	const q = item.querySelector(".faq-q");
	const a = item.querySelector(".faq-a");
	q.addEventListener("click", () => {
		const isOpen = item.classList.contains("open");
		if (isOpen) {
			item.classList.remove("open");
			a.style.maxHeight = "0px";
		} else {
			item.classList.add("open");
			a.style.maxHeight = a.scrollHeight + "px";
		}
	});
});

// Scroll reveal
const io = new IntersectionObserver(
	(entries) => {
		entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("in");
				io.unobserve(e.target);
			}
		});
	},
	{ threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Safety fallback: ensure nothing stays hidden (e.g. headless capture / no scroll)
window.addEventListener("load", () => {
	setTimeout(() => {
		document
			.querySelectorAll(".reveal:not(.in)")
			.forEach((el) => el.classList.add("in"));
	}, 1500);
});
