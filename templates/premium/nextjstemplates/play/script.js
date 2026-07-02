// Play (nextjstemplates) clone — shared interactions for every page.
document.addEventListener("DOMContentLoaded", function () {
	/* ---------- Sign in / Sign up: Magic Link <-> Password tab toggle ---------- */
	var tabMagic = document.getElementById("tabMagic");
	var tabPassword = document.getElementById("tabPassword");
	var formMagic = document.getElementById("formMagic");
	var formPassword = document.getElementById("formPassword");
	var activeTabCls = ["bg-dark-3", "text-white"];
	if (tabMagic && tabPassword && formMagic && formPassword) {
		var setTab = function (which) {
			var magicActive = which === "magic";
			tabMagic.classList.toggle("bg-dark-3", magicActive);
			tabMagic.classList.toggle("text-white", magicActive);
			tabPassword.classList.toggle("bg-dark-3", !magicActive);
			tabPassword.classList.toggle("text-white", !magicActive);
			formMagic.classList.toggle("hidden", !magicActive);
			formPassword.classList.toggle("hidden", magicActive);
		};
		tabMagic.addEventListener("click", function () {
			setTab("magic");
		});
		tabPassword.addEventListener("click", function () {
			setTab("password");
		});
	}

	/* ---------- Mobile menu toggle ---------- */
	var toggler = document.getElementById("navbarToggler");
	var collapse = document.getElementById("navbarCollapse");
	if (toggler && collapse) {
		toggler.addEventListener("click", function () {
			collapse.classList.toggle("navbar-open");
			var spans = toggler.querySelectorAll("span");
			spans.forEach(function (s) {
				s.classList.toggle("open");
			});
		});
	}

	/* ---------- "Pages" submenu — click toggle on mobile/tablet ---------- */
	document.querySelectorAll(".submenu-item").forEach(function (item) {
		var btn = item.querySelector("button");
		var submenu = item.querySelector(".submenu");
		if (!btn || !submenu) return;
		btn.addEventListener("click", function (e) {
			if (window.innerWidth < 1024) {
				e.preventDefault();
				item.classList.toggle("submenu-open");
				submenu.classList.toggle("hidden");
			}
		});
	});

	/* ---------- Sticky header on scroll ---------- */
	var header = document.querySelector(".ud-header");
	if (header) {
		var onScroll = function () {
			if (window.scrollY > 80) {
				header.classList.add("sticky");
			} else {
				header.classList.remove("sticky");
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	/* ---------- Theme toggler (persisted, next-themes compatible) ---------- */
	var themeBtn = document.querySelector('[aria-label="theme toggler"]');
	if (themeBtn) {
		themeBtn.addEventListener("click", function () {
			var root = document.documentElement;
			var isDark = root.classList.contains("dark");
			var next = isDark ? "light" : "dark";
			root.classList.remove("light", "dark");
			root.classList.add(next);
			root.style.colorScheme = next;
			try {
				localStorage.setItem("theme", next);
			} catch (e) {}
		});
	}

	/* ---------- Scroll-reveal (wow.js equivalent) ----------
	   Elements are fully visible by default (see .wow{opacity:1} in styles.css) so
	   full-page captures always show complete content. The IntersectionObserver below
	   only ADDS a fadeInUp replay as flair when a section scrolls into view for a real
	   visitor — it never hides anything, so nothing depends on the observer firing. */
	var wowEls = document.querySelectorAll(".wow");
	if ("IntersectionObserver" in window && wowEls.length) {
		var io = new IntersectionObserver(
			function (entries, obs) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var el = entry.target;
						var delay = el.getAttribute("data-wow-delay");
						if (delay) {
							el.style.animationDelay = delay;
						}
						el.classList.add("animated");
						obs.unobserve(el);
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
		);
		wowEls.forEach(function (el) {
			io.observe(el);
		});
	} else {
		wowEls.forEach(function (el) {
			el.classList.add("animated");
		});
	}

	/* ---------- Toast helper ---------- */
	function showToast(message) {
		var root = document.getElementById("toast-root");
		if (!root) return;
		var t = document.createElement("div");
		t.className = "toast";
		t.textContent = message;
		root.appendChild(t);
		setTimeout(function () {
			t.style.opacity = "0";
			t.style.transition = "opacity .3s ease";
			setTimeout(function () {
				t.remove();
			}, 300);
		}, 2800);
	}

	/* ---------- Forms: contact / signin / signup / forgot-password ---------- */
	document.querySelectorAll("form").forEach(function (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			var action = form.getAttribute("data-toast") || "Thanks! Your submission was received.";
			showToast(action);
			form.reset();
		});
	});
});
