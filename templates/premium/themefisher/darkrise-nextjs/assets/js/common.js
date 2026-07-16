(function () {
  "use strict";

  function initNavigation() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (toggle && menu) {
      menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () { toggle.checked = false; });
      });
    }
    document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
      var trigger = dropdown.querySelector(".nav-link");
      var panel = dropdown.querySelector(".mega-menu-wrapper, .nav-dropdown-list");
      if (!trigger || !panel) return;
      trigger.addEventListener("click", function (event) {
        if (window.innerWidth >= 1024) return;
        event.preventDefault();
        panel.classList.toggle("static-open");
      });
    });
  }

  function initAccordions() {
    document.querySelectorAll(".accordion-header").forEach(function (header) {
      header.addEventListener("click", function () {
        var item = header.closest(".accordion");
        var content = item && item.querySelector(".accordion-content");
        if (!item || !content) return;
        item.classList.toggle("open");
        content.style.maxHeight = item.classList.contains("open") ? content.scrollHeight + "px" : "0px";
      });
    });
  }

  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (tabs) {
      tabs.querySelectorAll("[data-tab]").forEach(function (button) {
        button.addEventListener("click", function () {
          tabs.querySelectorAll("[data-tab]").forEach(function (item) { item.classList.remove("active"); });
          tabs.querySelectorAll("[data-tab-panel]").forEach(function (item) { item.classList.remove("active"); });
          button.classList.add("active");
          var panel = tabs.querySelector(`[data-tab-panel="${button.dataset.tab}"]`);
          if (panel) panel.classList.add("active");
        });
      });
    });
  }

  function init() {
    initNavigation();
    initAccordions();
    initTabs();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
