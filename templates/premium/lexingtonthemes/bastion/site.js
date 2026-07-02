/**
 * BASTION — SHARED SITE JAVASCRIPT
 * Source: https://lexingtonthemes.com/viewports/bastion
 */

/* ================================================================
   NAV: Scroll state (transparent → white)
   ================================================================ */
function initNav() {
	const nav = document.getElementById("site-nav");
	if (!nav) return;

	function updateNav() {
		if (window.scrollY > 60) {
			nav.classList.add("site-nav--scrolled");
		} else {
			nav.classList.remove("site-nav--scrolled");
		}
	}

	window.addEventListener("scroll", updateNav, { passive: true });
	updateNav();
}

/* ================================================================
   MOBILE MENU
   ================================================================ */
function initMobileMenu() {
	const toggleBtn = document.getElementById("mobile-menu-toggle");
	const menu = document.getElementById("mobile-menu");
	const hamburger = document.getElementById("hamburger-icon");
	const closeIcon = document.getElementById("close-icon");
	if (!toggleBtn || !menu) return;

	let isOpen = false;

	function open() {
		isOpen = true;
		menu.classList.add("is-open");
		menu.setAttribute("aria-hidden", "false");
		toggleBtn.setAttribute("aria-expanded", "true");
		if (hamburger) hamburger.style.display = "none";
		if (closeIcon) closeIcon.style.display = "block";
		document.body.style.overflow = "hidden";
	}

	function close() {
		isOpen = false;
		menu.classList.remove("is-open");
		menu.setAttribute("aria-hidden", "true");
		toggleBtn.setAttribute("aria-expanded", "false");
		if (hamburger) hamburger.style.display = "block";
		if (closeIcon) closeIcon.style.display = "none";
		document.body.style.overflow = "";
	}

	toggleBtn.addEventListener("click", () => {
		if (isOpen) close();
		else open();
	});

	// Close on escape
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && isOpen) close();
	});

	// Close when a link inside the menu is clicked
	menu.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", close);
	});
}

/* ================================================================
   SEARCH MODAL
   ================================================================ */
const SEARCH_INDEX = [
	{ title: "Home", url: "index.html", category: "Page" },
	{ title: "About Us", url: "about.html", category: "Page" },
	{ title: "Our Services", url: "services.html", category: "Page" },
	{ title: "Projects", url: "projects.html", category: "Page" },
	{ title: "Our Team", url: "team.html", category: "Page" },
	{ title: "Careers", url: "careers.html", category: "Page" },
	{ title: "Blog", url: "blog.html", category: "Page" },
	{ title: "Contact", url: "contact.html", category: "Page" },
	{ title: "Why Us", url: "why-us.html", category: "Page" },
	{ title: "Our Partners", url: "partners.html", category: "Page" },
	{ title: "Mission & Values", url: "mission.html", category: "Page" },
	{
		title: "Client Partnerships",
		url: "services-client-partnerships.html",
		category: "Service",
	},
	{
		title: "Construction Management",
		url: "services-construction-management.html",
		category: "Service",
	},
	{
		title: "Interior Fit-Out & Finishes",
		url: "services-interior-fit-out-and-finishes.html",
		category: "Service",
	},
	{
		title: "MEP Coordination",
		url: "services-mep-coordination-and-commissioning.html",
		category: "Service",
	},
	{
		title: "Preconstruction & Estimating",
		url: "services-preconstruction-estimating.html",
		category: "Service",
	},
	{
		title: "Project Controls & Scheduling",
		url: "services-project-controls-and-scheduling.html",
		category: "Service",
	},
	{
		title: "Redwood Transit Hub",
		url: "projects-redwood-transit-hub.html",
		category: "Project",
	},
	{
		title: "Westfield Commercial Complex",
		url: "projects-westfield-commercial-complex.html",
		category: "Project",
	},
	{ title: "Privacy Policy", url: "legal-privacy.html", category: "Legal" },
	{ title: "Terms of Service", url: "legal-terms.html", category: "Legal" },
	{ title: "Cookie Policy", url: "legal-cookies.html", category: "Legal" },
];

