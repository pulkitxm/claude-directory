// KEYNOTE / DeceptiConf clone — tab-group behaviour (Headless-UI equivalent)
(function () {
	"use strict";

	function wireTabGroup(tablistSel, tabAttr, panelSel, isActive) {
		var tablist = document.querySelector(tablistSel);
		if (!tablist) return;
		var tabs = Array.prototype.slice.call(
			tablist.querySelectorAll('[role="tab"]'),
		);
		var panels = Array.prototype.slice.call(
			document.querySelectorAll(panelSel),
		);

		function select(idx) {
			tabs.forEach(function (tab, i) {
				var on = i === idx;
				tab.setAttribute("aria-selected", on ? "true" : "false");
				var btn = tab.querySelector("button");
				if (btn) btn.tabIndex = on ? 0 : -1;
				if (panels[i]) panels[i].classList.toggle(isActive, on);
			});
		}

		tabs.forEach(function (tab, i) {
			var btn = tab.querySelector("button") || tab;
			btn.addEventListener("click", function () {
				select(i);
			});
			btn.addEventListener("keydown", function (e) {
				var n = tabs.length;
				var next = null;
				if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
				else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
					next = (i - 1 + n) % n;
				else if (e.key === "Home") next = 0;
				else if (e.key === "End") next = n - 1;
				if (next !== null) {
					e.preventDefault();
					select(next);
					var b = tabs[next].querySelector("button") || tabs[next];
					b.focus();
				}
			});
		});
	}

	// Speakers day tabs
	wireTabGroup(
		"[data-speakers-tablist]",
		"data-speakers-tab",
		"[data-speakers-panel]",
		"is-active",
	);

	// Schedule mobile day tabs
	wireTabGroup(
		"[data-sched-tablist]",
		"data-sched-tab",
		"[data-sched-panel]",
		"is-active",
	);
})();
