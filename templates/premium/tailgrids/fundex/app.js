document.addEventListener("DOMContentLoaded", () => {

	const themeToggleBtns = document.querySelectorAll(
		'button[title="Toggle theme"]',
	);

	const applyTheme = (theme) => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			document.documentElement.classList.remove("light");
		} else {
			document.documentElement.classList.add("light");
			document.documentElement.classList.remove("dark");
		}
	};

	themeToggleBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const currentTheme = localStorage.getItem("vite-ui-theme") || "system";
			const newTheme = currentTheme === "system" ? "light" : currentTheme === "light" ? "dark" : "light";
			localStorage.setItem("vite-ui-theme", newTheme);
			applyTheme(newTheme);
		});
	});


	const openSidebarBtn = document.querySelector(
		'button[aria-label="Open sidebar"]',
	);
	const closeSidebarBtn = document.querySelector(
		'button[aria-label="Close sidebar"]',
	);
	const sidebar = document.querySelector("aside");
	const backdrop = document.querySelector(".bg-black\\/50");
	if (sidebar) sidebar.id = "fundex-sidebar";
	if (openSidebarBtn) {
		openSidebarBtn.setAttribute("aria-controls", "fundex-sidebar");
		openSidebarBtn.setAttribute("aria-expanded", "false");
	}

	const openSidebar = () => {
		if (sidebar) {
			sidebar.classList.remove("-translate-x-full");
			sidebar.classList.add("translate-x-0");
		}
		if (backdrop) {
			backdrop.classList.remove("opacity-0", "pointer-events-none");
			backdrop.classList.add("opacity-100");
		}
		openSidebarBtn?.setAttribute("aria-expanded", "true");
	};

	const closeSidebar = (restoreFocus = false) => {
		if (sidebar) {
			sidebar.classList.remove("translate-x-0");
			sidebar.classList.add("-translate-x-full");
		}
		if (backdrop) {
			backdrop.classList.remove("opacity-100");
			backdrop.classList.add("opacity-0", "pointer-events-none");
		}
		openSidebarBtn?.setAttribute("aria-expanded", "false");
		if (restoreFocus) openSidebarBtn?.focus();
	};

	if (openSidebarBtn) openSidebarBtn.addEventListener("click", openSidebar);
	if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", () => closeSidebar(true));
	if (backdrop) backdrop.addEventListener("click", closeSidebar);
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && sidebar?.classList.contains("translate-x-0")) closeSidebar(true);
	});


	const carouselContainer = document.querySelector(
		".overflow-hidden.mb-4.rounded-2xl.shadow-lg > div",
	);
	const prevCardBtn = document.querySelector(
		'button:has(svg path[d*="5.75L8.125"])',
	);
	const nextCardBtn = document.querySelector(
		'button:has(svg path[d*="18.25L15.87"])',
	);
	const cardCounter = document.querySelector(
		"span.text-sm.text-gray-500.dark\\:text-gray-400.font-medium",
	);

	let currentCardIndex = 0;
	const totalCards = 2;

	const updateCarousel = () => {
		if (carouselContainer) {
			carouselContainer.style.transition = "transform 0.4s ease";
			carouselContainer.style.transform = `translate3d(-${currentCardIndex * 100}%, 0px, 0px)`;
		}
		if (cardCounter) {
			cardCounter.textContent = `${currentCardIndex + 1}/${totalCards}`;
		}
	};

	if (nextCardBtn) {
		nextCardBtn.addEventListener("click", () => {
			currentCardIndex = (currentCardIndex + 1) % totalCards;
			updateCarousel();
		});
	}

	if (prevCardBtn) {
		prevCardBtn.addEventListener("click", () => {
			currentCardIndex = (currentCardIndex - 1 + totalCards) % totalCards;
			updateCarousel();
		});
	}


	const searchInput = document.querySelector('input[placeholder*="Search"]');
	document.addEventListener("keydown", (e) => {
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			if (searchInput) {
				e.preventDefault();
				searchInput.focus();
			}
		}
	});


	const settingsTabBtns = document.querySelectorAll("main nav button");
	const settingsLayout = document.querySelector("main nav")?.parentElement?.parentElement;
	const settingsContentHost = settingsLayout?.children[1];
	const profilePanel = settingsContentHost?.innerHTML;

	const activeTabClasses = [
		"bg-gray-100",
		"dark:bg-gray-900",
		"text-gray-700",
		"dark:text-gray-400",
	];
	const inactiveTabClasses = ["text-gray-500", "dark:text-gray-400"];
	const bindSettingsSwitches = () => {
		settingsContentHost?.querySelectorAll("button.w-10.h-6.rounded-full").forEach((toggle) => {
			const knob = toggle.firstElementChild;
			const label = toggle.parentElement?.querySelector("p, h3, h4")?.textContent.trim() || "Setting";
			const syncState = () => {
				const enabled = toggle.classList.contains("bg-violet-600");
				toggle.setAttribute("aria-label", label);
				toggle.setAttribute("aria-pressed", String(enabled));
			};
			toggle.addEventListener("click", () => {
				const enabled = toggle.classList.contains("bg-violet-600");
				toggle.classList.toggle("bg-violet-600", !enabled);
				toggle.classList.toggle("bg-gray-100", enabled);
				toggle.classList.toggle("dark:bg-gray-800", enabled);
				knob?.classList.toggle("translate-x-4.5", !enabled);
				knob?.classList.toggle("translate-x-0.5", enabled);
				syncState();
			});
			syncState();
		});
	};

	settingsTabBtns.forEach((btn, index) => {
		btn.setAttribute("aria-pressed", String(index === 0));
		btn.addEventListener("click", () => {
			settingsTabBtns.forEach((b) => {
				b.classList.remove(...activeTabClasses);
				b.classList.add(...inactiveTabClasses);
				b.setAttribute("aria-pressed", "false");
			});
			btn.classList.add(...activeTabClasses);
			btn.classList.remove(...inactiveTabClasses);
			btn.setAttribute("aria-pressed", "true");
			const tabName = btn.textContent.trim();
			if (settingsContentHost) {
				settingsContentHost.innerHTML =
					tabName === "Profile"
						? profilePanel
						: window.fundexSettingsPanels?.[tabName] || "";
				bindSettingsSwitches();
			}
		});
	});

	document.querySelectorAll("aside a").forEach((link) => {
		const href = link.getAttribute("href");
		if (href && new URL(href, location.href).pathname === location.pathname) link.setAttribute("aria-current", "page");
	});
	document.querySelectorAll("button").forEach((button) => {
		if (button.getAttribute("aria-label") || button.getAttribute("title") || (button.textContent || "").trim()) return;
		button.setAttribute("aria-label", "Interactive control");
	});
	document.querySelectorAll("input, textarea, select").forEach((field) => {
		if (field.getAttribute("aria-label") || field.closest("label") || (field.id && document.querySelector(`label[for="${field.id}"]`))) return;
		field.setAttribute("aria-label", field.getAttribute("placeholder") || field.getAttribute("name") || field.id || field.getAttribute("type") || "Form field");
	});
});