function initSearch() {
	const toggleBtn = document.getElementById("search-toggle");
	const modal = document.getElementById("search-modal");
	const closeBtn = document.getElementById("search-close");
	const input = document.getElementById("search-input");
	const resultsEl = document.getElementById("search-results");
	const noResults = document.getElementById("search-no-results");
	if (!toggleBtn || !modal) return;

	function openModal() {
		modal.classList.add("is-open");
		document.body.style.overflow = "hidden";
		setTimeout(() => input && input.focus(), 50);
	}

	function closeModal() {
		modal.classList.remove("is-open");
		document.body.style.overflow = "";
		if (input) input.value = "";
		if (resultsEl) resultsEl.style.display = "none";
		if (noResults) noResults.style.display = "none";
	}

	toggleBtn.addEventListener("click", openModal);
	if (closeBtn) closeBtn.addEventListener("click", closeModal);

	// Close on backdrop click
	modal.addEventListener("click", (e) => {
		if (e.target === modal) closeModal();
	});

	// Close on Escape
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
	});

	// Search logic
	if (input) {
		input.addEventListener("input", () => {
			const query = input.value.trim().toLowerCase();
			if (!query) {
				if (resultsEl) resultsEl.style.display = "none";
				if (noResults) noResults.style.display = "none";
				return;
			}

			const matches = SEARCH_INDEX.filter(
				(item) =>
					item.title.toLowerCase().includes(query) ||
					item.category.toLowerCase().includes(query),
			);

			if (matches.length === 0) {
				if (resultsEl) resultsEl.style.display = "none";
				if (noResults) noResults.style.display = "block";
				return;
			}

			if (noResults) noResults.style.display = "none";

			if (resultsEl) {
				resultsEl.style.display = "block";
				resultsEl.innerHTML = matches
					.map(
						(item) => `
          <a href="${item.url}" class="search-result-item">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-base-400);background:rgba(255,255,255,0.05);padding:0.125rem 0.375rem;border-radius:0.25rem;">${item.category}</span>
            </div>
            <span style="display:block;margin-top:0.25rem;font-size:var(--text-base);color:var(--color-white);">${item.title}</span>
          </a>
        `,
					)
					.join("");
			}
		});
	}
}

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
function initReveal() {
	const els = document.querySelectorAll("[data-reveal]");
	if (!els.length) return;

	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					io.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
	);

	els.forEach((el) => io.observe(el));
}

/* ================================================================
   KEEN SLIDER helper (for carousels)
   ================================================================ */
function initSlider(selector, options) {
	if (typeof KeenSlider === "undefined") return null;
	const el = document.querySelector(selector);
	if (!el) return null;
	return new KeenSlider(el, options);
}

/* ================================================================
   HIGHLIGHT ACTIVE NAV LINK
   ================================================================ */
function initActiveNav() {
	const current = window.location.pathname.split("/").pop() || "index.html";
	document.querySelectorAll(".nav-link, .mobile-menu-link").forEach((a) => {
		const href = a.getAttribute("href");
		if (href === current || (current === "" && href === "index.html")) {
			a.setAttribute("aria-current", "page");
		}
	});
}

/* ================================================================
   ACCORDION (for FAQ / careers etc.)
   ================================================================ */
function initAccordions() {
	document.querySelectorAll("[data-accordion]").forEach((acc) => {
		const trigger = acc.querySelector("[data-accordion-trigger]");
		const content = acc.querySelector("[data-accordion-content]");
		if (!trigger || !content) return;

		trigger.addEventListener("click", () => {
			const isOpen = acc.classList.contains("is-open");
			// Close all siblings
			const parent = acc.parentElement;
			if (parent) {
				parent.querySelectorAll("[data-accordion].is-open").forEach((o) => {
					o.classList.remove("is-open");
					const c = o.querySelector("[data-accordion-content]");
					if (c) c.style.maxHeight = "0";
					const t = o.querySelector("[data-accordion-trigger]");
					if (t) t.setAttribute("aria-expanded", "false");
				});
			}

			if (!isOpen) {
				acc.classList.add("is-open");
				content.style.maxHeight = content.scrollHeight + "px";
				trigger.setAttribute("aria-expanded", "true");
			}
		});

		// Init: close all
		content.style.maxHeight = "0";
		content.style.overflow = "hidden";
		content.style.transition = "max-height 0.3s ease-out";
	});
}

/* ================================================================
   BOOT
   ================================================================ */
document.addEventListener("DOMContentLoaded", () => {
	initNav();
	initMobileMenu();
	initSearch();
	initReveal();
	initActiveNav();
	initAccordions();
});
