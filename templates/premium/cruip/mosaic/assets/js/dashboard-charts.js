// Utility functions
const hexToRGB = (h) => {
	let r = 0;
	let g = 0;
	let b = 0;
	if (h.length === 4) {
		r = `0x${h[1]}${h[1]}`;
		g = `0x${h[2]}${h[2]}`;
		b = `0x${h[3]}${h[3]}`;
	} else if (h.length === 7) {
		r = `0x${h[1]}${h[2]}`;
		g = `0x${h[3]}${h[4]}`;
		b = `0x${h[5]}${h[6]}`;
	}
	return `${+r},${+g},${+b}`;
};

const formatValue = (value) =>
	Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumSignificantDigits: 3,
		notation: "compact",
	}).format(value);

// Define Chart.js default settings
Chart.defaults.font.family = '"Inter", sans-serif';
Chart.defaults.font.weight = 500;
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.mode = "nearest";
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.position = "nearest";
Chart.defaults.plugins.tooltip.caretSize = 0;
Chart.defaults.plugins.tooltip.caretPadding = 20;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.padding = 8;

// Function that generates a gradient for line charts
const chartAreaGradient = (ctx, chartArea, colorStops) => {
	if (!ctx || !chartArea || !colorStops || colorStops.length === 0) {
		return "transparent";
	}
	const gradient = ctx.createLinearGradient(
		0,
		chartArea.bottom,
		0,
		chartArea.top,
	);
	colorStops.forEach(({ stop, color }) => {
		gradient.addColorStop(stop, color);
	});
	return gradient;
};

// Init #dashboard-01 chart
const dashboardCard01 = () => {
	const ctx = document.getElementById("dashboard-card-01");
	if (!ctx) return;

	const darkMode = localStorage.getItem("dark-mode") === "true";

	const tooltipBodyColor = {
		light: "#6B7280",
		dark: "#9CA3AF",
	};

	const tooltipBgColor = {
		light: "#ffffff",
		dark: "#374151",
	};

	const tooltipBorderColor = {
		light: "#E5E7EB",
		dark: "#4B5563",
	};

	// eslint-disable-next-line no-unused-vars
	const chart = new Chart(ctx, {
		type: "line",
		data: {
			labels: [
				"12-01-2022",
				"01-01-2023",
				"02-01-2023",
				"03-01-2023",
				"04-01-2023",
				"05-01-2023",
				"06-01-2023",
				"07-01-2023",
				"08-01-2023",
				"09-01-2023",
				"10-01-2023",
				"11-01-2023",
				"12-01-2023",
				"01-01-2024",
				"02-01-2024",
				"03-01-2024",
				"04-01-2024",
				"05-01-2024",
				"06-01-2024",
				"07-01-2024",
				"08-01-2024",
				"09-01-2024",
				"10-01-2024",
				"11-01-2024",
				"12-01-2024",
				"01-01-2025",
			],
			datasets: [
				// Indigo line
				{
					data: [
						732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391,
						192, 154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
					],
					fill: true,
					backgroundColor: function (context) {
						const chart = context.chart;
						const { ctx, chartArea } = chart;
						return chartAreaGradient(ctx, chartArea, [
							{ stop: 0, color: `rgba(${hexToRGB("#8470FF")}, 0)` },
							{ stop: 1, color: `rgba(${hexToRGB("#8470FF")}, 0.2)` },
						]);
					},
					borderColor: "#8470FF",
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: "#8470FF",
					pointHoverBackgroundColor: "#8470FF",
					pointBorderWidth: 0,
					pointHoverBorderWidth: 0,
					clip: 20,
					tension: 0.2,
				},
				// Gray line
				{
					data: [
						532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234,
						234, 314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642,
					],
					borderColor: `rgba(${hexToRGB("#6B7280")}, 0.25)`,
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: `rgba(${hexToRGB("#6B7280")}, 0.25)`,
					clip: 20,
					tension: 0.2,
				},
			],
		},
		options: {
			layout: {
				padding: 20,
			},
			scales: {
				y: {
					display: false,
					beginAtZero: true,
				},
				x: {
					type: "time",
					time: {
						parser: "MM-DD-YYYY",
						unit: "month",
					},
					display: false,
				},
			},
			plugins: {
				tooltip: {
					callbacks: {
						title: () => false, // Disable tooltip title
						label: (context) => formatValue(context.parsed.y),
					},
					bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
					backgroundColor: darkMode
						? tooltipBgColor.dark
						: tooltipBgColor.light,
					borderColor: darkMode
						? tooltipBorderColor.dark
						: tooltipBorderColor.light,
				},
				legend: {
					display: false,
				},
			},
			interaction: {
				intersect: false,
				mode: "nearest",
			},
			maintainAspectRatio: false,
		},
	});

	document.addEventListener("darkMode", (e) => {
		const { mode } = e.detail;
		if (mode === "on") {
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
		} else {
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
		}
		chart.update("none");
	});
};
dashboardCard01();

