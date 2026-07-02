// Catalyst clone — vanilla-JS layer reimplementing the Next.js + Headless UI behaviours:
// theme toggle, mobile slide-in sidebar, account dropdown, team-switcher dropdown.
(function () {
	"use strict";

	/* ----------------------------------------------------------- theme ---- */
	const root = document.documentElement;
	function setTheme(t) {
		if (t === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
		try {
			localStorage.setItem("catalyst-theme", t);
		} catch (e) {}
	}
	window.__catalystToggleTheme = function () {
		setTheme(root.classList.contains("dark") ? "light" : "dark");
	};

	/* ------------------------------------------------- mobile sidebar ----- */
	const mobile = document.querySelector("[data-mobile-sidebar]");
	function openSidebar() {
		if (!mobile) return;
		mobile.classList.remove("hidden");
		requestAnimationFrame(() => {
			const bd = mobile.querySelector("[data-backdrop]");
			const pn = mobile.querySelector("[data-panel-inner]");
			if (bd) bd.classList.remove("opacity-0");
			if (pn) pn.classList.remove("-translate-x-[110%]");
		});
		document.body.style.overflow = "hidden";
	}
	function closeSidebar() {
		if (!mobile) return;
		const bd = mobile.querySelector("[data-backdrop]");
		const pn = mobile.querySelector("[data-panel-inner]");
		if (bd) bd.classList.add("opacity-0");
		if (pn) pn.classList.add("-translate-x-[110%]");
		document.body.style.overflow = "";
		setTimeout(() => mobile.classList.add("hidden"), 300);
	}
	document
		.querySelectorAll("[data-open-sidebar]")
		.forEach((b) => b.addEventListener("click", openSidebar));
	document
		.querySelectorAll("[data-close-sidebar]")
		.forEach((b) => b.addEventListener("click", closeSidebar));
	if (mobile) {
		const bd = mobile.querySelector("[data-backdrop]");
		if (bd) bd.addEventListener("click", closeSidebar);
	}

	/* ---------------------------------------------------- dropdown menus -- */
	const ITEM =
		"rounded-lg px-3.5 py-2.5 text-left text-sm/6 text-zinc-950 " +
		"data-focus:bg-blue-500 data-focus:text-white dark:text-white " +
		"sm:px-3 sm:py-1.5 flex items-center gap-3";
	function icon(d, vb) {
		return (
			'<svg viewBox="' +
			(vb || "0 0 16 16") +
			'" fill="currentColor" aria-hidden="true" class="size-4 shrink-0 text-zinc-500 group-data-focus:text-white dark:text-zinc-400">' +
			d +
			"</svg>"
		);
	}
	function divider() {
		return '<div class="col-span-full mx-3.5 my-1 h-px border-0 bg-zinc-950/5 sm:mx-3 dark:bg-white/10" role="separator"></div>';
	}
	function menuItem(label, href, iconSvg, current) {
		const check = current
			? '<svg viewBox="0 0 16 16" fill="currentColor" class="ml-auto size-4 text-zinc-500 group-data-focus:text-white dark:text-zinc-400" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>'
			: "";
		return (
			'<a href="' +
			(href || "#") +
			'" role="menuitem" tabindex="-1" class="group ' +
			ITEM +
			'">' +
			(iconSvg || "") +
			'<span class="truncate">' +
			label +
			"</span>" +
			check +
			"</a>"
		);
	}

	const ACCOUNT_MENU = [
		menuItem(
			"My account",
			"#",
			icon(
				'<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>',
			),
		),
		menuItem(
			"Privacy policy",
			"#",
			icon(
				'<path fill-rule="evenodd" d="M8 1a.75.75 0 0 1 .75.75v.51c1.5.2 2.86.85 3.95 1.82a.75.75 0 0 1-1 1.12A6 6 0 1 0 14 8a.75.75 0 0 1 1.5 0A7.5 7.5 0 1 1 8 .5.75.75 0 0 1 8 1Z" clip-rule="evenodd"/>',
			),
		),
		menuItem(
			"Share feedback",
			"#",
			icon(
				'<path d="M2 4.75A2.75 2.75 0 0 1 4.75 2h6.5A2.75 2.75 0 0 1 14 4.75v4.5A2.75 2.75 0 0 1 11.25 12H8.06l-2.6 2.6A.75.75 0 0 1 4 14.06V12h.25A2.75 2.75 0 0 1 2 9.25v-4.5Z"/>',
			),
		),
		"divider",
		menuItem(
			"Sign out",
			"login.html",
			icon(
				'<path fill-rule="evenodd" d="M10 2.75A.75.75 0 0 0 9.25 2h-4.5A2.75 2.75 0 0 0 2 4.75v6.5A2.75 2.75 0 0 0 4.75 14h4.5a.75.75 0 0 0 0-1.5h-4.5c-.69 0-1.25-.56-1.25-1.25v-6.5c0-.69.56-1.25 1.25-1.25h4.5A.75.75 0 0 0 10 2.75Zm2.97 2.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l.97-.97H7.25a.75.75 0 0 1 0-1.5h6.69l-.97-.97a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/>',
			),
		),
	];

	function avatar(src, label, square) {
		const r = square
			? "rounded-md *:rounded-md"
			: "rounded-full *:rounded-full";
		if (src)
			return (
				'<span data-slot="avatar" class="inline-grid size-5 shrink-0 ' +
				r +
				' outline -outline-offset-1 outline-black/10 dark:outline-white/10"><img class="size-full" src="' +
				src +
				'" alt=""></span>'
			);
		return (
			'<span data-slot="avatar" class="inline-grid size-5 shrink-0 place-items-center rounded-md bg-zinc-200 text-[0.6rem] font-medium text-zinc-700 outline -outline-offset-1 outline-black/10 dark:bg-zinc-700 dark:text-zinc-200 dark:outline-white/10">' +
			label +
			"</span>"
		);
	}

	function TEAM_MENU(rel) {
		return [
			menuItem(
				"Settings",
				rel + "settings.html",
				icon(
					'<path fill-rule="evenodd" d="M6.455 1.45A.5.5 0 0 1 6.952 1h2.096a.5.5 0 0 1 .497.45l.186 1.858a4.996 4.996 0 0 1 1.466.848l1.703-.769a.5.5 0 0 1 .639.206l1.047 1.814a.5.5 0 0 1-.14.656l-1.517 1.09a5.026 5.026 0 0 1 0 1.694l1.516 1.09a.5.5 0 0 1 .141.656l-1.047 1.814a.5.5 0 0 1-.639.206l-1.703-.768c-.433.36-.928.649-1.466.847l-.186 1.858a.5.5 0 0 1-.497.45H6.952a.5.5 0 0 1-.497-.45l-.186-1.858a4.993 4.993 0 0 1-1.466-.847l-1.703.768a.5.5 0 0 1-.639-.206l-1.047-1.814a.5.5 0 0 1 .14-.656l1.517-1.09a5.033 5.033 0 0 1 0-1.694l-1.516-1.09a.5.5 0 0 1-.141-.656L3.96 3.593a.5.5 0 0 1 .639-.206l1.703.769c.433-.36.928-.65 1.466-.848l.186-1.857ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>',
				),
			),
			"divider",
			menuItem(
				"Catalyst",
				"#",
				avatar(rel + "assets/teams/catalyst.svg", "C", true),
				true,
			),
			menuItem("Big Events", "#", avatar(null, "BE", true)),
			"divider",
			menuItem(
				"New team…",
				"#",
				icon(
					'<path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"/>',
				),
			),
		];
	}

	let openMenu = null;
	function closeAll() {
		if (openMenu) {
			openMenu.remove();
			openMenu = null;
		}
	}
	function buildMenu(items, width) {
		const m = document.createElement("div");
		m.setAttribute("role", "menu");
		m.className =
			"absolute z-50 isolate w-max rounded-xl p-1 outline outline-transparent " +
			"bg-white/95 shadow-lg ring-1 ring-zinc-950/10 backdrop-blur-xl " +
			"dark:bg-zinc-800/95 dark:ring-white/10 transition duration-100 ease-out " +
			"opacity-0 scale-95 origin-top";
		m.style.minWidth = (width || 224) + "px";
		m.innerHTML = items.map((i) => (i === "divider" ? divider() : i)).join("");
		// focus highlight emulation: hover/keyboard sets data-focus
		m.querySelectorAll('[role="menuitem"]').forEach((it) => {
			it.addEventListener("mouseenter", () => {
				m.querySelectorAll("[data-focus]").forEach((x) =>
					x.removeAttribute("data-focus"),
				);
				it.setAttribute("data-focus", "");
			});
			it.addEventListener("mouseleave", () => it.removeAttribute("data-focus"));
		});
		return m;
	}
	function placeMenu(menu, trigger, anchor) {
		document.body.appendChild(menu);
		const r = trigger.getBoundingClientRect();
		const mr = menu.getBoundingClientRect();
		let top,
			left = r.left + window.scrollX;
		if (anchor === "top") {
			top = r.top + window.scrollY - mr.height - 8;
			menu.classList.remove("origin-top");
			menu.classList.add("origin-bottom");
		} else {
			top = r.bottom + window.scrollY + 8;
		}
		// clamp width to trigger
		menu.style.minWidth =
			Math.max(r.width, parseInt(menu.style.minWidth)) + "px";
		menu.style.top = top + "px";
		menu.style.left = left + "px";
		requestAnimationFrame(() => {
			menu.classList.remove("opacity-0", "scale-95");
		});
	}
	function wireTrigger(trigger, items, anchor) {
		if (!trigger) return;
		trigger.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (openMenu && openMenu.__owner === trigger) {
				closeAll();
				return;
			}
			closeAll();
			const menu = buildMenu(items);
			menu.__owner = trigger;
			placeMenu(menu, trigger, anchor);
			openMenu = menu;
		});
	}
	document.addEventListener("click", (e) => {
		if (openMenu && !openMenu.contains(e.target)) closeAll();
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeAll();
			closeSidebar();
		}
	});
	window.addEventListener("resize", closeAll);

	/* ---- Headless UI data-attribute shim: data-hover / data-active / data-focus ---- */
	// Tailwind v4 data-hover:* / data-active:* utilities generate CSS that checks
	// for [data-hover] / [data-active] attributes on the element.  In the original
	// Next.js + Headless UI app those attributes are set by Headless UI on
	// pointer-enter/leave and press.  Here we replicate that in vanilla JS so that
	// nav-item icon fills, background tints, and button press states all work.
	document.querySelectorAll('[class*="data-hover:"]').forEach(function (el) {
		el.addEventListener("mouseenter", function () {
			el.setAttribute("data-hover", "");
		});
		el.addEventListener("mouseleave", function () {
			el.removeAttribute("data-hover");
		});
	});
	document.querySelectorAll('[class*="data-active:"]').forEach(function (el) {
		el.addEventListener("mousedown", function () {
			el.setAttribute("data-active", "");
		});
		el.addEventListener("mouseup", function () {
			el.removeAttribute("data-active");
		});
		el.addEventListener("mouseleave", function () {
			el.removeAttribute("data-active");
		});
	});

	// rel path: index/auth at root -> "", detail pages -> "../"
	const rel = document.querySelector('link[href*="assets/css/catalyst.css"]');
	const relPath = rel
		? rel.getAttribute("href").replace("assets/css/catalyst.css", "")
		: "";

	// account triggers (sidebar footer + mobile header) — both contain erica@example.com
	document.querySelectorAll("button").forEach((b) => {
		const txt = b.textContent || "";
		if (
			txt.includes("erica@example.com") ||
			b.querySelector('img[src*="erica"]')
		) {
			wireTrigger(
				b,
				ACCOUNT_MENU.map((i) =>
					i === "divider"
						? "divider"
						: i.replace(
								'href="login.html"',
								'href="' + relPath + 'login.html"',
							),
				),
				"top",
			);
		} else if (txt.includes("Catalyst") && b.closest("[data-slot]") === null) {
			wireTrigger(b, TEAM_MENU(relPath), "bottom");
		}
	});
})();
