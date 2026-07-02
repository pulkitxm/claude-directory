// theme toggle
const root = document.documentElement;
document.getElementById("themeToggle").addEventListener("click", () => {
	const dark = root.classList.toggle("dark");
	try {
		localStorage.setItem("theme", dark ? "dark" : "light");
	} catch (e) {}
});

// sticky nav border on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// mobile menu
const ham = document.getElementById("hamburger");
const menu = document.getElementById("mobileMenu");
ham.addEventListener("click", () => menu.classList.toggle("open"));
menu
	.querySelectorAll("a")
	.forEach((a) =>
		a.addEventListener("click", () => menu.classList.remove("open")),
	);

// scroll-in reveal
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
const reveals = document.querySelectorAll(".reveal");
reveals.forEach((el) => io.observe(el));
// safety: ensure nothing stays hidden (e.g. fullpage capture, no-scroll, reduced motion)
window.addEventListener("load", () => {
	setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 1200);
});

// footer year
document.getElementById("year").textContent = new Date().getFullYear();
