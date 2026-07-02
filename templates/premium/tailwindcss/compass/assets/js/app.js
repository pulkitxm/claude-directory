/* Compass clone — vanilla-JS shim reproducing the Headless UI + Next.js behaviours
   the original template ships. Pure DOM, no dependencies. */
(() => {
	"use strict";

	/* ---------- Headless-UI-style data-hover / data-focus / data-active ---------- */
	// Tailwind utilities like `data-hover:before:bg-...` only apply when the element
	// carries data-hover / data-focus attributes (Headless UI adds these). We mirror
	// native :hover / :focus-visible / :active onto those attributes for every button
	// and link that uses them.
	function wireInteractiveStates() {
		const els = document.querySelectorAll(
			"button, a, [data-headlessui-state], [role='menuitem']",
		);
		els.forEach((el) => {
			el.addEventListener("pointerenter", () =>
				el.setAttribute("data-hover", ""),
			);
			el.addEventListener("pointerleave", () =>
				el.removeAttribute("data-hover"),
			);
			el.addEventListener("pointerdown", () =>
				el.setAttribute("data-active", ""),
			);
			el.addEventListener("pointerup", () => el.removeAttribute("data-active"));
			el.addEventListener("focus", () => {
				if (el.matches(":focus-visible")) el.setAttribute("data-focus", "");
			});
			el.addEventListener("blur", () => el.removeAttribute("data-focus"));
		});
	}

	/* ---------- Sidebar collapse ---------- */
	function wireSidebar() {
		const group = document.querySelector(".group");
		if (!group) return;
		// Collapse buttons: the icon button inside the course nav AND the icon button
		// in the top bar (xl:hidden / re-expand). Both carry the "panel" svg viewBox 0 0 16 14.
		const buttons = document.querySelectorAll("button");
		buttons.forEach((btn) => {
			const svg = btn.querySelector('svg[viewBox="0 0 16 14"]');
			if (!svg) return;
			// The top-bar button (xl:hidden) opens the mobile drawer instead of toggling
			// the desktop collapse state — handled by wireMobileDrawer().
			if (btn.classList.contains("xl:hidden")) return;
			btn.addEventListener("click", () => {
				if (group.hasAttribute("data-sidebar-collapsed")) {
					group.removeAttribute("data-sidebar-collapsed");
				} else {
					group.setAttribute("data-sidebar-collapsed", "");
				}
			});
		});
	}

	/* ---------- Account dropdown menu ---------- */
	function wireMenus() {
		document.querySelectorAll('button[aria-haspopup="menu"]').forEach((btn) => {
			const menu =
				btn.parentElement.querySelector('[role="menu"]') ||
				document.getElementById(btn.getAttribute("aria-controls") || "");
			// Build menu if it isn't in the static DOM (we ship the markup inline below the button)
			let panel = btn.nextElementSibling;
			if (!panel || panel.getAttribute("role") !== "menu") {
				panel = document.createElement("div");
				panel.setAttribute("role", "menu");
				// Positioned via JS (fixed) against the button's rect so it always
				// right-aligns directly under the Account trigger, exactly like the
				// original Headless UI <MenuItems anchor="bottom end">.
				panel.className =
					"fixed z-50 min-w-38 rounded-lg bg-white/75 p-1 shadow-lg outline outline-gray-950/5 backdrop-blur-sm dark:bg-gray-950/75 dark:outline-white/10";
				panel.innerHTML = [
					["Settings", "#"],
					["Support", "#"],
					["Sign out", "#"],
				]
					.map(
						([t, h]) =>
							`<a role="menuitem" tabindex="-1" href="${h}" class="block rounded-md px-3 py-0.5 text-sm/7 text-gray-950 focus:outline-none data-focus:bg-blue-500 data-focus:text-white dark:text-white">${t}</a>`,
					)
					.join("");
				panel.hidden = true;
				document.body.appendChild(panel);
			}

			const position = () => {
				const r = btn.getBoundingClientRect();
				// bottom-end: panel's right edge aligns with the button's right edge,
				// top of panel sits just below the button (mt-2 ~= 8px).
				panel.style.top = `${Math.round(r.bottom + 8)}px`;
				// use right offset from viewport's right edge for true right-alignment
				panel.style.right = `${Math.round(window.innerWidth - r.right)}px`;
				panel.style.left = "auto";
			};
			const open = () => {
				position();
				panel.hidden = false;
				btn.setAttribute("aria-expanded", "true");
			};
			const close = () => {
				panel.hidden = true;
				btn.setAttribute("aria-expanded", "false");
			};
			window.addEventListener("resize", () => {
				if (!panel.hidden) position();
			});
			window.addEventListener(
				"scroll",
				() => {
					if (!panel.hidden) position();
				},
				{ passive: true },
			);
			btn.addEventListener("click", (e) => {
				e.stopPropagation();
				panel.hidden ? open() : close();
			});
			// hover highlight on menu items
			panel.querySelectorAll('[role="menuitem"]').forEach((mi) => {
				mi.addEventListener("pointerenter", () =>
					mi.setAttribute("data-focus", ""),
				);
				mi.addEventListener("pointerleave", () =>
					mi.removeAttribute("data-focus"),
				);
			});
			document.addEventListener("click", (e) => {
				if (!panel.hidden && !panel.contains(e.target) && e.target !== btn)
					close();
			});
			document.addEventListener("keydown", (e) => {
				if (e.key === "Escape") close();
			});
		});
	}

	/* ---------- Table-of-contents scroll-spy ---------- */
	function wireTOC() {
		const tocLinks = Array.from(
			document.querySelectorAll('nav a[href^="#"]'),
		).filter((a) =>
			document.getElementById(
				decodeURIComponent(a.getAttribute("href").slice(1)),
			),
		);
		if (!tocLinks.length) return;
		const map = new Map();
		tocLinks.forEach((a) => {
			const id = decodeURIComponent(a.getAttribute("href").slice(1));
			const sec = document.getElementById(id);
			if (sec) map.set(sec, a);
		});
		const sections = Array.from(map.keys());
		const setCurrent = (link) => {
			tocLinks.forEach((a) => a.removeAttribute("aria-current"));
			if (link) link.setAttribute("aria-current", "location");
		};
		// Scroll-position based: highlight the last heading whose top is above a band
		// near the top of the viewport (mirrors the original scroll-spy feel).
		const onScroll = () => {
			const offset = 120; // matches scroll-pt-16 + breathing room
			let current = sections[0];
			for (const sec of sections) {
				if (sec.getBoundingClientRect().top - offset <= 0) current = sec;
				else break;
			}
			setCurrent(map.get(current));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
	}

	/* ---------- Lesson video: dock to mini-player when scrolled off-screen ---------- */
	function wireVideo() {
		const video = document.getElementById("video");
		if (!video) return;
		const wrapper = video.closest(".group");
		if (!wrapper) return;
		let playing = false;
		video.addEventListener("play", () => {
			playing = true;
			video.setAttribute("data-playing", "");
		});
		video.addEventListener("pause", () => {
			playing = false;
			video.removeAttribute("data-playing");
		});
		const io = new IntersectionObserver(
			([e]) => {
				if (e.intersectionRatio < 0.1)
					wrapper.setAttribute("data-offscreen", "");
				else wrapper.removeAttribute("data-offscreen");
			},
			{ threshold: [0, 0.1] },
		);
		io.observe(wrapper);
	}

	/* ---------- Entrance reveal (subtle, matches original's fade-in feel) ---------- */
	function wireReveal() {
		const targets = document.querySelectorAll("[data-reveal]");
		if (!targets.length) return;
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.setAttribute("data-revealed", "");
						io.unobserve(e.target);
					}
				});
			},
			{ rootMargin: "0px 0px -10% 0px" },
		);
		targets.forEach((t) => io.observe(t));
	}

	/* ---------- Mobile sidebar drawer (below xl) ---------- */
	// Below the xl breakpoint the course nav <aside> is hidden (max-xl:hidden) and the
	// top-bar button is the only way to reach it. Open the aside as an overlay drawer.
	function wireMobileDrawer() {
		const aside = document.querySelector("aside");
		if (!aside) return;
		const btn = document
			.querySelector("button.xl\\:hidden svg[viewBox='0 0 16 14']")
			?.closest("button");
		if (!btn) return;

		const style = document.createElement("style");
		style.textContent = `
      body.nav-open aside { display:block !important; z-index:50;
        background:#fff; box-shadow:0 10px 40px rgba(0,0,0,.18); }
      body.nav-open aside .max-xl\\:hidden { display:block !important; }
      @media (prefers-color-scheme:dark){ body.nav-open aside{ background:#030712; } }
      .nav-backdrop{ position:fixed; inset:0; z-index:40; background:rgba(0,0,0,.4);
        opacity:0; transition:opacity .2s ease; }
      body.nav-open .nav-backdrop{ opacity:1; }`;
		document.head.appendChild(style);

		const backdrop = document.createElement("div");
		backdrop.className = "nav-backdrop";
		backdrop.hidden = true;
		document.body.appendChild(backdrop);

		const open = () => {
			backdrop.hidden = false;
			document.body.classList.add("nav-open");
		};
		const close = () => {
			document.body.classList.remove("nav-open");
			backdrop.hidden = true;
		};

		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			open();
		});
		backdrop.addEventListener("click", close);
		aside.addEventListener("click", (e) => {
			if (e.target.closest("a")) close();
		});
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
		// If the viewport grows past xl, the aside is shown normally again — drop drawer state.
		window.addEventListener("resize", () => {
			if (window.innerWidth >= 1280) close();
		});
	}

	function init() {
		wireInteractiveStates();
		wireSidebar();
		wireMobileDrawer();
		wireMenus();
		wireTOC();
		wireVideo();
		wireReveal();
	}

	if (document.readyState === "loading")
		document.addEventListener("DOMContentLoaded", init);
	else init();
})();
