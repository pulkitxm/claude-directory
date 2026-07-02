// Magic UI Startup clone — vanilla JS interactions.

// Sticky header background on scroll
const header = document.querySelector(".site-header");
if (header) {
	const onScroll = () =>
		header.classList.toggle("scrolled", window.scrollY > 8);
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();
}

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
if (hamburger && mobileMenu) {
	hamburger.addEventListener("click", () =>
		mobileMenu.classList.toggle("open"),
	);
}

// Retina dot-grid background canvas
const bgCanvas = document.getElementById("bg-canvas");
if (bgCanvas) {
	const ctx = bgCanvas.getContext("2d");
	function drawDots() {
		bgCanvas.width = bgCanvas.offsetWidth;
		bgCanvas.height = bgCanvas.offsetHeight;
		ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
		const gap = 20;
		ctx.fillStyle = "rgba(255,255,255,0.12)";
		for (let x = 0; x <= bgCanvas.width; x += gap) {
			for (let y = 0; y <= bgCanvas.height; y += gap) {
				ctx.beginPath();
				ctx.arc(x, y, 0.6, 0, Math.PI * 2);
				ctx.fill();
			}
		}
	}
	drawDots();
	window.addEventListener("resize", drawDots);
}

// Pricing annual/monthly toggle
const priceSwitch = document.querySelector(".switch");
if (priceSwitch) {
	const prices = {
		monthly: { basic: "10", premium: "20", enterprise: "50", ultimate: "80" },
		annual: { basic: "8", premium: "16", enterprise: "40", ultimate: "64" },
	};
	const apply = (mode) => {
		document.querySelectorAll("[data-price]").forEach((el) => {
			el.firstChild.nodeValue = "$" + prices[mode][el.dataset.price];
		});
	};
	priceSwitch.addEventListener("click", () => {
		const checked = priceSwitch.getAttribute("data-state") === "checked";
		const next = checked ? "unchecked" : "checked";
		priceSwitch.setAttribute("data-state", next);
		apply(next === "checked" ? "annual" : "monthly");
	});
}
