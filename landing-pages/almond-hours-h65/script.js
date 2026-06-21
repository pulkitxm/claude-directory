document.addEventListener("DOMContentLoaded", () => {
	/* ---------- Scroll reveal ---------- */
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
	document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

	/* ---------- Mega menu ---------- */
	const megaMenu = document.getElementById("mega-menu");
	const navWrapper = document.getElementById("nav-wrapper");
	const els = {
		title: document.getElementById("menu-title"),
		desc: document.getElementById("menu-desc"),
		image: document.getElementById("menu-image"),
		c1t: document.getElementById("col-1-title"),
		c2t: document.getElementById("col-2-title"),
		c1l: document.getElementById("col-1-links"),
		c2l: document.getElementById("col-2-links"),
	};
	const content = {
		programs: {
			title: "Care Programs",
			desc: "Expertly crafted living experiences centered on medical precision and personal dignity.",
			img: "./assets/img/menu-programs.jpg",
			c1t: "Residential",
			c1l: [
				"Assisted Living",
				"Independent Living",
				"Respite Care",
				"Hospice Support",
			],
			c2t: "Specialized",
			c2l: [
				"Memory Excellence",
				"Rehabilitative Care",
				"Nursing Care",
				"Wellness Center",
			],
		},
		care: {
			title: "Our Philosophy",
			desc: "Treating luxury not as an extra, but as a fundamental component of healing and comfort.",
			img: "./assets/img/menu-care.jpg",
			c1t: "Dining",
			c1l: [
				"Chef-Led Kitchen",
				"Nutrition Planning",
				"Private Dining",
				"Social Lounges",
			],
			c2t: "Lifestyle",
			c2l: [
				"Concierge Service",
				"Cultural Outings",
				"Art Therapy",
				"Personal Fitness",
			],
		},
	};
	const linkHTML = (t) => `<li><a href="#programs">
    <div class="mm-row-front"><span>${t}</span></div>
    <div class="mm-row-back"><span>${t}</span><span>→</span></div></a></li>`;
	function updateMenu(key) {
		const d = content[key];
		if (!d) return;
		els.title.textContent = d.title;
		els.desc.textContent = d.desc;
		els.image.style.backgroundImage = `url('${d.img}')`;
		els.c1t.textContent = d.c1t;
		els.c2t.textContent = d.c2t;
		els.c1l.innerHTML = d.c1l.map(linkHTML).join("");
		els.c2l.innerHTML = d.c2l.map(linkHTML).join("");
	}
	let active = null,
		hideTimer = null;
	document.querySelectorAll("[data-menu-trigger]").forEach((t) => {
		t.addEventListener("mouseenter", () => {
			if (window.innerWidth < 1024) return;
			clearTimeout(hideTimer);
			active = t.dataset.menuTrigger;
			updateMenu(active);
			megaMenu.classList.add("active");
		});
	});
	navWrapper.addEventListener("mouseleave", () => {
		active = null;
		megaMenu.classList.remove("active");
	});

	/* ---------- Programs accordion ---------- */
	const cards = document.querySelectorAll("[data-feature-card]");
	const activate = (card) => {
		cards.forEach((c) => c.classList.remove("active"));
		card.classList.add("active");
	};
	cards.forEach((card) => {
		card.addEventListener("mouseenter", () => {
			if (window.innerWidth >= 1024) activate(card);
		});
		card.addEventListener("click", () => {
			if (window.innerWidth < 1024) activate(card);
		});
	});

	/* ---------- FAQ ---------- */
	const faqs = document.querySelectorAll("[data-faq]");
	faqs.forEach((item) => {
		item.addEventListener("click", () => {
			const a = item.querySelector(".faq-a");
			const isOpen = item.classList.contains("open");
			faqs.forEach((o) => {
				o.classList.remove("open");
				o.querySelector(".faq-a").style.maxHeight = "0px";
			});
			if (!isOpen) {
				item.classList.add("open");
				a.style.maxHeight = `${a.scrollHeight}px`;
			}
		});
	});

	/* ---------- Cursor reveal wordmark ---------- */
	const wm = document.getElementById("wordmark");
	const mask = document.getElementById("wm-mask");
	const reveal = document.getElementById("wm-reveal");
	const palette = ["#1B1B1B", "#E87C3E", "#2D4356", "#8B4513", "#4A6741"];
	let ci = 0;
	if (wm && mask && reveal) {
		wm.addEventListener("mousemove", (e) => {
			const r = wm.getBoundingClientRect();
			mask.style.setProperty("--x", `${e.clientX - r.left}px`);
			mask.style.setProperty("--y", `${e.clientY - r.top}px`);
		});
		wm.addEventListener("mouseenter", () => {
			ci = (ci + 1) % palette.length;
			reveal.style.color = palette[ci];
		});
		wm.addEventListener("mouseleave", () => {
			mask.style.setProperty("--x", "-100%");
			mask.style.setProperty("--y", "-100%");
		});
	}

	/* ---------- Newsletter ---------- */
	document.querySelectorAll(".newsletter-form").forEach((form) => {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const btn = form.querySelector("button");
			const txt = btn.textContent;
			btn.textContent = "Subscribing…";
			btn.disabled = true;
			setTimeout(() => {
				btn.textContent = "Welcome to Almond Hours";
				setTimeout(() => {
					btn.textContent = txt;
					btn.disabled = false;
					form.reset();
				}, 1400);
			}, 800);
		});
	});
});