// Init #dashboard-02 chart
const dashboardCard02 = () => {
	const ctx = document.getElementById("dashboard-card-02");
	if (!ctx) return;

	const darkMode = localStorage.getItem("dark-mode") === "true";

	const tooltipBodyColor = {
		light: "#6B7280",
		dark: "#9CA3AF",
	};

	const tooltipBgColor = {
		light: "#ffffff",
		dark: "#374151",
	};

	const tooltipBorderColor = {
		light: "#E5E7EB",
		dark: "#4B5563",
	};

	// eslint-disable-next-line no-unused-vars
	const chart = new Chart(ctx, {
		type: "line",
		data: {
			labels: [
				"12-01-2022",
				"01-01-2023",
				"02-01-2023",
				"03-01-2023",
				"04-01-2023",
				"05-01-2023",
				"06-01-2023",
				"07-01-2023",
				"08-01-2023",
				"09-01-2023",
				"10-01-2023",
				"11-01-2023",
				"12-01-2023",
				"01-01-2024",
				"02-01-2024",
				"03-01-2024",
				"04-01-2024",
				"05-01-2024",
				"06-01-2024",
				"07-01-2024",
				"08-01-2024",
				"09-01-2024",
				"10-01-2024",
				"11-01-2024",
				"12-01-2024",
				"01-01-2025",
			],
			datasets: [
				// Indigo line
				{
					data: [
						622, 622, 426, 471, 365, 365, 238, 324, 288, 206, 324, 324, 500,
						409, 409, 273, 232, 273, 500, 570, 767, 808, 685, 767, 685, 685,
					],
					fill: true,
					backgroundColor: function (context) {
						const chart = context.chart;
						const { ctx, chartArea } = chart;
						return chartAreaGradient(ctx, chartArea, [
							{ stop: 0, color: `rgba(${hexToRGB("#8470FF")}, 0)` },
							{ stop: 1, color: `rgba(${hexToRGB("#8470FF")}, 0.2)` },
						]);
					},
					borderColor: "#8470FF",
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: "#8470FF",
					pointHoverBackgroundColor: "#8470FF",
					pointBorderWidth: 0,
					pointHoverBorderWidth: 0,
					clip: 20,
					tension: 0.2,
				},
				// Gray line
				{
					data: [
						732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391,
						192, 154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
					],
					borderColor: `rgba(${hexToRGB("#6B7280")}, 0.25)`,
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: `rgba(${hexToRGB("#6B7280")}, 0.25)`,
					clip: 20,
					tension: 0.2,
				},
			],
		},
		options: {
			layout: {
				padding: 20,
			},
			scales: {
				y: {
					display: false,
					beginAtZero: true,
				},
				x: {
					type: "time",
					time: {
						parser: "MM-DD-YYYY",
						unit: "month",
					},
					display: false,
				},
			},
			plugins: {
				tooltip: {
					callbacks: {
						title: () => false, // Disable tooltip title
						label: (context) => formatValue(context.parsed.y),
					},
					bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
					backgroundColor: darkMode
						? tooltipBgColor.dark
						: tooltipBgColor.light,
					borderColor: darkMode
						? tooltipBorderColor.dark
						: tooltipBorderColor.light,
				},
				legend: {
					display: false,
				},
			},
			interaction: {
				intersect: false,
				mode: "nearest",
			},
			maintainAspectRatio: false,
		},
	});

	document.addEventListener("darkMode", (e) => {
		const { mode } = e.detail;
		if (mode === "on") {
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
		} else {
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
		}
		chart.update("none");
	});
};
dashboardCard02();

