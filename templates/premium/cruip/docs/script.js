/* ============================================================
   Cruip Docs — script.js
   ============================================================ */

(function () {
	"use strict";

	/* ── Dark mode ─────────────────────────────────────────── */
	const html = document.documentElement;
	const toggle = document.getElementById("dark-toggle");

	function applyDarkMode(dark) {
		html.classList.toggle("dark", dark);
		if (toggle) toggle.checked = dark;
	}

	// Initialize from localStorage
	const stored = localStorage.getItem("dark-mode");
	applyDarkMode(stored === "true");

	if (toggle) {
		toggle.addEventListener("change", function () {
			const isDark = this.checked;
			applyDarkMode(isDark);
			localStorage.setItem("dark-mode", isDark);
		});
	}

	/* ── Search modal ──────────────────────────────────────── */
	const searchOverlay = document.getElementById("search-overlay");
	const searchModal = document.getElementById("search-modal");
	const searchInput = document.getElementById("modal-search");
	const searchBtns = document.querySelectorAll(".search-btn");

	function openSearch() {
		if (!searchModal) return;
		searchOverlay.classList.add("active");
		searchModal.classList.add("active");
		document.body.style.overflow = "hidden";
		setTimeout(() => searchInput && searchInput.focus(), 50);
	}

	function closeSearch() {
		if (!searchModal) return;
		searchOverlay.classList.remove("active");
		searchModal.classList.remove("active");
		document.body.style.overflow = "";
	}

	searchBtns.forEach((btn) => btn.addEventListener("click", openSearch));

	if (searchOverlay) {
		searchOverlay.addEventListener("click", closeSearch);
	}

	document.addEventListener("keydown", function (e) {
		if (
			e.key === "/" &&
			!["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
		) {
			e.preventDefault();
			openSearch();
		}
		if (e.key === "Escape") closeSearch();
	});

	/* ── Sidebar (mobile) ──────────────────────────────────── */
	const sidebar = document.getElementById("sidebar");
	const sidebarBackdrop = document.getElementById("sidebar-backdrop");
	const hamburgers = document.querySelectorAll(".hamburger-btn");

	function openSidebar() {
		if (!sidebar) return;
		sidebar.classList.add("open");
		sidebarBackdrop && sidebarBackdrop.classList.add("active");
		document.body.style.overflow = "hidden";
	}

	function closeSidebar() {
		if (!sidebar) return;
		sidebar.classList.remove("open");
		sidebarBackdrop && sidebarBackdrop.classList.remove("active");
		document.body.style.overflow = "";
	}

	hamburgers.forEach((btn) => btn.addEventListener("click", openSidebar));
	if (sidebarBackdrop) sidebarBackdrop.addEventListener("click", closeSidebar);
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") closeSidebar();
	});

	/* ── Collapsible nav (sidebar level 1 → 2) ────────────── */
	document.querySelectorAll(".nav-l1[data-toggle]").forEach(function (btn) {
		const targetId = btn.getAttribute("data-toggle");
		const list = document.getElementById(targetId);
		const chevron = btn.querySelector(".nav-chevron");

		btn.addEventListener("click", function () {
			const isOpen = !list.classList.contains("collapsed");
			list.classList.toggle("collapsed", isOpen);
			chevron && chevron.classList.toggle("open", !isOpen);
			btn.setAttribute("aria-expanded", String(!isOpen));
		});
	});

	/* ── Collapsible nav (level 2 → 3) ───────────────────── */
	document.querySelectorAll(".nav-l2[data-toggle]").forEach(function (btn) {
		const targetId = btn.getAttribute("data-toggle");
		const list = document.getElementById(targetId);
		const chevron = btn.querySelector(".nav-chevron");

		btn.addEventListener("click", function (e) {
			e.preventDefault();
			const isOpen = !list.classList.contains("collapsed");
			list.classList.toggle("collapsed", isOpen);
			chevron && chevron.classList.toggle("open", !isOpen);
			btn.setAttribute("aria-expanded", String(!isOpen));
		});
	});

	/* ── FAQ accordion ─────────────────────────────────────── */
	document.querySelectorAll(".faq-question").forEach(function (btn) {
		btn.addEventListener("click", function () {
			const item = this.closest(".faq-item");
			const answer = item.querySelector(".faq-answer");
			const chevron = this.querySelector(".faq-chevron");
			const isOpen = answer.classList.contains("open");

			// Close all
			document
				.querySelectorAll(".faq-answer.open")
				.forEach((a) => a.classList.remove("open"));
			document
				.querySelectorAll(".faq-chevron.open")
				.forEach((c) => c.classList.remove("open"));

			if (!isOpen) {
				answer.classList.add("open");
				chevron && chevron.classList.add("open");
			}
		});
	});

	/* ── Feedback buttons ──────────────────────────────────── */
	document.querySelectorAll(".feedback-btn").forEach(function (btn) {
		btn.addEventListener("click", function () {
			const group = this.closest(".feedback-buttons");
			group
				.querySelectorAll(".feedback-btn")
				.forEach((b) => b.classList.remove("selected"));
			this.classList.add("selected");
		});
	});

	/* ── Video modal ───────────────────────────────────────── */
	const videoOverlay = document.getElementById("video-overlay");
	const videoEl = document.getElementById("modal-video");

	document.querySelectorAll(".play-btn-circle").forEach(function (btn) {
		btn.addEventListener("click", function () {
			if (!videoOverlay) return;
			videoOverlay.classList.add("active");
			document.body.style.overflow = "hidden";
			videoEl && videoEl.play();
		});
	});

	function closeVideo() {
		if (!videoOverlay) return;
		videoOverlay.classList.remove("active");
		document.body.style.overflow = "";
		if (videoEl) {
			videoEl.pause();
			videoEl.currentTime = 0;
		}
	}

	const videoClose = document.getElementById("video-close");
	if (videoClose) videoClose.addEventListener("click", closeVideo);
	if (videoOverlay)
		videoOverlay.addEventListener("click", function (e) {
			if (e.target === this) closeVideo();
		});
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") closeVideo();
	});

	/* ── Scrollspy ─────────────────────────────────────────── */
	const scrollspyLinks = document.querySelectorAll(
		".right-nav-link[data-target]",
	);

	if (scrollspyLinks.length > 0) {
		const targets = [];
		scrollspyLinks.forEach(function (link) {
			const id = link.getAttribute("data-target");
			const el = document.getElementById(id);
			if (el) targets.push({ link, el });
		});

		function onScroll() {
			const offset =
				parseInt(getComputedStyle(html).getPropertyValue("--header-height")) +
					32 || 112;
			let active = targets[0];

			targets.forEach(function ({ link, el }) {
				link.classList.remove("scrollspy-active");
				if (el.getBoundingClientRect().top <= offset + 8) {
					active = { link, el };
				}
			});

			if (active) active.link.classList.add("scrollspy-active");
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	/* ── Smooth scroll for anchor links ───────────────────── */
	document.querySelectorAll('a[href^="#"]').forEach(function (link) {
		link.addEventListener("click", function (e) {
			const id = this.getAttribute("href").slice(1);
			if (!id) return;
			const target = document.getElementById(id);
			if (!target) return;
			e.preventDefault();
			const offset = 100;
			const top = target.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top, behavior: "smooth" });
		});
	});
})();
