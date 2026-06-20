/* APERTURE ATELIER — Monolith Editorial interactions */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll reveals (staggered) ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function showImmediately() {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    showImmediately();
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            // stagger by index among visible siblings
            var siblings = Array.prototype.slice.call(
              el.parentElement.querySelectorAll(":scope > .reveal")
            );
            var idx = Math.max(0, siblings.indexOf(el));
            el.style.transitionDelay = idx * 80 + "ms";
            el.classList.add("is-visible");
            io.unobserve(el);
            maybeCount(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- Stat counters ---------- */
  var counted = false;

  function maybeCount(el) {
    if (counted) return;
    var statsSection = document.getElementById("stats");
    if (!statsSection || !statsSection.contains(el)) return;
    counted = true;
    runCounters();
  }

  function runCounters() {
    var nums = document.querySelectorAll(".stat__num[data-target]");
    nums.forEach(function (node) {
      var target = parseFloat(node.getAttribute("data-target"));
      var prefix = node.getAttribute("data-prefix") || "";
      var suffix = node.getAttribute("data-suffix") || "";
      var decimals = parseInt(node.getAttribute("data-decimals") || "0", 10);

      if (reduceMotion) {
        node.textContent = prefix + target.toFixed(decimals) + suffix;
        return;
      }

      var duration = 1500;
      var start = null;

      function ease(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function tick(ts) {
        if (start === null) start = ts;
        var p = Math.min(1, (ts - start) / duration);
        var value = target * ease(p);
        node.textContent = prefix + value.toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else node.textContent = prefix + target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(tick);
    });
  }

  /* ---------- Contact form (no backend) ---------- */
  var form = document.getElementById("inquiry");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector(".btn-submit");
      if (!btn) return;
      btn.classList.add("is-sent");
      btn.textContent = "Message Received";
      btn.disabled = true;
      setTimeout(function () {
        btn.classList.remove("is-sent");
        btn.textContent = "Send Inquiry";
        btn.disabled = false;
        form.reset();
      }, 3200);
    });
  }
})();
