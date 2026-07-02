/*
  common.js — Shared vanilla-JS behavior for every page of the Darkrise clone.
  Load with `<script src="/assets/js/common.js" defer></script>` at the end
  of <body> (or in <head> with `defer`) on every page.

  ---------------------------------------------------------------------
  NO-FLASH THEME BOOT (inline snippet)
  ---------------------------------------------------------------------
  Theme resolution MUST happen before first paint, or the page flashes
  the wrong theme. Because this file loads with `defer` (i.e. after
  parsing but still before some paint work, though not guaranteed
  pre-first-paint on slow connections), every page should ALSO inline
  the following tiny snippet directly in <head>, before any stylesheet
  link, so it always runs synchronously pre-paint:

    <script>
      (function () {
        try {
          var stored = localStorage.getItem('theme');
          var theme = stored || 'dark'; // Darkrise has no native light mode; default stays dark unless the user explicitly toggles (see common.js).
          document.documentElement.setAttribute('data-theme', theme);
        } catch (e) {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      })();
    </script>

  common.js's initTheme() below runs the same resolution again (cheap,
  idempotent) so pages that forget the inline snippet still end up
  correct after JS loads, just with a possible first-paint flash.
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
    } catch (e) {
      /* localStorage unavailable (privacy mode, file://, etc.) */
    }
    // Darkrise has no native light mode — the live source site is always
    // dark for every visitor. We default to dark here too and only switch
    // to light when the user has explicitly toggled it (persisted above).
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
  /* Mobile nav hamburger (checkbox-driven; this just keeps the  */
  /* show/hide icon swap in sync for browsers/edge cases where   */
  /* the pure-CSS sibling selectors in base.css aren't enough,   */
  /* e.g. closing the menu when a nav link is clicked).          */
  /* ---------------------------------------------------------- */

  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    menu.querySelectorAll(".nav-link, .nav-dropdown-link").forEach(function (link) {
      link.addEventListener("click", function () {
        // Only auto-close for real navigation links, not the "All Pages"
        // dropdown trigger span (which has no href).
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
        // Only intercept on touch/coarse-pointer devices; desktop relies
        // on the CSS :hover/:focus-within rules in base.css.
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
      // Fallback: reveal everything immediately.
      targets.forEach(function (el) { el.classList.add("aos-animate"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
            obs.unobserve(entry.target); // AOS default: once: true
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
  /* Boot                                                         */
  /* ---------------------------------------------------------- */

  function init() {
    initTheme();
    initMobileNav();
    initMegaMenu();
    initScrollReveal();
    initMarquee();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
