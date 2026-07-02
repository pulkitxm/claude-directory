// NextAdmin clone — shared vanilla-JS behavior for every page:
// sidebar accordion + mobile off-canvas, theme toggle, header dropdowns,
// active-link highlighting, and small ui-elements widgets (tabs, accordion,
// modal, popover, tooltip, carousel, progress-bar reveal).
(function () {
  "use strict";

  function currentFile() {
    var p = window.location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  /* ---------- sidebar accordion ---------- */
  function initSidebar() {
    var sidebar = document.getElementById("app-sidebar");
    if (!sidebar) return;
    var file = currentFile();

    // mark active link + open its parent group
    var links = sidebar.querySelectorAll(".nav-toplink, .nav-sublink");
    links.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === file) {
        a.classList.add("is-active");
        var group = a.closest(".nav-group");
        if (group) {
          var btn = group.querySelector(".nav-group-btn");
          var list = group.querySelector(".nav-sublist");
          if (btn && list) {
            btn.setAttribute("aria-expanded", "true");
            btn.classList.add("is-active");
            list.classList.remove("hidden");
          }
        }
      }
    });

    var groupBtns = sidebar.querySelectorAll(".nav-group-btn");
    groupBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var list = btn.parentElement.querySelector(".nav-sublist");
        var expanded = btn.getAttribute("aria-expanded") === "true";
        // collapse siblings in the same section (single-open-at-a-time)
        var section = btn.closest("nav");
        if (section) {
          section.querySelectorAll(".nav-group-btn").forEach(function (other) {
            if (other !== btn) {
              other.setAttribute("aria-expanded", "false");
              var otherList = other.parentElement.querySelector(".nav-sublist");
              if (otherList) otherList.classList.add("hidden");
            }
          });
        }
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
        if (list) list.classList.toggle("hidden", expanded);
      });
    });

    // mobile off-canvas
    var toggleBtn = document.getElementById("sidebar-toggle-btn");
    var closeBtn = document.getElementById("sidebar-close-btn");
    var overlay = document.getElementById("sidebar-overlay");
    function openSidebar() {
      sidebar.classList.add("sidebar-open");
      if (overlay) overlay.classList.remove("hidden");
    }
    function closeSidebar() {
      sidebar.classList.remove("sidebar-open");
      if (overlay) overlay.classList.add("hidden");
    }
    if (toggleBtn) toggleBtn.addEventListener("click", openSidebar);
    if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);
  }

  /* ---------- theme toggle ---------- */
  function initTheme() {
    var btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var root = document.documentElement;
      var isDark = root.classList.contains("dark");
      root.classList.toggle("dark", !isDark);
      root.classList.toggle("light", isDark);
      try {
        localStorage.setItem("theme", isDark ? "light" : "dark");
      } catch (e) {}
    });
  }

  /* ---------- header dropdowns ---------- */
  function initDropdown(btnId, panelId) {
    var btn = document.getElementById(btnId);
    var panel = document.getElementById(panelId);
    if (!btn || !panel) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !panel.classList.contains("hidden");
      document.querySelectorAll(".dropdown-panel").forEach(function (p) {
        p.classList.add("hidden");
      });
      panel.classList.toggle("hidden", open);
      btn.setAttribute("aria-expanded", String(!open));
    });
  }

  function initDropdowns() {
    initDropdown("notif-btn", "notif-dropdown");
    initDropdown("user-menu-btn", "user-dropdown");
    document.addEventListener("click", function () {
      document.querySelectorAll(".dropdown-panel").forEach(function (p) {
        p.classList.add("hidden");
      });
    });
  }

  /* ---------- ui-elements: accordion ---------- */
  function initAccordions() {
    document.querySelectorAll("[data-accordion-trigger]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var panel = document.querySelector(trigger.getAttribute("data-accordion-trigger"));
        if (!panel) return;
        panel.classList.toggle("is-collapsed");
        trigger.classList.toggle("is-open");
      });
    });
  }

  /* ---------- ui-elements: tabs ---------- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var buttons = group.querySelectorAll("[data-tab-trigger]");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var target = btn.getAttribute("data-tab-trigger");
          buttons.forEach(function (b) {
            b.classList.remove("is-active-tab");
          });
          btn.classList.add("is-active-tab");
          group.querySelectorAll("[data-tab-panel]").forEach(function (panel) {
            panel.classList.toggle("is-hidden", "#" + panel.id !== target);
          });
        });
      });
    });
  }

  /* ---------- ui-elements: modal ---------- */
  function initModals() {
    document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var modal = document.querySelector(btn.getAttribute("data-modal-open"));
        if (modal) modal.classList.add("is-open");
      });
    });
    document.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var modal = btn.closest("[data-modal-backdrop]");
        if (modal) modal.classList.remove("is-open");
      });
    });
    document.querySelectorAll("[data-modal-backdrop]").forEach(function (backdrop) {
      backdrop.addEventListener("click", function (e) {
        if (e.target === backdrop) backdrop.classList.remove("is-open");
      });
    });
  }

  /* ---------- ui-elements: popover ---------- */
  function initPopovers() {
    document.querySelectorAll("[data-popover-trigger]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var panel = document.querySelector(btn.getAttribute("data-popover-trigger"));
        if (!panel) return;
        var wasOpen = panel.classList.contains("is-open");
        document.querySelectorAll("[data-popover-panel]").forEach(function (p) {
          p.classList.remove("is-open");
        });
        panel.classList.toggle("is-open", !wasOpen);
      });
    });
    document.addEventListener("click", function () {
      document.querySelectorAll("[data-popover-panel]").forEach(function (p) {
        p.classList.remove("is-open");
      });
    });
  }

  /* ---------- carousel ---------- */
  function initCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
      var track = carousel.querySelector("[data-carousel-track]");
      var slides = carousel.querySelectorAll("[data-carousel-slide]");
      if (!track || !slides.length) return;
      var index = 0;
      function show(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = "translateX(-" + index * 100 + "%)";
      }
      var prev = carousel.querySelector("[data-carousel-prev]");
      var next = carousel.querySelector("[data-carousel-next]");
      if (prev) prev.addEventListener("click", function () { show(index - 1); });
      if (next) next.addEventListener("click", function () { show(index + 1); });
      setInterval(function () { show(index + 1); }, 4000);
    });
  }

  /* ---------- progress bars: animate to their target width on load ---------- */
  function initProgressBars() {
    document.querySelectorAll("[data-progress-bar]").forEach(function (bar) {
      var target = bar.getAttribute("data-progress-bar");
      bar.style.width = "0%";
      requestAnimationFrame(function () {
        setTimeout(function () {
          bar.style.width = target + "%";
        }, 100);
      });
    });
  }

  /* ---------- scroll-reveal for dashboard cards ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal-on-scroll");
    if (!("IntersectionObserver" in window) || !items.length) return;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSidebar();
    initTheme();
    initDropdowns();
    initAccordions();
    initTabs();
    initModals();
    initPopovers();
    initCarousels();
    initProgressBars();
    initReveal();
  });
})();
