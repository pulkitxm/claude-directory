/* Front Centre — interactions: theme toggle, FAQ accordion, scroll reveal, mobile nav */
(function () {
  "use strict";

  /* ---------- Theme toggle (light/dark, persisted) ---------- */
  var root = document.documentElement;
  var stored = null;
  try {
    stored = localStorage.getItem("fc-theme");
  } catch (e) {}
  if (stored === "dark" || stored === "light") {
    root.classList.remove("light", "dark");
    root.classList.add(stored);
  }
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark = root.classList.contains("dark");
      root.classList.remove("light", "dark");
      root.classList.add(isDark ? "light" : "dark");
      try {
        localStorage.setItem("fc-theme", isDark ? "light" : "dark");
      } catch (e) {}
    });
  }

  /* ---------- FAQ accordion (independent toggles, animated height) ---------- */
  var items = document.querySelectorAll("#accordion .acc-item");
  items.forEach(function (item) {
    var trigger = item.querySelector(".acc-trigger");
    var panel = item.querySelector(".acc-panel");
    if (!trigger || !panel) return;
    trigger.addEventListener("click", function () {
      var open = item.classList.contains("open");
      if (open) {
        panel.style.height = panel.scrollHeight + "px";
        requestAnimationFrame(function () {
          panel.style.height = "0px";
        });
        item.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.height = panel.scrollHeight + "px";
        panel.addEventListener(
          "transitionend",
          function onEnd(e) {
            if (e.propertyName === "height" && item.classList.contains("open")) {
              panel.style.height = "auto";
            }
            panel.removeEventListener("transitionend", onEnd);
          }
        );
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  var revealAll = function () {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 120px 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
    /* Safety net: if a section never scrolls into view (e.g. headless
       full-page capture, print, or fast scroll), reveal everything so no
       content is ever stuck hidden. */
    window.setTimeout(revealAll, 2500);
  } else {
    revealAll();
  }

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById("hamburger");
  var nav = document.querySelector(".main-nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }
})();
