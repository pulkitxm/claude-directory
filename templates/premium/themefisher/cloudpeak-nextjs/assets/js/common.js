(function () {
  "use strict";

  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { toggle.checked = false; });
    });
  }

  function initMegaMenu() {
    var item = document.getElementById("all-pages");
    var menu = document.getElementById("all-pages-dropdown");
    if (!item || !menu) return;
    var trigger = item.querySelector(".nav-link");
    trigger.addEventListener("click", function (event) {
      if (window.innerWidth >= 1024) return;
      event.preventDefault();
      menu.classList.toggle("static-open");
    });
  }

  function initPricing() {
    var input = document.getElementById("pricing-switch");
    var monthly = document.getElementById("monthly-card-container");
    var yearly = document.getElementById("yearly-card-container");
    if (!input || !monthly || !yearly) return;
    function update() {
      monthly.classList.toggle("hidden", input.checked);
      yearly.classList.toggle("hidden", !input.checked);
      document.getElementById("monthly").classList.toggle("text-white", !input.checked);
      document.getElementById("yearly").classList.toggle("text-white", input.checked);
    }
    input.addEventListener("change", update);
    update();
  }

  function initAccordions() {
    document.querySelectorAll(".accordion-header").forEach(function (header) {
      header.addEventListener("click", function () {
        var accordion = header.closest(".accordion");
        var content = accordion && accordion.querySelector(".accordion-content");
        if (!accordion || !content) return;
        accordion.classList.toggle("open");
        content.style.maxHeight = accordion.classList.contains("open") ? content.scrollHeight + "px" : "0px";
      });
    });
  }

  function init() {
    initMobileNav();
    initMegaMenu();
    initPricing();
    initAccordions();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
