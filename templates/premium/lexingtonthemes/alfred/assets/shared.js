// Alfred — Shared page component injector
// Injects the header and footer into any page that calls initPage()

const ALFRED_LOGO_SVG = `<svg class="logo-svg" viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 33.1V92C0 110.3 14.7881 125.1 33.0735 125.1H91.9265C110.212 125.1 125 110.3 125 92V33.1C125 14.8 110.212 0 91.9265 0H33.0735C14.7881 0.1 0 14.9 0 33.1ZM33.1734 116.8C19.3844 116.8 8.1934 105.6 8.1934 91.8C8.1934 78 19.3844 66.8 33.1734 66.8C46.9624 66.8 58.1534 78 58.1534 91.8C58.1534 105.6 46.9624 116.8 33.1734 116.8ZM33.1734 58.3C19.3844 58.3 8.1934 47.1 8.1934 33.3C8.1934 19.5 19.3844 8.3 33.1734 8.3C46.9624 8.3 58.1534 19.5 58.1534 33.3C58.1534 47.1 46.9624 58.3 33.1734 58.3ZM91.6267 116.8C77.8377 116.8 66.6466 105.6 66.6466 91.8C66.6466 78 77.8377 66.8 91.6267 66.8C105.416 66.8 116.607 78 116.607 91.8C116.607 105.6 105.416 116.8 91.6267 116.8ZM91.6267 58.3C77.8377 58.3 66.6466 47.1 66.6466 33.3C66.6466 19.5 77.8377 8.3 91.6267 8.3C105.416 8.3 116.607 19.5 116.607 33.3C116.607 47.1 105.416 58.3 91.6267 58.3Z" fill="white"/>
</svg>`;

function getHeader(base = "./") {
	return `
<header class="site-header">
  <div style="padding-inline:0;width:100%;max-width:1440px;margin-inline:auto">
    <div class="nav-inner">
      <div class="nav-brand-row">
        <a href="${base}index.html" class="logo-link" aria-label="Alfred home">${ALFRED_LOGO_SVG}</a>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu">
          <span class="sr-only">Toggle navigation</span>
          <svg id="menuIcon" style="width:1.75rem;height:1.75rem;margin:auto;display:block" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg id="closeIcon" style="width:1.75rem;height:1.75rem;margin:auto;display:none" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <nav id="navMenu" class="nav-menu" role="navigation" aria-label="Main navigation">
        <div class="nav-item-group">
          <button class="nav-btn dropdown-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="menu-overview" data-menu-button="menu-overview">Overview</button>
          <div id="menu-overview" class="dropdown-menu">
            <ul>
              <li><a href="${base}system-overview.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">A</span></div><span style="padding:0.625rem">All pages</span></a></li>
              <li><a href="${base}system-colors.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">C</span></div><span style="padding:0.625rem">Colors</span></a></li>
              <li><a href="${base}system-links.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">L</span></div><span style="padding:0.625rem">Links</span></a></li>
              <li><a href="${base}system-buttons.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">B</span></div><span style="padding:0.625rem">Buttons</span></a></li>
              <li><a href="${base}system-typography.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">T</span></div><span style="padding:0.625rem">Typography</span></a></li>
              <li style="position:relative">
                <button class="flyout-trigger" aria-haspopup="true" aria-expanded="false" aria-controls="second-flyout-submenu" style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:0.625rem 0.625rem 0.625rem 0.75rem;font-size:0.875rem;font-weight:500;color:var(--base-800);background:none;border:none;cursor:pointer">
                  <span>Resources</span>
                  <div style="padding:0.625rem"><span style="display:flex;align-items:center;justify-content:center;font-size:0.875rem;border:1px solid var(--base-200);border-radius:9999px;width:1.5rem;height:1.5rem">›</span></div>
                </button>
                <div id="second-flyout-submenu" class="flyout-menu">
                  <ul>
                    <li><a href="https://lexingtonthemes.com/legal/license/" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800);padding:0.625rem"><span style="display:flex;align-items:center;justify-content:center;border:1px solid var(--base-200);border-radius:9999px;width:1.5rem;height:1.5rem;font-size:0.875rem">L</span><span>License</span></a></li>
                    <li><a href="https://lexingtonthemes.com/documentation/" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800);padding:0.625rem"><span style="display:flex;align-items:center;justify-content:center;border:1px solid var(--base-200);border-radius:9999px;width:1.5rem;height:1.5rem;font-size:0.875rem">D</span><span>Documentation</span></a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="nav-item-group">
          <button class="nav-btn dropdown-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="menu-company" data-menu-button="menu-company">Company</button>
          <div id="menu-company" class="dropdown-menu">
            <ul>
              <li><a href="${base}about.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">A</span></div><span style="padding:0.625rem">About</span></a></li>
              <li><a href="${base}pricing.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">P</span></div><span style="padding:0.625rem">Pricing</span></a></li>
              <li><a href="${base}customers.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">C</span></div><span style="padding:0.625rem">Customers</span></a></li>
              <li><a href="${base}changelog.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">C</span></div><span style="padding:0.625rem">Changelog</span></a></li>
              <li><a href="${base}integrations.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">I</span></div><span style="padding:0.625rem">Integrations</span></a></li>
              <li><a href="${base}helpcenter.html" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:var(--base-800)"><div class="menu-icon-box"><span class="menu-letter">H</span></div><span style="padding:0.625rem">Help Center</span></a></li>
            </ul>
          </div>
        </div>
        <a class="nav-btn nav-btn-ml-auto" href="${base}blog.html">News</a>
        <a class="nav-btn" href="${base}signin.html">Log in</a>
        <a class="nav-btn nav-btn-dark" href="https://buy.polar.sh/polar_cl_If6pmsfFZUt7F1mjsfQjWC1EHxZDN3_u6HhhcEzUBm8">Buy Alfred</a>
      </nav>
    </div>
  </div>
</header>`;
}