// Init #dashboard-03 chart
const dashboardCard03 = () => {
	const ctx = document.getElementById("dashboard-card-03");
	if (!ctx) return;

	const darkMode = localStorage.getItem("dark-mode") === "true";

	const tooltipBodyColor = {
		light: "#6B7280",
		dark: "#9CA3AF",
	};

	const tooltipBgColor = {
		light: "#ffffff",
		dark: "#374151",
	};

	const tooltipBorderColor = {
		light: "#E5E7EB",
		dark: "#4B5563",
	};

	// eslint-disable-next-line no-unused-vars
	const chart = new Chart(ctx, {
		type: "line",
		data: {
			labels: [
				"12-01-2022",
				"01-01-2023",
				"02-01-2023",
				"03-01-2023",
				"04-01-2023",
				"05-01-2023",
				"06-01-2023",
				"07-01-2023",
				"08-01-2023",
				"09-01-2023",
				"10-01-2023",
				"11-01-2023",
				"12-01-2023",
				"01-01-2024",
				"02-01-2024",
				"03-01-2024",
				"04-01-2024",
				"05-01-2024",
				"06-01-2024",
				"07-01-2024",
				"08-01-2024",
				"09-01-2024",
				"10-01-2024",
				"11-01-2024",
				"12-01-2024",
				"01-01-2025",
			],
			datasets: [
				// Indigo line
				{
					data: [
						540, 466, 540, 466, 385, 432, 334, 334, 289, 289, 200, 289, 222,
						289, 289, 403, 554, 304, 289, 270, 134, 270, 829, 344, 388, 364,
					],
					fill: true,
					backgroundColor: function (context) {
						const chart = context.chart;
						const { ctx, chartArea } = chart;
						return chartAreaGradient(ctx, chartArea, [
							{ stop: 0, color: `rgba(${hexToRGB("#8470FF")}, 0)` },
							{ stop: 1, color: `rgba(${hexToRGB("#8470FF")}, 0.2)` },
						]);
					},
					borderColor: "#8470FF",
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: "#8470FF",
					pointHoverBackgroundColor: "#8470FF",
					pointBorderWidth: 0,
					pointHoverBorderWidth: 0,
					clip: 20,
					tension: 0.2,
				},
				// Gray line
				{
					data: [
						689, 562, 477, 477, 477, 477, 458, 314, 430, 378, 430, 498, 642,
						350, 145, 145, 354, 260, 188, 188, 300, 300, 282, 364, 660, 554,
					],
					borderColor: `rgba(${hexToRGB("#6B7280")}, 0.25)`,
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: `rgba(${hexToRGB("#6B7280")}, 0.25)`,
					clip: 20,
					tension: 0.2,
				},
			],
		},
		options: {
			layout: {
				padding: 20,
			},
			scales: {
				y: {
					display: false,
					beginAtZero: true,
				},
				x: {
					type: "time",
					time: {
						parser: "MM-DD-YYYY",
						unit: "month",
					},
					display: false,
				},
			},
			plugins: {
				tooltip: {
					callbacks: {
						title: () => false, // Disable tooltip title
						label: (context) => formatValue(context.parsed.y),
					},
					bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
					backgroundColor: darkMode
						? tooltipBgColor.dark
						: tooltipBgColor.light,
					borderColor: darkMode
						? tooltipBorderColor.dark
						: tooltipBorderColor.light,
				},
				legend: {
					display: false,
				},
			},
			interaction: {
				intersect: false,
				mode: "nearest",
			},
			maintainAspectRatio: false,
		},
	});

	document.addEventListener("darkMode", (e) => {
		const { mode } = e.detail;
		if (mode === "on") {
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
		} else {
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
		}
		chart.update("none");
	});
};
dashboardCard03();

