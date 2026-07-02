/* ===== THEME MANAGEMENT ===== */
(function () {
	const stored = localStorage.getItem("theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const isDark = stored ? stored === "dark" : prefersDark;
	if (isDark) document.documentElement.classList.add("dark");
})();

document.addEventListener("DOMContentLoaded", function () {
	/* ===== SIDEBAR TOGGLE ===== */
	const sidebar = document.getElementById("sidebar");
	const sidebarContainer = document.getElementById("sidebar-container");
	const sidebarOverlay = document.getElementById("sidebar-overlay");
	const sidebarToggle = document.getElementById("sidebar-toggle");

	function isMobile() {
		return window.innerWidth < 1024;
	}

	function toggleSidebar() {
		if (isMobile()) {
			sidebar.classList.toggle("mobile-open");
			if (sidebarOverlay) sidebarOverlay.classList.toggle("visible");
		} else {
			sidebar.classList.toggle("collapsed");
			sidebarContainer.classList.toggle("collapsed");
		}
	}

	if (sidebarToggle) {
		sidebarToggle.addEventListener("click", toggleSidebar);
	}

	if (sidebarOverlay) {
		sidebarOverlay.addEventListener("click", function () {
			sidebar.classList.remove("mobile-open");
			sidebarOverlay.classList.remove("visible");
		});
	}

	/* ===== SIDEBAR SUBMENU TOGGLE ===== */
	const subMenuToggles = document.querySelectorAll("[data-submenu]");
	subMenuToggles.forEach(function (toggle) {
		toggle.addEventListener("click", function () {
			const targetId = this.dataset.submenu;
			const submenu = document.getElementById(targetId);
			const isOpen = submenu.classList.contains("open");

			// Close all submenus first
			document.querySelectorAll(".sidebar-sub.open").forEach(function (m) {
				m.classList.remove("open");
			});
			document.querySelectorAll("[data-submenu]").forEach(function (t) {
				t.classList.remove("open");
			});

			if (!isOpen) {
				submenu.classList.add("open");
				toggle.classList.add("open");
			}
		});
	});

	/* ===== THEME TOGGLE ===== */
	const themeToggle = document.getElementById("theme-toggle");
	if (themeToggle) {
		themeToggle.addEventListener("click", function () {
			const isDark = document.documentElement.classList.toggle("dark");
			localStorage.setItem("theme", isDark ? "dark" : "light");
			updateThemeIcon(isDark);
		});
		updateThemeIcon(document.documentElement.classList.contains("dark"));
	}

	function updateThemeIcon(isDark) {
		const icon = document.getElementById("theme-icon");
		if (!icon) return;
		if (isDark) {
			icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
		} else {
			icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
		}
	}

	/* ===== ACTIVE NAV ITEM ===== */
	const currentPath = window.location.pathname;
	document
		.querySelectorAll(".sidebar-item[href], .sidebar-sub-item[href]")
		.forEach(function (link) {
			const href = link.getAttribute("href");
			if (
				href &&
				currentPath.endsWith(href.replace(/^\.\.\//, "").replace(/^\.\//, ""))
			) {
				link.classList.add("active");
			}
		});

	/* ===== TABS ===== */
	document.querySelectorAll(".tab-trigger").forEach(function (trigger) {
		trigger.addEventListener("click", function () {
			const tabGroup = this.closest("[data-tabs]");
			if (!tabGroup) return;

			tabGroup.querySelectorAll(".tab-trigger").forEach(function (t) {
				t.classList.remove("active");
			});
			tabGroup.querySelectorAll(".tab-content").forEach(function (c) {
				c.classList.remove("active");
			});

			this.classList.add("active");
			const targetId = this.dataset.tab;
			const target = document.getElementById(targetId);
			if (target) target.classList.add("active");
		});
	});

	/* ===== DATA TABLE PAGINATION ===== */
	initDataTables();
});

function initDataTables() {
	document.querySelectorAll("[data-table]").forEach(function (tableWrapper) {
		const tableId = tableWrapper.dataset.table;
		const table = document.getElementById(tableId);
		if (!table) return;

		const rowsPerPageSelect = tableWrapper.querySelector(
			"[data-rows-per-page]",
		);
		const pageInfoEl = tableWrapper.querySelector("[data-page-info]");
		const selectedInfoEl = tableWrapper.querySelector("[data-selected-info]");
		const firstBtn = tableWrapper.querySelector('[data-page="first"]');
		const prevBtn = tableWrapper.querySelector('[data-page="prev"]');
		const nextBtn = tableWrapper.querySelector('[data-page="next"]');
		const lastBtn = tableWrapper.querySelector('[data-page="last"]');
		const selectAllCheckbox = tableWrapper.querySelector("[data-select-all]");

		let currentPage = 1;
		let rowsPerPage = rowsPerPageSelect
			? parseInt(rowsPerPageSelect.value)
			: 10;
		let selectedRows = new Set();

		const tbody = table.querySelector("tbody");
		const rows = Array.from(tbody.querySelectorAll("tr"));
		const totalRows = rows.length;

		function renderPage() {
			const totalPages = Math.ceil(totalRows / rowsPerPage);
			const start = (currentPage - 1) * rowsPerPage;
			const end = Math.min(start + rowsPerPage, totalRows);

			rows.forEach(function (row, i) {
				row.style.display = i >= start && i < end ? "" : "none";
			});

			if (pageInfoEl) {
				pageInfoEl.textContent = `Page ${currentPage} of ${totalPages}`;
			}
			if (selectedInfoEl) {
				selectedInfoEl.textContent = `${selectedRows.size} of ${totalRows} row(s) selected.`;
			}

			if (firstBtn) firstBtn.disabled = currentPage === 1;
			if (prevBtn) prevBtn.disabled = currentPage === 1;
			if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
			if (lastBtn) lastBtn.disabled = currentPage >= totalPages;
		}

		if (rowsPerPageSelect) {
			rowsPerPageSelect.addEventListener("change", function () {
				rowsPerPage = parseInt(this.value);
				currentPage = 1;
				renderPage();
			});
		}

		if (firstBtn)
			firstBtn.addEventListener("click", function () {
				currentPage = 1;
				renderPage();
			});
		if (prevBtn)
			prevBtn.addEventListener("click", function () {
				if (currentPage > 1) {
					currentPage--;
					renderPage();
				}
			});
		if (nextBtn)
			nextBtn.addEventListener("click", function () {
				const totalPages = Math.ceil(totalRows / rowsPerPage);
				if (currentPage < totalPages) {
					currentPage++;
					renderPage();
				}
			});
		if (lastBtn)
			lastBtn.addEventListener("click", function () {
				currentPage = Math.ceil(totalRows / rowsPerPage);
				renderPage();
			});

		// Row checkboxes
		if (selectAllCheckbox) {
			selectAllCheckbox.addEventListener("change", function () {
				const checked = this.checked;
				tbody.querySelectorAll("[data-row-checkbox]").forEach(function (cb, i) {
					cb.checked = checked;
					const rowIdx = parseInt(cb.dataset.rowIndex);
					if (checked) {
						selectedRows.add(rowIdx);
					} else {
						selectedRows.delete(rowIdx);
					}
				});
				renderPage();
			});
		}

		tbody.querySelectorAll("[data-row-checkbox]").forEach(function (cb) {
			cb.addEventListener("change", function () {
				const rowIdx = parseInt(this.dataset.rowIndex);
				if (this.checked) {
					selectedRows.add(rowIdx);
				} else {
					selectedRows.delete(rowIdx);
					if (selectAllCheckbox) selectAllCheckbox.checked = false;
				}
				renderPage();
			});
		});

		// Column sorting
		table.querySelectorAll("th.sortable").forEach(function (th) {
			th.addEventListener("click", function () {
				const col = parseInt(this.dataset.col);
				const asc = this.dataset.sort !== "asc";
				this.dataset.sort = asc ? "asc" : "desc";

				const sorted = rows.slice().sort(function (a, b) {
					const aVal = a.cells[col] ? a.cells[col].textContent.trim() : "";
					const bVal = b.cells[col] ? b.cells[col].textContent.trim() : "";
					return asc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
				});
				sorted.forEach(function (row) {
					tbody.appendChild(row);
				});
				renderPage();
			});
		});

		renderPage();
	});
}
