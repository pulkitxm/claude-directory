/* ===== SPECTRAL ORBIT — NOVASCALE interactions ===== */
document.addEventListener("DOMContentLoaded", () => {
	/* --- Mobile nav --- */
	const body = document.body;
	const toggle = document.getElementById("navToggle");
	const menu = document.getElementById("mobileMenu");
	const closeBtn = document.getElementById("mobileClose");

	const openMenu = () => {
		menu.classList.add("open");
		body.classList.add("menu-open");
	};
	const closeMenu = () => {
		menu.classList.remove("open");
		body.classList.remove("menu-open");
	};

	if (toggle)
		toggle.addEventListener("click", () => {
			body.classList.contains("menu-open") ? closeMenu() : openMenu();
		});
	if (closeBtn) closeBtn.addEventListener("click", closeMenu);
	menu
		.querySelectorAll("a")
		.forEach((a) => a.addEventListener("click", closeMenu));

	/* --- Duplicate marquee/carousel tracks for seamless loop --- */
	document.querySelectorAll("[data-marquee]").forEach((track) => {
		track.innerHTML += track.innerHTML;
	});

	/* --- FAQ accordion (single-open) --- */
	const items = document.querySelectorAll(".faq-item");
	items.forEach((item) => {
		const q = item.querySelector(".faq-q");
		const a = item.querySelector(".faq-a");
		q.addEventListener("click", () => {
			const isOpen = item.classList.contains("open");
			items.forEach((other) => {
				other.classList.remove("open");
				other.querySelector(".faq-a").style.maxHeight = null;
			});
			if (!isOpen) {
				item.classList.add("open");
				a.style.maxHeight = `${a.scrollHeight}px`;
			}
		});
	});

	/* --- Scroll reveal --- */
	const reveals = document.querySelectorAll(".reveal");
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry, _i) => {
				if (entry.isIntersecting) {
					const sib = [
						...entry.target.parentElement.querySelectorAll(".reveal"),
					].indexOf(entry.target);
					setTimeout(
						() => entry.target.classList.add("shown"),
						Math.min(sib, 4) * 90,
					);
					io.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12 },
	);
	reveals.forEach((el) => io.observe(el));
});