// Init #dashboard-04 chart
const dashboardCard04 = () => {
	const ctx = document.getElementById("dashboard-card-04");
	if (!ctx) return;

	const darkMode = localStorage.getItem("dark-mode") === "true";

	const textColor = {
		light: "#9CA3AF",
		dark: "#6B7280",
	};

	const gridColor = {
		light: "#F3F4F6",
		dark: `rgba(${hexToRGB("#374151")}, 0.6)`,
	};

	const tooltipBodyColor = {
		light: "#6B7280",
		dark: "#9CA3AF",
	};

	const tooltipBgColor = {
		light: "#ffffff",
		dark: "#374151",
	};

	const tooltipBorderColor = {
		light: "#E5E7EB",
		dark: "#4B5563",
	};

	// eslint-disable-next-line no-unused-vars
	const chart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: [
				"12-01-2022",
				"01-01-2023",
				"02-01-2023",
				"03-01-2023",
				"04-01-2023",
				"05-01-2023",
			],
			datasets: [
				// Light blue bars
				{
					label: "Direct",
					data: [800, 1600, 900, 1300, 1950, 1700],
					backgroundColor: "#67BFFF",
					hoverBackgroundColor: "#56B1F3",
					barPercentage: 0.7,
					categoryPercentage: 0.7,
					borderRadius: 4,
				},
				// Blue bars
				{
					label: "Indirect",
					data: [4900, 2600, 5350, 4800, 5200, 4800],
					backgroundColor: "#8470FF",
					hoverBackgroundColor: "#755FF8",
					barPercentage: 0.7,
					categoryPercentage: 0.7,
					borderRadius: 4,
				},
			],
		},
		options: {
			layout: {
				padding: {
					top: 12,
					bottom: 16,
					left: 20,
					right: 20,
				},
			},
			scales: {
				y: {
					border: {
						display: false,
					},
					ticks: {
						maxTicksLimit: 5,
						callback: (value) => formatValue(value),
						color: darkMode ? textColor.dark : textColor.light,
					},
					grid: {
						color: darkMode ? gridColor.dark : gridColor.light,
					},
				},
				x: {
					type: "time",
					time: {
						parser: "MM-DD-YYYY",
						unit: "month",
						displayFormats: {
							month: "MMM YY",
						},
					},
					border: {
						display: false,
					},
					grid: {
						display: false,
					},
					ticks: {
						color: darkMode ? textColor.dark : textColor.light,
					},
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				htmlLegend: {
					// ID of the container to put the legend in
					containerID: "dashboard-card-04-legend",
				},
				tooltip: {
					callbacks: {
						title: () => false, // Disable tooltip title
						label: (context) => formatValue(context.parsed.y),
					},
					bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
					backgroundColor: darkMode
						? tooltipBgColor.dark
						: tooltipBgColor.light,
					borderColor: darkMode
						? tooltipBorderColor.dark
						: tooltipBorderColor.light,
				},
			},
			interaction: {
				intersect: false,
				mode: "nearest",
			},
			animation: {
				duration: 200,
			},
			maintainAspectRatio: false,
		},
		plugins: [
			{
				id: "htmlLegend",
				afterUpdate(c, args, options) {
					const legendContainer = document.getElementById(options.containerID);
					const ul = legendContainer.querySelector("ul");
					if (!ul) return;
					// Remove old legend items
					while (ul.firstChild) {
						ul.firstChild.remove();
					}
					// Reuse the built-in legendItems generator
					const items = c.options.plugins.legend.labels.generateLabels(c);
					items.forEach((item) => {
						const li = document.createElement("li");
						// Button element
						const button = document.createElement("button");
						button.style.display = "inline-flex";
						button.style.alignItems = "center";
						button.style.opacity = item.hidden ? ".3" : "";
						button.onclick = () => {
							c.setDatasetVisibility(
								item.datasetIndex,
								!c.isDatasetVisible(item.datasetIndex),
							);
							c.update();
						};
						// Color box
						const box = document.createElement("span");
						box.style.display = "block";
						box.style.width = "12px";
						box.style.height = "12px";
						box.style.borderRadius = "9999px";
						box.style.marginRight = "8px";
						box.style.borderWidth = "3px";
						box.style.borderColor = item.fillStyle;
						box.style.pointerEvents = "none";
						// Label
						const labelContainer = document.createElement("span");
						labelContainer.style.display = "flex";
						labelContainer.style.alignItems = "center";
						const value = document.createElement("span");
						value.classList.add("text-gray-800", "dark:text-gray-100");
						value.style.fontSize = "1.88rem";
						value.style.lineHeight = "1.33";
						value.style.fontWeight = "700";
						value.style.marginRight = "8px";
						value.style.pointerEvents = "none";
						const label = document.createElement("span");
						label.classList.add("text-gray-500", "dark:text-gray-400");
						label.style.fontSize = "0.875rem";
						label.style.lineHeight = "1.5715";
						const theValue = c.data.datasets[item.datasetIndex].data.reduce(
							(a, b) => a + b,
							0,
						);
						const valueText = document.createTextNode(formatValue(theValue));
						const labelText = document.createTextNode(item.text);
						value.appendChild(valueText);
						label.appendChild(labelText);
						li.appendChild(button);
						button.appendChild(box);
						button.appendChild(labelContainer);
						labelContainer.appendChild(value);
						labelContainer.appendChild(label);
						ul.appendChild(li);
					});
				},
			},
		],
	});

	document.addEventListener("darkMode", (e) => {
		const { mode } = e.detail;
		if (mode === "on") {
			chart.options.scales.x.ticks.color = textColor.dark;
			chart.options.scales.y.ticks.color = textColor.dark;
			chart.options.scales.y.grid.color = gridColor.dark;
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
		} else {
			chart.options.scales.x.ticks.color = textColor.light;
			chart.options.scales.y.ticks.color = textColor.light;
			chart.options.scales.y.grid.color = gridColor.light;
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
		}
		chart.update("none");
	});
};
dashboardCard04();

