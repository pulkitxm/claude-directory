// Mobit clone — shared interactivity: FAQ/elements accordion, pricing toggle, tabs,
// mobile "All Pages" dropdown tap-toggle. Mobile hamburger itself is pure CSS (checkbox hack).

document.addEventListener("DOMContentLoaded", () => {
	initAccordions();
	initPricingToggle();
	initTabs();
	initMobileDropdown();
});

function initAccordions() {
	document.querySelectorAll(".accordion").forEach((acc) => {
		const header = acc.querySelector(".accordion-header");
		const body = acc.querySelector(".accordion-body");
		const inner = acc.querySelector(".accordion-body-inner");
		if (!header || !body || !inner) return;
		header.addEventListener("click", () => {
			const isOpen = acc.classList.contains("open");
			if (isOpen) {
				body.style.height = body.scrollHeight + "px";
				requestAnimationFrame(() => {
					body.style.height = "0px";
				});
				acc.classList.remove("open");
			} else {
				body.style.height = inner.scrollHeight + "px";
				acc.classList.add("open");
				body.addEventListener(
					"transitionend",
					function handler() {
						if (acc.classList.contains("open")) body.style.height = "auto";
						body.removeEventListener("transitionend", handler);
					},
					{ once: true },
				);
			}
		});
	});
}

function initPricingToggle() {
	const toggle = document.querySelector(".toggle-switch");
	const wrap = document.querySelector(".pricing-grid");
	if (!toggle || !wrap) return;
	toggle.addEventListener("click", () => {
		const checked = toggle.getAttribute("aria-checked") === "true";
		toggle.setAttribute("aria-checked", String(!checked));
		wrap.classList.toggle("pricing-yearly-active", !checked);
	});
}

function initTabs() {
	document.querySelectorAll(".tab").forEach((tab) => {
		const navItems = tab.querySelectorAll(".tab-nav-item");
		const panels = tab.querySelectorAll(".tab-content");
		navItems.forEach((item, i) => {
			item.addEventListener("click", () => {
				navItems.forEach((n) => n.classList.remove("active"));
				panels.forEach((p) => p.classList.remove("block"));
				item.classList.add("active");
				panels[i].classList.add("block");
			});
		});
	});
}

function initMobileDropdown() {
	document.querySelectorAll(".nav-dropdown > .nav-link").forEach((trigger) => {
		trigger.addEventListener("click", (e) => {
			if (window.innerWidth >= 1024) return;
			e.preventDefault();
			trigger.parentElement.classList.toggle("open");
		});
	});
}
