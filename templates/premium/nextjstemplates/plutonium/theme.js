(function () {
  var root = document.documentElement;
  var storageKey = "plutonium-theme";

  function storedTheme() {
    try {
      var stored = localStorage.getItem(storageKey);
      return stored === "light" || stored === "dark" ? stored : null;
    } catch (error) {
      return null;
    }
  }

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    document.querySelectorAll("[data-icon-sun]").forEach(function (element) {
      element.style.display = theme === "dark" ? "block" : "none";
    });
    document.querySelectorAll("[data-icon-moon]").forEach(function (element) {
      element.style.display = theme === "dark" ? "none" : "block";
    });
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var theme = storedTheme() || systemTheme();
    var toggle = document.querySelector("[data-theme-toggle]");
    applyTheme(theme);

    if (toggle) {
      toggle.addEventListener("click", function () {
        theme = root.classList.contains("dark") ? "light" : "dark";
        applyTheme(theme);
        try {
          localStorage.setItem(storageKey, theme);
        } catch (error) {
          return;
        }
      });
    }

    var media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", function () {
      if (!storedTheme()) applyTheme(systemTheme());
    });

    var hamburger = document.querySelector("[data-hamburger]");
    var navLinks = document.querySelector("[data-nav-links]");
    var setNavigation = function (open, restoreFocus) {
      if (!hamburger || !navLinks) return;
      navLinks.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
      if (restoreFocus) hamburger.focus();
    };

    if (hamburger && navLinks) {
      if (!navLinks.id) navLinks.id = "primary-navigation";
      hamburger.setAttribute("aria-controls", navLinks.id);
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.addEventListener("click", function () {
        setNavigation(!navLinks.classList.contains("open"), false);
      });
      navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          setNavigation(false, false);
        });
      });
      document.addEventListener("click", function (event) {
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
          setNavigation(false, false);
        }
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && navLinks.classList.contains("open")) {
          setNavigation(false, true);
        }
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth >= 768) setNavigation(false, false);
      });
    }
  });
})();
