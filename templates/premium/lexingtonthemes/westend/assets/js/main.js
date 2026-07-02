/* Westend — Main JS */
(function () {
	"use strict";

	/* ── Theme Toggle ── */
	var themeToggle = document.getElementById("themeToggle");
	if (themeToggle) {
		themeToggle.addEventListener("click", function () {
			var root = document.documentElement;
			if (root.classList.contains("dark")) {
				root.classList.remove("dark");
				root.classList.add("light");
				try {
					localStorage.setItem("westend-theme", "light");
				} catch (e) {}
			} else {
				root.classList.remove("light");
				root.classList.add("dark");
				try {
					localStorage.setItem("westend-theme", "dark");
				} catch (e) {}
			}
		});
	}

	/* ── Sticky nav shadow ── */
	var nav = document.getElementById("site-nav");
	if (nav) {
		var onScroll = function () {
			if (window.scrollY > 8) {
				nav.classList.add("nav--scrolled");
			} else {
				nav.classList.remove("nav--scrolled");
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	/* ── Mobile nav ── */
	var mobileBtn = document.getElementById("mobileNavBtn");
	var mobileClose = document.getElementById("mobileNavClose");
	var overlay = document.getElementById("mobileOverlay");
	var panel = document.getElementById("mobileNavPanel");

	function openMobileNav() {
		if (!panel) return;
		panel.classList.add("open");
		overlay && overlay.classList.add("open");
		document.body.style.overflow = "hidden";
		mobileBtn && mobileBtn.setAttribute("aria-expanded", "true");
		panel.setAttribute("aria-hidden", "false");
	}
	function closeMobileNav() {
		if (!panel) return;
		panel.classList.remove("open");
		overlay && overlay.classList.remove("open");
		document.body.style.overflow = "";
		mobileBtn && mobileBtn.setAttribute("aria-expanded", "false");
		panel.setAttribute("aria-hidden", "true");
	}

	mobileBtn && mobileBtn.addEventListener("click", openMobileNav);
	mobileClose && mobileClose.addEventListener("click", closeMobileNav);
	overlay && overlay.addEventListener("click", closeMobileNav);
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") closeMobileNav();
	});

	/* ── Search modal ── */
	var searchBtn = document.getElementById("searchBtn");
	var searchModal = document.getElementById("searchModal");
	var closeSearch = document.getElementById("closeSearch");
	var searchInput = document.getElementById("searchInput");
	var searchResults = document.getElementById("searchResults");

	// Search data (all pages)
	var searchData = [
		{
			title: "Home",
			description: "Westend premier Nordic real estate agency",
			url: "index.html",
			type: "Page",
		},
		{
			title: "All Properties",
			description: "Browse all available properties",
			url: "properties.html",
			type: "Page",
		},
		{
			title: "Properties For Sale",
			description: "Properties available for purchase",
			url: "properties-for-sale.html",
			type: "Page",
		},
		{
			title: "Properties For Rent",
			description: "Properties available for rent",
			url: "properties-for-rent.html",
			type: "Page",
		},
		{
			title: "Agents",
			description: "Meet our expert real estate agents",
			url: "agents.html",
			type: "Page",
		},
		{
			title: "Neighborhoods",
			description: "Explore Nordic neighborhoods",
			url: "neighborhoods.html",
			type: "Page",
		},
		{
			title: "Open Houses",
			description: "Upcoming open house events",
			url: "open-houses.html",
			type: "Page",
		},
		{
			title: "Services",
			description: "Our real estate services",
			url: "services.html",
			type: "Page",
		},
		{
			title: "Blog",
			description: "Real estate insights and news",
			url: "blog.html",
			type: "Page",
		},
		{
			title: "Book a Call",
			description: "Schedule a consultation",
			url: "book-a-call.html",
			type: "Page",
		},
		{
			title: "Free Valuation",
			description: "Get your property valued for free",
			url: "valuation.html",
			type: "Page",
		},
		{
			title: "Sell Your Property",
			description: "Sell your property with Westend",
			url: "sell-your-property.html",
			type: "Page",
		},
		{
			title: "About / Company",
			description: "Learn about Westend",
			url: "company.html",
			type: "Page",
		},
		{
			title: "Staging Scandinavian Homes for Winter Buyers",
			description: "Practical ways to warm up minimalist interiors",
			url: "blog-post.html",
			type: "Blog",
		},
		{
			title: "Decoding Micro-Market Data Before You List",
			description: "Framework for reading block-level comps",
			url: "blog-post.html",
			type: "Blog",
		},
		{
			title: "Anders Hansen",
			description: "Commercial & Residential Broker",
			url: "agent-detail.html",
			type: "Agent",
		},
		{
			title: "Emma Stone",
			description: "Senior Real Estate Broker",
			url: "agent-detail.html",
			type: "Agent",
		},
		{
			title: "Elm District",
			description: "Quiet residential area with tree-lined streets",
			url: "neighborhood-detail.html",
			type: "Neighborhood",
		},
		{
			title: "Modern Family Home on Elm Street",
			description: "Bright, spacious, and move-in ready",
			url: "property-detail.html",
			type: "Property",
		},
	];

	function openSearch() {
		if (!searchModal) return;
		searchModal.classList.add("open");
		document.body.style.overflow = "hidden";
		setTimeout(function () {
			searchInput && searchInput.focus();
		}, 100);
	}
	function closeSearchModal() {
		if (!searchModal) return;
		searchModal.classList.remove("open");
		document.body.style.overflow = "";
		if (searchInput) searchInput.value = "";
		if (searchResults) {
			searchResults.innerHTML = "";
			searchResults.classList.remove("visible");
		}
	}

	searchBtn && searchBtn.addEventListener("click", openSearch);
	closeSearch && closeSearch.addEventListener("click", closeSearchModal);
	searchModal &&
		searchModal.addEventListener("click", function (e) {
			if (e.target === searchModal) closeSearchModal();
		});
	document.addEventListener("keydown", function (e) {
		if (
			e.key === "Escape" &&
			searchModal &&
			searchModal.classList.contains("open")
		)
			closeSearchModal();
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			e.preventDefault();
			searchModal && searchModal.classList.contains("open")
				? closeSearchModal()
				: openSearch();
		}
	});

	if (searchInput && searchResults) {
		searchInput.addEventListener("input", function () {
			var q = this.value.trim().toLowerCase();
			if (!q) {
				searchResults.innerHTML = "";
				searchResults.classList.remove("visible");
				return;
			}
			var hits = searchData
				.filter(function (d) {
					return (
						d.title.toLowerCase().includes(q) ||
						d.description.toLowerCase().includes(q) ||
						d.type.toLowerCase().includes(q)
					);
				})
				.slice(0, 8);
			if (!hits.length) {
				searchResults.innerHTML =
					'<div class="search-result"><p class="search-result-desc">No results found.</p></div>';
			} else {
				searchResults.innerHTML = hits
					.map(function (d) {
						return (
							'<a href="' +
							d.url +
							'" class="search-result" style="display:block;">' +
							'<p class="search-result-type">' +
							d.type +
							"</p>" +
							'<p class="search-result-title">' +
							d.title +
							"</p>" +
							'<p class="search-result-desc">' +
							d.description +
							"</p>" +
							"</a>"
						);
					})
					.join("");
			}
			searchResults.classList.add("visible");
		});
	}

	/* ── Keen Slider (simple drag) ── */
	var sliderOuter = document.getElementById("keenSlider");
	var sliderTrack = document.getElementById("keenTrack");
	if (sliderOuter && sliderTrack) {
		var isDragging = false,
			startX = 0,
			currentX = 0,
			offset = 0;
		var maxOffset = 0;

		function getMaxOffset() {
			var trackW = sliderTrack.scrollWidth;
			var viewW = sliderOuter.offsetWidth;
			return Math.max(0, trackW - viewW);
		}

		sliderOuter.addEventListener("mousedown", function (e) {
			isDragging = true;
			startX = e.clientX - offset;
			sliderOuter.style.cursor = "grabbing";
			sliderTrack.style.transition = "none";
		});
		window.addEventListener("mousemove", function (e) {
			if (!isDragging) return;
			currentX = e.clientX - startX;
			maxOffset = getMaxOffset();
			offset = Math.max(-maxOffset, Math.min(0, currentX));
			sliderTrack.style.transform = "translateX(" + offset + "px)";
		});
		window.addEventListener("mouseup", function () {
			if (!isDragging) return;
			isDragging = false;
			sliderOuter.style.cursor = "grab";
			sliderTrack.style.transition = "";
		});

		// Touch support
		sliderOuter.addEventListener(
			"touchstart",
			function (e) {
				startX = e.touches[0].clientX - offset;
				sliderTrack.style.transition = "none";
			},
			{ passive: true },
		);
		sliderOuter.addEventListener(
			"touchmove",
			function (e) {
				currentX = e.touches[0].clientX - startX;
				maxOffset = getMaxOffset();
				offset = Math.max(-maxOffset, Math.min(0, currentX));
				sliderTrack.style.transform = "translateX(" + offset + "px)";
			},
			{ passive: true },
		);
		sliderOuter.addEventListener("touchend", function () {
			sliderTrack.style.transition = "";
		});

		// Auto-play
		var autoInterval = setInterval(function () {
			if (isDragging) return;
			maxOffset = getMaxOffset();
			offset -= 1.5;
			if (Math.abs(offset) >= maxOffset) offset = 0;
			sliderTrack.style.transform = "translateX(" + offset + "px)";
		}, 30);
	}

	/* ── Accordion ── */
	document.querySelectorAll(".accordion-trigger").forEach(function (btn) {
		btn.addEventListener("click", function () {
			var item = btn.closest(".accordion-item");
			var isOpen = item.classList.contains("open");
			// Close all
			document.querySelectorAll(".accordion-item.open").forEach(function (o) {
				o.classList.remove("open");
			});
			if (!isOpen) item.classList.add("open");
		});
	});

	/* ── Filter tabs ── */
	document.querySelectorAll(".filter-tab").forEach(function (tab) {
		tab.addEventListener("click", function () {
			var group = tab.closest(".filter-tabs");
			if (group)
				group.querySelectorAll(".filter-tab").forEach(function (t) {
					t.classList.remove("active");
				});
			tab.classList.add("active");
			// Filter properties if on properties page
			var filter = tab.dataset.filter;
			if (filter) {
				document
					.querySelectorAll(".property-card[data-status]")
					.forEach(function (card) {
						if (filter === "all" || card.dataset.status === filter) {
							card.style.display = "";
						} else {
							card.style.display = "none";
						}
					});
			}
		});
	});
})();
