const products = [
	["Meta Quest 2 VR Headset", "399.00", "product-detail.html?id=1"],
	["DJI Mini 3 Pro Drone", "399.00", "product-detail.html?id=2"],
	["Razer DeathAdder Mouse", "399.00", "product-detail.html?id=3"],
	["ASUS ROG Zephyrus 14", "349.00", "product-detail.html?id=4"],
	["iPhone 16", "799.00", "product-detail.html?id=5"],
	["Apple Watch Series 9", "399.00", "product-detail.html?id=6"],
	["Logitech G213 Keyboard", "399.00", "product-detail.html?id=7"],
	["JBL 305P MkII Studio", "169.00", "product-detail.html?id=8"],
	["Sony WH-1000XM5", "349.00", "product-detail.html?id=9"],
];

const cart = JSON.parse(localStorage.getItem("techself_cart") || "[]");

const cartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

const updateCartBadges = () => {
	const count = cart.reduce((total, item) => total + item.quantity, 0);
	document.querySelectorAll("header button span").forEach((badge) => {
		if (/^\d+$/.test(badge.textContent.trim())) badge.textContent = String(count);
	});
};

const closeCart = () => {
	document.querySelector(".local-cart-overlay")?.remove();
	document.querySelector(".local-cart-panel")?.remove();
};

const openCart = () => {
	closeCart();
	const overlay = document.createElement("button");
	overlay.className = "local-cart-overlay fixed inset-0 bg-black/50 z-50 cursor-default";
	overlay.setAttribute("aria-label", "Close cart");
	const panel = document.createElement("aside");
	panel.className = "local-cart-panel fixed top-0 right-0 h-screen w-[400px] max-w-full bg-white shadow-2xl z-50 flex flex-col";
	panel.setAttribute("aria-label", "Shopping cart");
	panel.innerHTML = `<div class="p-5 border-b border-gray-100 flex items-center justify-between"><h2 class="text-xl font-medium text-gray-900">Your Cart</h2><button class="local-cart-close size-9 rounded-lg hover:bg-gray-100 text-gray-500" aria-label="Close cart">×</button></div><div class="flex-1 overflow-y-auto local-cart-items"></div><div class="p-5 border-t border-gray-100"><div class="flex justify-between mb-4"><span class="text-gray-500">Subtotal</span><strong class="local-cart-total text-gray-900"></strong></div><a class="block text-center rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium py-3" href="checkout.html">Proceed to Checkout</a></div>`;
	document.body.append(overlay, panel);
	const items = panel.querySelector(".local-cart-items");
	items.innerHTML = cart.length ? cart.map((item, index) => `<div class="p-5 border-b border-gray-100"><div class="flex justify-between gap-4"><div><h3 class="font-medium text-gray-900">${item.name}</h3><p class="text-sm text-gray-500">Quantity: ${item.quantity}</p></div><button class="local-cart-remove text-sm text-red-500" data-index="${index}">Remove</button></div><p class="mt-2 font-medium">$${(item.price * item.quantity).toFixed(2)}</p></div>`).join("") : `<div class="p-10 text-center text-gray-500">Your cart is empty</div>`;
	panel.querySelector(".local-cart-total").textContent = `$${cartTotal().toFixed(2)}`;
	overlay.addEventListener("click", closeCart);
	panel.querySelector(".local-cart-close").addEventListener("click", closeCart);
	panel.querySelectorAll(".local-cart-remove").forEach((button) => button.addEventListener("click", () => {
		cart.splice(Number(button.dataset.index), 1);
		localStorage.setItem("techself_cart", JSON.stringify(cart));
		updateCartBadges();
		openCart();
	}));
};

const initHeader = () => {
	const nav = document.querySelector("header nav");
	const hamburger = nav?.querySelector("button.lg\\:hidden");
	if (hamburger) {
		hamburger.setAttribute("aria-label", "Toggle menu");
		hamburger.setAttribute("aria-expanded", "false");
		const initialIcon = hamburger.innerHTML;
		const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
		hamburger.addEventListener("click", () => {
			let menu = nav.querySelector(".local-mobile-menu");
			if (menu) {
				menu.remove();
				hamburger.innerHTML = initialIcon;
				hamburger.setAttribute("aria-expanded", "false");
				return;
			}
			menu = document.createElement("div");
			menu.className = "local-mobile-menu lg:hidden px-2";
			menu.innerHTML = `<div class="px-2 pt-2 pb-3 mt-5 space-y-1 bg-white rounded-xl"><a class="text-gray-800 block w-full hover:bg-gray-100 font-medium text-left px-3 py-2 text-base rounded-lg" href="index.html">Home</a><a class="text-gray-800 block w-full hover:bg-gray-100 font-medium text-left px-3 py-2 text-base rounded-lg" href="shop.html">Shop</a><div><button class="local-products-menu w-full text-left px-3 py-2 rounded-lg font-medium text-gray-800 hover:bg-gray-100 inline-flex items-center text-base justify-between cursor-pointer" aria-expanded="false">Products<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path d="M4.79163 7.39648L9.99996 12.6048L15.2083 7.39648" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="local-products-links hidden px-3 pb-2 space-y-2"><a class="block text-gray-500" href="shop.html">Smart Devices</a><a class="block text-gray-500" href="shop.html">Audio</a><a class="block text-gray-500" href="shop.html">Accessories</a></div></div><a class="text-gray-800 block w-full hover:bg-gray-100 font-medium text-left px-3 py-2 text-base rounded-lg" href="shop.html">Sale</a></div>`;
			nav.appendChild(menu);
			hamburger.innerHTML = closeIcon;
			hamburger.setAttribute("aria-expanded", "true");
			const productsButton = menu.querySelector(".local-products-menu");
			productsButton.addEventListener("click", () => {
				menu.querySelector(".local-products-links").classList.toggle("hidden");
				productsButton.setAttribute("aria-expanded", String(productsButton.getAttribute("aria-expanded") !== "true"));
			});
		});
	}
	const cartButtons = [...document.querySelectorAll("header button")].filter((button) => [...button.querySelectorAll("span")].some((span) => /^\d+$/.test(span.textContent.trim())));
	cartButtons.forEach((button) => {
		button.setAttribute("aria-label", "Open cart");
		button.addEventListener("click", openCart);
	});
	updateCartBadges();
	const search = document.querySelector('input[placeholder="Search products.."]');
	if (search) {
		search.parentElement.classList.add("relative");
		const results = document.createElement("div");
		results.className = "local-search-results hidden absolute left-0 right-0 top-full mt-2 z-50 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden";
		search.parentElement.appendChild(results);
		search.addEventListener("input", () => {
			const query = search.value.trim().toLowerCase();
			const matches = products.filter(([name]) => name.toLowerCase().includes(query));
			results.innerHTML = matches.map(([name, price, href]) => `<a class="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50" href="${href}"><span class="block font-medium text-gray-900">${name}</span><span class="text-sm text-violet-500">$${price}</span></a>`).join("");
			results.classList.toggle("hidden", !query);
		});
	}
};

