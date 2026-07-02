/*
  common.js — Shared vanilla-JS behavior for every page of the CloudPeak clone.
  Load with `<script src="/assets/js/common.js" defer></script>` at the end
  of <body> (or in <head> with `defer`) on every page.

  Every page also inlines a tiny no-flash theme-boot snippet directly in
  <head>, before any stylesheet link, so theme resolution runs synchronously
  pre-paint:

    <script>
      (function () {
        try {
          var stored = localStorage.getItem('theme');
          var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
          document.documentElement.setAttribute('data-theme', theme);
        } catch (e) {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      })();
    </script>
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
    } catch (e) {
      /* localStorage unavailable (privacy mode, file://, etc.) */
    }
    // The source template is dark-only (no native light mode / no
    // prefers-color-scheme handling of its own), so the clone defaults to
    // dark for every first-time visitor regardless of OS preference,
    // matching the reference pixel-for-pixel. Users can still opt into the
    // light theme explicitly via the toggle, which is then persisted.
    return "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function initTheme() {
    applyTheme(resolveTheme());

    document.addEventListener("click", function (event) {
      var toggle = event.target.closest("[data-theme-toggle]");
      if (!toggle) return;
      var current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      var next = current === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* ignore persistence failures */
      }
    });
  }

  /* ---------------------------------------------------------- */
  /* Mobile nav hamburger                                        */
  /* ---------------------------------------------------------- */

  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    menu.querySelectorAll(".nav-link, .nav-dropdown-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (link.tagName === "A") {
          toggle.checked = false;
        }
      });
    });
  }

  /* ---------------------------------------------------------- */
  /* Mega-menu ("All Pages") touch fallback                      */
  /* ---------------------------------------------------------- */

  function initMegaMenu() {
    var dropdowns = document.querySelectorAll(".nav-dropdown");
    dropdowns.forEach(function (dropdown) {
      var trigger = dropdown.querySelector(".nav-link");
      if (!trigger) return;

      trigger.addEventListener("click", function (event) {
        var isCoarse = window.matchMedia && window.matchMedia("(hover: none)").matches;
        if (!isCoarse) return;
        event.preventDefault();
        var isOpen = dropdown.classList.contains("open");
        dropdowns.forEach(function (d) { d.classList.remove("open"); });
        if (!isOpen) dropdown.classList.add("open");
      });
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".nav-dropdown")) {
        dropdowns.forEach(function (d) { d.classList.remove("open"); });
      }
    });
  }

  /* ---------------------------------------------------------- */
  /* FAQ accordion                                                */
  /* ---------------------------------------------------------- */

  function initAccordion() {
    document.querySelectorAll(".accordion-header").forEach(function (header) {
      header.addEventListener("click", function () {
        var accordion = header.closest(".accordion");
        var content = accordion.querySelector(".accordion-content");
        var isOpen = accordion.classList.contains("open");

        if (isOpen) {
          accordion.classList.remove("open");
          content.style.maxHeight = "0px";
        } else {
          accordion.classList.add("open");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------------------------------------------------- */
  /* Pricing Monthly/Yearly switch                                */
  /* ---------------------------------------------------------- */

  function initPricingSwitch() {
    var input = document.getElementById("pricing-switch");
    if (!input) return;
    var monthlyLabel = document.getElementById("monthly");
    var yearlyLabel = document.getElementById("yearly");
    var scope = document.querySelector(".pricing-scope") || document.body;

    function update() {
      var yearly = input.checked;
      scope.classList.toggle("is-yearly", yearly);
      if (monthlyLabel) monthlyLabel.classList.toggle("active", !yearly);
      if (yearlyLabel) yearlyLabel.classList.toggle("active", yearly);
    }

    input.addEventListener("change", update);
    update();
  }

  /* ---------------------------------------------------------- */
  /* Tabs (elements page)                                         */
  /* ---------------------------------------------------------- */

  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (wrap) {
      wrap.querySelectorAll(".elements-tab-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          wrap.querySelectorAll(".elements-tab-btn").forEach(function (b) { b.classList.remove("active"); });
          wrap.querySelectorAll(".elements-tab-panel").forEach(function (p) { p.classList.remove("active"); });
          btn.classList.add("active");
          var target = wrap.querySelector("#" + btn.dataset.tab);
          if (target) target.classList.add("active");
        });
      });
    });
  }

  /* ---------------------------------------------------------- */
  /* AOS-equivalent scroll reveal                                 */
  /* ---------------------------------------------------------- */

  function initScrollReveal() {
    var targets = document.querySelectorAll("[data-aos]");
    if (!targets.length) return;

    targets.forEach(function (el) {
      var duration = el.getAttribute("data-aos-duration");
      var delay = el.getAttribute("data-aos-delay");
      if (duration) el.style.transitionDuration = duration + "ms";
      if (delay) el.style.transitionDelay = delay + "ms";
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("aos-animate"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------- */
  /* Marquee: duplicate content once for a seamless CSS loop      */
  /* ---------------------------------------------------------- */

  function initMarquee() {
    document.querySelectorAll("[data-marquee]").forEach(function (root) {
      if (root.dataset.marqueeInit === "true") return;
      var track = root.querySelector(".marquee-track");
      if (!track) return;
      var clone = track.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      root.appendChild(clone);
      root.dataset.marqueeInit = "true";
    });
  }

  /* ---------------------------------------------------------- */
  /* Sticky header shrink-on-scroll                               */
  /* ---------------------------------------------------------- */

  function initStickyHeader() {
    var header = document.querySelector(".header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------- */
  /* Boot                                                         */
  /* ---------------------------------------------------------- */

  function init() {
    initTheme();
    initMobileNav();
    initMegaMenu();
    initAccordion();
    initPricingSwitch();
    initTabs();
    initScrollReveal();
    initMarquee();
    initStickyHeader();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
