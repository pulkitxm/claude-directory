// Products Catalog
const PRODUCTS = [
	{
		id: 1,
		name: "Meta Quest 2 VR Headset",
		price: 399.0,
		oldPrice: null,
		rating: 4.8,
		reviews: 120,
		badge: "New",
		category: "Watch",
		image: "./images/products/image-1.png",
		colors: ["#ffffff", "#000000"],
		sizes: ["128GB", "256GB"],
		description:
			"Feel every detail with smooth motion, clear visuals, and total comfort. Immerse yourself in gaming, fitness, and entertainment with the Meta Quest 2 VR Headset.",
	},
	{
		id: 2,
		name: "DJI Mini 3 Pro Drone",
		price: 399.0,
		oldPrice: null,
		rating: 4.9,
		reviews: 85,
		badge: "New",
		category: "Camera",
		image: "./images/products/image-2.png",
		colors: ["#e5e7eb", "#1f2937"],
		sizes: ["Standard", "Fly More Combo"],
		description:
			"Fly longer and safer with the ultra-lightweight DJI Mini 3 Pro Drone. Capture stunning 4K HDR videos and photos with vertical shooting capability.",
	},
	{
		id: 3,
		name: "Razer DeathAdder Mouse",
		price: 399.0,
		oldPrice: null,
		rating: 4.7,
		reviews: 320,
		badge: null,
		category: "Laptop",
		image: "./images/products/image-3.png",
		colors: ["#000000", "#10b981"],
		sizes: ["Wired", "Wireless"],
		description:
			"Experience absolute control and ergonomic comfort with the Razer DeathAdder gaming mouse. Engineered with optical switches for lightning-fast response.",
	},
	{
		id: 4,
		name: "ASUS ROG Zephyrus 14",
		price: 349.0,
		oldPrice: 499.0,
		rating: 4.8,
		reviews: 94,
		badge: "20% OFF",
		category: "Laptop",
		image: "./images/products/image-4.png",
		colors: ["#ffffff", "#111827"],
		sizes: ["16GB RAM", "32GB RAM"],
		description:
			"Unleash your gaming prowess with the ASUS ROG Zephyrus 14. Lightweight design combined with raw processor power and high-resolution fast displays.",
	},
	{
		id: 5,
		name: "iPhone 16",
		price: 799.0,
		oldPrice: 999.0,
		rating: 4.9,
		reviews: 450,
		badge: "15% OFF",
		category: "Smartphone",
		image: "./images/products/image-5.png",
		colors: ["#000000", "#3b82f6", "#ef4444"],
		sizes: ["128GB", "256GB", "512GB"],
		description:
			"The ultimate iPhone 16 features advanced camera intelligence, longer battery life, and the blazing fast A18 chip for gaming and productivity.",
	},
	{
		id: 6,
		name: "Apple Watch Series 9",
		price: 399.0,
		oldPrice: null,
		rating: 4.8,
		reviews: 180,
		badge: "New",
		category: "Watch",
		image: "./images/products/image-6.png",
		colors: ["#000000", "#e2e8f0"],
		sizes: ["41mm", "45mm"],
		description:
			"Your essential companion for a healthy life is now even more powerful. Introducing Apple Watch Series 9 with the S9 chip and double tap gesture.",
	},
	{
		id: 7,
		name: "Logitech G213 Keyboard",
		price: 399.0,
		oldPrice: null,
		rating: 4.5,
		reviews: 210,
		badge: null,
		category: "Laptop",
		image: "./images/products/image-7.png",
		colors: ["#000000"],
		sizes: ["US Layout", "UK Layout"],
		description:
			"Type, game, and play in comfort with the Logitech G213 Prodigy keyboard. Featuring customizable RGB lighting zones and spill-resistant keys.",
	},
	{
		id: 8,
		name: "JBL 305P MkII Studio",
		price: 399.0,
		oldPrice: null,
		rating: 4.8,
		reviews: 75,
		badge: "Best Choice",
		category: "Sound Box",
		image: "./images/products/image-8.png",
		colors: ["#000000"],
		sizes: ["Single", "Pair"],
		description:
			"Experience premium sound precision with the JBL 305P MkII Studio Monitor. Perfect for music production, gaming, and pure audio enjoyment.",
	},
	{
		id: 9,
		name: "Smart Samsung OLED TV",
		price: 799.0,
		oldPrice: 999.0,
		rating: 4.9,
		reviews: 58,
		badge: "20% OFF",
		category: "TV",
		image: "./images/categories/image-4.png",
		colors: ["#000000"],
		sizes: ["55 inch", "65 inch"],
		description:
			"Bring cinema-quality entertainment home with the Samsung OLED TV. Enjoy deep black levels, vibrant colors, and intelligence audio processors.",
	},
];