const initFaq = () => {
	const heading = [...document.querySelectorAll("h2")].find((node) => node.textContent.trim() === "Frequently asked questions");
	const section = heading?.closest("section");
	if (!section) return;
	const answerText = "Orders are usually processed within 24–48 hours. Delivery times vary by location but typically take 5–10 business days for international shipping.";
	section.querySelectorAll("button").forEach((button, index) => {
		const parent = button.parentElement;
		const answer = document.createElement("div");
		answer.id = `faq-answer-${index + 1}`;
		answer.className = "overflow-hidden";
		answer.style.cssText = "display: none; opacity: 0; height: 0;";
		answer.innerHTML = `<div class="mt-6 text-base text-gray-500">${answerText}</div>`;
		parent.appendChild(answer);
		button.setAttribute("aria-controls", answer.id);
		button.setAttribute("aria-expanded", "false");
		button.addEventListener("click", () => {
			const open = answer.style.display === "none";
			section.querySelectorAll("[id^='faq-answer-']").forEach((item) => {
				item.style.display = "none";
				item.style.height = "0";
				item.style.opacity = "0";
			});
			section.querySelectorAll("button[aria-controls]").forEach((item) => {
				item.setAttribute("aria-expanded", "false");
				const icon = item.querySelector("svg")?.parentElement;
				const path = item.querySelector("svg path");
				if (icon) icon.style.transform = "none";
				if (path) path.setAttribute("d", "M12 5.25V18.75M5.25 12H18.75");
			});
			if (open) {
				answer.style.display = "block";
				answer.style.height = "auto";
				answer.style.opacity = "1";
				button.setAttribute("aria-expanded", "true");
				const icon = button.querySelector("svg")?.parentElement;
				const path = button.querySelector("svg path");
				if (icon) icon.style.transform = "rotate(180deg)";
				if (path) path.setAttribute("d", "M5.25 12H18.75");
			}
		});
	});
};

const initProduct = () => {
	if (!location.pathname.endsWith("product-detail.html")) return;
	const resizeGallery = () => {
		const mainSwiper = document.querySelector(".productMainSwiper");
		const thumbSwiper = document.querySelector(".productThumbSwiper");
		if (mainSwiper) {
			const width = mainSwiper.clientWidth;
			mainSwiper.querySelectorAll(".swiper-slide").forEach((slide) => {
				slide.style.width = `${width}px`;
			});
		}
		if (thumbSwiper) {
			const width = (thumbSwiper.clientWidth - 48) / 4;
			thumbSwiper.querySelectorAll(".swiper-slide").forEach((slide) => {
				slide.style.width = `${width}px`;
				slide.style.marginRight = "16px";
			});
		}
	};
	resizeGallery();
	window.addEventListener("resize", resizeGallery);
	const productSection = document.querySelector("main section, #root section");
	const images = [...productSection?.querySelectorAll("img") || []];
	const mainImage = images.sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width)[0];
	productSection?.querySelectorAll("button img").forEach((thumbnail) => thumbnail.parentElement.addEventListener("click", () => {
		if (mainImage) mainImage.src = thumbnail.src;
	}));
	const quantityButtons = [...document.querySelectorAll("button")].filter((button) => ["-", "+"].includes(button.textContent.trim()));
	const quantityText = quantityButtons[0]?.parentElement.querySelector("span");
	quantityButtons.forEach((button) => button.addEventListener("click", () => {
		const current = Number(quantityText?.textContent || 1);
		if (quantityText) quantityText.textContent = String(Math.max(1, current + (button.textContent.trim() === "+" ? 1 : -1)));
	}));
	const addButton = [...document.querySelectorAll("button")].find((button) => /add to cart/i.test(button.textContent));
	addButton?.addEventListener("click", () => {
		cart.push({ name: "iPhone 16", price: 799, quantity: Number(quantityText?.textContent || 1) });
		localStorage.setItem("techself_cart", JSON.stringify(cart));
		updateCartBadges();
		openCart();
	});
};

const initCheckout = () => {
	if (!location.pathname.endsWith("checkout.html")) return;
	const placeOrder = [...document.querySelectorAll("button")].find((button) => /place order/i.test(button.textContent));
	placeOrder?.addEventListener("click", (event) => {
		event.preventDefault();
		location.href = "thank-you.html";
	});
};

document.addEventListener("DOMContentLoaded", () => {
	initHeader();
	initFaq();
	initProduct();
	initCheckout();
});
