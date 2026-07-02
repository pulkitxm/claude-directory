// Shared cart + header/footer + theme-toggle logic for Doggy Stickers clone.
// The original wires "Add To Cart" / "Check Out" to a private Shopify
// storefront GraphQL endpoint that can't be reproduced statically; this
// approximates the same UI/UX with a localStorage-backed cart.
(function () {
	const CART_KEY = "doggy-cart";

	function readCart() {
		try {
			return JSON.parse(localStorage.getItem(CART_KEY)) || [];
		} catch (e) {
			return [];
		}
	}

	function writeCart(items) {
		localStorage.setItem(CART_KEY, JSON.stringify(items));
		updateCartBadge();
	}

	function addToCart(slug, qty, size) {
		const items = readCart();
		const existing = items.find((i) => i.slug === slug && i.size === size);
		if (existing) {
			existing.qty += qty;
		} else {
			items.push({ slug, qty, size });
		}
		writeCart(items);
	}

	function removeFromCart(index) {
		const items = readCart();
		items.splice(index, 1);
		writeCart(items);
	}

	function setQty(index, qty) {
		const items = readCart();
		if (items[index]) {
			items[index].qty = Math.max(1, qty);
			writeCart(items);
		}
	}

	function cartCount() {
		return readCart().reduce((sum, i) => sum + i.qty, 0);
	}

	function updateCartBadge() {
		document.querySelectorAll("[data-cart-badge]").forEach((el) => {
			const count = cartCount();
			el.textContent = count;
			el.style.display = count > 0 ? "flex" : "none";
		});
	}

	function assetPath(rel) {
		// pages live at /, /cart.html, and /products/<slug>/index.html
		const depth = window.__DOGGY_DEPTH__ || 0;
		return "../".repeat(depth) + rel;
	}

	function renderHeader() {
		document.querySelectorAll("[data-site-header]").forEach((el) => {
			el.innerHTML = `
        <div class="inner">
          <a class="logo" href="${assetPath("index.html")}">
            <img src="${assetPath("assets/icon.svg")}" alt="Doggy Stickers logo" />
            <span class="logo-word">Doggy Stickers</span>
          </a>
          <div class="header-actions">
            <button class="theme-toggle" data-theme-toggle type="button" aria-label="Toggle dark mode">
              <svg data-icon-sun xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
              <svg data-icon-moon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>
            </button>
            <a class="cart-link" href="${assetPath("cart.html")}" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M7 4h-2l-1 2v1h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2h-11.42c-.13 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1h-14.19l-.94-2zm14 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
              <span class="cart-badge" data-cart-badge>0</span>
            </a>
          </div>
        </div>
      `;
		});
	}

	function renderFooter() {
		document.querySelectorAll("[data-site-footer]").forEach((el) => {
			el.innerHTML = `Built with <span class="heart">&hearts;</span> by
        <a href="https://twitter.com/deepwhitman" target="_blank" rel="noopener">Bilal Tahir</a>`;
		});
	}

	function initThemeToggle() {
		document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
			const sun = btn.querySelector("[data-icon-sun]");
			const moon = btn.querySelector("[data-icon-moon]");
			function sync() {
				const isDark = document.documentElement.classList.contains("dark");
				sun.style.display = isDark ? "none" : "block";
				moon.style.display = isDark ? "block" : "none";
			}
			sync();
			btn.addEventListener("click", () => {
				const isDark = document.documentElement.classList.toggle("dark");
				localStorage.setItem("doggy-theme", isDark ? "dark" : "light");
				sync();
			});
		});
	}

	function initRevealOnScroll() {
		const els = document.querySelectorAll(".reveal");
		if (!els.length) return;
		if (!("IntersectionObserver" in window)) {
			els.forEach((el) => el.classList.add("in"));
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 },
		);
		els.forEach((el) => io.observe(el));
	}

	document.addEventListener("DOMContentLoaded", () => {
		renderHeader();
		renderFooter();
		updateCartBadge();
		initThemeToggle();
		initRevealOnScroll();
	});

	window.DoggyCart = {
		read: readCart,
		add: addToCart,
		remove: removeFromCart,
		setQty: setQty,
		count: cartCount,
		assetPath: assetPath,
	};
})();
