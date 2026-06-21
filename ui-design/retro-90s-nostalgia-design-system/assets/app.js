/* =============================================================================
   WEBMASTER 95 — interactive behaviors
   Vanilla JS, no dependencies. Everything degrades gracefully and respects
   prefers-reduced-motion (counters snap to final value instead of animating).
   ========================================================================== */
(function () {
	"use strict";

	var reduceMotion =
		window.matchMedia &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	var $ = function (sel, ctx) {
		return (ctx || document).querySelector(sel);
	};
	var $$ = function (sel, ctx) {
		return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
	};

	/* ----------------------------------------------------------- LIVE CLOCK */
	function pad(n) {
		return (n < 10 ? "0" : "") + n;
	}
	function tick() {
		var d = new Date();
		var h = d.getHours();
		var ampm = h >= 12 ? "PM" : "AM";
		h = h % 12;
		if (h === 0) h = 12;
		var str = h + ":" + pad(d.getMinutes()) + " " + ampm;
		$$("#topClock, #taskClock").forEach(function (el) {
			el.textContent = str;
		});
	}
	tick();
	setInterval(tick, 1000 * 15);

	/* -------------------------------------------------- DESIGN TOKEN GRID */
	var TOKENS = [
		{ name: "background", hex: "#C0C0C0", fg: "#000" },
		{ name: "foreground", hex: "#000000", fg: "#fff" },
		{ name: "muted", hex: "#808080", fg: "#fff" },
		{ name: "accent", hex: "#0000FF", fg: "#fff" },
		{ name: "secondary", hex: "#FF0000", fg: "#fff" },
		{ name: "tertiary", hex: "#FFFF00", fg: "#000" },
		{ name: "success", hex: "#00FF00", fg: "#000" },
		{ name: "successDark", hex: "#00AA00", fg: "#fff" },
		{ name: "titleBar", hex: "#000080", fg: "#fff" },
		{ name: "titleBarEnd", hex: "#1084D0", fg: "#fff" },
		{ name: "panelYellow", hex: "#FFFFCC", fg: "#000" },
		{ name: "visitedLink", hex: "#800080", fg: "#fff" },
		{ name: "teal", hex: "#008080", fg: "#fff" },
		{ name: "borderLight", hex: "#FFFFFF", fg: "#000" },
		{ name: "borderDark", hex: "#808080", fg: "#fff" },
		{ name: "rowOdd", hex: "#E8E8E8", fg: "#000" },
	];
	var tokenGrid = $("#tokenGrid");
	if (tokenGrid) {
		TOKENS.forEach(function (t) {
			var btn = document.createElement("button");
			btn.type = "button";
			btn.className = "token";
			btn.setAttribute("title", "Click to copy " + t.hex);
			btn.setAttribute("aria-label", t.name + " " + t.hex + " — click to copy");
			btn.innerHTML =
				'<span class="token__chip" style="background:' +
				t.hex +
				'"></span>' +
				'<span class="token__meta"><span class="token__name">' +
				t.name +
				'</span><br><span class="token__hex">' +
				t.hex +
				"</span></span>";
			btn.addEventListener("click", function () {
				copyText(t.hex);
				var hexEl = btn.querySelector(".token__hex");
				var old = hexEl.textContent;
				hexEl.textContent = "COPIED!";
				hexEl.style.color = "#00AA00";
				setTimeout(function () {
					hexEl.textContent = old;
					hexEl.style.color = "";
				}, 900);
			});
			tokenGrid.appendChild(btn);
		});
	}

	function copyText(str) {
		try {
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(str);
				return;
			}
		} catch (e) {}
		// fallback
		var ta = document.createElement("textarea");
		ta.value = str;
		ta.style.position = "fixed";
		ta.style.opacity = "0";
		document.body.appendChild(ta);
		ta.select();
		try {
			document.execCommand("copy");
		} catch (e) {}
		document.body.removeChild(ta);
	}

	/* ------------------------------------------------- COLOR SQUARE MIXER */
	var SWATCHES = [
		"#FF0000",
		"#00FF00",
		"#0000FF",
		"#FFFF00",
		"#FF00FF",
		"#00FFFF",
		"#FF8000",
		"#8000FF",
		"#000080",
		"#008080",
		"#00AA00",
		"#800080",
	];
	var swatchGrid = $("#swatchGrid");
	var mixerPreview = $("#mixerPreview");
	function selectSwatch(hex, btn) {
		if (mixerPreview) {
			mixerPreview.style.background = hex;
			mixerPreview.textContent = hex.toUpperCase();
			// readable text color: simple luminance check
			mixerPreview.style.color = isLight(hex) ? "#000" : "#fff";
		}
		$$(".swatch", swatchGrid).forEach(function (s) {
			s.classList.remove("is-active");
			s.setAttribute("aria-pressed", "false");
		});
		if (btn) {
			btn.classList.add("is-active");
			btn.setAttribute("aria-pressed", "true");
		}
	}
	function isLight(hex) {
		var c = hex.replace("#", "");
		var r = parseInt(c.substr(0, 2), 16);
		var g = parseInt(c.substr(2, 2), 16);
		var b = parseInt(c.substr(4, 2), 16);
		return (r * 299 + g * 587 + b * 114) / 1000 > 140;
	}
	if (swatchGrid) {
		SWATCHES.forEach(function (hex, i) {
			var b = document.createElement("button");
			b.type = "button";
			b.className = "swatch";
			b.style.background = hex;
			b.setAttribute("aria-pressed", i === 2 ? "true" : "false");
			b.setAttribute("aria-label", "Use color " + hex);
			if (i === 2) b.classList.add("is-active");
			b.addEventListener("click", function () {
				selectSwatch(hex, b);
			});
			swatchGrid.appendChild(b);
		});
	}
	var randomBtn = $("#randomColor");
	if (randomBtn) {
		randomBtn.addEventListener("click", function () {
			var idx = Math.floor(Math.random() * SWATCHES.length);
			var btns = $$(".swatch", swatchGrid);
			selectSwatch(SWATCHES[idx], btns[idx]);
		});
	}

	/* --------------------------------------------------------------- TABS */
	var tabs = $$(".tab");
	function selectTab(tab) {
		var panelId = tab.getAttribute("aria-controls");
		tabs.forEach(function (t) {
			var pid = t.getAttribute("aria-controls");
			var selected = t === tab;
			t.setAttribute("aria-selected", selected ? "true" : "false");
			t.tabIndex = selected ? 0 : -1;
			var panel = document.getElementById(pid);
			if (panel) panel.hidden = !selected;
		});
	}
	tabs.forEach(function (tab, i) {
		tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
		tab.addEventListener("click", function () {
			selectTab(tab);
		});
		tab.addEventListener("keydown", function (e) {
			var dir = 0;
			if (e.key === "ArrowRight" || e.key === "ArrowDown") dir = 1;
			else if (e.key === "ArrowLeft" || e.key === "ArrowUp") dir = -1;
			else if (e.key === "Home") {
				e.preventDefault();
				tabs[0].focus();
				selectTab(tabs[0]);
				return;
			} else if (e.key === "End") {
				e.preventDefault();
				tabs[tabs.length - 1].focus();
				selectTab(tabs[tabs.length - 1]);
				return;
			} else return;
			e.preventDefault();
			var next = (i + dir + tabs.length) % tabs.length;
			tabs[next].focus();
			selectTab(tabs[next]);
		});
	});

	/* --------------------------------- COUNT-UP HELPER (the stat band) */
	function animateCount(el, target, suffix) {
		suffix = suffix || "";
		var dur = 1400;
		if (reduceMotion) {
			el.textContent = target + suffix;
			return;
		}
		var start = null;
		function frame(ts) {
			if (start === null) start = ts;
			var p = Math.min(1, (ts - start) / dur);
			var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
			el.textContent = Math.round(target * eased) + suffix;
			if (p < 1) requestAnimationFrame(frame);
		}
		requestAnimationFrame(frame);
	}

	/* --------------------------------------------------- HIT COUNTER (odometer) */
	var HIT_TOTAL = 1048576; // 2^20 — a very nostalgic number
	var hitEl = $("#hitCounter");
	function renderHit(value) {
		if (!hitEl) return;
		var s = String(value);
		while (s.length < 7) s = "0" + s; // zero-padded 7-digit display
		hitEl.innerHTML = "";
		for (var i = 0; i < s.length; i++) {
			var d = document.createElement("span");
			d.className = "counter__digit";
			d.textContent = s[i];
			hitEl.appendChild(d);
		}
		hitEl.setAttribute(
			"aria-label",
			"Visitor number " + value.toLocaleString(),
		);
	}
	renderHit(0);

	/* -------------------------------------------------- PROGRESS METER */
	var meterBar = $(".meter__bar");
	var meterPct = $("#meterPct");
	var meter1 = $("#meter1");
	function runMeter() {
		if (!meterBar) return;
		var target = parseInt(meterBar.getAttribute("data-target"), 10) || 0;
		if (reduceMotion) {
			meterBar.style.width = target + "%";
			if (meter1) meter1.setAttribute("aria-valuenow", String(target));
			if (meterPct)
				meterPct.textContent = "Downloading webmaster95.zip — " + target + "%";
			return;
		}
		// step the percentage label in time with the CSS width transition
		meterBar.style.width = target + "%";
		var cur = 0;
		var iv = setInterval(function () {
			cur += Math.max(1, Math.round(target / 20));
			if (cur >= target) {
				cur = target;
				clearInterval(iv);
			}
			if (meter1) meter1.setAttribute("aria-valuenow", String(cur));
			if (meterPct)
				meterPct.textContent = "Downloading webmaster95.zip — " + cur + "%";
		}, 30);
	}

	/* ------------------------------------- SCROLL-TRIGGERED ANIMATIONS */
	function whenVisible(el, cb) {
		if (!el) return;
		if (!("IntersectionObserver" in window)) {
			cb();
			return;
		}
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (e) {
					if (e.isIntersecting) {
						cb();
						io.disconnect();
					}
				});
			},
			{ threshold: 0.35 },
		);
		io.observe(el);
	}

	// hit counter + stat band fire when the stats section scrolls in
	var statsSection = $("#stats");
	whenVisible(statsSection, function () {
		// the hit counter keeps per-digit box markup, so it has its own odometer
		// rather than the plain single-node count-up used by the stat band.
		startHitOdometer();
		$$(".statline__num").forEach(function (el) {
			var target = parseInt(el.getAttribute("data-count"), 10) || 0;
			var suffix = el.getAttribute("data-suffix") || "";
			animateCount(el, target, suffix);
		});
	});

	// dedicated odometer that keeps the digit-box markup
	function startHitOdometer() {
		if (reduceMotion) {
			renderHit(HIT_TOTAL);
			return;
		}
		var dur = 1600;
		var start = null;
		function frame(ts) {
			if (start === null) start = ts;
			var p = Math.min(1, (ts - start) / dur);
			var eased = 1 - Math.pow(1 - p, 3);
			renderHit(Math.round(HIT_TOTAL * eased));
			if (p < 1) requestAnimationFrame(frame);
			else renderHit(HIT_TOTAL);
		}
		requestAnimationFrame(frame);
	}

	// meter fires when components section scrolls in
	whenVisible($("#components"), runMeter);

	/* ------------------------------------------------- NAV BURGER (mobile) */
	var burger = $("#burger");
	if (burger) {
		burger.addEventListener("click", function () {
			var open = document.body.classList.toggle("nav-open");
			burger.setAttribute("aria-expanded", open ? "true" : "false");
		});
		// close the menu after navigating
		$$("#navlinks a").forEach(function (a) {
			a.addEventListener("click", function () {
				document.body.classList.remove("nav-open");
				burger.setAttribute("aria-expanded", "false");
			});
		});
	}

	/* --------------------------------------------------------- START MENU */
	var startBtn = $("#startBtn");
	var startMenu = $("#startMenu");
	function setStart(open) {
		if (!startMenu || !startBtn) return;
		startMenu.hidden = !open;
		startBtn.classList.toggle("is-open", open);
		startBtn.setAttribute("aria-expanded", open ? "true" : "false");
	}
	if (startBtn && startMenu) {
		startBtn.addEventListener("click", function (e) {
			e.stopPropagation();
			setStart(startMenu.hidden);
		});
		$$(".startmenu__item", startMenu).forEach(function (a) {
			a.addEventListener("click", function () {
				setStart(false);
			});
		});
		document.addEventListener("click", function (e) {
			if (
				!startMenu.hidden &&
				!startMenu.contains(e.target) &&
				e.target !== startBtn
			) {
				setStart(false);
			}
		});
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape" && !startMenu.hidden) {
				setStart(false);
				startBtn.focus();
			}
		});
	}

	/* --------------------------------------------- MIDI BUTTON (easter egg) */
	var midiBtn = $("#midiBtn");
	if (midiBtn) {
		var playing = false;
		midiBtn.addEventListener("click", function () {
			playing = !playing;
			midiBtn.lastChild.textContent = playing
				? " MIDI Playing ♪"
				: " Click for MIDI";
			if (playing) beep();
		});
	}
	function beep() {
		// tiny authentic-ish blip via WebAudio (best-effort, silent if unsupported)
		try {
			var AC = window.AudioContext || window.webkitAudioContext;
			if (!AC) return;
			var ctx = new AC();
			var notes = [523.25, 659.25, 783.99, 1046.5];
			notes.forEach(function (f, i) {
				var o = ctx.createOscillator();
				var g = ctx.createGain();
				o.type = "square";
				o.frequency.value = f;
				g.gain.value = 0.04;
				o.connect(g);
				g.connect(ctx.destination);
				var t = ctx.currentTime + i * 0.12;
				o.start(t);
				o.stop(t + 0.11);
			});
			setTimeout(function () {
				try {
					ctx.close();
				} catch (e) {}
			}, 800);
		} catch (e) {}
	}

	/* ------------------------------------------------------ GUESTBOOK FORM */
	var gbForm = $("#gbForm");
	var gbList = $("#guestbookList");
	var gbNote = $("#gbNote");
	if (gbForm && gbList) {
		gbForm.addEventListener("submit", function (e) {
			e.preventDefault();
			var name = $("#gbName").value.trim();
			var msg = $("#gbMsg").value.trim();
			if (!name || !msg) {
				note(gbNote, "err", "✗ Please fill in both your handle and a message!");
				return;
			}
			var entry = document.createElement("div");
			entry.className = "gb-entry";
			var now = new Date();
			var stamp =
				pad(now.getMonth() + 1) +
				"/" +
				pad(now.getDate()) +
				"/" +
				now.getFullYear() +
				" · " +
				pad(now.getHours()) +
				":" +
				pad(now.getMinutes());
			entry.innerHTML =
				'<div><div class="gb-entry__who"></div>' +
				'<div class="gb-entry__meta">' +
				stamp +
				" · JUST NOW</div></div>" +
				'<div class="gb-entry__msg"><p></p></div>';
			// set text via textContent to avoid HTML injection
			entry.querySelector(".gb-entry__who").textContent = name;
			entry.querySelector(".gb-entry__msg p").textContent = msg;
			gbList.insertBefore(entry, gbList.firstChild);
			gbForm.reset();
			note(gbNote, "ok", "✓ Thanks " + name + "! Your entry is at the top. ★");
			// bump the visible entry count in the title bar
			var bar = gbList.closest(".window").querySelector(".window__title");
			var count = $$(".gb-entry", gbList).length;
			if (bar) bar.textContent = "guestbook.dat — " + count + " entries";
		});
		gbForm.addEventListener("reset", function () {
			note(gbNote, "", "");
		});
	}

	/* ------------------------------------------------------------ CTA FORM */
	var ctaForm = $("#ctaForm");
	var ctaNote = $("#ctaNote");
	if (ctaForm) {
		ctaForm.addEventListener("submit", function (e) {
			e.preventDefault();
			var email = $("#ctaEmail").value.trim();
			var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
			if (!ok) {
				note(ctaNote, "err", "✗ That doesn't look like a valid email address!");
				return;
			}
			note(
				ctaNote,
				"ok",
				"✓ You're in! Check your inbox for a beveled banner. ★",
			);
			ctaForm.reset();
		});
	}

	function note(el, state, text) {
		if (!el) return;
		el.setAttribute("data-state", state);
		el.textContent = text;
	}

	/* ----------------------------------------- pressed-state on keyboard */
	// Make Space/Enter on .btn show the inset pressed look (parity with mouse)
	$$(".btn").forEach(function (b) {
		b.addEventListener("keydown", function (e) {
			if (e.key === " " || e.key === "Enter") b.classList.add("is-pressed");
		});
		b.addEventListener("keyup", function () {
			b.classList.remove("is-pressed");
		});
		b.addEventListener("blur", function () {
			b.classList.remove("is-pressed");
		});
	});
})();
