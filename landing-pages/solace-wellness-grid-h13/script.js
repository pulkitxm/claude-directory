document.addEventListener("DOMContentLoaded", () => {
	// Scroll reveal with stagger
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry, _i) => {
				if (entry.isIntersecting) {
					const el = entry.target;
					setTimeout(
						() => el.classList.add("in"),
						el.dataset.delay ? +el.dataset.delay : 0,
					);
					io.unobserve(el);
				}
			});
		},
		{ threshold: 0.12 },
	);
	document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

	// Mobile menu
	const menu = document.getElementById("mMenu");
	const open = () => {
		menu.classList.add("open");
		document.body.style.overflow = "hidden";
	};
	const close = () => {
		menu.classList.remove("open");
		document.body.style.overflow = "";
	};
	document.getElementById("burger")?.addEventListener("click", open);
	document.getElementById("mClose")?.addEventListener("click", close);
	menu
		.querySelectorAll("nav a")
		.forEach((a) => a.addEventListener("click", close));

	// Reserve form (no backend — friendly local confirmation)
	const form = document.getElementById("reserveForm");
	const note = document.getElementById("formNote");
	form?.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = (form.name.value || "").trim();
		const email = (form.email.value || "").trim();
		if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			note.textContent = "Please enter your name and a valid email.";
			note.style.color = "#a33";
			return;
		}
		note.textContent = `Thank you, ${name.split(" ")[0]}. We'll be in touch soon — breathe easy.`;
		note.style.color = "#4B594D";
		form.reset();
	});
});
