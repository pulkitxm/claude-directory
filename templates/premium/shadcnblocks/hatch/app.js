/* ===== HATCH shared chrome + interactions ===== */
(function () {
	const sun = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
	const moon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
	const arrow = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
	const themeBtn = () =>
		`<button class="icon-btn theme-toggle" aria-label="Toggle theme"><span class="light-only">${sun}</span><span class="dark-only">${moon}</span></button>`;

	const B = window.__HATCH_BASE__ || "";
	const links = [
		["Home", "index.html"],
		["Services", "services.html"],
		["Work", "work.html"],
		["About", "about.html"],
	];
	const current = location.pathname.split("/").pop() || "index.html";

	function navLinks(mobile) {
		return links
			.map(([t, h]) => {
				const active =
					h === current || (current === "" && h === "index.html")
						? " active"
						: "";
				return `<a class="${active}" href="${B}${h}">${t}</a>`;
			})
			.join("");
	}

	document.querySelectorAll("[data-promo]").forEach((el) => {
		el.outerHTML = `<div class="promo"><div class="container">
      <span class="promo-text">Purchase this theme on shadcnblocks.com</span>
      <a class="pill" href="https://www.shadcnblocks.com/template/hatch" target="_blank" rel="noopener">Get Template</a>
    </div></div>`;
	});

	document.querySelectorAll("[data-header]").forEach((el) => {
		el.outerHTML = `<header class="site-header"><div class="container"><div class="bar">
      <a class="logo" href="${B}index.html" aria-label="Hatch home"><img src="${B}assets/images/layout/logo.svg" alt="Hatch" width="34" height="28"></a>
      <nav class="nav-main">${navLinks()}</nav>
      <div class="header-actions">
        ${themeBtn()}
        <a class="btn btn-primary btn-call" href="${B}contact.html">Book a call ${arrow}</a>
        <button class="icon-btn menu-toggle" aria-label="Open menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
      </div>
    </div></div></header>
    <div class="mobile-menu"><div class="container">
      <div class="mm-head">
        <a class="logo" href="${B}index.html"><img src="${B}assets/images/layout/logo.svg" alt="Hatch" width="34" height="28"></a>
        <button class="icon-btn menu-close" aria-label="Close menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      </div>
      <nav>${navLinks(true)}</nav>
      <div class="mm-foot">${themeBtn()}<a class="btn btn-primary" href="${B}contact.html" style="flex:1">Book a call ${arrow}</a></div>
    </div></div>`;
	});

	document.querySelectorAll("[data-footer]").forEach((el) => {
		el.outerHTML = `<footer class="site-footer">
      <div class="footer-cta"><div class="container reveal">
        <h2 class="serif">Design That Works<br>Beautifully.</h2>
        <a class="btn btn-primary btn-lg" href="${B}contact.html">Get a quote ${arrow}</a>
      </div></div>
      <div class="footer-bottom"><div class="container">
        <span>© 2026 shadcnblocks.com. All rights reserved.</span>
        <div class="socials"><a href="#">Framer</a><a href="#">Instagram</a><a href="#">X</a></div>
      </div></div>
    </footer>`;
	});

	// theme
	const apply = (t) => {
		document.documentElement.classList.toggle("dark", t === "dark");
	};
	function toggle() {
		const t = document.documentElement.classList.contains("dark")
			? "light"
			: "dark";
		localStorage.setItem("hatch-theme", t);
		apply(t);
	}
	document
		.querySelectorAll(".theme-toggle")
		.forEach((b) => b.addEventListener("click", toggle));

	// mobile menu
	const mm = document.querySelector(".mobile-menu");
	const open = () => {
		mm && mm.classList.add("open");
		document.body.style.overflow = "hidden";
	};
	const close = () => {
		mm && mm.classList.remove("open");
		document.body.style.overflow = "";
	};
	document.querySelector(".menu-toggle")?.addEventListener("click", open);
	document.querySelector(".menu-close")?.addEventListener("click", close);
	mm?.querySelectorAll("nav a").forEach((a) =>
		a.addEventListener("click", close),
	);

	// scroll reveal
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
	);
	document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
	// safety: if a reveal never intersects (e.g. full-page capture / no scroll), show it
	setTimeout(
		() =>
			document
				.querySelectorAll(".reveal:not(.in)")
				.forEach((el) => el.classList.add("in")),
		1500,
	);
})();
