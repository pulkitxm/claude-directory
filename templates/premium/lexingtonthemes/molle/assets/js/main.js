/* Mølle — main.js: nav toggle, search modal, keen-slider init */

/* ── Mobile nav toggle ───────────────────────────────────────── */
(function () {
	const toggle = document.getElementById("menu-toggle");
	const closeBtn = document.getElementById("menu-close");
	const menu = document.getElementById("navigation-menu");

	function openMenu() {
		menu.classList.remove("opacity-0", "pointer-events-none", "-translate-y-4");
		menu.classList.add("opacity-100", "pointer-events-auto", "translate-y-0");
	}
	function closeMenu() {
		menu.classList.add("opacity-0", "pointer-events-none", "-translate-y-4");
		menu.classList.remove(
			"opacity-100",
			"pointer-events-auto",
			"translate-y-0",
		);
	}

	if (toggle) toggle.addEventListener("click", openMenu);
	if (closeBtn) closeBtn.addEventListener("click", closeMenu);
})();

/* ── Search modal ────────────────────────────────────────────── */
(function () {
	const searchBtn = document.getElementById("searchButton");
	const modal = document.getElementById("searchModal");
	const overlay = document.getElementById("modalOverlay");
	const input = document.getElementById("searchInput");
	const results = document.getElementById("searchResults");

	const searchItems = window.__searchItems || [];

	function openSearch() {
		modal.classList.remove("hidden");
		setTimeout(() => input && input.focus(), 50);
	}
	function closeSearch() {
		modal.classList.add("hidden");
		if (results) {
			results.classList.add("hidden");
			results.innerHTML = "";
		}
		if (input) input.value = "";
	}

	if (searchBtn) searchBtn.addEventListener("click", openSearch);
	if (overlay) overlay.addEventListener("click", closeSearch);
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") closeSearch();
	});

	if (input && results && window.Fuse) {
		const fuse = new Fuse(searchItems, {
			keys: ["title", "description"],
			threshold: 0.4,
		});
		input.addEventListener("input", function () {
			const q = this.value.trim();
			if (!q) {
				results.classList.add("hidden");
				results.innerHTML = "";
				return;
			}
			const hits = fuse.search(q).slice(0, 8);
			if (!hits.length) {
				results.innerHTML =
					'<div class="p-4 text-sm text-base-600">No results found.</div>';
				results.classList.remove("hidden");
				return;
			}
			results.innerHTML = hits
				.map((h) => {
					const item = h.item;
					return `<a href="${item.url}" class="block p-4 hover:bg-base-50">
          <p class="text-sm font-medium text-base-900">${item.title}</p>
          <p class="text-xs text-base-600 mt-1 line-clamp-1">${item.description}</p>
        </a>`;
				})
				.join("");
			results.classList.remove("hidden");
		});
	}
})();

/* ── Keen slider ─────────────────────────────────────────────── */
(function () {
	if (!window.KeenSlider) return;
	const el = document.getElementById("keen-slider");
	if (!el) return;

	const slider = new KeenSlider(el, {
		slides: { perView: "auto", spacing: 0 },
		loop: false,
	});

	const prev = document.getElementById("keen-slider-previous");
	const next = document.getElementById("keen-slider-next");
	if (prev) prev.addEventListener("click", () => slider.prev());
	if (next) next.addEventListener("click", () => slider.next());
})();

/* ── Year stamp ──────────────────────────────────────────────── */
(function () {
	const y = document.getElementById("year");
	if (y) y.textContent = new Date().getFullYear();
})();
