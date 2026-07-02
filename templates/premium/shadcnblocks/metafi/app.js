/* ===== Metafi clone — shared chrome + interactions ===== */
(function () {
	const NAV = [
		["Features", "features.html"],
		["Integrations", "integrations.html"],
		["About Us", "about.html"],
		["Pricing", "pricing.html"],
		["Blog", "blog.html"],
		["Contact", "contact.html"],
	];
	const here = location.pathname.split("/").pop() || "index.html";

	const sun =
		'<svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
	const moon =
		'<svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

	const brand = (mark) =>
		`<a class="brand" href="index.html"><img class="logo-mark" src="assets/images/layout/logo-single.svg" alt=""><span>Metafi</span></a>`;

	// ---- Header ----
	const header = document.createElement("header");
	header.className = "site-header";
	header.innerHTML = `
    <div class="container">
      ${brand()}
      <nav class="nav">
        ${NAV.map(([t, h]) => `<a href="${h}"${h === here ? ' class="active"' : ""}>${t}</a>`).join("")}
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" aria-label="Toggle theme">${sun}${moon}</button>
        <a class="btn btn-ghost btn-sm" href="login.html">Login</a>
        <a class="btn btn-primary btn-sm" href="signup.html">Get Started</a>
        <button class="hamburger" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
    <nav class="mobile-nav">
      ${NAV.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}
      <a class="btn btn-outline" href="login.html">Login</a>
      <a class="btn btn-primary" href="signup.html">Get Started</a>
    </nav>`;
	document.body.prepend(header);

	// ---- Footer ----
	const footer = document.createElement("footer");
	footer.className = "site-footer";
	footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          ${brand()}
          <p>Simplifying payments for growing businesses. Build, scale, and manage your revenue with Metafi.</p>
        </div>
        <div class="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href="features.html">Features</a></li>
            <li><a href="integrations.html">Integrations</a></li>
            <li><a href="pricing.html">Pricing</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="blog.html">Blog</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms of Service</a></li>
            <li><a href="cookie-policy.html">Cookie Policy</a></li>
            <li><a href="signup.html">Sign Up</a></li>
            <li><a href="login.html">Login</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Metafi, Inc. All rights reserved.</span>
        <span>Clone built for study. Original by Shadcnblocks.</span>
      </div>
    </div>`;
	document.body.append(footer);

	// ---- Theme toggle ----
	const root = document.documentElement;
	const toggle = header.querySelector(".theme-toggle");
	const apply = (t) => {
		root.classList.toggle("dark", t === "dark");
	};
	toggle.addEventListener("click", () => {
		const next = root.classList.contains("dark") ? "light" : "dark";
		apply(next);
		try {
			localStorage.setItem("metafi-theme", next);
		} catch (e) {}
	});

	// ---- Mobile menu ----
	const ham = header.querySelector(".hamburger");
	const mnav = header.querySelector(".mobile-nav");
	ham.addEventListener("click", () => mnav.classList.toggle("open"));

	// ---- Accordion (FAQ etc.) ----
	document.querySelectorAll("[data-accordion]").forEach((acc) => {
		acc.querySelectorAll(".acc-item").forEach((item) => {
			const trigger = item.querySelector(".acc-trigger");
			const panel = item.querySelector(".acc-panel");
			trigger.addEventListener("click", () => {
				const open = item.classList.contains("open");
				if (!acc.hasAttribute("data-multi"))
					acc.querySelectorAll(".acc-item.open").forEach((o) => {
						o.classList.remove("open");
						o.querySelector(".acc-panel").style.maxHeight = null;
					});
				item.classList.toggle("open", !open);
				panel.style.maxHeight = open ? null : panel.scrollHeight + "px";
			});
		});
	});

	// ---- Pricing toggle (monthly/annual) ----
	document.querySelectorAll("[data-billing-toggle]").forEach((t) => {
		const apply = (annual) => {
			document.querySelectorAll("[data-price]").forEach((el) => {
				el.textContent = el.getAttribute(annual ? "data-annual" : "data-price");
			});
			document.querySelectorAll(".bill-period").forEach((el) => {
				el.textContent = annual
					? " Per user / billed yearly"
					: " Per user / billed monthly";
			});
		};
		apply(t.getAttribute("aria-checked") === "true");
		t.addEventListener("click", () => {
			const annual = t.getAttribute("aria-checked") !== "true";
			t.setAttribute("aria-checked", String(annual));
			apply(annual);
		});
	});

	// ---- Scroll reveal (fail-open: reveal anything already past, never trap content hidden) ----
	const reveals = document.querySelectorAll(".reveal");
	const io = new IntersectionObserver(
		(entries) =>
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					io.unobserve(e.target);
				}
			}),
		{ threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
	);
	reveals.forEach((el) => {
		// already in/above viewport on load -> show immediately, no animation flash
		if (el.getBoundingClientRect().top < window.innerHeight)
			el.classList.add("in");
		else io.observe(el);
	});
	// safety net: if anything is still hidden after load (e.g. headless capture), reveal it
	window.addEventListener("load", () =>
		setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 1200),
	);
})();