// Init #dashboard-05 chart
const dashboardCard05 = () => {
	const ctx = document.getElementById("dashboard-card-05");
	if (!ctx) return;

	const darkMode = localStorage.getItem("dark-mode") === "true";

	const textColor = {
		light: "#9CA3AF",
		dark: "#6B7280",
	};

	const gridColor = {
		light: "#F3F4F6",
		dark: `rgba(${hexToRGB("#374151")}, 0.6)`,
	};

	const tooltipTitleColor = {
		light: "#1F2937",
		dark: "#F3F4F6",
	};

	const tooltipBodyColor = {
		light: "#6B7280",
		dark: "#9CA3AF",
	};

	const tooltipBgColor = {
		light: "#ffffff",
		dark: "#374151",
	};

	const tooltipBorderColor = {
		light: "#E5E7EB",
		dark: "#4B5563",
	};

	// Fake real-time data
	const data = [
		57.81, 57.75, 55.48, 54.28, 53.14, 52.25, 51.04, 52.49, 55.49, 56.87, 53.73,
		56.42, 58.06, 55.62, 58.16, 55.22, 58.67, 60.18, 61.31, 63.25, 65.91, 64.44,
		65.97, 62.27, 60.96, 59.34, 55.07, 59.85, 53.79, 51.92, 50.95, 49.65, 48.09,
		49.81, 47.85, 49.52, 50.21, 52.22, 54.42, 53.42, 50.91, 58.52, 53.37, 57.58,
		59.09, 59.36, 58.71, 59.42, 55.93, 57.71, 50.62, 56.28, 57.37, 53.08, 55.94,
		55.82, 53.94, 52.65, 50.25,
	];
	// Fake real-time labels
	const generateDates = () => {
		const now = new Date();
		const dates = [];
		data.forEach((v, i) => {
			dates.push(new Date(now - 2000 - i * 2000));
		});
		return dates;
	};
	const labels = generateDates();
	let range = 35;
	let increment = 0;
	const slicedData = data.slice(0, range);
	const slicedLabels = labels.slice(0, range).reverse();

	const chart = new Chart(ctx, {
		type: "line",
		data: {
			labels: slicedLabels,
			datasets: [
				// Indigo line
				{
					data: slicedData,
					fill: true,
					backgroundColor: function (context) {
						const chart = context.chart;
						const { ctx, chartArea } = chart;
						return chartAreaGradient(ctx, chartArea, [
							{ stop: 0, color: `rgba(${hexToRGB("#8470FF")}, 0)` },
							{ stop: 1, color: `rgba(${hexToRGB("#8470FF")}, 0.2)` },
						]);
					},
					borderColor: "#8470FF",
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: "#8470FF",
					pointHoverBackgroundColor: "#8470FF",
					pointBorderWidth: 0,
					pointHoverBorderWidth: 0,
					clip: 20,
					tension: 0.2,
				},
			],
		},
		options: {
			layout: {
				padding: 20,
			},
			scales: {
				y: {
					border: {
						display: false,
					},
					suggestedMin: 30,
					suggestedMax: 80,
					ticks: {
						maxTicksLimit: 5,
						callback: (value) => formatValue(value),
						color: darkMode ? textColor.dark : textColor.light,
					},
					grid: {
						color: darkMode ? gridColor.dark : gridColor.light,
					},
				},
				x: {
					type: "time",
					time: {
						parser: "hh:mm:ss",
						unit: "second",
						tooltipFormat: "MMM DD, H:mm:ss a",
						displayFormats: {
							second: "H:mm:ss",
						},
					},
					border: {
						display: false,
					},
					grid: {
						display: false,
					},
					ticks: {
						autoSkipPadding: 48,
						maxRotation: 0,
						color: darkMode ? textColor.dark : textColor.light,
					},
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					titleFont: {
						weight: 600,
					},
					callbacks: {
						label: (context) => formatValue(context.parsed.y),
					},
					titleColor: darkMode
						? tooltipTitleColor.dark
						: tooltipTitleColor.light,
					bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
					backgroundColor: darkMode
						? tooltipBgColor.dark
						: tooltipBgColor.light,
					borderColor: darkMode
						? tooltipBorderColor.dark
						: tooltipBorderColor.light,
				},
			},
			interaction: {
				intersect: false,
				mode: "nearest",
			},
			animation: false,
			maintainAspectRatio: false,
		},
	});

	// Fake real-time
	// For demo purposes only!
	const chartValue = document.getElementById("dashboard-card-05-value");
	const chartDeviation = document.getElementById("dashboard-card-05-deviation");

	const adddata = (value = NaN, prev) => {
		const { datasets } = chart.data;
		chart.data.labels.shift();
		chart.data.labels.push(new Date());
		datasets[0].data.shift();
		datasets[0].data.push(value);
		chart.update(0);
		if (!chartValue) return;
		const diff = ((value - prev) / prev) * 100;
		chartValue.innerHTML = value;
		if (!chartDeviation) return;
		if (diff < 0) {
			chartDeviation.style.backgroundColor = `rgba(${hexToRGB("#FF5656")}, 0.2)`;
			chartDeviation.style.color = "#E63939";
		} else {
			chartDeviation.style.backgroundColor = `rgba(${hexToRGB("#3EC972")}, 0.2)`;
			chartDeviation.style.color = "#239f52";
		}
		chartDeviation.innerHTML = `${diff > 0 ? "+" : ""}${diff.toFixed(2)}%`;
	};

	const reload = () => {
		increment += 1;
		if (increment + range - 1 < data.length) {
			adddata(data[increment + range - 1], data[increment + range - 2]);
		} else {
			increment = 0;
			range = 1;
			adddata(data[increment + range - 1], data[data.length - 1]);
		}
		setTimeout(reload, 2000);
	};
	reload();

	document.addEventListener("darkMode", (e) => {
		const { mode } = e.detail;
		if (mode === "on") {
			chart.options.scales.x.ticks.color = textColor.dark;
			chart.options.scales.y.ticks.color = textColor.dark;
			chart.options.scales.y.grid.color = gridColor.dark;
			chart.options.plugins.tooltip.titleColor = tooltipTitleColor.dark;
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
		} else {
			chart.options.scales.x.ticks.color = textColor.light;
			chart.options.scales.y.ticks.color = textColor.light;
			chart.options.scales.y.grid.color = gridColor.light;
			chart.options.plugins.tooltip.titleColor = tooltipTitleColor.light;
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
		}
		chart.update("none");
	});
};
dashboardCard05();

