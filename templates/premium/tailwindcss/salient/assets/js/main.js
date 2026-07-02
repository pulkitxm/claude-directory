// SALIENT clone — vanilla JS shim for HeadlessUI behaviours
(function () {
	"use strict";

	/* -------- Mobile nav popover -------- */
	document.querySelectorAll("[data-nav-mobile]").forEach((nav) => {
		const toggle = nav.querySelector("[data-nav-toggle]");
		const backdrop = nav.querySelector(".mobile-backdrop");
		const close = () => nav.classList.remove("open");
		if (toggle) {
			toggle.addEventListener("click", (e) => {
				e.stopPropagation();
				nav.classList.toggle("open");
			});
		}
		if (backdrop) backdrop.addEventListener("click", close);
		document.addEventListener("click", (e) => {
			if (nav.classList.contains("open") && !nav.contains(e.target)) close();
		});
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
		nav
			.querySelectorAll(".mobile-panel a")
			.forEach((a) => a.addEventListener("click", close));
	});

	/* -------- Tab groups (primary + secondary features) -------- */
	document.querySelectorAll("[data-tabs]").forEach((group) => {
		const tabs = [...group.querySelectorAll("[role='tab']")];
		const panels = [...group.querySelectorAll("[role='tabpanel']")];
		const autoRotate = group.hasAttribute("data-autorotate");
		let timer = null;
		let userInteracted = false;

		const select = (idx) => {
			tabs.forEach((t, i) => {
				const on = i === idx;
				t.setAttribute("aria-selected", on ? "true" : "false");
				t.tabIndex = on ? 0 : -1;
			});
			panels.forEach((p, i) => {
				const on = i === idx;
				p.hidden = !on;
				p.classList.toggle("is-active", on);
			});
		};

		tabs.forEach((tab, i) => {
			tab.addEventListener("click", () => {
				userInteracted = true;
				if (timer) clearInterval(timer);
				select(i);
			});
			tab.addEventListener("keydown", (e) => {
				let n = null;
				if (e.key === "ArrowRight" || e.key === "ArrowDown")
					n = (i + 1) % tabs.length;
				if (e.key === "ArrowLeft" || e.key === "ArrowUp")
					n = (i - 1 + tabs.length) % tabs.length;
				if (n !== null) {
					e.preventDefault();
					userInteracted = true;
					if (timer) clearInterval(timer);
					select(n);
					tabs[n].focus();
				}
			});
		});

		select(0);

		if (autoRotate) {
			let cur = 0;
			timer = setInterval(() => {
				if (userInteracted) return;
				cur = (cur + 1) % tabs.length;
				select(cur);
			}, 5000);
		}
	});

	/* -------- Footer year -------- */
	document.querySelectorAll("[data-year]").forEach((el) => {
		el.textContent = new Date().getFullYear();
	});
})();
