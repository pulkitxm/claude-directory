




(function () {
	const stored = localStorage.getItem("dashspace-theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	if (stored === "dark" || (!stored && prefersDark)) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.add("light");
	}
})();

function toggleTheme() {
	const html = document.documentElement;
	const isDark = html.classList.contains("dark");
	if (isDark) {
		html.classList.remove("dark");
		html.classList.add("light");
		localStorage.setItem("dashspace-theme", "light");
	} else {
		html.classList.remove("light");
		html.classList.add("dark");
		localStorage.setItem("dashspace-theme", "dark");
	}

	updateThemeIcon();

	if (typeof updateChartsTheme === "function") {
		updateChartsTheme();
	}
}

function updateThemeIcon() {
	const isDark = document.documentElement.classList.contains("dark");
	const btn = document.getElementById("theme-toggle");
	if (!btn) return;
	btn.innerHTML = isDark ? getSunIcon() : getMoonIcon();
}

function getMoonIcon() {
	return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.5287 15.9294C21.3687 15.6594 20.9187 15.2094 19.8087 15.4094C19.1787 15.5194 18.5487 15.5694 17.9987 15.5394C15.5887 15.4294 13.4787 14.2594 12.0087 12.4694C10.7087 10.8794 9.9187 8.8094 9.9587 6.7094C9.9787 5.5994 10.2187 4.5194 10.6987 3.5094C11.1787 2.4994 10.7487 1.9494 10.4787 1.7294C10.1987 1.4994 9.6387 1.2994 8.6487 1.8694C4.6787 4.2194 2.7587 8.7994 3.8487 13.1694C5.0287 17.8194 9.1687 21.1294 13.9987 21.2294C14.1087 21.2294 14.2287 21.2294 14.3387 21.2294C18.1287 21.2294 21.1987 19.1094 21.8787 16.3494C22.0887 15.3494 21.6887 15.2094 21.5287 15.9294Z" fill="currentColor"/>
  </svg>`;
}

function getSunIcon() {
	return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V4M12 20V22M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M2 12H4M20 12H22M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}




function initSidebar() {
	const sidebar = document.getElementById("sidebar");
	const overlay = document.getElementById("sidebar-overlay");
	const hamburger = document.getElementById("hamburger-btn");
	const closeBtn = document.getElementById("sidebar-close-btn");
	const closeSidebar = (restoreFocus = false) => {
		if (!sidebar || !overlay) return;
		sidebar.classList.remove("open");
		overlay.classList.remove("show");
		if (hamburger) {
			hamburger.setAttribute("aria-expanded", "false");
			if (restoreFocus) hamburger.focus();
		}
	};

	if (hamburger) {
		hamburger.setAttribute("aria-controls", "sidebar");
		hamburger.setAttribute("aria-expanded", "false");
		hamburger.addEventListener("click", () => {
			sidebar.classList.add("open");
			overlay.classList.add("show");
			hamburger.setAttribute("aria-expanded", "true");
		});
	}

	if (closeBtn) {
		closeBtn.addEventListener("click", () => closeSidebar(true));
	}

	if (overlay) {
		overlay.addEventListener("click", () => closeSidebar());
	}
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && sidebar?.classList.contains("open")) closeSidebar(true);
	});
	window.addEventListener("resize", () => {
		if (window.innerWidth > 1024) closeSidebar();
	});
}




function initNavDropdowns() {
	document.querySelectorAll(".nav-item-toggle").forEach((btn) => {
		const dropdownId = btn.getAttribute("data-dropdown");
		btn.setAttribute("aria-controls", dropdownId);
		btn.setAttribute("aria-expanded", String(btn.classList.contains("expanded")));
		btn.addEventListener("click", () => {
			const isExpanded = btn.classList.contains("expanded");
			const dropdown = document.getElementById(dropdownId);

			if (isExpanded) {
				btn.classList.remove("expanded");
				btn.setAttribute("aria-expanded", "false");
				if (dropdown) dropdown.classList.remove("open");
			} else {
				btn.classList.add("expanded");
				btn.setAttribute("aria-expanded", "true");
				if (dropdown) dropdown.classList.add("open");
			}
		});
	});
}




function initChartTabs(containerSelector, onTabChange) {
	const container = document.querySelector(containerSelector);
	if (!container) return;

	container.querySelectorAll(".chart-tab").forEach((tab) => {
		tab.addEventListener("click", () => {
			container
				.querySelectorAll(".chart-tab")
				.forEach((t) => t.classList.remove("active"));
			tab.classList.add("active");
			if (onTabChange) onTabChange(tab.dataset.period);
		});
	});
}




function initViewTabs() {
	document.querySelectorAll(".view-tabs").forEach((container) => {
		container.querySelectorAll(".view-tab").forEach((tab) => {
			tab.addEventListener("click", () => {
				container
					.querySelectorAll(".view-tab")
					.forEach((t) => t.classList.remove("active"));
				tab.classList.add("active");
			});
		});
	});
}




document.addEventListener("DOMContentLoaded", () => {
	updateThemeIcon();
	initSidebar();
	initNavDropdowns();
	initViewTabs();

	const themeBtn = document.getElementById("theme-toggle");
	if (themeBtn) {
		themeBtn.addEventListener("click", toggleTheme);
	}
	document.querySelectorAll(".nav-item.active").forEach((link) => link.setAttribute("aria-current", "page"));
	document.querySelectorAll("button").forEach((button) => {
		if (button.getAttribute("aria-label") || button.getAttribute("title") || (button.textContent || "").trim()) return;
		button.setAttribute("aria-label", button.classList.contains("more-btn") ? "Open item actions" : "Interactive control");
	});
	document.querySelectorAll("input, textarea, select").forEach((field) => {
		if (field.getAttribute("aria-label") || field.closest("label") || (field.id && document.querySelector(`label[for="${field.id}"]`))) return;
		field.setAttribute("aria-label", field.getAttribute("placeholder") || field.getAttribute("name") || field.id || field.getAttribute("type") || "Form field");
	});
});
