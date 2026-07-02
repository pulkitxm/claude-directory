// ----- Theme toggle (next-themes style) -----
(function () {
	const stored = localStorage.getItem("theme");
	const root = document.documentElement;
	if (stored === "dark") {
		root.classList.remove("light");
		root.classList.add("dark");
	}
	window.__toggleTheme = function () {
		const dark = root.classList.toggle("dark");
		root.classList.toggle("light", !dark);
		localStorage.setItem("theme", dark ? "dark" : "light");
	};
})();

// ----- Animated flickering-grid canvas banner -----
// Replicates the Magic UI FlickeringGrid component:
//   squareSize=4, gridGap=6, color="#6B7280", maxOpacity=0.2, flickerChance=0.05
function initGradientCanvas(canvas) {
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	const SQUARE = 4;
	const GAP = 6;
	const STEP = SQUARE + GAP;
	const MAX_OPACITY = 0.2;
	const FLICKER_CHANCE = 0.05;
	let cols, rows, opacities;

	function resize() {
		canvas.width = canvas.offsetWidth * devicePixelRatio;
		canvas.height = canvas.offsetHeight * devicePixelRatio;
		ctx.scale(devicePixelRatio, devicePixelRatio);
		const w = canvas.offsetWidth;
		const h = canvas.offsetHeight;
		cols = Math.ceil(w / STEP) + 1;
		rows = Math.ceil(h / STEP) + 1;
		opacities = new Float32Array(cols * rows).map(
			() => Math.random() * MAX_OPACITY,
		);
	}
	resize();
	window.addEventListener("resize", resize);

	function draw() {
		const w = canvas.offsetWidth;
		const h = canvas.offsetHeight;
		ctx.clearRect(0, 0, w, h);
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const idx = r * cols + c;
				if (Math.random() < FLICKER_CHANCE) {
					opacities[idx] = Math.random() * MAX_OPACITY;
				}
				ctx.globalAlpha = opacities[idx];
				ctx.fillStyle = "#6B7280";
				ctx.fillRect(c * STEP, r * STEP, SQUARE, SQUARE);
			}
		}
		ctx.globalAlpha = 1;
		requestAnimationFrame(draw);
	}
	draw();
}

// ----- Home category filter -----
function initFilter() {
	const buttons = document.querySelectorAll(".filter-btn");
	const cards = document.querySelectorAll(".post-card");
	if (!buttons.length) return;
	function apply(cat) {
		cards.forEach((c) => {
			const cats = (c.dataset.cats || "").split("|");
			c.style.display = cat === "All" || cats.includes(cat) ? "" : "none";
		});
	}
	buttons.forEach((b) => {
		b.addEventListener("click", () => {
			buttons.forEach((x) => x.classList.remove("active"));
			b.classList.add("active");
			apply(b.dataset.cat);
			const ml = document.querySelector(".filters-mobile span");
			if (ml) ml.textContent = b.dataset.cat;
		});
	});
	// mobile dropdown
	const mob = document.querySelector(".filters-mobile");
	const list = document.querySelector(".filters-mobile-list");
	if (mob && list)
		mob.addEventListener("click", () => {
			list.style.display = list.style.display === "block" ? "none" : "block";
		});
}

// ----- Article TOC scroll-spy + smooth scroll + heading anchor copy -----
function initTOC() {
	const tocButtons = document.querySelectorAll(".toc-card button[data-target]");
	if (!tocButtons.length) return;
	const headings = [...tocButtons]
		.map((b) => document.getElementById(b.dataset.target))
		.filter(Boolean);
	tocButtons.forEach((b) =>
		b.addEventListener("click", () => {
			const el = document.getElementById(b.dataset.target);
			if (el)
				window.scrollTo({
					top: el.getBoundingClientRect().top + scrollY - 80,
					behavior: "smooth",
				});
		}),
	);
	function spy() {
		let active = headings[0];
		for (const h of headings) {
			if (h.getBoundingClientRect().top - 100 <= 0) active = h;
		}
		tocButtons.forEach((b) =>
			b.classList.toggle("active", b.dataset.target === (active && active.id)),
		);
	}
	document.addEventListener("scroll", spy, { passive: true });
	spy();
	// heading click-to-copy
	document.querySelectorAll(".prose h2[id]").forEach((h) =>
		h.addEventListener("click", () => {
			const url = location.origin + location.pathname + "#" + h.id;
			navigator.clipboard && navigator.clipboard.writeText(url);
		}),
	);
	// mobile FAB scrolls to top of TOC / toggles
	const fab = document.querySelector(".toc-fab");
	if (fab)
		fab.addEventListener("click", () =>
			window.scrollTo({ top: 0, behavior: "smooth" }),
		);
}

document.addEventListener("DOMContentLoaded", () => {
	initGradientCanvas(document.querySelector(".gradient-banner canvas"));
	initFilter();
	initTOC();
});
