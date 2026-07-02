document.addEventListener("DOMContentLoaded", () => {
	// --- Sidebar Toggle Logic (Desktop) ---
	const desktopSidebarToggle = document.getElementById(
		"desktop-sidebar-toggle",
	);
	const sidebar = document.querySelector("aside");
	const mainContent = document.querySelector(".flex-1.flex.flex-col");

	if (desktopSidebarToggle && sidebar) {
		desktopSidebarToggle.addEventListener("click", () => {
			sidebar.classList.toggle("collapsed");
		});
	}

	// --- Mobile Sidebar Logic ---
	const mobileSidebarToggle = document.getElementById("mobile-sidebar-toggle");
	const mobileSidebarClose = document.getElementById("mobile-sidebar-close");

	if (mobileSidebarToggle && sidebar) {
		mobileSidebarToggle.addEventListener("click", () => {
			sidebar.classList.remove("-translate-x-full");
			sidebar.classList.add("translate-x-0");
		});
	}

	if (mobileSidebarClose && sidebar) {
		mobileSidebarClose.addEventListener("click", () => {
			sidebar.classList.remove("translate-x-0");
			sidebar.classList.add("-translate-x-full");
		});
	}

	// Close mobile sidebar on resize if screen is larger
	window.addEventListener("resize", () => {
		if (window.innerWidth >= 1280 && sidebar) {
			sidebar.classList.remove("translate-x-0", "-translate-x-full");
		}
	});

	// --- User Profile Dropdown ---
	const profileBtn = document.getElementById("profile-dropdown-btn");
	const profileMenu = document.getElementById("profile-dropdown-menu");

	if (profileBtn && profileMenu) {
		profileBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			profileMenu.classList.toggle("hidden");
		});
		document.addEventListener("click", () => {
			profileMenu.classList.add("hidden");
		});
	}

	// --- Revenue ApexChart (Dashboard Only) ---
	const revenueChartEl = document.getElementById("revenue-chart");
	if (revenueChartEl) {
		const isDark =
			document.documentElement.getAttribute("data-theme") === "dark";
		const options = {
			series: [
				{
					name: "Revenue",
					data: [
						3100, 4000, 2800, 5100, 4200, 10900, 10000, 12000, 9500, 11500,
						13000, 15000,
					],
				},
			],
			chart: {
				height: 250,
				type: "area",
				toolbar: { show: false },
				fontFamily: '"Plus Jakarta Sans", sans-serif',
				foreColor: isDark ? "#94A3B8" : "#94A3B8",
			},
			dataLabels: { enabled: false },
			stroke: { curve: "smooth", colors: ["#6f65e8"], width: 2 },
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.45,
					opacityTo: 0.05,
					stops: [0, 100],
					colorStops: [
						{ offset: 0, color: "#6f65e8", opacity: 0.45 },
						{ offset: 100, color: "#6f65e8", opacity: 0.05 },
					],
				},
			},
			grid: {
				borderColor: isDark ? "#334155" : "#e5e7eb",
				strokeDashArray: 3,
				xaxis: { lines: { show: false } },
				yaxis: { lines: { show: true } },
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				],
				axisBorder: { show: false },
				axisTicks: { show: false },
			},
			yaxis: {
				labels: {
					formatter: function (value) {
						return "$" + value / 1000 + "K";
					},
				},
			},
			tooltip: {
				theme: isDark ? "dark" : "light",
				x: { show: true },
			},
		};

		const chart = new ApexCharts(revenueChartEl, options);
		chart.render();

		// Handle monthly/annually/lifetime buttons
		const buttons = document.querySelectorAll("[data-revenue-type]");
		buttons.forEach((btn) => {
			btn.addEventListener("click", () => {
				buttons.forEach(
					(b) =>
						(b.className =
							"py-1.5 px-3 rounded-lg text-xs font-medium transition-colors bg-transparent text-gray-500 hover:text-gray-800 dark:hover:text-white"),
				);
				btn.className =
					"py-1.5 px-3 rounded-lg text-xs font-medium transition-colors bg-primary-500 text-white";

				const type = btn.getAttribute("data-revenue-type");
				let data = [];
				if (type === "monthly") {
					data = [
						3100, 4000, 2800, 5100, 4200, 10900, 10000, 12000, 9500, 11500,
						13000, 15000,
					];
				} else if (type === "annually") {
					data = [
						45000, 52000, 49000, 63000, 58000, 71000, 85000, 90000, 88000,
						95000, 110000, 125000,
					];
				} else {
					data = [
						120000, 140000, 160000, 185000, 210000, 240000, 280000, 310000,
						340000, 380000, 420000, 480000,
					];
				}
				chart.updateSeries([{ data: data }]);
			});
		});
	}

	// --- Device Distribution ApexChart (Dashboard Only) ---
	const deviceChartEl = document.getElementById("device-chart");
	if (deviceChartEl) {
		const isDark =
			document.documentElement.getAttribute("data-theme") === "dark";
		const options = {
			series: [55, 30, 15],
			chart: {
				type: "donut",
				height: 220,
				fontFamily: '"Plus Jakarta Sans", sans-serif',
			},
			labels: ["Desktop", "Mobile", "Tablet"],
			colors: ["#6f65e8", "#bdb8f4", "#e2e8f0"],
			legend: {
				position: "bottom",
				fontFamily: '"Plus Jakarta Sans", sans-serif',
				labels: { colors: isDark ? "#f8fafc" : "#1e293b" },
			},
			dataLabels: { enabled: false },
			stroke: { show: false },
			tooltip: {
				theme: isDark ? "dark" : "light",
			},
		};

		const chart = new ApexCharts(deviceChartEl, options);
		chart.render();
	}
});
