/* MAINLINE clone — shared chrome + interactions (vanilla JS) */

/* ---------- no-flash theme boot is inline in <head>; this manages toggle ---------- */
function applyTheme(t) {
	document.documentElement.classList.toggle("dark", t === "dark");
	try {
		localStorage.setItem("mainline-theme", t);
	} catch (e) {}
}
function currentTheme() {
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

const ICONS = {
	chevron:
		'<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
	sun: '<svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
	moon: '<svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
	github:
		'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>',
	arrow:
		'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>',
};

const FEATURES = [
	{
		title: "Modern product teams",
		desc: "Mainline is built on the habits that make the best product teams successful",
		href: "/#feature-modern-teams",
		icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
	},
	{
		title: "Resource Allocation",
		desc: "Mainline your resource allocation and execution",
		href: "/#resource-allocation",
		icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
	},
];

function navLink(href, label, page) {
	const active =
		page === label.toLowerCase().replace(/\s/g, "") ? " active" : "";
	return `<a href="${href}" class="${active}">${label}</a>`;
}

function renderHeader(page) {
	return `
  <header class="site-header">
    <nav class="navbar" aria-label="Main">
      <a class="nav-brand" href="index.html"><img src="assets/logo.svg" alt="Mainline"></a>
      <div class="nav-links">
        <div class="nav-dropdown">
          <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">Features ${ICONS.chevron}</button>
          <div class="dropdown-menu" role="menu">
            ${FEATURES.map((f) => `<a class="dropdown-item" href="index.html${f.href.replace("/", "")}" role="menuitem"><span class="di-icon">${f.icon}</span><span><span class="di-title">${f.title}</span><br><span class="di-desc">${f.desc}</span></span></a>`).join("")}
          </div>
        </div>
        <a href="about.html"${page === "about" ? ' class="active"' : ""}>About Us</a>
        <a href="pricing.html"${page === "pricing" ? ' class="active"' : ""}>Pricing</a>
        <a href="faq.html"${page === "faq" ? ' class="active"' : ""}>FAQ</a>
        <a href="contact.html"${page === "contact" ? ' class="active"' : ""}>Contact</a>
      </div>
      <div class="nav-actions">
        <button class="nav-icon-btn theme-toggle" aria-label="Toggle theme">${ICONS.sun}${ICONS.moon}</button>
        <a class="nav-login" href="login.html">Login</a>
        <a class="nav-icon-btn" href="https://github.com/shadcnblocks/mainline-nextjs-template" aria-label="GitHub" target="_blank" rel="noopener">${ICONS.github}</a>
        <button class="nav-icon-btn nav-burger" aria-label="Open main menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
      </div>
    </nav>
    <div class="mobile-menu">
      <button class="nav-icon-btn mobile-close" aria-label="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      <a href="about.html">About Us</a>
      <a href="pricing.html">Pricing</a>
      <a href="faq.html">FAQ</a>
      <a href="contact.html">Contact</a>
      <a href="login.html">Login</a>
    </div>
  </header>`;
}

function renderFooter() {
	return `
  <section class="cta-foot">
    <div class="container reveal">
      <h2>Start your free trial today</h2>
      <p>Mainline is the fit-for-purpose tool for planning and building modern software products.</p>
      <a class="btn btn-primary" href="https://www.shadcnblocks.com/template/mainline" target="_blank" rel="noopener">Get template</a>
      <nav class="footer-links">
        <a href="index.html">Product</a>
        <a href="about.html">About Us</a>
        <a href="pricing.html">Pricing</a>
        <a href="faq.html">FAQ</a>
        <a href="contact.html">Contact</a>
        <a href="https://x.com" target="_blank" rel="noopener">Xwitter ${ICONS.arrow}</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn ${ICONS.arrow}</a>
      </nav>
    </div>
    <div class="footer-privacy"><a href="privacy.html">Privacy Policy</a></div>
    <div class="watermark"><span>mainline</span></div>
  </section>`;
}

function mountChrome(page) {
	const h = document.querySelector("[data-header]");
	const f = document.querySelector("[data-footer]");
	if (h) h.innerHTML = renderHeader(page);
	if (f) f.innerHTML = renderFooter();
	wireInteractions();
}

function wireInteractions() {
	// theme toggle
	document.querySelectorAll(".theme-toggle").forEach((btn) => {
		btn.addEventListener("click", () =>
			applyTheme(currentTheme() === "dark" ? "light" : "dark"),
		);
	});

	// features dropdown (hover + click)
	document.querySelectorAll(".nav-dropdown").forEach((dd) => {
		const trig = dd.querySelector(".nav-trigger");
		const open = (v) => {
			dd.classList.toggle("open", v);
			trig.setAttribute("aria-expanded", v);
		};
		dd.addEventListener("mouseenter", () => open(true));
		dd.addEventListener("mouseleave", () => open(false));
		trig.addEventListener("click", (e) => {
			e.preventDefault();
			open(!dd.classList.contains("open"));
		});
	});

	// mobile menu
	const mm = document.querySelector(".mobile-menu");
	document
		.querySelector(".nav-burger")
		?.addEventListener("click", () => mm.classList.add("open"));
	document
		.querySelector(".mobile-close")
		?.addEventListener("click", () => mm.classList.remove("open"));
	mm?.querySelectorAll("a").forEach((a) =>
		a.addEventListener("click", () => mm.classList.remove("open")),
	);

	// accordions
	document.querySelectorAll("[data-accordion]").forEach((acc) => {
		acc.querySelectorAll(".acc-item").forEach((item) => {
			const trig = item.querySelector(".acc-trigger");
			trig.addEventListener("click", () => {
				const isOpen = item.classList.contains("open");
				if (acc.dataset.accordion === "single")
					acc.querySelectorAll(".acc-item").forEach((i) => setAcc(i, false));
				setAcc(item, !isOpen);
			});
		});
	});
	function setAcc(item, v) {
		item.classList.toggle("open", v);
		const panel = item.querySelector(".acc-panel");
		if (panel) panel.style.maxHeight = v ? panel.scrollHeight + "px" : "0px";
		item.querySelector(".acc-trigger")?.setAttribute("aria-expanded", v);
	}

	// tabs
	document.querySelectorAll("[data-tabs]").forEach((tabs) => {
		const btns = tabs.querySelectorAll(".tab-btn");
		const panels = tabs.querySelectorAll(".tab-panel");
		btns.forEach((b, i) =>
			b.addEventListener("click", () => {
				btns.forEach((x) => x.classList.remove("active"));
				panels.forEach((x) => x.classList.remove("active"));
				b.classList.add("active");
				panels[i]?.classList.add("active");
			}),
		);
	});

	// pricing billing switch
	document.querySelectorAll("[data-billing-switch]").forEach((sw) => {
		sw.addEventListener("click", () => {
			const on = sw.getAttribute("aria-checked") !== "true";
			sw.setAttribute("aria-checked", on);
			document.querySelectorAll("[data-price]").forEach((el) => {
				el.textContent = on ? el.dataset.annual : el.dataset.monthly;
			});
		});
	});

	// carousel
	document.querySelectorAll("[data-carousel]").forEach((car) => {
		const track = car.querySelector(".carousel-track");
		const prev = car.querySelector(".car-prev");
		const next = car.querySelector(".car-next");
		const step = () =>
			(track.firstElementChild?.getBoundingClientRect().width || 320) + 24;
		prev?.addEventListener("click", () =>
			track.scrollBy({ left: -step(), behavior: "smooth" }),
		);
		next?.addEventListener("click", () =>
			track.scrollBy({ left: step(), behavior: "smooth" }),
		);
	});

	// reveal on scroll (with rootMargin so just-below-fold items animate in early)
	const reveals = document.querySelectorAll(".reveal");
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
	);
	reveals.forEach((el) => io.observe(el));
	// Fallback: if scripting is throttled or the page is captured full-height
	// without scrolling, ensure nothing stays permanently hidden.
	setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 1200);
}

window.MAINLINE = { mountChrome };