// Init #dashboard-06 chart
const dashboardCard06 = () => {
	const ctx = document.getElementById("dashboard-card-06");
	if (!ctx) return;

	const darkMode = localStorage.getItem("dark-mode") === "true";

	const tooltipTitleColor = {
		light: "#1F2937",
		dark: "#F3F4F6",
	};

	const tooltipBodyColor = {
		light: "#6B7280",
		dark: "#9CA3AF",
	};

	const tooltipBgColor = {
		light: "#ffffff",
		dark: "#374151",
	};

	const tooltipBorderColor = {
		light: "#E5E7EB",
		dark: "#4B5563",
	};

	// eslint-disable-next-line no-unused-vars
	const chart = new Chart(ctx, {
		type: "doughnut",
		data: {
			labels: ["United States", "Italy", "Other"],
			datasets: [
				{
					label: "Top Countries",
					data: [35, 30, 35],
					backgroundColor: ["#8470FF", "#67BFFF", "#4634B1"],
					hoverBackgroundColor: ["#755FF8", "#56B1F3", "#2F227C"],
					borderWidth: 0,
				},
			],
		},
		options: {
			cutout: "80%",
			layout: {
				padding: 24,
			},
			plugins: {
				legend: {
					display: false,
				},
				htmlLegend: {
					// ID of the container to put the legend in
					containerID: "dashboard-card-06-legend",
				},
				tooltip: {
					titleColor: darkMode
						? tooltipTitleColor.dark
						: tooltipTitleColor.light,
					bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
					backgroundColor: darkMode
						? tooltipBgColor.dark
						: tooltipBgColor.light,
					borderColor: darkMode
						? tooltipBorderColor.dark
						: tooltipBorderColor.light,
				},
			},
			interaction: {
				intersect: false,
				mode: "nearest",
			},
			animation: {
				duration: 200,
			},
			maintainAspectRatio: false,
		},
		plugins: [
			{
				id: "htmlLegend",
				afterUpdate(c, args, options) {
					const legendContainer = document.getElementById(options.containerID);
					const ul = legendContainer.querySelector("ul");
					if (!ul) return;
					// Remove old legend items
					while (ul.firstChild) {
						ul.firstChild.remove();
					}
					// Reuse the built-in legendItems generator
					const items = c.options.plugins.legend.labels.generateLabels(c);
					items.forEach((item) => {
						const li = document.createElement("li");
						li.style.margin = "4px";
						// Button element
						const button = document.createElement("button");
						button.classList.add(
							"btn-xs",
							"bg-white",
							"dark:bg-gray-700",
							"text-gray-500",
							"dark:text-gray-400",
							"shadow-sm",
							"shadow-black/[0.08]",
							"rounded-full",
						);
						button.style.opacity = item.hidden ? ".3" : "";
						button.onclick = () => {
							c.toggleDataVisibility(item.index, !item.index);
							c.update();
						};
						// Color box
						const box = document.createElement("span");
						box.style.display = "block";
						box.style.width = "8px";
						box.style.height = "8px";
						box.style.backgroundColor = item.fillStyle;
						box.style.borderRadius = "2px";
						box.style.marginRight = "4px";
						box.style.pointerEvents = "none";
						// Label
						const label = document.createElement("span");
						label.style.display = "flex";
						label.style.alignItems = "center";
						const labelText = document.createTextNode(item.text);
						label.appendChild(labelText);
						li.appendChild(button);
						button.appendChild(box);
						button.appendChild(label);
						ul.appendChild(li);
					});
				},
			},
		],
	});

	document.addEventListener("darkMode", (e) => {
		const { mode } = e.detail;
		if (mode === "on") {
			chart.options.plugins.tooltip.titleColor = tooltipTitleColor.dark;
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
		} else {
			chart.options.plugins.tooltip.titleColor = tooltipTitleColor.light;
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
		}
		chart.update("none");
	});
};
dashboardCard06();

