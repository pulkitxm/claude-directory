/* ============ NEON VELOCITY — interactions ============ */
(function () {
  "use strict";

  /* ---- Countdown (tabular-nums, no layout shift) ---- */
  var el = document.getElementById("countdown");
  if (el) {
    var target = Date.now() + 12 * 864e5 + 7 * 36e5 + 42 * 6e4; // ~12d 7h 42m out
    var pad = function (n) {
      return String(n).padStart(2, "0");
    };
    var tick = function () {
      var d = Math.max(0, target - Date.now());
      var days = Math.floor(d / 864e5);
      var hrs = Math.floor((d % 864e5) / 36e5);
      var min = Math.floor((d % 36e5) / 6e4);
      var sec = Math.floor((d % 6e4) / 1e3);
      el.textContent =
        pad(days) + " : " + pad(hrs) + " : " + pad(min) + " : " + pad(sec);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---- Luminosity card mouse-proximity spotlight ---- */
  document.querySelectorAll("[data-lum]").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (i % 4) * 0.08 + "s";
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (r) {
      io.observe(r);
    });
  } else {
    reveals.forEach(function (r) {
      r.classList.add("in");
    });
  }

  /* ---- Form feedback ---- */
  var form = document.getElementById("accessForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var label = document.getElementById("submitLabel");
      var input = form.querySelector("input");
      if (label) label.textContent = "ON THE LIST";
      if (input) {
        input.value = "";
        input.placeholder = "WELCOME TO THE FAST LANE";
      }
      setTimeout(function () {
        if (label) label.textContent = "REQUEST ACCESS";
      }, 2600);
    });
  }

  /* ---- Mobile nav active state on scroll ---- */
  var sections = ["top", "system", "ethos", "access"];
  var links = document.querySelectorAll(".mnav a");
  window.addEventListener(
    "scroll",
    function () {
      var pos = window.scrollY + window.innerHeight / 2;
      var current = "top";
      sections.forEach(function (id) {
        var s = document.getElementById(id);
        if (s && s.offsetTop <= pos) current = id;
      });
      links.forEach(function (a) {
        a.classList.toggle(
          "active",
          a.getAttribute("href") === "#" + current
        );
      });
    },
    { passive: true }
  );
})();
