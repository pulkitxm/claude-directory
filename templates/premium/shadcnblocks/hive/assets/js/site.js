/* Hive — shared site behavior: chrome injection, theme, clock, menu, reveal */
(function () {
	const SUN =
		'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
	const MOON =
		'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
	const CLOCK =
		'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
	const LOGO =
		'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.5 2.2.5 3.6 0 5.8C13.6 6.2 14.7 5.3 16.6 4.1 15.4 6 14.5 6.9 12.9 8.5c2.2-.5 3.6-.5 5.8 0-2.2.5-3.6.5-5.8 0 1.6 1.6 2.5 2.5 3.7 4.4-1.9-1.2-2.8-2.1-4.4-3.7.5 2.2.5 3.6 0 5.8-.5-2.2-.5-3.6 0-5.8-1.6 1.6-2.5 2.5-4.4 3.7 1.2-1.9 2.1-2.8 3.7-4.4-2.2.5-3.6.5-5.8 0 2.2-.5 3.6-.5 5.8 0C9.9 6.9 9 6 7.8 4.1 9.7 5.3 10.6 6.2 12 7.8c-.5-2.2-.5-3.6 0-5.8Z"/></svg>';

	function fmtTime(d) {
		let h = d.getHours(),
			m = d.getMinutes();
		const ap = h >= 12 ? "PM" : "AM";
		h = h % 12;
		if (h === 0) h = 12;
		return h + ":" + String(m).padStart(2, "0") + " " + ap;
	}

	const NAV = [
		["Home", "index.html"],
		["Services", "services.html"],
		["Work", "projects.html"],
		["Studio", "about.html"],
		["Contact", "contact.html"],
	];

	function buildHeader() {
		const el = document.querySelector("[data-header]");
		if (!el) return;
		el.className = "site-header";
		el.innerHTML = `
      <div class="container">
        <div class="hdr-left">
          <button class="icon-btn" data-menu-open aria-label="Open menu">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
        <div class="hdr-center"><a href="index.html" class="logo-mark" aria-label="Hive home">${LOGO}</a></div>
        <div class="hdr-right">
          <a href="contact.html" class="pill cta-pill">Work with Hive</a>
          <span class="pill clock">${CLOCK}<span data-clock>--:--</span></span>
          <button class="icon-btn theme-toggle" data-theme-toggle aria-label="Toggle theme"></button>
        </div>
      </div>`;
	}

	function buildMenu() {
		const ov = document.createElement("div");
		ov.className = "menu-overlay";
		ov.innerHTML = `
      <div class="menu-top">
        <button class="menu-close" data-menu-close aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
        <a href="index.html" class="logo-mark">${LOGO}</a>
        <div class="menu-socials"><a href="#">Instagram</a><a href="#">X / Twitter</a></div>
      </div>
      <nav class="menu-nav">${NAV.map((n) => `<a href="${n[1]}">${n[0]}</a>`).join("")}</nav>
      <div class="menu-bottom">contact@hive.com</div>`;
		document.body.appendChild(ov);
		const cur = location.pathname.split("/").pop() || "index.html";
		ov.querySelectorAll(".menu-nav a").forEach((a) => {
			if (a.getAttribute("href") === cur) a.classList.add("active");
		});
		document.addEventListener("click", (e) => {
			if (e.target.closest("[data-menu-open]")) ov.classList.add("open");
			if (e.target.closest("[data-menu-close]") || e.target === ov)
				ov.classList.remove("open");
		});
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") ov.classList.remove("open");
		});
	}

	function buildFooter() {
		const el = document.querySelector("[data-footer]");
		if (!el) return;
		el.className = "site-footer";
		el.innerHTML = `
      <div class="container">
        <div class="footer-top">
          <nav class="footer-nav">${NAV.map((n) => `<a href="${n[1]}">${n[0]}</a>`).join("")}</nav>
          <div class="footer-social"><a href="#">Instagram</a><a href="#">X / Twitter</a></div>
        </div>
        <div class="footer-panel"><div class="footer-blob"><div class="orb"></div></div></div>
        <div class="footer-bottom">
          <span>contact@hive.com</span>
          <span><span data-clock>--:--</span> · Calcutta</span>
        </div>
      </div>`;
	}

	function initTheme() {
		const btn = document.querySelector("[data-theme-toggle]");
		function render() {
			if (btn)
				btn.innerHTML = document.documentElement.classList.contains("dark")
					? MOON
					: SUN;
		}
		render();
		if (btn)
			btn.addEventListener("click", () => {
				const dark = document.documentElement.classList.toggle("dark");
				localStorage.setItem("hive-theme", dark ? "dark" : "light");
				render();
			});
	}

	function startClock() {
		function tick() {
			const t = fmtTime(new Date());
			document
				.querySelectorAll("[data-clock]")
				.forEach((e) => (e.textContent = t));
		}
		tick();
		setInterval(tick, 1000);
	}

	function initReveal() {
		const els = document.querySelectorAll(".reveal");
		if (!("IntersectionObserver" in window) || !els.length) {
			els.forEach((e) => e.classList.add("in"));
			return;
		}
		const io = new IntersectionObserver(
			(ents) => {
				ents.forEach((en) => {
					if (en.isIntersecting) {
						en.target.classList.add("in");
						io.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		els.forEach((e) => io.observe(e));
		// Safety: ensure nothing stays hidden if it never enters the viewport
		setTimeout(() => els.forEach((e) => e.classList.add("in")), 2500);
	}

	document.addEventListener("DOMContentLoaded", () => {
		buildHeader();
		buildMenu();
		buildFooter();
		initTheme();
		startClock();
		initReveal();
	});
})();
