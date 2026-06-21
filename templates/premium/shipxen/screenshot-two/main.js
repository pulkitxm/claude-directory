(function () {
  "use strict";

  /* ---------- Inject star + check SVG icons ---------- */
  var STAR =
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.7 1.1 6.6L12 17.8 6.2 20.3l1.1-6.6L2.5 9l6.6-.9z"/></svg>';
  document.querySelectorAll("[data-stars]").forEach(function (el) {
    el.innerHTML = STAR.repeat(5);
  });

  var CHECK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12l4.5 4.5L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.querySelectorAll("[data-check]").forEach(function (el) {
    el.insertAdjacentHTML("afterbegin", CHECK);
  });

  /* ---------- Theme toggle (light <-> dark, persisted) ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var dark = root.classList.toggle("dark");
      try {
        localStorage.setItem("theme", dark ? "dark" : "light");
      } catch (e) {}
    });
  }

  /* ---------- Mobile hamburger (toggles nav links) ---------- */
  var hamburger = document.getElementById("hamburger");
  var nav = document.querySelector(".nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  /* ---------- FAQ accordion (Radix-style height transition) ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      if (isOpen) {
        // collapse: set explicit height then to 0 to animate
        panel.style.height = panel.scrollHeight + "px";
        requestAnimationFrame(function () {
          panel.style.height = "0px";
        });
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.height = panel.scrollHeight + "px";
        panel.addEventListener(
          "transitionend",
          function onEnd() {
            if (item.classList.contains("open")) panel.style.height = "auto";
            panel.removeEventListener("transitionend", onEnd);
          }
        );
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
    // Safety fallback: ensure all content is visible shortly after load even if
    // the observer never fires for off-screen elements (e.g. full-page capture).
    window.addEventListener("load", function () {
      setTimeout(function () {
        reveals.forEach(function (el) {
          el.classList.add("in");
        });
      }, 700);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
