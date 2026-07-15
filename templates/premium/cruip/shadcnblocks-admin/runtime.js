const root = document.documentElement;
let chartData;

function setTheme(value) {
	const dark = value === "dark" || value === "system" && matchMedia("(prefers-color-scheme: dark)").matches;
	root.classList.toggle("dark", dark);
	root.classList.toggle("light", !dark);
	root.style.colorScheme = dark ? "dark" : "light";
	localStorage.setItem("theme", value);
}

function chartWidth() {
	if (innerWidth <= 500) return "390";
	if (innerWidth <= 900) return "768";
	if (innerWidth <= 1350) return "1280";
	return null;
}

async function updateCharts() {
	const width = chartWidth();
	if (!width) return;
	const containers = [...document.querySelectorAll(".recharts-responsive-container")];
	if (!containers.length) return;
	if (!chartData) {
		const page = location.pathname.split("/").pop().replace(".html", "");
		chartData = await fetch(`../responsive-data/${page}.json`).then(response => response.json());
	}
	containers.forEach((container, index) => {
		if (chartData[width][index]) container.innerHTML = chartData[width][index];
	});
}

function closeThemeMenu() {
	document.querySelector('[data-local-theme-menu]')?.remove();
	document.querySelector('[aria-label="Toggle theme"]')?.setAttribute("aria-expanded", "false");
}

function openThemeMenu(button) {
	if (document.querySelector('[data-local-theme-menu]')) {
		closeThemeMenu();
		return;
	}
	const rect = button.getBoundingClientRect();
	const wrapper = document.createElement("div");
	wrapper.dataset.localThemeMenu = "";
	wrapper.style.cssText = `position:fixed;left:${Math.max(8, rect.right - 128)}px;top:${rect.bottom + 4}px;min-width:max-content;z-index:50`;
	wrapper.innerHTML = '<div role="menu" aria-orientation="vertical" data-state="open" class="bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md"><div role="menuitem" data-theme-value="light" class="focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none">Light</div><div role="menuitem" data-theme-value="dark" class="focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none">Dark</div><div role="menuitem" data-theme-value="system" class="focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none">System</div></div>';
	document.body.append(wrapper);
	button.setAttribute("aria-expanded", "true");
}

function toggleSidebar() {
	const sidebar = document.querySelector('[data-slot="sidebar"]');
	if (!sidebar) return;
	if (innerWidth < 768) {
		const open = document.querySelector("[data-mobile-sidebar]");
		if (open) {
			open.remove();
			return;
		}
		const overlay = document.createElement("div");
		overlay.dataset.mobileSidebar = "";
		overlay.style.cssText = "position:fixed;inset:0;z-index:60;background:rgb(0 0 0 / .5)";
		const panel = document.createElement("div");
		panel.className = "bg-sidebar text-sidebar-foreground h-full w-72 shadow-xl";
		panel.append(sidebar.querySelector('[data-slot="sidebar-inner"]')?.cloneNode(true) || sidebar.cloneNode(true));
		overlay.append(panel);
		overlay.addEventListener("click", event => {
			if (event.target === overlay) overlay.remove();
		});
		document.body.append(overlay);
		return;
	}
	const collapsed = sidebar.dataset.state !== "collapsed";
	sidebar.dataset.state = collapsed ? "collapsed" : "expanded";
	sidebar.dataset.collapsible = collapsed ? "icon" : "";
}

function toggleSection(button) {
	const section = button.closest('[data-slot="collapsible"]');
	if (!section) return;
	const content = section.querySelector('[data-slot="collapsible-content"]');
	const open = section.dataset.state !== "open";
	section.dataset.state = open ? "open" : "closed";
	button.dataset.state = open ? "open" : "closed";
	button.setAttribute("aria-expanded", String(open));
	if (content) content.hidden = !open;
}

document.addEventListener("click", (event) => {
	const themeItem = event.target.closest("[data-theme-value]");
	if (themeItem) {
		setTheme(themeItem.dataset.themeValue);
		closeThemeMenu();
		return;
	}
	const target = event.target.closest("button");
	if (!target) {
		closeThemeMenu();
		return;
	}
	if (target.getAttribute("aria-label") === "Toggle theme") openThemeMenu(target);
	if (target.dataset.sidebar === "trigger" || target.getAttribute("aria-label") === "Toggle Sidebar") toggleSidebar();
	if (target.dataset.slot === "collapsible-trigger") toggleSection(target);
});

const storedTheme = localStorage.getItem("theme");
if (storedTheme) setTheme(storedTheme);
updateCharts();
addEventListener("resize", updateCharts);
