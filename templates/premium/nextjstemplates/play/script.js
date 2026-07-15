document.addEventListener("DOMContentLoaded", function () {
	var tabMagic = document.getElementById("tabMagic");
	var tabPassword = document.getElementById("tabPassword");
	var formMagic = document.getElementById("formMagic");
	var formPassword = document.getElementById("formPassword");
	if (tabMagic && tabPassword && formMagic && formPassword) {
		var setTab = function (which, focus) {
			var magicActive = which === "magic";
			tabMagic.classList.toggle("bg-dark-3", magicActive);
			tabMagic.classList.toggle("text-white", magicActive);
			tabPassword.classList.toggle("bg-dark-3", !magicActive);
			tabPassword.classList.toggle("text-white", !magicActive);
			tabMagic.setAttribute("aria-selected", String(magicActive));
			tabPassword.setAttribute("aria-selected", String(!magicActive));
			tabMagic.tabIndex = magicActive ? 0 : -1;
			tabPassword.tabIndex = magicActive ? -1 : 0;
			formMagic.classList.toggle("hidden", !magicActive);
			formPassword.classList.toggle("hidden", magicActive);
			formMagic.setAttribute("aria-hidden", String(!magicActive));
			formPassword.setAttribute("aria-hidden", String(magicActive));
			if (focus) (magicActive ? tabMagic : tabPassword).focus();
		};
		if (tabMagic.parentElement) tabMagic.parentElement.setAttribute("role", "tablist");
		tabMagic.setAttribute("role", "tab");
		tabPassword.setAttribute("role", "tab");
		tabMagic.setAttribute("aria-controls", formMagic.id);
		tabPassword.setAttribute("aria-controls", formPassword.id);
		tabMagic.addEventListener("click", function () {
			setTab("magic", false);
		});
		tabPassword.addEventListener("click", function () {
			setTab("password", false);
		});
		[tabMagic, tabPassword].forEach(function (tab) {
			tab.addEventListener("keydown", function (event) {
				if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
					event.preventDefault();
					setTab(tab === tabMagic ? "password" : "magic", true);
				}
			});
		});
		setTab(formMagic.classList.contains("hidden") ? "password" : "magic", false);
	}

	var toggler = document.getElementById("navbarToggler");
	var collapse = document.getElementById("navbarCollapse");
	var setNavigation = function (open, restoreFocus) {
		if (!toggler || !collapse) return;
		collapse.classList.toggle("navbar-open", open);
		toggler.setAttribute("aria-expanded", String(open));
		toggler.querySelectorAll("span").forEach(function (span) {
			span.classList.toggle("open", open);
		});
		if (restoreFocus) toggler.focus();
	};
	if (toggler && collapse) {
		toggler.setAttribute("aria-controls", collapse.id);
		toggler.setAttribute("aria-expanded", "false");
		toggler.addEventListener("click", function () {
			setNavigation(!collapse.classList.contains("navbar-open"), false);
		});
		collapse.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () {
				setNavigation(false, false);
			});
		});
		document.addEventListener("click", function (event) {
			if (!collapse.contains(event.target) && !toggler.contains(event.target)) {
				setNavigation(false, false);
			}
		});
	}

	var submenuItem = document.querySelector(".submenu-item");
	var submenuButton = submenuItem && submenuItem.querySelector("button");
	var submenu = submenuItem && submenuItem.querySelector(".submenu");
	var setSubmenu = function (open, restoreFocus) {
		if (!submenuItem || !submenuButton || !submenu) return;
		submenuItem.classList.toggle("submenu-open", open);
		submenu.classList.toggle("hidden", !open);
		submenuButton.setAttribute("aria-expanded", String(open));
		if (restoreFocus) submenuButton.focus();
	};
	if (submenuItem && submenuButton && submenu) {
		if (!submenu.id) submenu.id = "pages-submenu";
		submenuButton.setAttribute("aria-controls", submenu.id);
		submenuButton.setAttribute("aria-haspopup", "true");
		submenuButton.setAttribute("aria-expanded", "false");
		submenuButton.addEventListener("click", function (event) {
			event.preventDefault();
			setSubmenu(!submenuItem.classList.contains("submenu-open"), false);
		});
		document.addEventListener("click", function (event) {
			if (!submenuItem.contains(event.target)) setSubmenu(false, false);
		});
	}

	var header = document.querySelector(".ud-header");
	if (header) {
		var onScroll = function () {
			header.classList.toggle("sticky", window.scrollY > 80);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	var themeBtn = document.querySelector('[aria-label="theme toggler"]');
	var syncThemeButton = function () {
		if (!themeBtn) return;
		var dark = document.documentElement.classList.contains("dark");
		themeBtn.setAttribute("aria-pressed", String(dark));
		themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
	};
	if (themeBtn) {
		syncThemeButton();
		themeBtn.addEventListener("click", function () {
			var root = document.documentElement;
			var next = root.classList.contains("dark") ? "light" : "dark";
			root.classList.remove("light", "dark");
			root.classList.add(next);
			root.style.colorScheme = next;
			try {
				localStorage.setItem("theme", next);
			} catch (error) {
				return;
			} finally {
				syncThemeButton();
			}
		});
	}

	var wowEls = document.querySelectorAll(".wow");
	if ("IntersectionObserver" in window && wowEls.length) {
		var observer = new IntersectionObserver(
			function (entries, activeObserver) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var element = entry.target;
						var delay = element.getAttribute("data-wow-delay");
						if (delay) element.style.animationDelay = delay;
						element.classList.add("animated");
						activeObserver.unobserve(element);
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
		);
		wowEls.forEach(function (element) {
			observer.observe(element);
		});
	} else {
		wowEls.forEach(function (element) {
			element.classList.add("animated");
		});
	}

	function showToast(message) {
		var root = document.getElementById("toast-root");
		if (!root) return;
		root.setAttribute("aria-live", "polite");
		var toast = document.createElement("div");
		toast.className = "toast";
		toast.setAttribute("role", "status");
		toast.textContent = message;
		root.appendChild(toast);
		setTimeout(function () {
			toast.style.opacity = "0";
			toast.style.transition = "opacity .3s ease";
			setTimeout(function () {
				toast.remove();
			}, 300);
		}, 2800);
	}

	document.querySelectorAll("form").forEach(function (form) {
		form.addEventListener("submit", function (event) {
			event.preventDefault();
			var action = form.getAttribute("data-toast") || "Thanks! Your submission was received.";
			showToast(action);
			form.reset();
		});
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			if (submenuItem && submenuItem.classList.contains("submenu-open")) {
				setSubmenu(false, true);
			} else if (collapse && collapse.classList.contains("navbar-open")) {
				setNavigation(false, true);
			}
		}
	});
	window.addEventListener("resize", function () {
		if (window.innerWidth >= 1024) setNavigation(false, false);
	});
});
