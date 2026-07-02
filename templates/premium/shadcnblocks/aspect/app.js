(function () {
	"use strict";
	var root = document.documentElement;

	/* ---------- Theme toggle ---------- */
	function setTheme(dark) {
		root.classList.toggle("dark", dark);
		root.style.colorScheme = dark ? "dark" : "light";
		try {
			localStorage.setItem("theme", dark ? "dark" : "light");
		} catch (e) {}
	}
	document.addEventListener("click", function (e) {
		var btn = e.target.closest("button");
		if (!btn) return;
		// theme toggle button: contains sun/moon lucide icon or "Toggle theme" sr text
		if (
			btn.querySelector(".lucide-sun, .lucide-moon") ||
			/toggle theme/i.test(btn.textContent)
		) {
			// only treat as theme toggle if it's the round size-9 control (not feature icons)
			if (
				btn.classList.contains("size-9") ||
				btn.querySelector(".lucide-sun")
			) {
				setTheme(!root.classList.contains("dark"));
				e.preventDefault();
				return;
			}
		}
	});

	/* ---------- Banner dismiss ---------- */
	document.addEventListener("click", function (e) {
		var c = e.target.closest('[aria-label="Close banner"]');
		if (c) {
			var node = c;
			for (var i = 0; i < 6 && node.parentElement; i++) {
				node = node.parentElement;
				if (
					/banner/i.test(node.className) ||
					node.getAttribute("role") === "banner"
				)
					break;
			}
			(node || c.parentElement).style.display = "none";
		}
	});

	/* ---------- Accordion (radix-style single) ---------- */
	(function () {
		// Collect all accordion region elements and set initial state
		// Regions with data-state="closed" start hidden (height 0)
		document
			.querySelectorAll("[role='region'][data-state='closed']")
			.forEach(function (region) {
				// Manage height via JS so we can animate open/close smoothly
				region.style.height = "0";
				region.style.overflow = "hidden";
			});

		document
			.querySelectorAll("button[aria-controls][aria-expanded]")
			.forEach(function (btn) {
				if (btn.closest("nav") || /product/i.test(btn.textContent)) return;
				var region = document.getElementById(btn.getAttribute("aria-controls"));
				if (!region || btn.dataset.bound) return;
				btn.dataset.bound = "1";
				btn.addEventListener("click", function () {
					var open = btn.getAttribute("aria-expanded") === "true";
					var groupRoot = findGroupRoot(btn);
					if (groupRoot) {
						groupRoot
							.querySelectorAll('button[aria-controls][aria-expanded="true"]')
							.forEach(function (other) {
								if (other !== btn) closeItem(other);
							});
					}
					open ? closeItem(btn) : openItem(btn);
				});
			});

		function findGroupRoot(btn) {
			var n = btn;
			for (var i = 0; i < 8 && n.parentElement; i++) {
				n = n.parentElement;
				if (
					n.querySelectorAll("button[aria-controls][aria-expanded]").length > 1
				)
					return n;
			}
			return null;
		}

		function setState(el, s) {
			if (el) el.setAttribute("data-state", s);
		}

		function openItem(btn) {
			btn.setAttribute("aria-expanded", "true");
			setState(btn, "open");
			var region = document.getElementById(btn.getAttribute("aria-controls"));
			if (region) {
				// Measure natural height
				region.style.height = "auto";
				var h = region.scrollHeight;
				region.style.height = "0";
				region.style.overflow = "hidden";
				// Set Radix CSS variable so keyframe animation has a valid endpoint
				region.style.setProperty("--radix-accordion-content-height", h + "px");
				region.style.setProperty(
					"--radix-collapsible-content-height",
					h + "px",
				);
				// Apply JS transition as fallback
				region.style.transition = "height 0.2s ease-out";
				// Trigger reflow so height:0 is committed before animating
				void region.offsetWidth;
				setState(region, "open");
				region.style.height = h + "px";
				// After transition ends, switch to auto so content can reflow
				setTimeout(function () {
					region.style.height = "auto";
					region.style.overflow = "";
					region.style.transition = "";
				}, 220);
			}
			setState(btn.closest("h3"), "open");
			var item = btn.closest('div[data-orientation="vertical"]');
			setState(item, "open");
		}

		function closeItem(btn) {
			btn.setAttribute("aria-expanded", "false");
			setState(btn, "closed");
			var region = document.getElementById(btn.getAttribute("aria-controls"));
			if (region) {
				var h = region.scrollHeight;
				region.style.setProperty("--radix-accordion-content-height", h + "px");
				region.style.setProperty(
					"--radix-collapsible-content-height",
					h + "px",
				);
				region.style.height = h + "px";
				region.style.overflow = "hidden";
				region.style.transition = "height 0.2s ease-out";
				void region.offsetWidth;
				setState(region, "closed");
				region.style.height = "0";
			}
			setState(btn.closest("h3"), "closed");
			var item = btn.closest('div[data-orientation="vertical"]');
			setState(item, "closed");
		}
	})();

	/* ---------- Pricing billing toggle (monthly / annual) ---------- */
	document
		.querySelectorAll('[aria-label*="billing" i], [role="switch"]')
		.forEach(function (sw) {
			var annual =
				sw.getAttribute("aria-checked") === "true" ||
				sw.getAttribute("data-state") === "checked";
			function render() {
				document
					.querySelectorAll("[data-price-monthly]")
					.forEach(function (el) {
						el.textContent = annual
							? el.getAttribute("data-price-annual")
							: el.getAttribute("data-price-monthly");
					});
				document.querySelectorAll("[data-period]").forEach(function (el) {
					el.textContent = annual ? "per user/annum" : "per user/month";
				});
				sw.setAttribute("aria-checked", annual ? "true" : "false");
				sw.setAttribute("data-state", annual ? "checked" : "unchecked");
				var thumb = sw.querySelector("span");
				if (thumb)
					thumb.setAttribute("data-state", annual ? "checked" : "unchecked");
			}
			sw.addEventListener("click", function () {
				annual = !annual;
				render();
			});
		});

	/* ---------- Product mega-menu dropdown ---------- */
	(function () {
		var menu = document.querySelector("[data-product-menu]");
		if (!menu) return;
		var btn = [...document.querySelectorAll("nav button")].find(function (b) {
			return /product/i.test(b.textContent);
		});
		if (!btn) return;
		var open = false,
			hideTimer = null;
		var holder = menu.parentElement;
		if (holder) {
			holder.style.left = "";
			holder.style.right = "";
		}
		menu.style.position = "absolute";
		menu.style.minWidth = "400px";
		menu.style.zIndex = "50";
		function toggle(v) {
			open = v;
			btn.setAttribute("data-state", v ? "open" : "closed");
			btn.setAttribute("aria-expanded", v);
			menu.style.display = v ? "block" : "none";
			if (v && holder) {
				var br = btn.getBoundingClientRect(),
					hr = holder.parentElement.getBoundingClientRect();
				holder.style.left = br.left - hr.left + "px";
				holder.style.justifyContent = "flex-start";
			}
		}
		function show() {
			clearTimeout(hideTimer);
			toggle(true);
		}
		function scheduleHide() {
			hideTimer = setTimeout(function () {
				toggle(false);
			}, 180);
		}
		btn.addEventListener("mouseenter", show);
		btn.addEventListener("click", function (e) {
			e.preventDefault();
			open ? toggle(false) : show();
		});
		btn.addEventListener("mouseleave", scheduleHide);
		menu.addEventListener("mouseenter", show);
		menu.addEventListener("mouseleave", scheduleHide);
	})();

	/* ---------- Feature tabs ---------- */
	document.querySelectorAll('[role="tablist"]').forEach(function (list) {
		var tabs = list.querySelectorAll('[role="tab"]');
		tabs.forEach(function (tab) {
			tab.addEventListener("click", function () {
				tabs.forEach(function (t) {
					var sel = t === tab;
					t.setAttribute("aria-selected", sel);
					t.setAttribute("data-state", sel ? "active" : "inactive");
					var panel = document.getElementById(t.getAttribute("aria-controls"));
					if (panel) {
						panel.hidden = !sel;
						panel.setAttribute("data-state", sel ? "active" : "inactive");
					}
				});
			});
		});
	});

	/* ---------- Mobile menu (hamburger) ---------- */
	(function () {
		var header = document.querySelector("header");
		if (!header) return;

		// Find the hamburger button: has "Open main menu" in its sr-only text
		var trigger = null;
		header.querySelectorAll("button").forEach(function (b) {
			if (trigger) return;
			var sr = b.querySelector(".sr-only");
			if (sr && /main menu/i.test(sr.textContent)) trigger = b;
		});
		// Also match by data-mobile-trigger if present
		if (!trigger) trigger = header.querySelector("[data-mobile-trigger]");

		// Find the mobile nav panel: the element that slides in from top
		// It has -translate-y-full and opacity-0 when closed
		var panel =
			header.querySelector("[data-mobile-menu]") ||
			header.querySelector(".-translate-y-full.opacity-0");

		if (!trigger || !panel) return;

		var isOpen = false;

		trigger.addEventListener("click", function (e) {
			e.stopPropagation();
			isOpen = !isOpen;
			if (isOpen) {
				panel.classList.remove(
					"pointer-events-none",
					"-translate-y-full",
					"opacity-0",
				);
				trigger.setAttribute("aria-expanded", "true");
			} else {
				panel.classList.add(
					"pointer-events-none",
					"-translate-y-full",
					"opacity-0",
				);
				trigger.setAttribute("aria-expanded", "false");
			}
		});

		// Close on outside click
		document.addEventListener("click", function (e) {
			if (isOpen && !header.contains(e.target)) {
				isOpen = false;
				panel.classList.add(
					"pointer-events-none",
					"-translate-y-full",
					"opacity-0",
				);
				trigger.setAttribute("aria-expanded", "false");
			}
		});

		// Mobile sub-menu: Product accordion inside mobile nav
		panel
			.querySelectorAll('button[aria-label*="Product" i]')
			.forEach(function (btn) {
				btn.addEventListener("click", function () {
					var sub = btn.nextElementSibling;
					if (!sub) return;
					var expanded = btn.getAttribute("aria-expanded") === "true";
					btn.setAttribute("aria-expanded", String(!expanded));
					var chevron = btn.querySelector(".lucide-chevron-right");
					if (expanded) {
						sub.style.maxHeight = "0";
						sub.style.opacity = "0";
						if (chevron) chevron.style.transform = "";
					} else {
						sub.style.maxHeight = sub.scrollHeight + "px";
						sub.style.opacity = "1";
						if (chevron) chevron.style.transform = "rotate(90deg)";
					}
				});
			});
	})();

	/* ---------- Scroll reveal (subtle, self-healing) ----------
	   Reveal-on-enter, but never leave content invisible: a load fallback
	   forces everything visible so the resting page is always faithful. */
	if ("IntersectionObserver" in window) {
		var revealEls = [];
		document.querySelectorAll("[data-reveal]").forEach(function (el) {
			el.style.opacity = "0";
			el.style.transform = "translateY(20px)";
			el.style.transition =
				"opacity .6s cubic-bezier(0,0,.2,1), transform .6s cubic-bezier(0,0,.2,1)";
			revealEls.push(el);
		});
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (en) {
					if (en.isIntersecting) {
						en.target.style.opacity = "1";
						en.target.style.transform = "none";
						io.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.05 },
		);
		revealEls.forEach(function (el) {
			io.observe(el);
		});
		// safety: anything still hidden after 1.5s becomes visible
		setTimeout(function () {
			revealEls.forEach(function (el) {
				el.style.opacity = "1";
				el.style.transform = "none";
			});
		}, 1500);
	}
})();
