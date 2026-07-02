// main.js — Flabbergasted interactive behaviors

// === MOBILE NAV ===
document.addEventListener("DOMContentLoaded", function () {
	var toggle = document.getElementById("menu-toggle");
	var close = document.getElementById("menu-close");
	var menuIcon = document.getElementById("menu-icon");
	var closeIcon = document.getElementById("close-icon");
	var nav = document.getElementById("navigation-menu");

	function openMenu() {
		nav.classList.add("open");
		menuIcon.classList.add("hidden");
		closeIcon.classList.remove("hidden");
	}
	function closeMenu() {
		nav.classList.remove("open");
		menuIcon.classList.remove("hidden");
		closeIcon.classList.add("hidden");
	}

	if (toggle) toggle.addEventListener("click", openMenu);
	if (close) close.addEventListener("click", closeMenu);

	// Close on resize to desktop
	window.addEventListener("resize", function () {
		if (window.innerWidth >= 768) closeMenu();
	});
});

// === PRICING TOGGLE ===
document.addEventListener("DOMContentLoaded", function () {
	var monthlyBtn = document.getElementById("monthly-btn");
	var annualBtn = document.getElementById("annual-btn");
	var slider = document.getElementById("toggle-slider");
	var amounts = document.querySelectorAll(".pricing-amount");
	var monthlyTexts = document.querySelectorAll(".monthly-text");
	var annualTexts = document.querySelectorAll(".annual-text");
	var mode = "monthly";

	function setMode(m) {
		mode = m;
		if (m === "monthly") {
			slider.style.transform = "translateX(0)";
			monthlyBtn.classList.add("active");
			annualBtn.classList.remove("active");
			monthlyBtn.setAttribute("aria-pressed", "true");
			annualBtn.setAttribute("aria-pressed", "false");
			monthlyTexts.forEach(function (el) {
				el.style.display = "inline";
			});
			annualTexts.forEach(function (el) {
				el.style.display = "none";
			});
		} else {
			slider.style.transform = "translateX(100%)";
			annualBtn.classList.add("active");
			monthlyBtn.classList.remove("active");
			annualBtn.setAttribute("aria-pressed", "true");
			monthlyBtn.setAttribute("aria-pressed", "false");
			monthlyTexts.forEach(function (el) {
				el.style.display = "none";
			});
			annualTexts.forEach(function (el) {
				el.style.display = "inline";
			});
		}
		amounts.forEach(function (el) {
			el.textContent = el.dataset[m];
		});
	}

	if (monthlyBtn)
		monthlyBtn.addEventListener("click", function () {
			setMode("monthly");
		});
	if (annualBtn)
		annualBtn.addEventListener("click", function () {
			setMode("annual");
		});
	setMode("monthly");
});

// === VOICE PITCH PLAYER ===
var currentSource = null;
var currentCtx = null;

window.playWithRealPitch = function (semitones) {
	if (currentSource) {
		try {
			currentSource.stop();
		} catch (e) {}
	}
	if (currentCtx) {
		try {
			currentCtx.close();
		} catch (e) {}
	}
	// No audio file needed — this is a visual demo placeholder
	console.log("Play voice with pitch shift: " + semitones + " semitones");
};

// === KEEN SLIDER ===
document.addEventListener("DOMContentLoaded", function () {
	if (typeof KeenSlider === "undefined") return;
	var slider = new KeenSlider("#keen-slider", {
		slides: { perView: 1.05, spacing: 2 },
		breakpoints: {
			"(min-width: 640px)": { slides: { perView: 1.5, spacing: 2 } },
			"(min-width: 1024px)": { slides: { perView: 2.05, spacing: 2 } },
		},
	});

	var prev = document.getElementById("keen-slider-previous");
	var next = document.getElementById("keen-slider-next");
	if (prev)
		prev.addEventListener("click", function () {
			slider.prev();
		});
	if (next)
		next.addEventListener("click", function () {
			slider.next();
		});
});
