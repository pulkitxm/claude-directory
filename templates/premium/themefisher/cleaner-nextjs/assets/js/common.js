/*
  common.js — Shared vanilla-JS behavior for every page of the Cleaner clone.
  Load with `<script src="assets/js/common.js" defer></script>` before
  `</body>` on every page. Also inline the no-flash theme boot snippet
  (see below) in <head>, before the stylesheet link.

  ---------------------------------------------------------------------
  NO-FLASH THEME BOOT (inline snippet — put this in <head> on every page)
  ---------------------------------------------------------------------
    <script>
      (function () {
        try {
          var stored = localStorage.getItem('theme');
          var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          document.documentElement.setAttribute('data-theme', theme);
        } catch (e) {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      })();
    </script>
  ---------------------------------------------------------------------
*/

(function () {
  "use strict";

  /* ---------------------------------------------------------- */
  /* Theme: boot + toggle wiring                                 */
  /* ---------------------------------------------------------- */
  function resolveTheme() {
    try {
      var stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch (e) { /* localStorage unavailable */ }
    try {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    } catch (e) { /* ignore */ }
    return "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function initTheme() {
    applyTheme(resolveTheme());
    document.addEventListener("click", function (event) {
      var toggle = event.target.closest("[data-theme-toggle]");
      if (!toggle) return;
      var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------------------------------------------------------- */
  /* Mobile nav hamburger                                        */
  /* ---------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    var scrim = document.getElementById("nav-scrim");
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      if (scrim) scrim.classList.remove("nav-scrim-open");
      document.body.style.overflow = "";
    }
    function openMenu() {
      menu.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      if (scrim) scrim.classList.add("nav-scrim-open");
      document.body.style.overflow = "hidden";
    }
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu(); else openMenu();
    });
    if (scrim) scrim.addEventListener("click", closeMenu);
    menu.querySelectorAll(".nav-item").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) closeMenu();
    });
  }

  /* ---------------------------------------------------------- */
  /* Sticky header show/hide on scroll direction                 */
  /* ---------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var lastY = window.scrollY;
    var ticking = false;
    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle("header-scrolled", y > 12);
      if (y > lastY && y > 160) {
        header.classList.add("header-hidden");
      } else {
        header.classList.remove("header-hidden");
      }
      lastY = y;
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------- */
  /* AOS - Animate on Scroll (ported behavior)                   */
  /* ---------------------------------------------------------- */
  function initAOS() {
    var elements = document.querySelectorAll("[data-aos]");
    if (!elements.length) return;

    function isInViewport(el) {
      var rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - 60 && rect.bottom > 0;
    }
    function check() {
      elements.forEach(function (el) {
        if (el.classList.contains("aos-animate")) return;
        if (isInViewport(el)) {
          var delay = parseInt(el.getAttribute("data-aos-delay") || "0", 10);
          setTimeout(function () { el.classList.add("aos-animate"); }, delay);
        }
      });
    }
    setTimeout(check, 100);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
  }

  /* ---------------------------------------------------------- */
  /* Accordion                                                    */
  /* ---------------------------------------------------------- */
  function initAccordion() {
    document.querySelectorAll(".accordion-header").forEach(function (header) {
      header.addEventListener("click", function () {
        var item = header.closest(".accordion");
        if (!item) return;
        var parent = item.parentElement;
        var exclusive = parent && parent.hasAttribute("data-accordion-exclusive");
        if (exclusive) {
          parent.querySelectorAll(".accordion.active").forEach(function (other) {
            if (other !== item) other.classList.remove("active");
          });
        }
        item.classList.toggle("active");
      });
    });
  }

  /* ---------------------------------------------------------- */
  /* Tabs                                                         */
  /* ---------------------------------------------------------- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (wrap) {
      var navItems = wrap.querySelectorAll(".tab-nav-item");
      var panels = wrap.querySelectorAll(".tab-panel");
      navItems.forEach(function (item) {
        item.addEventListener("click", function () {
          var target = item.getAttribute("data-tab-target");
          navItems.forEach(function (n) { n.classList.remove("active"); });
          panels.forEach(function (p) { p.classList.remove("active"); });
          item.classList.add("active");
          var panel = wrap.querySelector('[data-tab-panel="' + target + '"]');
          if (panel) panel.classList.add("active");
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initMobileNav();
    initHeaderScroll();
    initAOS();
    initAccordion();
    initTabs();
  });
})();
