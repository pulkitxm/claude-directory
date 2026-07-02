// ===== acme.ai clone — shared interactions =====
(function () {
	// Sticky header blur on scroll
	const header = document.querySelector(".site-header");
	if (header) {
		const onScroll = () =>
			header.classList.toggle("scrolled", window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
	}

	// Mobile sheet
	const sheet = document.querySelector(".mobile-sheet");
	const burger = document.querySelector(".hamburger");
	if (sheet && burger) {
		const open = () => sheet.classList.add("open");
		const close = () => sheet.classList.remove("open");
		burger.addEventListener("click", open);
		sheet.querySelector(".backdrop")?.addEventListener("click", close);
		sheet.querySelector(".close")?.addEventListener("click", close);
		sheet
			.querySelectorAll("a")
			.forEach((a) => a.addEventListener("click", close));
	}

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

	// FAQ accordion
	document.querySelectorAll(".faq-item").forEach((item) => {
		const q = item.querySelector(".faq-q");
		const a = item.querySelector(".faq-a");
		q?.addEventListener("click", () => {
			const isOpen = item.classList.contains("open");
			document.querySelectorAll(".faq-item.open").forEach((other) => {
				if (other !== item) {
					other.classList.remove("open");
					other.querySelector(".faq-a").style.maxHeight = null;
				}
			});
			item.classList.toggle("open", !isOpen);
			a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : null;
		});
	});

	// Pricing toggle (decorative switch)
	const sw = document.querySelector(".switch");
	if (sw) {
		const labels = document.querySelectorAll(".price-toggle .lbl");
		sw.addEventListener("click", () => {
			const on = sw.classList.toggle("on");
			labels.forEach((l) => l.classList.toggle("muted-lbl"));
			document.querySelectorAll(".billed").forEach((b) => {
				b.textContent = on ? "billed yearly" : "billed monthly";
			});
		});
	}

	// Testimonial highlight carousel
	const thl = document.querySelector(".thl");
	if (thl) {
		const quotes = JSON.parse(thl.dataset.quotes || "[]");
		const quoteEl = thl.querySelector(".quote");
		const nameEl = thl.querySelector(".name");
		const roleEl = thl.querySelector(".role");
		let i = 0;
		const render = () => {
			const q = quotes[i];
			if (!q) return;
			quoteEl.style.opacity = 0;
			setTimeout(() => {
				quoteEl.textContent = "“" + q.text + "”";
				nameEl.textContent = q.name;
				roleEl.textContent = q.role;
				quoteEl.style.opacity = 1;
			}, 150);
		};
		quoteEl.style.transition = "opacity 0.3s ease";
		thl.querySelector(".prev")?.addEventListener("click", () => {
			i = (i - 1 + quotes.length) % quotes.length;
			render();
		});
		thl.querySelector(".next")?.addEventListener("click", () => {
			i = (i + 1) % quotes.length;
			render();
		});
	}

	// Feature tabs
	const tabs = document.querySelectorAll(".tab");
	const tabImg = document.querySelector(".tab-img img");
	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			tabs.forEach((t) => t.classList.remove("active"));
			tab.classList.add("active");
			if (tabImg && tab.dataset.img) tabImg.src = tab.dataset.img;
		});
	});

	// Hero video lightbox
	const play = document.querySelector(".play-btn");
	const lb = document.querySelector(".lightbox");
	if (play && lb) {
		play.addEventListener("click", () => lb.classList.add("open"));
		lb.addEventListener("click", (e) => {
			if (e.target === lb || e.target.closest(".close-lb"))
				lb.classList.remove("open");
		});
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") lb.classList.remove("open");
		});
	}
})();
