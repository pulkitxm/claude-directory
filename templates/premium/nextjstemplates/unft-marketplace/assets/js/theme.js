
(function () {
  function isDark() {
    return document.documentElement.classList.contains("dark");
  }

  function applyToggleState(el) {
    el.classList.toggle("is-on", isDark());
    var input = el.querySelector("input[type=checkbox]");
    if (input) input.checked = isDark();
  }

  function setTheme(dark) {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("unft-theme", dark ? "dark" : "light");
    } catch (e) {

    }
    document.querySelectorAll("[data-theme-toggle]").forEach(applyToggleState);
  }

  function init() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (el) {
      applyToggleState(el);
      el.addEventListener("click", function (e) {
        e.preventDefault();
        setTheme(!isDark());
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
