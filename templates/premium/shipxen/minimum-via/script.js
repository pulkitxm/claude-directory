/* Minimum Via clone — interactions: FAQ accordion + theme toggle */
(function () {
  "use strict";

  /* ---------- FAQ accordion (Radix-style, single-open) ---------- */
  var items = Array.prototype.slice.call(
    document.querySelectorAll("#faq .accordion-item")
  );

  function setContentHeight(item) {
    var content = item.querySelector(".accordion-content");
    var inner = item.querySelector(".accordion-content-inner");
    if (content && inner) {
      content.style.setProperty("--content-h", inner.offsetHeight + "px");
    }
  }

  function close(item) {
    if (item.getAttribute("data-state") !== "open") return;
    setContentHeight(item);
    item.setAttribute("data-state", "closing");
    var btn = item.querySelector(".accordion-trigger");
    if (btn) btn.setAttribute("aria-expanded", "false");
    var content = item.querySelector(".accordion-content");
    var onEnd = function () {
      if (item.getAttribute("data-state") === "closing") {
        item.setAttribute("data-state", "closed");
      }
      content.removeEventListener("animationend", onEnd);
    };
    content.addEventListener("animationend", onEnd);
  }

  function open(item) {
    setContentHeight(item);
    item.setAttribute("data-state", "open");
    var btn = item.querySelector(".accordion-trigger");
    if (btn) btn.setAttribute("aria-expanded", "true");
  }

  items.forEach(function (item) {
    var btn = item.querySelector(".accordion-trigger");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = item.getAttribute("data-state") === "open";
      // single-type: close all others
      items.forEach(function (other) {
        if (other !== item) close(other);
      });
      if (isOpen) {
        close(item);
      } else {
        open(item);
      }
    });
  });

  window.addEventListener("resize", function () {
    items.forEach(function (item) {
      if (item.getAttribute("data-state") === "open") setContentHeight(item);
    });
  });

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var sun = toggle ? toggle.querySelector(".icon-sun") : null;
  var moon = toggle ? toggle.querySelector(".icon-moon") : null;

  function applyTheme(dark) {
    root.classList.toggle("dark", dark);
    root.classList.toggle("light", !dark);
    if (sun && moon) {
      sun.style.display = dark ? "none" : "";
      moon.style.display = dark ? "" : "none";
    }
    try { localStorage.setItem("mv-theme", dark ? "dark" : "light"); } catch (e) {}
  }

  var stored = null;
  try { stored = localStorage.getItem("mv-theme"); } catch (e) {}
  applyTheme(stored === "dark");

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(!root.classList.contains("dark"));
    });
  }
})();