// App State Management
let cart = JSON.parse(localStorage.getItem("techself_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("techself_wishlist")) || [];
let currentTheme = localStorage.getItem("techself_theme") || "light";

// Document ready entry
document.addEventListener("DOMContentLoaded", () => {
	initTheme();
	initHeader();
	initCartDrawer();

	// Page-specific initialization
	const path = window.location.pathname;
	if (path.endsWith("index.html") || path.endsWith("/") || path === "") {
		initHomePage();
	} else if (path.endsWith("shop.html")) {
		initShopPage();
	} else if (path.endsWith("product-detail.html")) {
		initProductDetailPage();
	} else if (path.endsWith("checkout.html")) {
		initCheckoutPage();
	} else if (path.endsWith("thank-you.html")) {
		initThankYouPage();
	}
});

// Theme Management
function initTheme() {
	const html = document.documentElement;
	if (currentTheme === "dark") {
		html.classList.add("dark");
	} else if (currentTheme === "light") {
		html.classList.remove("dark");
	} else {
		// prefers-color-scheme fallback
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			html.classList.add("dark");
			currentTheme = "dark";
		} else {
			html.classList.remove("dark");
			currentTheme = "light";
		}
	}
	localStorage.setItem("techself_theme", currentTheme);
	updateThemeIcons();
}

function toggleTheme() {
	const html = document.documentElement;
	if (html.classList.contains("dark")) {
		html.classList.remove("dark");
		currentTheme = "light";
	} else {
		html.classList.add("dark");
		currentTheme = "dark";
	}
	localStorage.setItem("techself_theme", currentTheme);
	updateThemeIcons();
}

function updateThemeIcons() {
	const toggles = document.querySelectorAll(".theme-toggle-btn");
	toggles.forEach((btn) => {
		if (currentTheme === "dark") {
			btn.innerHTML =
				'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
		} else {
			btn.innerHTML =
				'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
		}
	});
}

// Navigation & Header Shared Init
function initHeader() {
	updateThemeIcons();

	// Mobile Hamburger Toggle
	const burgerBtn = document.querySelector(".mobile-menu-btn");
	const mobileMenu = document.querySelector(".mobile-nav-menu");
	if (burgerBtn && mobileMenu) {
		burgerBtn.addEventListener("click", () => {
			mobileMenu.classList.toggle("hidden");
		});
	}

	// Search Bar logic
	const searchInput = document.querySelector(
		'input[placeholder="Search products.."]',
	);
	if (searchInput) {
		const parentContainer = searchInput.parentElement;

		// Create autocomplete results element
		const searchResults = document.createElement("div");
		searchResults.className =
			"absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto hidden dark:bg-slate-800 dark:border-slate-700";
		parentContainer.appendChild(searchResults);

		searchInput.addEventListener("input", (e) => {
			const q = e.target.value.toLowerCase().trim();
			if (q === "") {
				searchResults.classList.add("hidden");
				return;
			}

			const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
			if (filtered.length === 0) {
				searchResults.innerHTML =
					'<div class="p-3 text-gray-500 text-sm">No products found</div>';
			} else {
				searchResults.innerHTML = filtered
					.map((p) => {
						return `<a href="product-detail.html?id=${p.id}" class="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-700 border-b border-gray-100 last:border-0 dark:border-slate-700">
            <img src="${p.image}" class="size-8 object-cover bg-gray-50 rounded" alt="">
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">${p.name}</div>
              <div class="text-xs text-violet-600 font-semibold">$${p.price.toFixed(2)}</div>
            </div>
          </a>`;
					})
					.join("");
			}
			searchResults.classList.remove("hidden");
		});

		// Hide autocomplete on click outside
		document.addEventListener("click", (e) => {
			if (!parentContainer.contains(e.target)) {
				searchResults.classList.add("hidden");
			}
		});
	}

	// Mega Menu logic
	const productsTrigger = document.querySelector(".products-menu-trigger");
	const megaMenu = document.querySelector(".mega-menu-panel");
	if (productsTrigger && megaMenu) {
		productsTrigger.addEventListener("mouseenter", () => {
			megaMenu.classList.add("mega-menu-active");
		});
		productsTrigger.parentElement.addEventListener("mouseleave", () => {
			megaMenu.classList.remove("mega-menu-active");
		});
	}

	updateCartBadge();
}

// Cart Drawer Init
function initCartDrawer() {
	const cartBtn = document.querySelector(".cart-toggle-btn");
	const mobileCartBtn = document.querySelector(".mobile-cart-toggle-btn");
	const cartDrawer = document.querySelector(".cart-drawer-panel");
	const overlay = document.querySelector(".cart-drawer-overlay");
	const closeBtn = document.querySelector(".cart-drawer-close");

	const openDrawer = () => {
		if (cartDrawer && overlay) {
			cartDrawer.classList.add("cart-drawer-open");
			overlay.classList.remove("hidden");
			renderCartDrawerItems();
		}
	};

	const closeDrawer = () => {
		if (cartDrawer && overlay) {
			cartDrawer.classList.remove("cart-drawer-open");
			overlay.classList.add("hidden");
		}
	};

	if (cartBtn) cartBtn.addEventListener("click", openDrawer);
	if (mobileCartBtn) mobileCartBtn.addEventListener("click", openDrawer);
	if (overlay) overlay.addEventListener("click", closeDrawer);
	if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
}

function updateCartBadge() {
	const badges = document.querySelectorAll(".cart-count-badge");
	const count = cart.reduce((sum, item) => sum + item.quantity, 0);
	badges.forEach((b) => {
		b.textContent = count;
	});
}

function renderCartDrawerItems() {
	const container = document.querySelector(".cart-drawer-items");
	const totalEl = document.querySelector(".cart-drawer-total");

	if (!container) return;

	if (cart.length === 0) {
		container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="text-gray-400 mb-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
        <p class="text-gray-500 font-medium dark:text-slate-400">Your cart is empty</p>
      </div>
    `;
		if (totalEl) totalEl.textContent = "$0.00";
		return;
	}

	container.innerHTML = cart
		.map((item) => {
			const product = PRODUCTS.find((p) => p.id === item.id);
			if (!product) return "";
			return `
      <div class="flex gap-4 p-4 border-b border-gray-100 dark:border-slate-700 items-center">
        <img src="${product.image}" class="size-16 object-cover bg-gray-50 dark:bg-slate-800 rounded-lg" alt="">
        <div class="flex-1">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white">${product.name}</h4>
          <p class="text-xs text-gray-500 dark:text-slate-400 mb-2">Color: ${item.color || "Standard"}, Size: ${item.size || "Standard"}</p>
          <div class="flex justify-between items-center">
            <div class="flex items-center border border-gray-200 dark:border-slate-600 rounded">
              <button onclick="modifyCartQty(${item.id}, -1, '${item.color}', '${item.size}')" class="size-6 text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center">-</button>
              <span class="px-2 text-xs font-semibold">${item.quantity}</span>
              <button onclick="modifyCartQty(${item.id}, 1, '${item.color}', '${item.size}')" class="size-6 text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center">+</button>
            </div>
            <span class="text-sm font-semibold text-gray-900 dark:text-white">$${(product.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
        <button onclick="removeFromCart(${item.id}, '${item.color}', '${item.size}')" class="text-gray-400 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
        </button>
      </div>
    `;
		})
		.join("");

	const total = cart.reduce((sum, item) => {
		const p = PRODUCTS.find((prod) => prod.id === item.id);
		return sum + (p ? p.price * item.quantity : 0);
	}, 0);

	if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Global scope helpers for Cart callbacks
window.addToCart = (id, color = "Standard", size = "Standard", qty = 1) => {
	const existing = cart.find(
		(item) => item.id === id && item.color === color && item.size === size,
	);
	if (existing) {
		existing.quantity += qty;
	} else {
		cart.push({ id, color, size, quantity: qty });
	}
	localStorage.setItem("techself_cart", JSON.stringify(cart));
	updateCartBadge();
	renderCartDrawerItems();

	// Dynamically trigger slide open of drawer
	const cartDrawer = document.querySelector(".cart-drawer-panel");
	const overlay = document.querySelector(".cart-drawer-overlay");
	if (cartDrawer && overlay) {
		cartDrawer.classList.add("cart-drawer-open");
		overlay.classList.remove("hidden");
	}
};

window.modifyCartQty = (id, delta, color, size) => {
	const item = cart.find(
		(i) => i.id === id && i.color === color && i.size === size,
	);
	if (item) {
		item.quantity += delta;
		if (item.quantity <= 0) {
			cart = cart.filter(
				(i) => !(i.id === id && i.color === color && i.size === size),
			);
		}
	}
	localStorage.setItem("techself_cart", JSON.stringify(cart));
	updateCartBadge();
	renderCartDrawerItems();

	// Re-calculate checkout summaries if on checkout page
	if (window.location.pathname.endsWith("checkout.html")) {
		initCheckoutPage();
	}
};

window.removeFromCart = (id, color, size) => {
	cart = cart.filter(
		(i) => !(i.id === id && i.color === color && i.size === size),
	);
	localStorage.setItem("techself_cart", JSON.stringify(cart));
	updateCartBadge();
	renderCartDrawerItems();

	if (window.location.pathname.endsWith("checkout.html")) {
		initCheckoutPage();
	}
};

// Home Page Rendering
function initHomePage() {
	// Category slider buttons logic
	const prevBtn = document.querySelector(".category-slider-prev");
	const nextBtn = document.querySelector(".category-slider-next");
	const sliderWrapper = document.querySelector(".swiper-wrapper");

	if (sliderWrapper) {
		let scrollVal = 0;
		const slideWidth = 210; // Approx width + gap

		if (nextBtn) {
			nextBtn.addEventListener("click", () => {
				const maxScroll = sliderWrapper.scrollWidth - sliderWrapper.clientWidth;
				scrollVal = Math.min(scrollVal + slideWidth, maxScroll);
				sliderWrapper.scrollTo({ left: scrollVal, behavior: "smooth" });
				if (prevBtn) prevBtn.removeAttribute("disabled");
				if (scrollVal >= maxScroll) nextBtn.setAttribute("disabled", "true");
			});
		}

		if (prevBtn) {
			prevBtn.addEventListener("click", () => {
				scrollVal = Math.max(scrollVal - slideWidth, 0);
				sliderWrapper.scrollTo({ left: scrollVal, behavior: "smooth" });
				if (nextBtn) nextBtn.removeAttribute("disabled");
				if (scrollVal <= 0) prevBtn.setAttribute("disabled", "true");
			});
		}
	}
}

// Shop Page Rendering & Filtering
function initShopPage() {
	const grid = document.querySelector(".shop-product-grid");
	const totalResultsEl = document.querySelector(".shop-results-count");
	const sortSelect = document.querySelector(".shop-sort-select");

	// Filter checkboxes
	const categoryFilters = document.querySelectorAll(".filter-category");
	const brandFilters = document.querySelectorAll(".filter-brand");
	const ratingFilters = document.querySelectorAll(".filter-rating");
	const priceRange = document.querySelector(".filter-price-range");
	const priceVal = document.querySelector(".filter-price-val");

	let activeFilters = {
		categories: [],
		brands: [],
		ratings: [],
		priceMax: 1000,
	};

	// Price range updating
	if (priceRange && priceVal) {
		priceRange.addEventListener("input", (e) => {
			priceVal.textContent = `$${e.target.value}`;
			activeFilters.priceMax = parseFloat(e.target.value);
			applyFilters();
		});
	}

	const registerFilterListeners = (elements, key) => {
		elements.forEach((el) => {
			el.addEventListener("change", () => {
				if (el.checked) {
					activeFilters[key].push(el.value);
				} else {
					activeFilters[key] = activeFilters[key].filter((v) => v !== el.value);
				}
				applyFilters();
			});
		});
	};

	registerFilterListeners(categoryFilters, "categories");
	registerFilterListeners(brandFilters, "brands");
	registerFilterListeners(ratingFilters, "ratings");

	if (sortSelect) {
		sortSelect.addEventListener("change", () => {
			applyFilters();
		});
	}

	function applyFilters() {
		let filtered = [...PRODUCTS];

		// Filter Category
		if (activeFilters.categories.length > 0) {
			filtered = filtered.filter((p) =>
				activeFilters.categories.includes(p.category),
			);
		}

		// Filter Brand (mocked based on product names)
		if (activeFilters.brands.length > 0) {
			filtered = filtered.filter((p) => {
				return activeFilters.brands.some((brand) =>
					p.name.toLowerCase().includes(brand.toLowerCase()),
				);
			});
		}

		// Filter Rating
		if (activeFilters.ratings.length > 0) {
			filtered = filtered.filter((p) => {
				const floorRating = Math.floor(p.rating);
				return activeFilters.ratings.includes(floorRating.toString());
			});
		}

		// Filter Price
		filtered = filtered.filter((p) => p.price <= activeFilters.priceMax);

		// Sorting
		if (sortSelect) {
			const sort = sortSelect.value;
			if (sort === "low-to-high") {
				filtered.sort((a, b) => a.price - b.price);
			} else if (sort === "high-to-low") {
				filtered.sort((a, b) => b.price - a.price);
			} else if (sort === "newest") {
				filtered.sort(
					(a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0),
				);
			}
		}

		renderShopProducts(filtered);
	}

	function renderShopProducts(items) {
		if (!grid) return;

		if (totalResultsEl) {
			totalResultsEl.textContent = `${items.length} Product${items.length === 1 ? "" : "s"} Found`;
		}

		if (items.length === 0) {
			grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-gray-500 font-medium dark:text-slate-400">
          No products match your filter criteria. Try resetting.
        </div>
      `;
			return;
		}

		grid.innerHTML = items
			.map((p) => {
				const discountPercent = p.oldPrice
					? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
					: 0;
				const badgeHtml = p.badge
					? `<span class="absolute top-4 left-4 ${p.badge.includes("%") ? "bg-violet-50 text-violet-700" : "bg-green-50 text-green-700"} inline-flex items-center justify-center h-5 rounded-full px-2 py-1 text-sm font-medium z-10">${p.badge}</span>`
					: "";

				const ratingStars = Array(5)
					.fill(0)
					.map((_, idx) => {
						const fill =
							idx < Math.round(p.rating) ? "text-amber-400" : "text-gray-300";
						return `<svg class="${fill} size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>`;
					})
					.join("");

				const colorsHtml = p.colors
					.map(
						(col) => `
        <button onclick="event.preventDefault();" class="size-5 border rounded-full inline-block cursor-pointer hover:border-violet-500 border-[#DEDEDE]" style="background-color: ${col}"></button>
      `,
					)
					.join("");

				return `
        <article class="relative group">
          <div class="bg-gray-50 block mb-5 rounded-xl relative overflow-hidden">
            <a class="block relative z-10" href="product-detail.html?id=${p.id}">
              ${badgeHtml}
              <img class="mx-auto w-full transition-transform duration-500 ease-out group-hover:scale-110" alt="${p.name}" src="${p.image}">
            </a>
            <div class="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onclick="addToWishlist(${p.id})" class="size-11 rounded-full border bg-white border-gray-300 flex items-center justify-center hover:bg-violet-50 hover:border-violet-300 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              </button>
              <a href="product-detail.html?id=${p.id}" class="size-11 rounded-full border bg-white border-gray-300 flex items-center justify-center hover:bg-violet-50 hover:border-violet-300 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </a>
            </div>
            <button onclick="addToCart(${p.id}, '${p.colors[0] || "Standard"}', '${p.sizes[0] || "Standard"}', 1)" class="absolute left-3 right-3 bottom-3 z-30 rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-medium text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-violet-600 cursor-pointer">
              Add to cart
            </button>
          </div>
          <div class="mb-4">
            <h3 class="text-base font-medium text-gray-900 dark:text-white"><a href="product-detail.html?id=${p.id}">${p.name}</a></h3>
            <div class="flex items-center gap-2">
              ${p.oldPrice ? `<span class="text-sm text-gray-500 line-through">$${p.oldPrice.toFixed(2)}</span>` : ""}
              <span class="text-base font-semibold text-gray-900 dark:text-white">$${p.price.toFixed(2)}</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex gap-1.5">${colorsHtml}</div>
            <div class="flex items-center gap-1">${ratingStars}</div>
          </div>
        </article>
      `;
			})
			.join("");
	}

	applyFilters();
}

// Product Details Rendering
function initProductDetailPage() {
	const urlParams = new URLSearchParams(window.location.search);
	const productId = parseInt(urlParams.get("id")) || 1;
	const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

	// Populate Detail elements
	const breadcrumbEl = document.querySelector(".detail-breadcrumb-name");
	const titleEl = document.querySelector(".detail-product-title");
	const priceEl = document.querySelector(".detail-product-price");
	const ratingValEl = document.querySelector(".detail-rating-value");
	const reviewsCountEl = document.querySelector(".detail-reviews-count");
	const descEl = document.querySelector(".detail-product-desc");
	const mainImg = document.getElementById("detail-main-image");
	const thumbsContainer = document.querySelector(
		".detail-thumbnails-container",
	);
	const colorsContainer = document.querySelector(".detail-colors-container");
	const sizesContainer = document.querySelector(".detail-sizes-container");

	if (breadcrumbEl) breadcrumbEl.textContent = product.name;
	if (titleEl) titleEl.textContent = product.name;
	if (descEl) descEl.textContent = product.description;
	if (mainImg) mainImg.src = product.image;

	if (priceEl) {
		priceEl.innerHTML = `
      ${product.oldPrice ? `<span class="text-xl text-gray-500 line-through font-medium">$${product.oldPrice.toFixed(2)}</span>` : ""}
      <span class="text-3xl font-bold text-gray-900 dark:text-white">$${product.price.toFixed(2)}</span>
    `;
	}

	if (ratingValEl) ratingValEl.textContent = product.rating;
	if (reviewsCountEl)
		reviewsCountEl.textContent = `(${product.reviews} Reviews)`;

	// Populate gallery thumbnails
	if (thumbsContainer) {
		// Generate mock thumbs
		const thumbs = [
			product.image,
			"./images/product-slider/lg-2.png",
			"./images/product-slider/lg-3.png",
			"./images/product-slider/lg-4.png",
		];
		thumbsContainer.innerHTML = thumbs
			.map(
				(src, i) => `
      <button onclick="setMainImage('${src}')" class="size-20 border-2 border-transparent hover:border-violet-500 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
        <img src="${src}" class="size-full object-cover" alt="">
      </button>
    `,
			)
			.join("");
	}

	// Populate colors selection
	if (colorsContainer) {
		colorsContainer.innerHTML = product.colors
			.map(
				(col, i) => `
      <button onclick="selectColor(this, '${col}')" class="size-8 rounded-full border-2 ${i === 0 ? "border-violet-500" : "border-gray-200"} cursor-pointer" style="background-color: ${col}"></button>
    `,
			)
			.join("");
	}

	// Populate sizes selection
	if (sizesContainer) {
		sizesContainer.innerHTML = product.sizes
			.map(
				(sz, i) => `
      <button onclick="selectSize(this, '${sz}')" class="px-4 py-2 border rounded-lg text-sm font-medium ${i === 0 ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-200 text-gray-700"}">${sz}</button>
    `,
			)
			.join("");
	}

	// Add to cart buttons link
	const qtyInput = document.querySelector(".detail-qty-input");
	const addBtn = document.querySelector(".detail-add-to-cart-btn");
	const buyBtn = document.querySelector(".detail-buy-now-btn");

	let selectedColor = product.colors[0] || "Standard";
	let selectedSize = product.sizes[0] || "Standard";

	window.setMainImage = (src) => {
		if (mainImg) mainImg.src = src;
	};

	window.selectColor = (el, col) => {
		document
			.querySelectorAll(".detail-colors-container button")
			.forEach((b) =>
				b.classList.replace("border-violet-500", "border-gray-200"),
			);
		el.classList.replace("border-gray-200", "border-violet-500");
		selectedColor = col;
	};

	window.selectSize = (el, sz) => {
		document.querySelectorAll(".detail-sizes-container button").forEach((b) => {
			b.classList.remove(
				"border-violet-500",
				"bg-violet-50",
				"text-violet-700",
			);
			b.classList.add("border-gray-200", "text-gray-700");
		});
		el.classList.add("border-violet-500", "bg-violet-50", "text-violet-700");
		el.classList.remove("border-gray-200", "text-gray-700");
		selectedSize = sz;
	};

	if (addBtn) {
		addBtn.addEventListener("click", () => {
			const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
			addToCart(product.id, selectedColor, selectedSize, qty);
		});
	}

	if (buyBtn) {
		buyBtn.addEventListener("click", () => {
			const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
			addToCart(product.id, selectedColor, selectedSize, qty);
			window.location.href = "checkout.html";
		});
	}

	// Detail Tabs Switcher
	const tabBtns = document.querySelectorAll(".detail-tab-btn");
	const tabPanels = document.querySelectorAll(".detail-tab-panel");

	tabBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			tabBtns.forEach((b) => {
				b.classList.remove("border-violet-500", "text-violet-600");
				b.classList.add("border-transparent", "text-gray-500");
			});
			btn.classList.add("border-violet-500", "text-violet-600");
			btn.classList.remove("border-transparent", "text-gray-500");

			const tabTarget = btn.getAttribute("data-tab");
			tabPanels.forEach((panel) => {
				if (panel.id === tabTarget) {
					panel.classList.remove("hidden");
				} else {
					panel.classList.add("hidden");
				}
			});
		});
	});
}

