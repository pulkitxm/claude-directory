/* NextMerce clone — interactions (vanilla JS + Swiper) */
(function () {
	"use strict";

	/* ---------- Sticky header shadow on scroll ---------- */
	const header = document.querySelector("header");
	if (header) {
		const onScroll = () => {
			if (window.scrollY > 0) {
				header.classList.add("shadow-2");
				header.style.backgroundColor = "rgba(255,255,255,0.95)";
				header.style.backdropFilter = "blur(4px)";
			} else {
				header.classList.remove("shadow-2");
				header.style.backgroundColor = "#fff";
				header.style.backdropFilter = "";
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	/* The template's own page sections already include top padding (pt-[165px] on the
     breadcrumb banner / hero) to clear the fixed header, so no body offset is added. */

	/* ---------- "All Categories" custom-select dropdown ---------- */
	document.querySelectorAll(".custom-select").forEach((sel) => {
		const selected = sel.querySelector(".select-selected");
		const items = sel.querySelector(".select-items");
		if (!selected || !items) return;
		selected.addEventListener("click", (e) => {
			e.stopPropagation();
			const hidden = items.hasAttribute("hidden");
			document.querySelectorAll(".select-items").forEach((o) => {
				if (o !== items) o.setAttribute("hidden", "");
			});
			document.querySelectorAll(".select-selected").forEach((o) => {
				if (o !== selected) o.classList.remove("select-arrow-active");
			});
			if (hidden) {
				items.removeAttribute("hidden");
				selected.classList.add("select-arrow-active");
			} else {
				items.setAttribute("hidden", "");
				selected.classList.remove("select-arrow-active");
			}
		});
		items.querySelectorAll(".select-item").forEach((it) => {
			it.addEventListener("click", () => {
				const lbl = selected.querySelector("span");
				if (lbl && !it.querySelector("a"))
					lbl.textContent = it.textContent.trim();
			});
		});
	});
	document.addEventListener("click", () => {
		document
			.querySelectorAll(".select-items")
			.forEach((o) => o.setAttribute("hidden", ""));
		document
			.querySelectorAll(".select-selected")
			.forEach((o) => o.classList.remove("select-arrow-active"));
	});

	/* ---------- Mobile hamburger menu ---------- */
	const toggle = document.getElementById("Toggle");
	if (toggle) {
		const navEl = document.querySelector("header nav");
		const navWrap = navEl ? navEl.parentElement : null;
		let open = false;
		toggle.addEventListener("click", (e) => {
			e.stopPropagation();
			open = !open;
			if (!navWrap) return;
			if (open) {
				navWrap.classList.remove("invisible", "hidden", "h-0");
				navWrap.classList.add("visible", "flex");
				navWrap.style.height = "auto";
				navWrap.style.background = "#fff";
				navWrap.style.padding = "16px";
				navWrap.style.zIndex = "60";
				navWrap.style.boxShadow = "0px 6px 24px 0px rgba(235,238,251,0.6)";
				navWrap.style.borderRadius = "10px";
			} else {
				navWrap.classList.add("invisible", "hidden");
				navWrap.classList.remove("visible", "flex");
				navWrap.style.height = "";
				navWrap.style.padding = "";
				navWrap.style.background = "";
			}
		});
	}

	/* ---------- Mobile dropdown (Pages / Blogs) tap to expand ---------- */
	if (window.matchMedia("(max-width: 1279px)").matches) {
		document
			.querySelectorAll("header nav li.group > a[href='#']")
			.forEach((a) => {
				const dd = a.parentElement.querySelector(".dropdown");
				if (!dd) return;
				a.addEventListener("click", (e) => {
					e.preventDefault();
					const isOpen = dd.style.display === "flex";
					dd.style.display = isOpen ? "none" : "flex";
					dd.style.visibility = "visible";
					dd.style.opacity = "1";
					dd.style.position = "static";
					dd.style.transform = "none";
					dd.style.translate = "0";
				});
			});
	}

	/* ---------- Swiper carousels ---------- */
	if (window.Swiper) {
		// Find prev/next buttons that belong to THIS carousel — they may sit inside the
		// swiper element (NextMerce pattern) or in a sibling header.
		function navFor(el) {
			let next = el.querySelector(
				":scope > .swiper-button-next, :scope > * .swiper-button-next",
			);
			let prev = el.querySelector(
				":scope > .swiper-button-prev, :scope > * .swiper-button-prev",
			);
			// exclude buttons that belong to a nested swiper-wrapper slide
			if (next && next.closest(".swiper-slide")) next = null;
			if (prev && prev.closest(".swiper-slide")) prev = null;
			if ((!next || !prev) && el.parentElement) {
				next = next || el.parentElement.querySelector(".swiper-button-next");
				prev = prev || el.parentElement.querySelector(".swiper-button-prev");
			}
			return next instanceof Element && prev instanceof Element
				? { nextEl: next, prevEl: prev }
				: false;
		}
		function init(el, opts) {
			if (!(el instanceof Element) || el.swiper) return;
			try {
				new Swiper(el, opts);
			} catch (e) {
				/* ignore malformed carousel */
			}
		}

		document.querySelectorAll(".hero-carousel").forEach((el) => {
			let pag = el.querySelector(".swiper-pagination");
			if (!pag) {
				pag = document.createElement("div");
				pag.className = "swiper-pagination";
				el.appendChild(pag);
			}
			init(el, {
				spaceBetween: 30,
				loop: true,
				autoplay: { delay: 4000, disableOnInteraction: false },
				pagination: { el: pag, clickable: true },
			});
		});

		document.querySelectorAll(".categories-carousel").forEach((el) => {
			init(el, {
				slidesPerView: 2,
				spaceBetween: 20,
				breakpoints: {
					480: { slidesPerView: 3 },
					640: { slidesPerView: 4 },
					768: { slidesPerView: 5 },
					1000: { slidesPerView: 6 },
				},
				navigation: navFor(el),
			});
		});

		document.querySelectorAll(".testimonial-carousel").forEach((el) => {
			init(el, {
				slidesPerView: 1,
				spaceBetween: 20,
				breakpoints: { 768: { slidesPerView: 2 }, 1000: { slidesPerView: 3 } },
				navigation: navFor(el),
			});
		});

		document.querySelectorAll(".swiper").forEach((el) => {
			if (el.swiper) return;
			if (
				el.classList.contains("hero-carousel") ||
				el.classList.contains("categories-carousel") ||
				el.classList.contains("testimonial-carousel")
			)
				return;
			// skip nested wrappers / non-carousel swiper utility divs with no slides
			if (
				!el.querySelector(".swiper-wrapper") ||
				!el.querySelector(".swiper-slide")
			)
				return;
			init(el, {
				slidesPerView: 1,
				spaceBetween: 20,
				breakpoints: {
					480: { slidesPerView: 2 },
					768: { slidesPerView: 3 },
					1000: { slidesPerView: 4 },
				},
				navigation: navFor(el),
			});
		});
	}

	/* ---------- Countdown timer (home music CTA) ---------- */
	(function countdown() {
		const nums = document.querySelectorAll("[data-cd]");
		if (!nums || nums.length < 4) return;
		const target =
			Date.now() + (3 * 24 * 3600 + 12 * 3600 + 47 * 60 + 30) * 1000;
		function tick() {
			let diff = Math.max(0, target - Date.now());
			const d = Math.floor(diff / 86400000);
			diff -= d * 86400000;
			const h = Math.floor(diff / 3600000);
			diff -= h * 3600000;
			const m = Math.floor(diff / 60000);
			diff -= m * 60000;
			const s = Math.floor(diff / 1000);
			const vals = [d, h, m, s];
			for (let i = 0; i < 4; i++)
				nums[i].textContent = String(vals[i]).padStart(2, "0");
		}
		tick();
		setInterval(tick, 1000);
	})();

	/* ---------- Quantity steppers ---------- */
	document
		.querySelectorAll(
			'[aria-label="button for remove product"], [aria-label="button for add product"]',
		)
		.forEach((btn) => {
			btn.addEventListener("click", () => {
				const group = btn.parentElement;
				const span = group ? group.querySelector("span") : null;
				if (!span) return;
				let v = parseInt(span.textContent.trim(), 10);
				if (isNaN(v)) v = 1;
				if (btn.getAttribute("aria-label").includes("add")) v += 1;
				else v = Math.max(1, v - 1);
				span.textContent = v;
			});
		});

	/* ---------- Product detail image gallery thumbnail swap ---------- */
	(function gallery() {
		const mainImg = document.querySelector(".product-gallery-main img");
		const thumbs = document.querySelectorAll(".product-gallery-thumb");
		if (mainImg && thumbs.length) {
			thumbs.forEach((t) => {
				t.addEventListener("click", () => {
					const img = t.querySelector("img");
					if (img) mainImg.src = img.getAttribute("src");
					thumbs.forEach((o) => o.classList.remove("nm-thumb-active"));
					t.classList.add("nm-thumb-active");
				});
			});
		}
	})();

	/* ---------- Product detail tabs ---------- */
	(function tabs() {
		const tabBtns = Array.from(document.querySelectorAll("button")).filter(
			(b) => {
				const t = b.textContent.trim();
				return (
					t === "Description" ||
					t === "Additional Information" ||
					t === "Reviews"
				);
			},
		);
		if (tabBtns.length < 2) return;
		const tabBar = tabBtns[0].parentElement;
		const panels = {};
		const descPanel =
			tabBar.parentElement && tabBar.parentElement.nextElementSibling;
		if (descPanel) panels["Description"] = descPanel;
		function setActive(name) {
			tabBtns.forEach((b) => {
				const on = b.textContent.trim() === name;
				b.classList.toggle("text-blue", on);
				b.classList.toggle("before:w-full", on);
				b.classList.toggle("text-dark", !on);
				b.classList.toggle("before:w-0", !on);
			});
			Object.keys(panels).forEach((k) => {
				panels[k].style.display = k === name ? "" : "none";
			});
		}
		tabBtns.forEach((b) =>
			b.addEventListener("click", () => setActive(b.textContent.trim())),
		);
	})();

	/* ---------- Shop grid / list view toggle ---------- */
	(function viewToggle() {
		const gridBtn = document.querySelector(
			'[aria-label="button for product grid tab"]',
		);
		const listBtn = document.querySelector(
			'[aria-label="button for product list tab"]',
		);
		if (!gridBtn || !listBtn) return;
		const cards = document.querySelectorAll(".group");
		const productGrid = cards.length ? cards[0].parentElement : null;
		function activate(btn) {
			[gridBtn, listBtn].forEach((b) =>
				b.classList.toggle("text-blue", b === btn),
			);
		}
		gridBtn.addEventListener("click", () => {
			activate(gridBtn);
			if (productGrid) {
				productGrid.style.display = "";
				productGrid.classList.remove("nm-list-view");
			}
		});
		listBtn.addEventListener("click", () => {
			activate(listBtn);
			if (productGrid) {
				productGrid.classList.add("nm-list-view");
			}
		});
	})();

	/* ---------- Mini-cart drawer ---------- */
	(function cartDrawer() {
		const cartBtn = Array.from(document.querySelectorAll("header button")).find(
			(b) =>
				b.querySelector("svg path[d^='M12 4V5']") ||
				(b.querySelector("span.bg-red") && b.querySelector("svg")),
		);
		if (!cartBtn) return;
		const overlay = document.createElement("div");
		overlay.className = "nm-overlay";
		const drawer = document.createElement("div");
		drawer.className = "nm-cart-drawer";
		drawer.innerHTML =
			'<div class="nm-cart-head"><h3>Cart View</h3><button class="nm-close" aria-label="close cart">&times;</button></div>' +
			'<div class="nm-cart-body"><div class="nm-cart-empty"><p>Your cart is empty!</p><a href="index.html" class="nm-btn-dark">Continue Shopping</a></div></div>' +
			'<div class="nm-cart-foot"><div class="nm-cart-subtotal"><span>Subtotal:</span><span>$0.00</span></div><a href="checkout.html" class="nm-btn-blue">Checkout</a><a href="cart.html" class="nm-btn-outline">View Cart</a></div>';
		document.body.appendChild(overlay);
		document.body.appendChild(drawer);
		function open() {
			overlay.classList.add("show");
			drawer.classList.add("show");
			document.body.style.overflow = "hidden";
		}
		function close() {
			overlay.classList.remove("show");
			drawer.classList.remove("show");
			document.body.style.overflow = "";
		}
		cartBtn.addEventListener("click", (e) => {
			e.preventDefault();
			open();
		});
		overlay.addEventListener("click", close);
		drawer.querySelector(".nm-close").addEventListener("click", close);
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
	})();

	/* ---------- Quick-view modal ---------- */
	(function quickView() {
		const qvBtns = document.querySelectorAll(
			'[aria-label="button for quick view"]',
		);
		if (!qvBtns.length) return;
		const overlay = document.createElement("div");
		overlay.className = "nm-overlay nm-qv-overlay";
		const modal = document.createElement("div");
		modal.className = "nm-qv-modal";
		modal.innerHTML =
			'<button class="nm-close nm-qv-close" aria-label="close quick view">&times;</button>' +
			'<div class="nm-qv-grid"><div class="nm-qv-img"><img alt="product" src=""></div>' +
			'<div class="nm-qv-info"><h3 class="nm-qv-title">Product</h3>' +
			'<div class="nm-qv-rating">★★★★★ <span>( 5 reviews )</span></div>' +
			'<p class="nm-qv-price"></p>' +
			'<p class="nm-qv-desc">High-quality product with premium build and a sleek finish. Available now at a special price.</p>' +
			'<div class="nm-qv-actions"><a href="cart.html" class="nm-btn-blue">Add to Cart</a><a href="wishlist.html" class="nm-btn-outline">Add to Wishlist</a></div>' +
			"</div></div>";
		document.body.appendChild(overlay);
		document.body.appendChild(modal);
		function close() {
			overlay.classList.remove("show");
			modal.classList.remove("show");
			document.body.style.overflow = "";
		}
		overlay.addEventListener("click", close);
		modal.querySelector(".nm-qv-close").addEventListener("click", close);
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
		qvBtns.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				const card = btn.closest(".group");
				if (card) {
					const img = card.querySelector("img");
					const title = card.querySelector(
						"h3, a[href='product-details.html']",
					);
					if (img)
						modal.querySelector(".nm-qv-img img").src = img.getAttribute("src");
					if (title)
						modal.querySelector(".nm-qv-title").textContent =
							title.textContent.trim();
					const priceText =
						(card.textContent.match(/\$\s?\d[\d,.]*/g) || []).slice(-1)[0] ||
						"";
					modal.querySelector(".nm-qv-price").textContent = priceText;
				}
				overlay.classList.add("show");
				modal.classList.add("show");
				document.body.style.overflow = "hidden";
			});
		});
	})();
})();
