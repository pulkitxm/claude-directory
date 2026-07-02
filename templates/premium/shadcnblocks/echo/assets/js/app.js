// Echo clone — shared chrome (header/footer), theme toggle, reveal-on-scroll, copy-link.
(function () {
	const I = window.ICONS;

	function rel(path) {
		// resolve a root-relative-ish path to the correct relative prefix based on depth
		const depth = (
			location.pathname.replace(/\/index\.html$/, "/").match(/\//g) || []
		).length;
		// pages live at /, /projects.html, /projects/<slug>.html
		// compute prefix to reach the site root
		let p = location.pathname;
		p = p.replace(/index\.html$/, "");
		const segs = p.split("/").filter(Boolean);
		// last segment is the html file; folders before it determine depth
		const folders = segs.filter((s) => !s.endsWith(".html"));
		return "../".repeat(folders.length) + path;
	}
	window.assetPrefix = (() => {
		const segs = location.pathname.split("/").filter(Boolean);
		const folders = segs.filter((s) => !s.endsWith(".html"));
		return "../".repeat(folders.length);
	})();

	function href(page) {
		return window.assetPrefix + page;
	}

	function buildHeader() {
		const active = document.body.dataset.page || "";
		const nav = (page, icon, label, key) =>
			`<a class="icon-btn ${active === key ? "active" : ""}" href="${href(page)}" aria-label="${label}">${icon}</a>`;
		const el = document.createElement("header");
		el.className = "site-header";
		el.innerHTML = `<div class="container nav-inner">
      <nav class="nav-group">
        ${nav("index.html", I.home, "Home", "home")}
        ${nav("projects.html", I.grid, "Projects", "projects")}
        ${nav("about.html", I.user, "Profile", "about")}
        ${nav("articles.html", I.pen, "Articles", "articles")}
      </nav>
      <div class="nav-right">
        <button class="ghost-icon" id="theme-toggle" aria-label="Toggle theme">${I.moon}</button>
        <a class="ghost-icon" href="https://x.com" target="_blank" rel="noopener" aria-label="X (Twitter)">${I.x}</a>
        <a class="stars-btn" href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub Stars">${I.github}<span>11.2k</span></a>
      </div>
    </div>`;
		document.body.prepend(el);
	}

	function buildFooter() {
		const el = document.createElement("footer");
		el.className = "site-footer";
		// deterministic pseudo-random contribution graph
		let cells = "";
		let seed = 1234;
		const rng = () =>
			(seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
		for (let i = 0; i < 280; i++) {
			cells += `<span class="contrib-cell ${rng() > 0.78 ? "on" : ""}"></span>`;
		}
		el.innerHTML = `<div class="container">
      <div class="contrib-graph" aria-hidden="true">${cells}</div>
      <p class="footer-email"><a href="mailto:hi@john.me">hi@john.me</a></p>
    </div>`;
		document.body.appendChild(el);
	}

	function themeSetup() {
		const btn = document.getElementById("theme-toggle");
		const apply = (mode) => {
			const dark = mode === "dark";
			document.documentElement.classList.toggle("dark", dark);
			document.documentElement.classList.toggle("light", !dark);
			btn.innerHTML = dark ? I.sun : I.moon;
		};
		const stored = localStorage.getItem("echo-theme");
		const initial =
			stored ||
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light");
		apply(initial);
		btn.addEventListener("click", () => {
			const next = document.documentElement.classList.contains("dark")
				? "light"
				: "dark";
			localStorage.setItem("echo-theme", next);
			apply(next);
		});
	}

	let revealIO = null;
	function observeReveals() {
		const els = document.querySelectorAll(".reveal:not(.in):not([data-obs])");
		if (!("IntersectionObserver" in window)) {
			els.forEach((e) => e.classList.add("in"));
			return;
		}
		if (!revealIO) {
			revealIO = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							e.target.classList.add("in");
							revealIO.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
			);
		}
		els.forEach((e) => {
			e.setAttribute("data-obs", "1");
			revealIO.observe(e);
		});
	}
	// Expose so dynamically-injected sections can register their .reveal nodes.
	window.observeReveals = observeReveals;
	function revealSetup() {
		observeReveals();
		// Safety net: ensure everything becomes visible even if it never scrolls
		// into view (e.g. full-page screenshots, very tall viewports, print).
		setTimeout(
			() =>
				document
					.querySelectorAll(".reveal")
					.forEach((e) => e.classList.add("in")),
			1200,
		);
	}

	function copyLinkSetup() {
		document.querySelectorAll("[data-copy-link]").forEach((btn) => {
			btn.addEventListener("click", () => {
				navigator.clipboard?.writeText(location.href).catch(() => {});
				let toast = document.querySelector(".copy-toast");
				if (!toast) {
					toast = document.createElement("div");
					toast.className = "copy-toast";
					toast.textContent = "Link copied to clipboard";
					document.body.appendChild(toast);
				}
				toast.classList.add("show");
				clearTimeout(window.__toastT);
				window.__toastT = setTimeout(
					() => toast.classList.remove("show"),
					1800,
				);
			});
		});
	}

	function tabsSetup() {
		document.querySelectorAll("[data-tabs]").forEach((group) => {
			const tabs = group.querySelectorAll(".tab");
			const grid = document.querySelector(group.dataset.target);
			tabs.forEach((tab) =>
				tab.addEventListener("click", () => {
					tabs.forEach((t) => t.classList.remove("active"));
					tab.classList.add("active");
					const f = tab.dataset.filter;
					grid?.querySelectorAll("[data-cats]").forEach((card) => {
						const cats = (card.dataset.cats || "").split(",");
						card.style.display = f === "all" || cats.includes(f) ? "" : "none";
					});
				}),
			);
		});
	}

	document.addEventListener("DOMContentLoaded", () => {
		buildHeader();
		buildFooter();
		themeSetup();
		revealSetup();
		copyLinkSetup();
		tabsSetup();
	});
})();
