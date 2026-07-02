// ---- theme toggle (class-based dark, persisted, no-flash boot in <head>) ----
(function () {
	const root = document.documentElement;
	const btn = document.getElementById("theme-toggle");
	const sun = btn.querySelector(".ic-sun");
	const moon = btn.querySelector(".ic-moon");
	function sync() {
		const dark = root.classList.contains("dark");
		sun.style.display = dark ? "none" : "block";
		moon.style.display = dark ? "block" : "none";
	}
	sync();
	btn.addEventListener("click", () => {
		root.classList.toggle("dark");
		try {
			localStorage.setItem(
				"fc-theme",
				root.classList.contains("dark") ? "dark" : "light",
			);
		} catch (e) {}
		sync();
	});
})();

// ---- FAQ accordion (radix-style: chevron rotate + height animation) ----
document.querySelectorAll(".acc-item").forEach((item) => {
	const trigger = item.querySelector(".acc-trigger");
	const panel = item.querySelector(".acc-panel");
	const inner = panel.querySelector(".acc-inner");
	trigger.addEventListener("click", () => {
		const open = item.classList.toggle("open");
		trigger.setAttribute("aria-expanded", open ? "true" : "false");
		panel.style.height = open ? inner.offsetHeight + "px" : "0px";
	});
});

// ---- scroll reveal entrance ----
const io = new IntersectionObserver(
	(entries) => {
		entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("in");
				io.unobserve(e.target);
			}
		});
	},
	{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Safety: ensure all content is visible shortly after load even if it never
// scrolls into view (e.g. very tall viewports / full-page capture tools).
setTimeout(() => {
	document
		.querySelectorAll(".reveal:not(.in)")
		.forEach((el) => el.classList.add("in"));
}, 1500);
