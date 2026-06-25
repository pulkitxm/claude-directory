(function () {
	"use strict";

	/* Drawer */
	var openBtn = document.getElementById("drawer-open");
	var closeBtn = document.getElementById("drawer-close");
	var drawer = document.getElementById("drawer");
	var overlay = document.getElementById("drawer-overlay");

	function openDrawer() {
		if (!drawer || !overlay) return;
		drawer.classList.add("open");
		overlay.classList.add("open");
		if (openBtn) openBtn.setAttribute("aria-expanded", "true");
		document.body.style.overflow = "hidden";
	}
	function closeDrawer() {
		if (!drawer || !overlay) return;
		drawer.classList.remove("open");
		overlay.classList.remove("open");
		if (openBtn) openBtn.setAttribute("aria-expanded", "false");
		document.body.style.overflow = "";
	}
	if (openBtn) openBtn.addEventListener("click", openDrawer);
	if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
	if (overlay) overlay.addEventListener("click", closeDrawer);
	if (drawer) {
		drawer.querySelectorAll(".drawer-links a").forEach(function (a) {
			a.addEventListener("click", closeDrawer);
		});
	}

	/* Search modal */
	var searchBtn = document.getElementById("search-open");
	var searchModal = document.getElementById("search-modal");

	function openSearch() {
		if (!searchModal) return;
		searchModal.classList.add("open");
		document.body.style.overflow = "hidden";
		var inp = searchModal.querySelector("input");
		if (inp)
			setTimeout(function () {
				inp.focus();
			}, 50);
	}
	function closeSearch() {
		if (!searchModal) return;
		searchModal.classList.remove("open");
		document.body.style.overflow = "";
	}
	if (searchBtn) searchBtn.addEventListener("click", openSearch);
	if (searchModal) {
		var scrim = searchModal.querySelector(".scrim");
		if (scrim) scrim.addEventListener("click", closeSearch);
	}

	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") {
			closeDrawer();
			closeSearch();
		}
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			e.preventDefault();
			openSearch();
		}
	});

	/* Work slider */
	var track = document.getElementById("work-track");
	var prev = document.getElementById("slider-prev");
	var next = document.getElementById("slider-next");
	if (track) {
		function step() {
			var slide = track.querySelector(".work-slide");
			if (!slide) return 320;
			var gap = parseFloat(getComputedStyle(track).columnGap || "16") || 16;
			return slide.getBoundingClientRect().width + gap;
		}
		if (next)
			next.addEventListener("click", function () {
				track.scrollBy({ left: step(), behavior: "smooth" });
			});
		if (prev)
			prev.addEventListener("click", function () {
				track.scrollBy({ left: -step(), behavior: "smooth" });
			});
	}

	/* Char counter */
	var textarea = document.getElementById("message-field");
	var counter = document.getElementById("char-count");
	if (textarea && counter) {
		textarea.addEventListener("input", function () {
			if (textarea.value.length > 500)
				textarea.value = textarea.value.slice(0, 500);
			counter.textContent = textarea.value.length + "/500";
		});
	}
})();
