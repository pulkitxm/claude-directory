(() => {
	const projects = [
		{
			n: "01",
			title: "Monolith",
			cat: "Brand Identity",
			year: "2024",
			img: "assets/img/project-1.jpg",
		},
		{
			n: "02",
			title: "Aether",
			cat: "Digital Product",
			year: "2024",
			img: "assets/img/project-2.jpg",
		},
		{
			n: "03",
			title: "Prisma",
			cat: "Art Direction",
			year: "2023",
			img: "assets/img/project-3.jpg",
		},
		{
			n: "04",
			title: "Nocturne",
			cat: "Editorial",
			year: "2023",
			img: "assets/img/project-4.jpg",
		},
		{
			n: "05",
			title: "Lumen",
			cat: "Creative Direction",
			year: "2022",
			img: "assets/img/project-5.jpg",
		},
		{
			n: "06",
			title: "Vanta",
			cat: "Web Design",
			year: "2022",
			img: "assets/img/project-6.jpg",
		},
	];

	const marquee = [
		{ img: "assets/img/marquee-1.jpg", tag: "Monolith", shape: "a" },
		{ img: "assets/img/marquee-2.jpg", tag: "Aether", shape: "b" },
		{ img: "assets/img/marquee-3.jpg", tag: "Prisma", shape: "c" },
		{ img: "assets/img/marquee-4.jpg", tag: "Lumen", shape: "a" },
		{ img: "assets/img/marquee-5.jpg", tag: "Vanta", shape: "b" },
	];

	const grid = document.getElementById("grid");
	grid.innerHTML = projects
		.map(
			(p) => `
    <a class="card" href="#">
      <div class="card__media">
		<img src="${p.img}" alt="${p.title} — ${p.cat}" />
        <div class="card__overlay"></div>
        <span class="card__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </span>
      </div>
      <div class="card__meta">
        <span class="card__title">${p.title}</span>
        <span class="card__cat">${p.cat}</span>
        <span class="card__year">${p.year}</span>
      </div>
    </a>`,
		)
		.join("");

	const groupHTML = marquee
		.concat(marquee)
		.map(
			(m) => `
    <figure class="mq-card mq-card--${m.shape}">
		<img src="${m.img}" alt="" />
      <figcaption class="mq-card__tag">${m.tag}</figcaption>
    </figure>`,
		)
		.join("");
	document.querySelectorAll(".marquee__group").forEach((g) => {
		g.innerHTML = groupHTML;
	});

	document.querySelectorAll(".hero__title .word").forEach((word) => {
		const text = word.textContent;
		word.innerHTML = "";
		[...text].forEach((ch, i) => {
			const span = document.createElement("span");
			span.className = "char";
			span.textContent = ch;
			span.style.transition = `transform 1s var(--ease) ${0.15 + i * 0.045}s`;
			word.appendChild(span);
		});
	});
	requestAnimationFrame(() =>
		requestAnimationFrame(() => {
			document.querySelectorAll(".hero__title .char").forEach((c) => {
				c.style.transform = "translateY(0)";
			});
			document.querySelectorAll(".hero .reveal").forEach((r, i) => {
				r.style.transitionDelay = `${0.3 + i * 0.12}s`;
				r.classList.add("is-revealed");
			});
		}),
	);

	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("is-revealed");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.18 },
	);
	document
		.querySelectorAll(".card, .intro .reveal")
		.forEach((el) => io.observe(el));

	const nav = document.getElementById("nav");
	const menu = document.getElementById("menu");
	const toggle = document.getElementById("menuToggle");
	let menuOpen = false;
	const setMenu = (open) => {
		menuOpen = open;
		menu.classList.toggle("is-open", open);
		nav.classList.toggle("is-open", open);
		menu.setAttribute("aria-hidden", String(!open));
		toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
		toggle.setAttribute("aria-expanded", String(open));
		document.body.style.overflow = open ? "hidden" : "";
	};
	toggle.addEventListener("click", () => setMenu(!menuOpen));
	menu
		.querySelectorAll("a")
		.forEach((a) => a.addEventListener("click", () => setMenu(false)));
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && menuOpen) setMenu(false);
	});

	const cursor = document.getElementById("cursor");
	const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
	if (fine && !window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
		let mx = window.innerWidth / 2,
			my = window.innerHeight / 2,
			cx = mx,
			cy = my,
			seen = false;
		window.addEventListener("mousemove", (e) => {
			mx = e.clientX;
			my = e.clientY;
			if (!seen) {
				seen = true;
				cx = mx;
				cy = my;
				cursor.classList.add("is-visible");
			}
		});
		const lerp = (a, b, n) => a + (b - a) * n;
		(function loop() {
			cx = lerp(cx, mx, 0.18);
			cy = lerp(cy, my, 0.18);
			cursor.style.left = `${cx}px`;
			cursor.style.top = `${cy}px`;
			requestAnimationFrame(loop);
		})();
		const hoverSel = "a, button, [data-cursor-hover]";
		document.addEventListener("mouseover", (e) => {
			if (e.target.closest(hoverSel)) cursor.classList.add("is-hover");
		});
		document.addEventListener("mouseout", (e) => {
			if (e.target.closest(hoverSel)) cursor.classList.remove("is-hover");
		});
		window.addEventListener("mousedown", () => cursor.classList.add("is-down"));
		window.addEventListener("mouseup", () =>
			cursor.classList.remove("is-down"),
		);
		document.addEventListener("mouseleave", () =>
			cursor.classList.remove("is-visible"),
		);
		document.addEventListener("mouseenter", () =>
			cursor.classList.add("is-visible"),
		);
	}
})();
