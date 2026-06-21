document.addEventListener("DOMContentLoaded", () => {
	/* ---------- testimonial data ---------- */
	const reviews = [
		{
			t: "card",
			q: "The level of care here is unprecedented. Bella always returns from her spa sessions looking like royalty.",
			img: "assets/img/av1.jpg",
			nm: "Sarah Jenkins",
			rl: "Bella's Guardian",
		},
		{
			t: "card",
			q: "Curated treats my picky companion actually enjoys. The boutique selection is truly top-tier.",
			img: "assets/img/av2.jpg",
			nm: "Marcus Thorne",
			rl: "Oliver's Human",
		},
		{
			t: "cream",
			q: "Amberhaus is the only place I trust with Shadow’s grooming. They are literal magicians.",
			img: "assets/img/av3.jpg",
			nm: "Thomas Ward",
			rl: "Shadow's Best Friend",
		},
		{ t: "image", img: "assets/img/tcard1.jpg", cap: "Pet Portraits MMXXIV" },
		{
			t: "card",
			q: "The artisan accessories collection is unmatched. Every piece feels custom-made for our home.",
			img: "assets/img/av4.jpg",
			nm: "Julian Pierce",
			rl: "Baron's Owner",
		},
		{ t: "amber", em: "✨", label: "Next-Generation Pet Boutique" },
		{
			t: "card",
			q: "Holistic care that actually respects the pet. Cooper looks amazing and had zero stress.",
			img: "assets/img/av5.jpg",
			nm: "Chloe Smith",
			rl: "Cooper's Mom",
		},
		{
			t: "image2",
			img: "assets/img/tcard2.jpg",
			label: "luna.",
			t1: "Lumina Collection",
			t2: "Luxury Cat Furnishings",
		},
	];

	const cardHTML = (r) => {
		if (r.t === "image") {
			return `<li class="timg"><img src="${r.img}" alt=""><div class="ov"><div></div><span class="t">${r.cap}</span></div></li>`;
		}
		if (r.t === "image2") {
			return `<li class="timg"><img src="${r.img}" alt=""><div class="ov"><span class="italic">${r.label}</span><div><div class="t">${r.t1}</div><div class="s">${r.t2}</div></div></div></li>`;
		}
		if (r.t === "amber") {
			return `<li class="tcard amber"><span class="em">${r.em}</span><p>${r.label}</p></li>`;
		}
		const cls = r.t === "cream" ? " cream" : "";
		return `<li class="tcard${cls}"><p class="quote">"${r.q}"</p><div class="who"><img src="${r.img}" alt=""><div><div class="nm">${r.nm}</div><div class="rl">${r.rl}</div></div></div></li>`;
	};

	// distribute reviews across the 4 columns, then duplicate each column for a seamless loop
	const cols = document.querySelectorAll(".tstack[data-dup]");
	const buckets = [
		[0, 1],
		[2, 3],
		[4, 5],
		[6, 7],
	];
	cols.forEach((ul, i) => {
		const items = buckets[i].map((idx) => cardHTML(reviews[idx])).join("");
		ul.innerHTML = items + items; // duplicate for -50% loop
	});

	/* ---------- hero crossfade sliders ---------- */
	document.querySelectorAll("[data-slider]").forEach((slider, sIdx) => {
		const imgs = slider.querySelectorAll("img");
		let idx = 0;
		setTimeout(
			() =>
				setInterval(() => {
					imgs[idx].classList.remove("active");
					idx = (idx + 1) % imgs.length;
					imgs[idx].classList.add("active");
				}, 5000),
			sIdx * 1500,
		); // stagger left/right
	});

	/* ---------- hero parallax ---------- */
	const heroText = document.getElementById("heroText");
	if (heroText) {
		const parent = heroText.parentElement;
		const onScroll = () => {
			const rect = parent.getBoundingClientRect();
			if (rect.top < innerHeight && rect.bottom > 0) {
				const rel = innerHeight / 2 - (rect.top + rect.height / 2);
				heroText.style.transform = `translateY(${rel * 0.08}px)`;
			}
		};
		addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	/* ---------- horizontal journey ---------- */
	const track = document.getElementById("journeyTrack");
	const container = document.querySelector(".journey-container");
	if (track && container) {
		const update = () => {
			const rect = container.getBoundingClientRect();
			const scrollEnd = container.offsetHeight - innerHeight;
			let p = -rect.top / scrollEnd;
			p = Math.max(0, Math.min(1, p));
			const maxX = track.scrollWidth - innerWidth;
			track.style.transform = `translateX(${-p * maxX}px)`;
		};
		addEventListener("scroll", update, { passive: true });
		addEventListener("resize", update);
		update();
	}

	/* ---------- scroll reveal ---------- */
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

	/* ---------- menu ---------- */
	const _menuBtn = document.getElementById("menuBtn");
	const navBox = document.getElementById("navBox");
	const bar1 = document.getElementById("bar1"),
		bar2 = document.getElementById("bar2");
	const mt1 = document.getElementById("mtxt1"),
		mt2 = document.getElementById("mtxt2");
	let menuOpen = false;
	const setMenu = (open) => {
		menuOpen = open;
		navBox.classList.toggle("open", open);
		bar1.style.transform = open ? "translateY(3.5px) rotate(45deg)" : "";
		bar2.style.transform = open ? "translateY(-3.5px) rotate(-45deg)" : "";
		mt1.textContent = open ? "Close" : "Menu";
		mt2.textContent = open ? "Back" : "Explore";
	};

	/* ---------- overlay ---------- */
	const overlay = document.getElementById("overlay");
	const openOverlay = () => {
		overlay.classList.add("open");
		document.body.style.overflow = "hidden";
		if (menuOpen) setMenu(false);
	};
	const closeOverlay = () => {
		overlay.classList.remove("open");
		document.body.style.overflow = "";
	};

	document.addEventListener("click", (e) => {
		if (e.target.closest("[data-open-overlay]")) {
			e.preventDefault();
			openOverlay();
			return;
		}
		if (e.target.closest("[data-close-overlay]")) {
			closeOverlay();
			return;
		}
		if (e.target.closest("#menuBtn")) {
			setMenu(!menuOpen);
			return;
		}
		if (menuOpen && !navBox.contains(e.target)) setMenu(false);
	});

	addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			if (overlay.classList.contains("open")) closeOverlay();
			if (menuOpen) setMenu(false);
		}
	});

	/* ---------- smooth anchor (close menu first) ---------- */
	document.querySelectorAll('a[href^="#"]').forEach((a) => {
		a.addEventListener("click", function (e) {
			const href = this.getAttribute("href");
			if (href === "#" || this.hasAttribute("data-open-overlay")) return;
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				if (menuOpen) setMenu(false);
				scrollTo({
					top: target.getBoundingClientRect().top + scrollY - 80,
					behavior: "smooth",
				});
			}
		});
	});
});
