document.addEventListener("DOMContentLoaded", () => {
	const sidebar = document.querySelector(".sidebar");
	const header = document.querySelector(".header");
	const pageContent = document.querySelector(".page-content");
	const overlay = document.createElement("button");
	const menuButton = document.createElement("button");
	const closeSidebar = (restoreFocus = false) => {
		sidebar?.classList.remove("mobile-open");
		overlay.classList.remove("visible");
		menuButton.setAttribute("aria-expanded", "false");
		if (restoreFocus) menuButton.focus();
	};

	if (pageContent && !pageContent.querySelector("h1")) {
		const heading = document.createElement("h1");
		heading.className = "sr-only";
		heading.textContent = document.title.split("-")[0].trim();
		pageContent.prepend(heading);
	}

	if (sidebar && header) {
		sidebar.id = "file-manager-sidebar";
		menuButton.className = "mobile-menu-button";
		menuButton.type = "button";
		menuButton.setAttribute("aria-label", "Open navigation");
		menuButton.setAttribute("aria-controls", sidebar.id);
		menuButton.setAttribute("aria-expanded", "false");
		menuButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
		overlay.className = "mobile-sidebar-overlay";
		overlay.type = "button";
		overlay.setAttribute("aria-label", "Close navigation");
		header.prepend(menuButton);
		document.body.append(overlay);
		menuButton.addEventListener("click", () => {
			sidebar.classList.add("mobile-open");
			overlay.classList.add("visible");
			menuButton.setAttribute("aria-expanded", "true");
		});
		overlay.addEventListener("click", () => closeSidebar());
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && sidebar.classList.contains("mobile-open")) closeSidebar(true);
		});
		window.addEventListener("resize", () => {
			if (window.innerWidth > 768) closeSidebar();
		});
	}

	document.querySelectorAll(".nav-item.active").forEach((link) => link.setAttribute("aria-current", "page"));
	document.querySelectorAll("button").forEach((button) => {
		if (button.getAttribute("aria-label") || button.getAttribute("title") || (button.textContent || "").trim()) return;
		const isAction = [...button.classList].some((name) => name.includes("more"));
		button.setAttribute("aria-label", isAction ? "Open item actions" : "Interactive control");
	});
	document.querySelectorAll("input, textarea, select").forEach((field) => {
		if (field.getAttribute("aria-label") || field.closest("label") || (field.id && document.querySelector(`label[for="${field.id}"]`))) return;
		field.setAttribute("aria-label", field.getAttribute("placeholder") || field.getAttribute("name") || field.id || field.getAttribute("type") || "Form field");
	});
	document.querySelectorAll(".filter-tabs, .view-toggle").forEach((group) => {
		group.querySelectorAll("button").forEach((button) => {
			button.setAttribute("aria-pressed", String(button.classList.contains("active")));
			button.addEventListener("click", () => {
				group.querySelectorAll("button").forEach((item) => {
					item.classList.remove("active");
					item.setAttribute("aria-pressed", "false");
				});
				button.classList.add("active");
				button.setAttribute("aria-pressed", "true");
			});
		});
	});
});
