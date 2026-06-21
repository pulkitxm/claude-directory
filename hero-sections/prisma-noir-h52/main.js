/* ============================================================
   PRISMA NOIR — interactions
   ============================================================ */
(() => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---------- entrance ---------- */
	requestAnimationFrame(() =>
		requestAnimationFrame(() => document.body.classList.add("is-ready")),
	);

	/* ---------- current year ---------- */
	const yearEl = document.getElementById("year");
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	/* ---------- build discover menu rows ---------- */
	const ITEMS = [
		{ i: "01", label: "home", imgs: ["home-1", "home-2"] },
		{ i: "02", label: "projects", imgs: ["projects-1", "projects-2"] },
		{ i: "03", label: "blog", imgs: ["blog-1", "blog-2"] },
		{ i: "04", label: "contact", imgs: ["contact-1", "contact-2"] },
	];

	const list = document.getElementById("overlay-list");
	if (list) {
		ITEMS.forEach((it) => {
			const row = document.createElement("a");
			row.href = "#";
			row.className = "menu-row";

			const set = `
        <div class="ticker__set">
          <span class="ticker__txt">${it.label}</span>
          <img class="ticker__img" src="assets/thumbs/${it.imgs[0]}.svg" alt="" />
          <span class="ticker__txt">${it.label}</span>
          <img class="ticker__img" src="assets/thumbs/${it.imgs[1]}.svg" alt="" />
        </div>`;

			row.innerHTML = `
        <span class="menu-row__label">
          <span class="menu-row__idx">${it.i}</span>
          <span class="menu-row__txt">${it.label}</span>
        </span>
        <span class="menu-row__hover" aria-hidden="true">
          <span class="ticker">${set}${set}</span>
        </span>`;
			list.appendChild(row);
		});
	}

	/* ---------- overlay open / close ---------- */
	const overlay = document.getElementById("menu-overlay");
	const trigger = document.getElementById("menu-trigger");
	const close = document.getElementById("menu-close");

	const open = () => {
		overlay.classList.add("is-open");
		overlay.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden";
	};
	const shut = () => {
		overlay.classList.remove("is-open");
		overlay.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "";
	};

	trigger?.addEventListener("click", open);
	close?.addEventListener("click", shut);
	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape") shut();
	});

	/* ---------- pointer parallax (blobs + star) ---------- */
	if (!reduce) {
		const drift = document.getElementById("drift");
		const star = document.getElementById("star");
		let tx = 0,
			ty = 0,
			cx = 0,
			cy = 0;

		window.addEventListener("pointermove", (e) => {
			const nx = e.clientX / window.innerWidth - 0.5;
			const ny = e.clientY / window.innerHeight - 0.5;
			tx = nx * 34;
			ty = ny * 34;
		});

		const tick = () => {
			cx += (tx - cx) * 0.06;
			cy += (ty - cy) * 0.06;
			if (drift) {
				drift.style.setProperty("--px", `${cx.toFixed(2)}px`);
				drift.style.setProperty("--py", `${cy.toFixed(2)}px`);
			}
			// only drive the star once the cursor has actually moved, so the
			// entrance transition (data-rise) isn't overridden on load
			if (star && (Math.abs(cx) > 0.1 || Math.abs(cy) > 0.1)) {
				star.style.transform = `translate(${(-cx * 0.5).toFixed(2)}px, ${(-cy * 0.5).toFixed(2)}px)`;
			}
			requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}
})();
