(function () {
  "use strict";

  var menuToggle = document.getElementById("menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  function closeMenu() {
    if (!menuToggle || !mobileNav) return;
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  if (menuToggle && mobileNav) {
    menuToggle.setAttribute("aria-controls", mobileNav.id);
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mobileNav.classList.contains("open")) {
        closeMenu();
        menuToggle.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
  }

  document.querySelectorAll("input, textarea, select").forEach(function (field) {
    var id = field.id;
    var hasLabel =
      field.hasAttribute("aria-label") ||
      field.hasAttribute("aria-labelledby") ||
      field.closest("label") ||
      (id && document.querySelector("label[for='" + id + "']"));
    if (!hasLabel && field.getAttribute("placeholder")) field.setAttribute("aria-label", field.getAttribute("placeholder"));
  });

  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  });
})();
