/* Streamline clone — shared chrome + interactions */
(function () {
	// ---- Theme (no-flash boot is inline in <head>) ----
	function setTheme(t) {
		document.documentElement.classList.toggle("dark", t === "dark");
		try {
			localStorage.setItem("theme", t);
		} catch (e) {}
	}
	window.__toggleTheme = function () {
		const dark = document.documentElement.classList.contains("dark");
		setTheme(dark ? "light" : "dark");
	};

	const ICONS = {
		fb: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>',
		tw: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 4.9c-.8.4-1.7.6-2.6.8 1-.6 1.6-1.5 2-2.5-.9.5-1.9.9-2.9 1.1A4.5 4.5 0 0 0 11.8 8 12.8 12.8 0 0 1 2.5 3.2 4.5 4.5 0 0 0 3.9 9 4.4 4.4 0 0 1 2 8.5v.1c0 2.2 1.5 4 3.6 4.4-.7.2-1.4.2-2 .1.6 1.8 2.2 3.1 4.2 3.1A9 9 0 0 1 1 18.1 12.7 12.7 0 0 0 7.9 20c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.4 2.3-2.3z"/></svg>',
		li: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9z"/></svg>',
	};

	const NAV = `
  <div class="announce" id="announce">
    Purchase this theme on <a class="announce-link" href="https://www.shadcnblocks.com/template/streamline" target="_blank" rel="noopener">shadcnblocks.com</a>
    <a class="announce-cta" href="https://www.shadcnblocks.com/template/streamline" target="_blank" rel="noopener">Get Template</a>
    <button class="announce-x" id="announce-x" aria-label="Dismiss">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <header class="site-header">
    <nav class="nav">
      <a class="brand" href="index.html"><img src="assets/favicon/favicon.svg" alt=""> Streamline</a>
      <div class="nav-links">
        <div class="nav-dropdown" id="product-dd">
          <button>Product <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>
          <div class="nav-menu">
            <a href="index.html#features">Features</a>
            <a href="index.html#pricing">Pricing</a>
            <a href="index.html#faq">FAQ</a>
            <a href="about.html">About us</a>
          </div>
        </div>
        <a href="about.html" data-nav="about">About us</a>
        <a href="pricing.html" data-nav="pricing">Pricing</a>
        <a href="faq.html" data-nav="faq">FAQ</a>
        <a href="contact.html" data-nav="contact">Contact</a>
      </div>
      <div class="nav-right">
        <a class="nav-signup" href="signup.html">Sign up</a>
        <a class="btn btn-outline" href="login.html">Login</a>
        <button class="theme-toggle" onclick="__toggleTheme()" aria-label="Toggle theme">
          <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        </button>
      </div>
    </nav>
  </header>`;

	const FOOTER = `
  <footer class="site-footer">
    <div class="container">
      <hr class="footer-sep">
      <div class="footer-grid">
        <div class="footer-col"></div>
        <div class="footer-col"><h4>Product</h4>
          <a href="index.html">Home</a><a href="index.html#features">Feature1</a><a href="index.html#features">Feature2</a><a href="index.html#features">Feature3</a></div>
        <div class="footer-col"><h4>Company</h4>
          <a href="about.html">About</a><a href="pricing.html">Pricing</a></div>
        <div class="footer-col"><h4>Support</h4>
          <a href="faq.html">FAQ</a><a href="contact.html">Contact</a></div>
        <div class="footer-col"><h4>Service</h4>
          <a href="terms.html">Terms of service</a><a href="privacy.html">Privacy policy</a></div>
      </div>
      <div class="footer-bottom">
        <span class="copy">&copy; 2026 Streamline</span>
        <div class="footer-socials">
          <a href="#" aria-label="Facebook">${ICONS.fb}</a>
          <a href="#" aria-label="Twitter">${ICONS.tw}</a>
          <a href="#" aria-label="LinkedIn">${ICONS.li}</a>
        </div>
      </div>
    </div>
  </footer>`;

	function mountChrome() {
		const h = document.querySelector('[data-mount="header"]');
		if (h) h.innerHTML = NAV;
		const f = document.querySelector('[data-mount="footer"]');
		if (f) f.innerHTML = FOOTER;

		// active nav
		const page = document.body.getAttribute("data-page");
		if (page) {
			const link = document.querySelector(`[data-nav="${page}"]`);
			if (link) link.classList.add("active");
		}
		// announcement dismiss
		const x = document.getElementById("announce-x");
		if (x)
			x.addEventListener("click", () =>
				document.getElementById("announce").classList.add("hidden"),
			);
		// product dropdown
		const dd = document.getElementById("product-dd");
		if (dd) {
			dd.querySelector("button").addEventListener("click", (e) => {
				e.stopPropagation();
				dd.classList.toggle("open");
			});
			document.addEventListener("click", (e) => {
				if (!dd.contains(e.target)) dd.classList.remove("open");
			});
		}
	}

	function initAccordions() {
		document.querySelectorAll(".acc-item").forEach((item) => {
			const trig = item.querySelector(".acc-trigger");
			const panel = item.querySelector(".acc-panel");
			if (!trig || !panel) return;
			const sync = () => {
				panel.style.maxHeight = item.classList.contains("open")
					? panel.scrollHeight + "px"
					: "0px";
			};
			if (item.classList.contains("open")) requestAnimationFrame(sync);
			trig.addEventListener("click", () => {
				item.classList.toggle("open");
				sync();
			});
		});
	}

	function initReveal() {
		const els = document.querySelectorAll(".reveal");
		if (!("IntersectionObserver" in window)) {
			els.forEach((e) => e.classList.add("in"));
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting) {
						en.target.classList.add("in");
						io.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		els.forEach((e) => io.observe(e));
	}

	// ---- Generic carousel ----
	window.initCarousel = function (root) {
		const track = root.querySelector("[data-track]");
		const slides = Array.from(track.children);
		const dots = root.querySelector("[data-dots]");
		let i = 0;
		const per = parseInt(root.getAttribute("data-per") || "1", 10);
		const maxIdx = Math.max(0, slides.length - per);
		function render() {
			const slideW =
				slides[0].getBoundingClientRect().width +
				parseFloat(getComputedStyle(track).gap || 0);
			track.style.transform = `translateX(${-i * slideW}px)`;
			if (dots)
				Array.from(dots.children).forEach((d, k) =>
					d.classList.toggle("active", k === i),
				);
			const lbl = root.querySelector("[data-counter]");
			if (lbl) lbl.textContent = i + 1 + " of " + (maxIdx + 1);
		}
		function go(n) {
			i = Math.max(0, Math.min(maxIdx, n));
			render();
		}
		if (dots) {
			for (let k = 0; k <= maxIdx; k++) {
				const b = document.createElement("button");
				b.className = "dot";
				b.addEventListener("click", () => go(k));
				dots.appendChild(b);
			}
		}
		root
			.querySelectorAll("[data-prev]")
			.forEach((b) => b.addEventListener("click", () => go(i - 1)));
		root
			.querySelectorAll("[data-next]")
			.forEach((b) => b.addEventListener("click", () => go(i + 1)));
		window.addEventListener("resize", render);
		render();
		return { go };
	};

	document.addEventListener("DOMContentLoaded", function () {
		mountChrome();
		initAccordions();
		initReveal();
		if (window.pageInit) window.pageInit();
	});
})();
