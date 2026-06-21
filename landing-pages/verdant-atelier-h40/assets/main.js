// VERDANT ATELIER — interactions
document.addEventListener("DOMContentLoaded", () => {
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

	// Mobile menu
	const burger = document.getElementById("burger");
	const mobile = document.getElementById("mobile");
	const open = document.getElementById("ic-open");
	const close = document.getElementById("ic-close");
	const toggle = (state) => {
		mobile.classList.toggle("open", state);
		document.body.style.overflow = state ? "hidden" : "";
		if (open) open.style.display = state ? "none" : "";
		if (close) close.style.display = state ? "" : "none";
	};
	if (burger)
		burger.addEventListener("click", () =>
			toggle(!mobile.classList.contains("open")),
		);
	document
		.querySelectorAll(".mobile a")
		.forEach((a) => a.addEventListener("click", () => toggle(false)));

	// City pills toggle
	document.querySelectorAll(".pills span").forEach((p) => {
		p.addEventListener("click", () => {
			p.parentElement
				.querySelectorAll("span")
				.forEach((s) => s.classList.remove("active"));
			p.classList.add("active");
		});
	});

	// Newsletter (no-op feedback)
	const news = document.querySelector(".news");
	if (news)
		news.addEventListener("submit", (e) => {
			e.preventDefault();
			const btn = news.querySelector("button");
			const txt = btn.textContent;
			btn.textContent = "Thanks!";
			setTimeout(() => (btn.textContent = txt), 1800);
		});
});
