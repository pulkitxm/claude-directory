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
			const isDark = document.documentElement.classList.contains("dark");
			const newTheme = isDark ? "light" : "dark";
			localStorage.setItem("theme", newTheme);
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
	const settingsContentTitle = document.querySelector("main h2");
	const settingsFormsContainer = document.querySelector(
		"main div.p-3.bg-gray-100",
	);

	const activeTabClasses = [
		"bg-gray-100",
		"dark:bg-gray-900",
		"text-gray-700",
		"dark:text-gray-400",
	];
	const inactiveTabClasses = ["text-gray-500", "dark:text-gray-400"];

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
			if (settingsContentTitle) {
				settingsContentTitle.textContent = `${tabName} Information`;
			}


			if (settingsFormsContainer) {
				if (tabName === "Profile") {

					window.location.reload();
				} else {

					settingsFormsContainer.innerHTML = `
            <div class="p-6 bg-white dark:bg-gray-950 rounded-xl flex flex-col gap-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white/90">${tabName} Preferences</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Configure your settings for ${tabName.toLowerCase()} here.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-gray-900 dark:text-white/90 block mb-1.5">Enable ${tabName} Updates</label>
                  <select aria-label="${tabName} updates" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:border-violet-600 focus:ring-violet-600 text-gray-900 dark:text-white/90">
                    <option>Yes, enable all features</option>
                    <option>No, turn off notifications</option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-gray-900 dark:text-white/90 block mb-1.5">Access Scope</label>
                  <select aria-label="${tabName} access scope" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:border-violet-600 focus:ring-violet-600 text-gray-900 dark:text-white/90">
                    <option>Standard security check</option>
                    <option>Extended strict mode</option>
                  </select>
                </div>
              </div>
            </div>
          `;
				}
			}
		});
	});


	const txSearchInput = document.querySelector(
		'input[placeholder*="Search by ID or description"]',
	);
	const txTableRows = document.querySelectorAll("table tbody tr");

	if (txSearchInput) {
		txSearchInput.addEventListener("input", (e) => {
			const query = e.target.value.toLowerCase().trim();
			txTableRows.forEach((row) => {
				const desc =
					row.querySelector("td:first-child")?.textContent.toLowerCase() || "";
				const txnId =
					row.querySelector("td:nth-child(3)")?.textContent.toLowerCase() || "";
				if (desc.includes(query) || txnId.includes(query)) {
					row.style.display = "";
				} else {
					row.style.display = "none";
				}
			});
		});
	}


	const budgetActionBtns = Array.from(
		document.querySelectorAll("button"),
	).filter((btn) => {
		const text = btn.textContent.toLowerCase();
		return (
			text.includes("delete") || text.includes("reset") || text.includes("edit")
		);
	});

	budgetActionBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const budgetName =
				btn.closest(".bg-white")?.querySelector("h3")?.textContent || "Budget";
			alert(`${btn.textContent.trim()} action clicked for: ${budgetName}`);
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
