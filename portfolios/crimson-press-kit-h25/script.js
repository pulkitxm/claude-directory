/* ===========================================================
   Crimson Press Kit — interactions
   =========================================================== */
(() => {
	/* ---- generated noise texture (data URI) ---- */
	function makeNoise(size, alpha) {
		var c = document.createElement("canvas");
		c.width = c.height = size;
		var ctx = c.getContext("2d");
		var img = ctx.createImageData(size, size);
		for (var i = 0; i < img.data.length; i += 4) {
			var v = (Math.random() * 255) | 0;
			img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
			img.data[i + 3] = alpha;
		}
		ctx.putImageData(img, 0, 0);
		return c.toDataURL();
	}

	var root = document.documentElement;
	root.style.setProperty("--noise", `url(${makeNoise(140, 22)})`);

	/* ---- spiral binding coil (inline SVG data URI) ---- */
	var coil =
		"data:image/svg+xml," +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" width="44" height="58" viewBox="0 0 44 58">' +
				'<ellipse cx="22" cy="29" rx="10" ry="21" fill="#0a0a0a" stroke="#5a5a5a" stroke-width="4"/>' +
				'<ellipse cx="22" cy="20" rx="6" ry="5" fill="#000" opacity="0.55"/>' +
				"</svg>",
		);
	root.style.setProperty("--coil", `url('${coil}')`);

	/* ---- collage grid ---- */
	var collage = document.getElementById("collage");
	if (collage) {
		for (var n = 1; n <= 14; n++) {
			var fig = document.createElement("div");
			fig.className = "fig";
			var img = document.createElement("img");
			img.src = `./assets/img/fig-${n}.jpg`;
			img.alt = `Editorial figure ${n}`;
			img.loading = "lazy";
			var tag = document.createElement("span");
			tag.textContent = `FIG.${n}`;
			fig.appendChild(img);
			fig.appendChild(tag);
			collage.appendChild(fig);
		}
	}

	/* ---- scroll reveal ---- */
	var pages = document.querySelectorAll(".page");
	if ("IntersectionObserver" in window) {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in-view");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		pages.forEach((p) => {
			io.observe(p);
		});
	} else {
		pages.forEach((p) => {
			p.classList.add("in-view");
		});
	}
	// cover visible immediately
	var cover = document.getElementById("cover");
	if (cover) cover.classList.add("in-view");

	/* ---- TOC smooth scroll ---- */
	document.querySelectorAll(".toc-row").forEach((row) => {
		row.addEventListener("click", () => {
			var id = row.getAttribute("data-target");
			var el = document.getElementById(id);
			if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
		});
	});

	/* ---- back-to-contents FAB ---- */
	var fab = document.getElementById("fab");
	var contents = document.getElementById("contents");
	if (fab) {
		fab.addEventListener("click", () => {
			var target = contents || cover;
			if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
		});
		window.addEventListener(
			"scroll",
			() => {
				if (window.scrollY > 600) fab.classList.add("show");
				else fab.classList.remove("show");
			},
			{ passive: true },
		);
	}

	/* ---- quick query form ---- */
	var form = document.getElementById("query-form");
	var note = document.getElementById("q-note");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			var name = form.name.value.trim();
			var email = form.email.value.trim();
			if (!name || !email) {
				note.textContent = "Please add a name & email.";
				return;
			}
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				note.textContent = "That email looks off.";
				return;
			}
			note.textContent = `Sent — I'll be in touch, ${name}.`;
			form.reset();
		});
	}
})();
