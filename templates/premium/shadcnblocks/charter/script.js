(function () {
	"use strict";

	var root = document.documentElement;
	try {
		var storedTheme = localStorage.getItem("theme");
		if (storedTheme) root.classList.toggle("dark", storedTheme === "dark");
	} catch (error) {}
	root.style.colorScheme = root.classList.contains("dark") ? "dark" : "light";

	var productMenu = document.querySelector(
		'nav[aria-label="Main"] > div.absolute.top-full',
	);
	if (productMenu) {
		productMenu.innerHTML = window.CHARTER_PRODUCT_MENU || "";
	}

	var desktopProduct = Array.from(
		document.querySelectorAll('nav[aria-label="Main"] button'),
	).find(function (button) {
		return /product/i.test(button.textContent);
	});
	var desktopPanel = document.querySelector("[data-product-menu]");
	var menuTimer;
	function setDesktopMenu(open) {
		if (!desktopProduct || !desktopPanel) return;
		desktopPanel.style.display = open ? "block" : "none";
		desktopProduct.setAttribute("aria-expanded", String(open));
		desktopProduct.setAttribute("data-state", open ? "open" : "closed");
	}
	function holdDesktopMenu() {
		clearTimeout(menuTimer);
		setDesktopMenu(true);
	}
	function releaseDesktopMenu() {
		menuTimer = setTimeout(function () {
			setDesktopMenu(false);
		}, 180);
	}
	if (desktopProduct && desktopPanel) {
		setDesktopMenu(false);
		desktopProduct.addEventListener("mouseenter", holdDesktopMenu);
		desktopProduct.addEventListener("mouseleave", releaseDesktopMenu);
		desktopProduct.addEventListener("click", function (event) {
			event.preventDefault();
			holdDesktopMenu();
		});
		desktopPanel.addEventListener("mouseenter", holdDesktopMenu);
		desktopPanel.addEventListener("mouseleave", releaseDesktopMenu);
	}

	document.addEventListener("click", function (event) {
		var closeBanner = event.target.closest('[aria-label="Close banner"]');
		if (closeBanner) {
			var banner = closeBanner.closest(".bg-primary.relative");
			if (banner) banner.style.display = "none";
			return;
		}
		var themeButton = event.target.closest("button");
		if (
			themeButton &&
			themeButton.querySelector(".lucide-sun, .lucide-moon")
		) {
			var dark = !root.classList.contains("dark");
			root.classList.toggle("dark", dark);
			root.style.colorScheme = dark ? "dark" : "light";
			try {
				localStorage.setItem("theme", dark ? "dark" : "light");
			} catch (error) {}
		}
	});

	var header = document.querySelector("header");
	var mobileTrigger = header
		? Array.from(header.querySelectorAll("button")).find(function (button) {
				return /open main menu/i.test(button.textContent);
			})
		: null;
	var mobilePanel = header
		? header.querySelector(".invisible.translate-x-full.opacity-0")
		: null;
	if (mobileTrigger && mobilePanel) {
		mobileTrigger.addEventListener("click", function () {
			var open = mobileTrigger.getAttribute("aria-expanded") !== "true";
			mobileTrigger.setAttribute("aria-expanded", String(open));
			mobilePanel.classList.toggle("invisible", !open);
			mobilePanel.classList.toggle("translate-x-full", !open);
			mobilePanel.classList.toggle("opacity-0", !open);
		});
		var mobileProduct = mobilePanel.querySelector(
			'button[aria-label*="Product" i]',
		);
		if (mobileProduct) {
			mobileProduct.addEventListener("click", function () {
				var open = mobileProduct.getAttribute("aria-expanded") === "true";
				var submenu = mobileProduct.nextElementSibling;
				mobileProduct.setAttribute("aria-expanded", String(!open));
				if (submenu) {
					submenu.style.maxHeight = open ? "0" : submenu.scrollHeight + "px";
					submenu.style.opacity = open ? "0" : "1";
				}
			});
		}
	}

	document
		.querySelectorAll('button[aria-controls][aria-expanded]')
		.forEach(function (button) {
			if (button === desktopProduct || button.closest("nav")) return;
			var region = document.getElementById(button.getAttribute("aria-controls"));
			if (!region) return;
			if (button.getAttribute("aria-expanded") !== "true") {
				region.style.height = "0";
				region.style.overflow = "hidden";
			}
			button.addEventListener("click", function () {
				var open = button.getAttribute("aria-expanded") === "true";
				button.setAttribute("aria-expanded", String(!open));
				button.setAttribute("data-state", open ? "closed" : "open");
				region.setAttribute("data-state", open ? "closed" : "open");
				region.style.transition = "height 0.2s ease-out";
				region.style.height = open ? "0" : region.scrollHeight + "px";
				region.style.overflow = "hidden";
			});
		});
})();
