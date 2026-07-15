
(() => {
	"use strict";


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


	function wireSidebar() {
		const group = document.querySelector(".group");
		if (!group) return;
		const buttons = document.querySelectorAll("button");
		buttons.forEach((btn) => {
			const svg = btn.querySelector('svg[viewBox="0 0 16 14"]');
			if (!svg) return;
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


	function wireMenus() {
		document.querySelectorAll('button[aria-haspopup="menu"]').forEach((btn) => {
			const menu =
				btn.parentElement.querySelector('[role="menu"]') ||
				document.getElementById(btn.getAttribute("aria-controls") || "");
			let panel = btn.nextElementSibling;
			if (!panel || panel.getAttribute("role") !== "menu") {
				panel = document.createElement("div");
				panel.setAttribute("role", "menu");
				panel.className =
					"fixed z-50 min-w-38 rounded-lg bg-white/75 shadow-lg outline outline-gray-950/5 backdrop-blur-sm dark:bg-gray-950/75 dark:outline-white/10";
				panel.style.padding = "2px";
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
				panel.style.top = `${Math.round(r.bottom + 4)}px`;
				panel.style.right = `${Math.round(window.innerWidth - r.right - 4)}px`;
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
		const onScroll = () => {
			const offset = 120;
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


	function wireMobileDrawer() {
		const aside = document.querySelector("aside");
		if (!aside) return;
		const btn = document
			.querySelector("button.xl\\:hidden svg[viewBox='0 0 16 14']")
			?.closest("button");
		if (!btn) return;

		const style = document.createElement("style");
		style.textContent = `
      body.nav-open aside { display:block !important; z-index:50; width:320px;
        background:#fff; }
      body.nav-open aside .max-xl\\:hidden { display:block !important; }
      body.nav-open aside nav > .mt-3 { margin-top:16px; }
      @media (prefers-color-scheme:dark){ body.nav-open aside{ background:#030712; } }
      .nav-backdrop{ position:fixed; inset:0; z-index:40; background:rgba(3,7,18,.25);
        opacity:0; transition:opacity .2s ease; }
      body.nav-open .nav-backdrop{ opacity:1; }`;
		document.head.appendChild(style);

		const backdrop = document.createElement("div");
		backdrop.className = "nav-backdrop";
		backdrop.hidden = true;
		document.body.appendChild(backdrop);
		const parent = aside.parentElement;
		const next = aside.nextSibling;

		const open = () => {
			backdrop.hidden = false;
			document.body.appendChild(aside);
			aside.setAttribute("role", "dialog");
			aside.setAttribute("aria-modal", "true");
			document.body.classList.add("nav-open");
		};
		const close = () => {
			document.body.classList.remove("nav-open");
			backdrop.hidden = true;
			aside.removeAttribute("role");
			aside.removeAttribute("aria-modal");
			parent.insertBefore(aside, next);
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
		window.addEventListener("resize", () => {
			if (window.innerWidth >= 1280) close();
		});
	}

	function wireMobileNavigation() {
		const button = document.querySelector("button.lg\\:hidden");
		if (!button) return;

		const portal = document.createElement("div");
		portal.hidden = true;
		portal.innerHTML = `<div data-mobile-nav-backdrop></div><div data-mobile-nav-panel><button type="button" aria-label="Close navigation" data-mobile-nav-close>×</button><nav><a href="index.html">Course</a><a href="interviews.html">Interviews</a><a href="resources.html">Resources</a><span>Account</span><a href="#">Settings</a><a href="#">Support</a><a href="#">Sign out</a></nav></div>`;
		document.body.appendChild(portal);

		const style = document.createElement("style");
		style.textContent = `
      [data-mobile-nav-backdrop]{position:fixed;inset:0;z-index:40;background:rgba(3,7,18,.25)}
      [data-mobile-nav-panel]{position:fixed;inset-block:0;right:0;z-index:50;width:288px;background:#fff;color:#030712}
      [data-mobile-nav-close]{position:absolute;top:12px;right:16px;display:grid;width:32px;height:32px;place-items:center;border:0;border-radius:6px;background:#f3f4f6;color:#374151;font:20px/1 sans-serif}
      [data-mobile-nav-panel] nav{display:flex;flex-direction:column;padding:60px 40px 32px;font-size:16px;line-height:24px}
      [data-mobile-nav-panel] nav a{color:inherit;text-decoration:none}
      [data-mobile-nav-panel] nav a:nth-child(-n+3){margin-bottom:24px}
      [data-mobile-nav-panel] nav span{margin-top:16px;margin-bottom:24px;color:#6b7280;font-size:14px;line-height:20px}
      [data-mobile-nav-panel] nav a:nth-last-child(-n+3){margin-bottom:20px;font-size:14px;font-weight:600}
      @media(prefers-color-scheme:dark){[data-mobile-nav-panel]{background:#030712;color:#fff}[data-mobile-nav-close]{background:#111827;color:#d1d5db}}`;
		document.head.appendChild(style);

		const open = () => {
			portal.setAttribute("data-headlessui-portal", "");
			portal.querySelector("[data-mobile-nav-panel]").setAttribute("role", "dialog");
			portal.querySelector("[data-mobile-nav-panel]").setAttribute("aria-modal", "true");
			portal.hidden = false;
			button.setAttribute("aria-expanded", "true");
		};
		const close = () => {
			portal.hidden = true;
			portal.removeAttribute("data-headlessui-portal");
			portal.querySelector("[data-mobile-nav-panel]").removeAttribute("role");
			portal.querySelector("[data-mobile-nav-panel]").removeAttribute("aria-modal");
			button.setAttribute("aria-expanded", "false");
		};

		button.addEventListener("click", open);
		portal.querySelector("[data-mobile-nav-backdrop]").addEventListener("click", close);
		portal.querySelector("[data-mobile-nav-close]").addEventListener("click", close);
		portal.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") close();
		});
		window.addEventListener("resize", () => {
			if (window.innerWidth >= 1024) close();
		});
	}

	function init() {
		wireInteractiveStates();
		wireSidebar();
		wireMobileDrawer();
		wireMobileNavigation();
		wireMenus();
		wireTOC();
		wireVideo();
		wireReveal();
	}

	if (document.readyState === "loading")
		document.addEventListener("DOMContentLoaded", init);
	else init();
})();
