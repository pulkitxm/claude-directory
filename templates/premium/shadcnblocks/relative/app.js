/* ===== Relative clone — shared chrome + interactions ===== */
(function () {
	const LOGO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/></svg>`;

	const features = [
		[
			"Smart Productivity",
			"Boost your productivity with AI-powered insights",
			"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
		],
		[
			"Adaptive Workflows",
			"Customize and automate your work processes",
			"M3 3v18h18M7 16l4-4 4 4 4-6",
		],
		[
			"Optimized Scheduling",
			"Intelligent time management and scheduling",
			"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
		],
		[
			"Accelerate Planning",
			"Strategic planning tools for faster execution",
			"M13 2 3 14h9l-1 8 10-12h-9l1-8z",
		],
	];
	const dropdownHTML = features
		.map(
			([t, d, p]) => `
    <a class="dropdown-item" href="index.html#features">
      <span class="di-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${p}"/></svg></span>
      <span><h4>${t}</h4><p>${d}</p></span>
    </a>`,
		)
		.join("");

	const navLinks = [
		["About us", "about.html"],
		["Pricing", "pricing.html"],
		["FAQ", "faq.html"],
		["Contact", "contact.html"],
	];

	const header = document.querySelector("[data-header]");
	if (header) {
		header.innerHTML = `
    <div class="banner" data-banner>
      <div class="banner-inner container">
        <span>Purchase this theme on <strong>shadcnblocks.com</strong></span>
        <a class="get-template" href="https://www.shadcnblocks.com/template/relative" target="_blank" rel="noopener">Get Template</a>
        <button class="banner-close" data-banner-close aria-label="Dismiss"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      </div>
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html">${LOGO}<span>Relative</span></a>
        <nav class="main-nav">
          <div class="has-dropdown">
            <a class="nav-link" href="index.html#features">Features <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></a>
            <div class="dropdown">${dropdownHTML}</div>
          </div>
          ${navLinks.map(([t, h]) => `<a class="nav-link" href="${h}">${t}</a>`).join("")}
        </nav>
        <div class="header-actions">
          <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme">
            <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>
          </button>
          <a class="btn btn-outline btn-sm desktop-only" href="login.html">Login <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
          <a class="btn btn-primary btn-sm desktop-only" href="signup.html">Sign up <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
          <button class="menu-btn" data-menu-open aria-label="Open menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" data-mobile-menu>
      <div class="mm-head">
        <a class="brand" href="index.html">${LOGO}<span>Relative</span></a>
        <button class="menu-btn" data-menu-close aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      </div>
      <nav>
        <a href="index.html#features">Features</a>
        ${navLinks.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}
      </nav>
      <div class="mm-actions">
        <a class="btn btn-outline btn-lg btn-block" href="login.html">Login</a>
        <a class="btn btn-primary btn-lg btn-block" href="signup.html">Sign up</a>
      </div>
    </div>`;
	}

	const footer = document.querySelector("[data-footer]");
	if (footer) {
		const ig = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`;
		const tw = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 4.9c-.8.4-1.7.6-2.6.8a4.5 4.5 0 0 0 2-2.5c-.9.5-1.9.9-2.9 1.1a4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 2.5 3.7a4.5 4.5 0 0 0 1.4 6 4.4 4.4 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4 4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 18.6a12.7 12.7 0 0 0 6.9 2c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.4 2.3-2.3z"/></svg>`;
		const li = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05a4.2 4.2 0 0 1 3.8-2.1c4 0 4.8 2.6 4.8 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z"/></svg>`;
		footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand"><a class="brand" href="index.html">${LOGO}<span>Relative</span></a></div>
          <div class="footer-col"><h5>Product</h5><a href="index.html#features">Features</a><a href="pricing.html">Pricing</a></div>
          <div class="footer-col"><h5>Company</h5><a href="contact.html">Contact</a><a href="faq.html">Faq</a></div>
          <div class="footer-col"><h5>Legal</h5><a href="terms-of-service.html">Terms of Service</a></div>
          <div class="footer-col"><h5>Social</h5><div class="footer-social"><a href="#" aria-label="Instagram">${ig}</a><a href="#" aria-label="Twitter">${tw}</a><a href="#" aria-label="LinkedIn">${li}</a></div></div>
        </div>
      </div>
      <div class="footer-bottom"><div class="container">© 2025 Relative. All rights reserved.</div></div>
    </footer>`;
	}

	// Theme toggle
	const root = document.documentElement;
	document.addEventListener("click", (e) => {
		const t = e.target.closest("[data-theme-toggle]");
		if (!t) return;
		const dark = root.classList.toggle("dark");
		try {
			localStorage.setItem("theme", dark ? "dark" : "light");
		} catch (_) {}
	});

	// Banner dismiss
	document.addEventListener("click", (e) => {
		if (e.target.closest("[data-banner-close]")) {
			const b = document.querySelector("[data-banner]");
			if (b) b.classList.add("hidden");
		}
	});

	// Mobile menu
	const mm = document.querySelector("[data-mobile-menu]");
	document.addEventListener("click", (e) => {
		if (e.target.closest("[data-menu-open]")) {
			mm && mm.classList.add("open");
			document.body.style.overflow = "hidden";
		}
		if (e.target.closest("[data-menu-close]")) {
			mm && mm.classList.remove("open");
			document.body.style.overflow = "";
		}
	});

	// Accordion
	document.querySelectorAll("[data-accordion-trigger]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const item = btn.closest("[data-accordion-item]");
			const open = item.classList.contains("open");
			item
				.closest("[data-accordion]")
				?.querySelectorAll("[data-accordion-item].open")
				.forEach((o) => o !== item && o.classList.remove("open"));
			item.classList.toggle("open", !open);
		});
	});

	// Pricing monthly/yearly toggle
	document.querySelectorAll("[data-billing-toggle] button").forEach((b) => {
		b.addEventListener("click", () => {
			const wrap = b.closest("[data-billing-toggle]");
			wrap
				.querySelectorAll("button")
				.forEach((x) => x.classList.toggle("active", x === b));
			const mode = b.dataset.billing;
			document.querySelectorAll("[data-price]").forEach((p) => {
				p.querySelector(".price-amount").textContent = p.dataset[mode];
				p.querySelector(".price-suffix").textContent =
					mode === "yearly" ? "/yr" : "/mo";
			});
		});
	});

	// Scroll reveal
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((en) => {
				if (en.isIntersecting) {
					en.target.classList.add("in");
					io.unobserve(en.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
	);
	const reveals = document.querySelectorAll(".reveal");
	reveals.forEach((el) => io.observe(el));
	// Fallback: ensure content is never permanently hidden (e.g. for snapshots / no-IO).
	setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 500);
})();
