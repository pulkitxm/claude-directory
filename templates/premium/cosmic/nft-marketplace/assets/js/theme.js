/* Theme toggle wiring. The no-flash boot (reading localStorage / prefers-color-scheme
   and setting the `dark` class on <html> before first paint) lives inline in the
   <head> of every page — see the inline script right after <html>. This file only
   wires up the visible toggle switches once the DOM is ready. */
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
      /* ignore (private mode / storage disabled) */
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
