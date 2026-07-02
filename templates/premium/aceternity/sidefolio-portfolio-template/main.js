/* Sidefolio — shared chrome + interactions (vanilla JS) */

const ICONS = {
	home: '<path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>',
	about:
		'<path d="M8 9h8"></path><path d="M8 13h6"></path><path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z"></path>',
	projects:
		'<path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9z"></path><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>',
	articles:
		'<path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path><path d="M7 8h10"></path><path d="M7 12h10"></path><path d="M7 16h10"></path>',
	contact:
		'<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path><path d="M3 7l9 6l9 -6"></path>',
	twitter:
		'<path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path>',
	linkedin:
		'<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M8 11l0 5"></path><path d="M8 8l0 .01"></path><path d="M12 16l0 -5"></path><path d="M16 16v-3a2 2 0 0 0 -4 0"></path>',
	youtube:
		'<path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z"></path><path d="M10 9l5 3l-5 3z"></path>',
	toggle:
		'<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M15 4v16"></path><path d="M9 10l2 2l-2 2"></path>',
};

function svg(paths, cls) {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls || ""}">${paths}</svg>`;
}

const NAV = [
	{ href: "index.html", key: "home", label: "Home" },
	{ href: "about.html", key: "about", label: "About" },
	{ href: "projects.html", key: "projects", label: "Projects" },
	{ href: "blog.html", key: "articles", label: "Articles" },
	{ href: "contact.html", key: "contact", label: "Contact" },
];
const SOCIALS = [
	{ href: "https://twitter.com/mannupaaji", key: "twitter", label: "Twitter" },
	{
		href: "https://linkedin.com/in/manuarora28",
		key: "linkedin",
		label: "LinkedIn",
	},
	{ href: "https://youtube.com/maninthere", key: "youtube", label: "YouTube" },
];

function renderSidebar(active, base) {
	base = base || "";
	const navHtml = NAV.map(
		(n) =>
			`<a class="${n.key === active ? "active" : ""}" href="${base}${n.href}">${svg(ICONS[n.key])}<span>${n.label}</span></a>`,
	).join("");
	const socialHtml = SOCIALS.map(
		(s) =>
			`<a href="${s.href}" target="_blank" rel="noopener">${svg(ICONS[s.key])}<span>${s.label}</span></a>`,
	).join("");

	const sidebar = `
  <div class="sidebar" id="sidebar">
    <div class="sidebar__top">
      <a href="${base}index.html" class="sidebar__profile">
        <img class="sidebar__avatar" src="${base}assets/images/avatar.jpg" alt="Avatar" width="40" height="40" />
        <div class="sidebar__name"><span class="n">John Doe</span><span class="r">Developer</span></div>
      </a>
      <nav class="nav">
        ${navHtml}
        <p class="nav__label">Socials</p>
        ${socialHtml}
      </nav>
    </div>
    <div>
      <a class="resume-btn" href="${base}resume.html">
        <span class="resume-btn__glow-wrap"><span class="resume-btn__glow"></span></span>
        <span class="resume-btn__inner">
          <span>Read Resume</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.75 8.75L14.25 12L10.75 15.25"></path></svg>
        </span>
        <span class="resume-btn__underline"></span>
      </a>
    </div>
  </div>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle menu">${svg(ICONS.toggle)}</button>`;
	return sidebar;
}

function mountChrome(active, base) {
	base = base || "";
	const host = document.getElementById("app");
	const main = host.innerHTML;
	host.innerHTML =
		renderSidebar(active, base) +
		`<div class="shell"><div class="panel"><main class="content">${main}</main>` +
		`<div class="footer"><b>2026 </b>— Built by Manu Arora</div></div></div>`;

	// mobile toggle
	const toggle = document.getElementById("sidebarToggle");
	const sidebar = document.getElementById("sidebar");
	if (toggle && sidebar) {
		toggle.addEventListener("click", () => sidebar.classList.toggle("open"));
		sidebar
			.querySelectorAll("a")
			.forEach((a) =>
				a.addEventListener("click", () => sidebar.classList.remove("open")),
			);
	}

	// entrance animation for project / article cards (staggered fade + translate)
	const cards = document.querySelectorAll(".card");
	if (cards.length) {
		const reveal = (el, i) => setTimeout(() => el.classList.add("in"), i * 120);
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						reveal(e.target, Number(e.target.dataset.idx || 0));
						io.unobserve(e.target);
					}
				});
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
		);
		cards.forEach((c, i) => {
			c.dataset.idx = i;
			io.observe(c);
		});
		// safety net: if anything is still hidden shortly after load, reveal it
		setTimeout(
			() =>
				cards.forEach((c, i) => {
					if (!c.classList.contains("in")) reveal(c, i);
				}),
			800,
		);
	}

	// copy buttons (blog code blocks)
	document.querySelectorAll(".codeblock__copy").forEach((btn) => {
		btn.addEventListener("click", () => {
			const code = btn.closest(".codeblock").querySelector("code");
			if (code) navigator.clipboard?.writeText(code.textContent);
			const label = btn.querySelector("span");
			if (label) {
				const t = label.textContent;
				label.textContent = "Copied!";
				setTimeout(() => (label.textContent = t), 1500);
			}
		});
	});

	// inert contact form
	const form = document.getElementById("contactForm");
	if (form) form.addEventListener("submit", (e) => e.preventDefault());
}

window.SidefolioChrome = { mountChrome };
