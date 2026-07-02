/* ============================================================
   BUIO — Shared JS (nav scroll, mobile menu, search modal)
   ============================================================ */

(function () {
	document.addEventListener("DOMContentLoaded", () => {
		/* ---- Sticky nav backdrop ---- */
		const nav = document.getElementById("nav-wrapper");
		if (nav) {
			const onScroll = () => {
				nav.classList.toggle("scrolled", window.scrollY > 20);
			};
			window.addEventListener("scroll", onScroll, { passive: true });
			onScroll();
		}

		/* ---- Mobile menu ---- */
		const toggle = document.getElementById("menu-toggle");
		const mobileMenu = document.getElementById("mobile-menu");
		const menuIcon = document.getElementById("menu-icon");
		const closeIcon = document.getElementById("close-icon");
		let menuOpen = false;

		if (toggle && mobileMenu) {
			toggle.addEventListener("click", () => {
				menuOpen = !menuOpen;
				mobileMenu.classList.toggle("open", menuOpen);
				if (menuIcon) menuIcon.classList.toggle("hidden", menuOpen);
				if (closeIcon) closeIcon.classList.toggle("hidden", !menuOpen);
			});

			window.addEventListener("resize", () => {
				if (window.innerWidth >= 768 && menuOpen) {
					menuOpen = false;
					mobileMenu.classList.remove("open");
					if (menuIcon) menuIcon.classList.remove("hidden");
					if (closeIcon) closeIcon.classList.add("hidden");
				}
			});
		}

		/* ---- Search modal ---- */
		const searchBtn = document.getElementById("searchBtn");
		const searchModal = document.getElementById("searchModal");
		const searchOverlay = document.getElementById("searchOverlay");
		const searchInput = document.getElementById("searchInput");
		const searchClose = document.getElementById("searchClose");

		function openSearch(e) {
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
			if (!searchModal) return;
			searchModal.classList.add("open");
			document.body.style.overflow = "hidden";
			setTimeout(() => searchInput && searchInput.focus(), 100);
		}

		function closeSearch() {
			if (!searchModal) return;
			searchModal.classList.remove("open");
			document.body.style.overflow = "";
			if (searchInput) searchInput.value = "";
		}

		if (searchBtn) searchBtn.addEventListener("click", openSearch);
		if (searchClose) searchClose.addEventListener("click", closeSearch);
		if (searchOverlay) searchOverlay.addEventListener("click", closeSearch);

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeSearch();
		});

		/* ---- AOS init ---- */
		if (typeof AOS !== "undefined") {
			AOS.init({
				once: true,
				duration: 600,
				easing: "ease",
				offset: 60,
				startEvent: "DOMContentLoaded",
			});
		}
	});
})();