// Init #dashboard-08 chart
const dashboardCard08 = () => {
	const ctx = document.getElementById("dashboard-card-08");
	if (!ctx) return;

	const darkMode = localStorage.getItem("dark-mode") === "true";

	const textColor = {
		light: "#9CA3AF",
		dark: "#6B7280",
	};

	const gridColor = {
		light: "#F3F4F6",
		dark: `rgba(${hexToRGB("#374151")}, 0.6)`,
	};

	const tooltipBodyColor = {
		light: "#6B7280",
		dark: "#9CA3AF",
	};

	const tooltipBgColor = {
		light: "#ffffff",
		dark: "#374151",
	};

	const tooltipBorderColor = {
		light: "#E5E7EB",
		dark: "#4B5563",
	};

	// eslint-disable-next-line no-unused-vars
	const chart = new Chart(ctx, {
		type: "line",
		data: {
			labels: [
				"12-01-2022",
				"01-01-2023",
				"02-01-2023",
				"03-01-2023",
				"04-01-2023",
				"05-01-2023",
				"06-01-2023",
				"07-01-2023",
				"08-01-2023",
				"09-01-2023",
				"10-01-2023",
				"11-01-2023",
				"12-01-2023",
				"01-01-2024",
				"02-01-2024",
				"03-01-2024",
				"04-01-2024",
				"05-01-2024",
				"06-01-2024",
				"07-01-2024",
				"08-01-2024",
				"09-01-2024",
				"10-01-2024",
				"11-01-2024",
				"12-01-2024",
				"01-01-2025",
			],
			datasets: [
				// Indigo line
				{
					label: "Current",
					data: [
						73, 64, 73, 69, 104, 104, 164, 164, 120, 120, 120, 148, 142, 104,
						122, 110, 104, 152, 166, 233, 268, 252, 284, 284, 333, 323,
					],
					borderColor: "#8470FF",
					fill: false,
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: "#8470FF",
					pointHoverBackgroundColor: "#8470FF",
					pointBorderWidth: 0,
					pointHoverBorderWidth: 0,
					clip: 20,
					tension: 0.2,
				},
				// Blue line
				{
					label: "Previous",
					data: [
						184, 86, 42, 378, 42, 243, 38, 120, 0, 0, 42, 0, 84, 0, 276, 0, 124,
						42, 124, 88, 88, 215, 156, 88, 124, 64,
					],
					borderColor: "#67BFFF",
					fill: false,
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: "#67BFFF",
					pointHoverBackgroundColor: "#67BFFF",
					pointBorderWidth: 0,
					pointHoverBorderWidth: 0,
					clip: 20,
					tension: 0.2,
				},
				// green line
				{
					label: "Average",
					data: [
						122, 170, 192, 86, 102, 124, 115, 115, 56, 104, 0, 72, 208, 186,
						223, 188, 114, 162, 200, 150, 118, 118, 76, 122, 230, 268,
					],
					borderColor: "#3EC972",
					fill: false,
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: "#3EC972",
					pointHoverBackgroundColor: "#3EC972",
					pointBorderWidth: 0,
					pointHoverBorderWidth: 0,
					clip: 20,
					tension: 0.2,
				},
			],
		},
		options: {
			layout: {
				padding: 20,
			},
			scales: {
				y: {
					beginAtZero: true,
					border: {
						display: false,
					},
					ticks: {
						maxTicksLimit: 5,
						callback: (value) => formatValue(value),
						color: darkMode ? textColor.dark : textColor.light,
					},
					grid: {
						color: darkMode ? gridColor.dark : gridColor.light,
					},
				},
				x: {
					type: "time",
					time: {
						parser: "MM-DD-YYYY",
						unit: "month",
						displayFormats: {
							month: "MMM YY",
						},
					},
					border: {
						display: false,
					},
					grid: {
						display: false,
					},
					ticks: {
						autoSkipPadding: 48,
						maxRotation: 0,
						color: darkMode ? textColor.dark : textColor.light,
					},
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				htmlLegend: {
					// ID of the container to put the legend in
					containerID: "dashboard-card-08-legend",
				},
				tooltip: {
					callbacks: {
						title: () => false, // Disable tooltip title
						label: (context) => formatValue(context.parsed.y),
					},
					bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
					backgroundColor: darkMode
						? tooltipBgColor.dark
						: tooltipBgColor.light,
					borderColor: darkMode
						? tooltipBorderColor.dark
						: tooltipBorderColor.light,
				},
			},
			interaction: {
				intersect: false,
				mode: "nearest",
			},
			maintainAspectRatio: false,
		},
		plugins: [
			{
				id: "htmlLegend",
				afterUpdate(c, args, options) {
					const legendContainer = document.getElementById(options.containerID);
					const ul = legendContainer.querySelector("ul");
					if (!ul) return;
					// Remove old legend items
					while (ul.firstChild) {
						ul.firstChild.remove();
					}
					// Reuse the built-in legendItems generator
					const items = c.options.plugins.legend.labels.generateLabels(c);
					items.slice(0, 2).forEach((item) => {
						const li = document.createElement("li");
						// Button element
						const button = document.createElement("button");
						button.style.display = "inline-flex";
						button.style.alignItems = "center";
						button.style.opacity = item.hidden ? ".3" : "";
						button.onclick = () => {
							c.setDatasetVisibility(
								item.datasetIndex,
								!c.isDatasetVisible(item.datasetIndex),
							);
							c.update();
						};
						// Color box
						const box = document.createElement("span");
						box.style.display = "block";
						box.style.width = "12px";
						box.style.height = "12px";
						box.style.borderRadius = "9999px";
						box.style.marginRight = "8px";
						box.style.borderWidth = "3px";
						box.style.borderColor =
							c.data.datasets[item.datasetIndex].borderColor;
						box.style.pointerEvents = "none";
						// Label
						const label = document.createElement("span");
						label.classList.add("text-gray-500", "dark:text-gray-400");
						label.style.fontSize = "0.875rem";
						label.style.lineHeight = "1.5715";
						const labelText = document.createTextNode(item.text);
						label.appendChild(labelText);
						li.appendChild(button);
						button.appendChild(box);
						button.appendChild(label);
						ul.appendChild(li);
					});
				},
			},
		],
	});

	document.addEventListener("darkMode", (e) => {
		const { mode } = e.detail;
		if (mode === "on") {
			chart.options.scales.x.ticks.color = textColor.dark;
			chart.options.scales.y.ticks.color = textColor.dark;
			chart.options.scales.y.grid.color = gridColor.dark;
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
		} else {
			chart.options.scales.x.ticks.color = textColor.light;
			chart.options.scales.y.ticks.color = textColor.light;
			chart.options.scales.y.grid.color = gridColor.light;
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
		}
		chart.update("none");
	});
};
dashboardCard08();

// Init #dashboard-09 chart
const dashboardCard09 = () => {
	const ctx = document.getElementById("dashboard-card-09");
	if (!ctx) return;

	const darkMode = localStorage.getItem("dark-mode") === "true";

	const textColor = {
		light: "#9CA3AF",
		dark: "#6B7280",
	};

	const gridColor = {
		light: "#F3F4F6",
		dark: `rgba(${hexToRGB("#374151")}, 0.6)`,
	};

	const tooltipBodyColor = {
		light: "#6B7280",
		dark: "#9CA3AF",
	};

	const tooltipBgColor = {
		light: "#ffffff",
		dark: "#374151",
	};

	const tooltipBorderColor = {
		light: "#E5E7EB",
		dark: "#4B5563",
	};

	// eslint-disable-next-line no-unused-vars
	const chart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: [
				"12-01-2022",
				"01-01-2023",
				"02-01-2023",
				"03-01-2023",
				"04-01-2023",
				"05-01-2023",
			],
			datasets: [
				// Light blue bars
				{
					label: "Stack 1",
					data: [6200, 9200, 6600, 8800, 5200, 9200],
					backgroundColor: "#8470FF",
					hoverBackgroundColor: "#755FF8",
					barPercentage: 0.7,
					categoryPercentage: 0.7,
					borderRadius: 4,
				},
				// Blue bars
				{
					label: "Stack 2",
					data: [-4000, -2600, -5350, -4000, -7500, -2000],
					backgroundColor: "#D2CBFF",
					hoverBackgroundColor: "#B7ACFF",
					barPercentage: 0.7,
					categoryPercentage: 0.7,
					borderRadius: 4,
				},
			],
		},
		options: {
			layout: {
				padding: {
					top: 12,
					bottom: 16,
					left: 20,
					right: 20,
				},
			},
			scales: {
				y: {
					stacked: true,
					border: {
						display: false,
					},
					beginAtZero: true,
					ticks: {
						maxTicksLimit: 5,
						callback: (value) => formatValue(value),
						color: darkMode ? textColor.dark : textColor.light,
					},
					grid: {
						color: darkMode ? gridColor.dark : gridColor.light,
					},
				},
				x: {
					stacked: true,
					type: "time",
					time: {
						parser: "MM-DD-YYYY",
						unit: "month",
						displayFormats: {
							month: "MMM YY",
						},
					},
					border: {
						display: false,
					},
					grid: {
						display: false,
					},
					ticks: {
						autoSkipPadding: 48,
						maxRotation: 0,
						color: darkMode ? textColor.dark : textColor.light,
					},
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					callbacks: {
						title: () => false, // Disable tooltip title
						label: (context) => formatValue(context.parsed.y),
					},
					bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
					backgroundColor: darkMode
						? tooltipBgColor.dark
						: tooltipBgColor.light,
					borderColor: darkMode
						? tooltipBorderColor.dark
						: tooltipBorderColor.light,
				},
			},
			interaction: {
				intersect: false,
				mode: "nearest",
			},
			animation: {
				duration: 200,
			},
			maintainAspectRatio: false,
		},
	});

	document.addEventListener("darkMode", (e) => {
		const { mode } = e.detail;
		if (mode === "on") {
			chart.options.scales.x.ticks.color = textColor.dark;
			chart.options.scales.y.ticks.color = textColor.dark;
			chart.options.scales.y.grid.color = gridColor.dark;
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
		} else {
			chart.options.scales.x.ticks.color = textColor.light;
			chart.options.scales.y.ticks.color = textColor.light;
			chart.options.scales.y.grid.color = gridColor.light;
			chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
			chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
			chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
		}
		chart.update("none");
	});
};
dashboardCard09();