// Checkout Page Rendering
function initCheckoutPage() {
	const lineItemsContainer = document.querySelector(".checkout-line-items");
	const subtotalEl = document.querySelector(".checkout-subtotal");
	const shippingEl = document.querySelector(".checkout-shipping");
	const taxEl = document.querySelector(".checkout-tax");
	const totalEl = document.querySelector(".checkout-total");
	const placeOrderBtn = document.querySelector(".checkout-place-order-btn");

	if (!lineItemsContainer) return;

	if (cart.length === 0) {
		lineItemsContainer.innerHTML =
			'<div class="text-gray-500 py-4 text-center">Your cart is empty. <a href="shop.html" class="text-violet-600 font-semibold underline">Go Shop</a></div>';
		if (subtotalEl) subtotalEl.textContent = "$0.00";
		if (totalEl) totalEl.textContent = "$0.00";
		if (placeOrderBtn) placeOrderBtn.setAttribute("disabled", "true");
		return;
	}

	lineItemsContainer.innerHTML = cart
		.map((item) => {
			const prod = PRODUCTS.find((p) => p.id === item.id);
			if (!prod) return "";
			return `
      <div class="flex justify-between items-center gap-4 py-3 border-b border-gray-100 dark:border-slate-700 last:border-0">
        <div class="flex items-center gap-3">
          <img src="${prod.image}" class="size-12 object-cover bg-gray-50 dark:bg-slate-800 rounded-lg" alt="">
          <div>
            <h5 class="text-sm font-medium text-gray-900 dark:text-white">${prod.name}</h5>
            <p class="text-xs text-gray-500 dark:text-slate-400">Qty: ${item.quantity} · Size: ${item.size}</p>
          </div>
        </div>
        <span class="text-sm font-semibold text-gray-900 dark:text-white">$${(prod.price * item.quantity).toFixed(2)}</span>
      </div>
    `;
		})
		.join("");

	const subtotal = cart.reduce((sum, item) => {
		const p = PRODUCTS.find((prod) => prod.id === item.id);
		return sum + (p ? p.price * item.quantity : 0);
	}, 0);

	const shipping = subtotal > 150 ? 0.0 : 15.0;
	const tax = subtotal * 0.08;
	const total = subtotal + shipping + tax;

	if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
	if (shippingEl)
		shippingEl.textContent =
			shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
	if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
	if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

	const checkoutForm = document.querySelector(".checkout-form");
	if (checkoutForm) {
		checkoutForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const orderId = "TS-" + Math.floor(100000 + Math.random() * 900000);
			localStorage.setItem("techself_last_order", orderId);

			cart = [];
			localStorage.setItem("techself_cart", JSON.stringify(cart));
			updateCartBadge();

			window.location.href = "thank-you.html";
		});
	}
}

