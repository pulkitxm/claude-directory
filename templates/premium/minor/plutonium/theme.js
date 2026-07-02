// Theme + interactivity for Plutonium clone
(function () {
  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.colorScheme = theme;
  }

  function currentTheme() {
    var stored = localStorage.getItem("plutonium-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-theme-toggle]");
    var theme = currentTheme();
    applyTheme(theme);
    updateIcon(theme);

    if (toggle) {
      toggle.addEventListener("click", function () {
        theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
        applyTheme(theme);
        localStorage.setItem("plutonium-theme", theme);
        updateIcon(theme);
      });
    }

    function updateIcon(theme) {
      var sun = document.querySelectorAll("[data-icon-sun]");
      var moon = document.querySelectorAll("[data-icon-moon]");
      sun.forEach(function (el) { el.style.display = theme === "dark" ? "block" : "none"; });
      moon.forEach(function (el) { el.style.display = theme === "dark" ? "none" : "block"; });
    }

    // Hamburger menu
    var hamburger = document.querySelector("[data-hamburger]");
    var navLinks = document.querySelector("[data-nav-links]");
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("open");
      });
    }
  });
})();