function getFooter(base = "./") {
	return `
<footer>
  <div class="container" style="padding-top:2rem;padding-bottom:2rem">
    <div class="footer-grid">
      <div class="footer-links-grid">
        <div>
          <h3>Navigation</h3>
          <ul>
            <li><a href="${base}system-overview.html">Overview</a></li>
            <li><a href="${base}system-colors.html">Colors</a></li>
            <li><a href="${base}system-links.html">Links</a></li>
            <li><a href="${base}system-buttons.html">Buttons</a></li>
            <li><a href="${base}system-typography.html">Typography</a></li>
          </ul>
        </div>
        <div>
          <h3>Stay updated</h3>
          <ul>
            <li><a href="${base}blog.html">Blog</a></li>
            <li><a href="${base}changelog.html">Changelog</a></li>
            <li><a href="https://www.lexingtonthemes.com/legal/license">License</a></li>
            <li><a href="https://www.lexingtonthemes.com/documentation">Documentation</a></li>
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li><a href="${base}about.html">About</a></li>
            <li><a href="${base}customers.html">Customers</a></li>
            <li><a href="${base}helpcenter.html">Help Center</a></li>
            <li><a href="${base}integrations.html">Integrations</a></li>
          </ul>
        </div>
        <div>
          <h3>Socials</h3>
          <ul>
            <li><a href="https://twitter.com/lexingtonthemes">@lexingtonthemes</a></li>
            <li><a href="https://twitter.com/Mike_Andreuzza">@Mike_Andreuzza</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-newsletter">
        <p class="footer-newsletter-title">Stay up to date with Alfred's news.</p>
        <div>
          <form class="newsletter-form" aria-label="Newsletter Signup Form" onsubmit="return false">
            <div>
              <label for="email-footer" class="sr-only">Email address</label>
              <input type="email" id="email-footer" name="email" placeholder="name@email.com" required class="newsletter-input">
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-full">Signup</button>
          </form>
          <p class="footer-legal">By signing up, you agree that Alfred may contact you about our products and services. You can unsubscribe at any time. See Alfred's <a href="#">Privacy Statement</a> for more information on how we handle your data.</p>
        </div>
      </div>
    </div>
  </div>
</footer>`;
}

// Auto-inject nav and footer into pages that have #nav-placeholder and #footer-placeholder
document.addEventListener("DOMContentLoaded", () => {
	const base = document.documentElement.dataset.base || "./";

	const navPlaceholder = document.getElementById("nav-placeholder");
	if (navPlaceholder) {
		navPlaceholder.outerHTML = getHeader(base);
	}

	const footerPlaceholder = document.getElementById("footer-placeholder");
	if (footerPlaceholder) {
		footerPlaceholder.outerHTML = getFooter(base);
	}

	// Re-init nav after injection
	const navToggle = document.getElementById("navToggle");
	const navMenu = document.getElementById("navMenu");
	const menuIcon = document.getElementById("menuIcon");
	const closeIcon = document.getElementById("closeIcon");

	if (navToggle && navMenu) {
		navToggle.addEventListener("click", () => {
			const isOpen = navMenu.classList.contains("open");
			navMenu.classList.toggle("open", !isOpen);
			if (menuIcon) menuIcon.style.display = isOpen ? "block" : "none";
			if (closeIcon) closeIcon.style.display = isOpen ? "none" : "block";
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && navMenu.classList.contains("open")) {
				navMenu.classList.remove("open");
				if (menuIcon) menuIcon.style.display = "block";
				if (closeIcon) closeIcon.style.display = "none";
			}
		});
	}

	document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
		const menuId = btn.dataset.menuButton;
		const menu = document.getElementById(menuId);
		if (!menu) return;

		btn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const isOpen = menu.classList.contains("open");
			document
				.querySelectorAll(".dropdown-menu")
				.forEach((m) => m.classList.remove("open"));
			document
				.querySelectorAll(".flyout-menu")
				.forEach((m) => m.classList.remove("open"));
			if (!isOpen) menu.classList.add("open");
		});
	});

	const flyoutTrigger = document.querySelector(
		'[aria-controls="second-flyout-submenu"]',
	);
	const flyoutMenu = document.getElementById("second-flyout-submenu");

	if (flyoutTrigger && flyoutMenu) {
		flyoutTrigger.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const isOpen = flyoutMenu.classList.contains("open");
			document
				.querySelectorAll(".flyout-menu")
				.forEach((m) => m.classList.remove("open"));
			if (!isOpen) flyoutMenu.classList.add("open");
		});
	}

	document.addEventListener("click", (e) => {
		if (
			!e.target.closest(".dropdown-toggle") &&
			!e.target.closest(".dropdown-menu") &&
			!e.target.closest('[aria-controls="second-flyout-submenu"]') &&
			!e.target.closest("#second-flyout-submenu")
		) {
			document
				.querySelectorAll(".dropdown-menu, .flyout-menu")
				.forEach((m) => m.classList.remove("open"));
		}
	});
});
