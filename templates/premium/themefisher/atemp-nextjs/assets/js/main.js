(function () {
  "use strict";

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll("[data-aos]").forEach(function (el) { io.observe(el); });

  var hamburger = document.querySelector(".hamburger");
  var mobilePanel = document.querySelector(".mobile-panel");
  var overlay = document.querySelector(".mobile-overlay");
  var mobileClose = document.querySelector(".mobile-close");
  function closeMobile() { mobilePanel && mobilePanel.classList.remove("open"); overlay && overlay.classList.remove("open"); }
  if (hamburger) hamburger.addEventListener("click", function () { mobilePanel.classList.add("open"); overlay.classList.add("open"); });
  if (overlay) overlay.addEventListener("click", closeMobile);
  if (mobileClose) mobileClose.addEventListener("click", closeMobile);

  document.querySelectorAll(".nav-drop > span").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      trigger.parentElement.classList.toggle("open");
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".nav-drop.open").forEach(function (d) {
      if (!d.contains(e.target)) d.classList.remove("open");
    });
  });

  document.querySelectorAll(".accordion-item").forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var panel = item.querySelector(".accordion-panel");
    if (!trigger || !panel) return;
    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".accordion-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".accordion-panel").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  document.querySelectorAll(".tab-toggle").forEach(function (toggle) {
    var buttons = toggle.querySelectorAll("button");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var target = btn.getAttribute("data-tab");
        document.querySelectorAll(".pricing-tab-panel").forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-panel") === target);
        });
      });
    });
  });

  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  function applyStoredTheme() {
    var stored = localStorage.getItem("atemp-theme");
    if (stored) root.setAttribute("data-theme", stored);
  }
  applyStoredTheme();
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("atemp-theme", next);
    });
  }

  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 8 ? "0 4px 16px rgba(0,0,0,.06)" : "none";
    }, { passive: true });
  }

  var noticeClose = document.querySelector("#close-header-learn-more");
  if (noticeClose) noticeClose.addEventListener("click", function () {
    var notice = document.querySelector("#close-header-parent");
    if (notice) notice.hidden = true;
  });

  document.querySelectorAll(".accordion").forEach(function (item) {
    var trigger = item.querySelector(".accordion-header");
    if (trigger) trigger.addEventListener("click", function () { item.classList.toggle("active"); });
  });

  document.querySelectorAll(".c-tab").forEach(function (tab) {
    var buttons = tab.querySelectorAll(".c-tab-nav-item");
    var panels = tab.querySelectorAll(".c-tab-content-panel");
    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        buttons.forEach(function (entry) { entry.classList.remove("active"); });
        panels.forEach(function (entry) { entry.classList.remove("active"); });
        button.classList.add("active");
        if (panels[index]) panels[index].classList.add("active");
      });
    });
  });
})();