// Thank You Page Rendering
function initThankYouPage() {
	const orderIdEl = document.querySelector(".thankyou-order-id");
	if (orderIdEl) {
		const lastOrder =
			localStorage.getItem("techself_last_order") || "TS-948194";
		orderIdEl.textContent = lastOrder;
	}
}

// Global Wishlist callbacks
window.addToWishlist = (id) => {
	if (!wishlist.includes(id)) {
		wishlist.push(id);
		localStorage.setItem("techself_wishlist", JSON.stringify(wishlist));
		alert("Added to wishlist!");
	} else {
		wishlist = wishlist.filter((item) => item !== id);
		localStorage.setItem("techself_wishlist", JSON.stringify(wishlist));
		alert("Removed from wishlist!");
	}
};

// FAQ accordion
document.querySelectorAll(".faq-btn").forEach((btn) => {
	btn.addEventListener("click", () => {
		const targetId = btn.getAttribute("data-target");
		const content = document.getElementById(targetId);
		const plusIcon = btn.querySelector(".faq-icon-plus");
		const minusIcon = btn.querySelector(".faq-icon-minus");
		const isOpen = !content.classList.contains("hidden");
		// Close all
		document
			.querySelectorAll(".faq-content")
			.forEach((c) => c.classList.add("hidden"));
		document
			.querySelectorAll(".faq-icon-plus")
			.forEach((i) => i.classList.remove("hidden"));
		document
			.querySelectorAll(".faq-icon-minus")
			.forEach((i) => i.classList.add("hidden"));
		// Toggle clicked
		if (!isOpen) {
			content.classList.remove("hidden");
			plusIcon.classList.add("hidden");
			minusIcon.classList.remove("hidden");
		}
	});
});
