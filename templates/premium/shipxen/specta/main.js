// Specta clone — vanilla JS: theme toggle, mobile menu, scroll reveals, video.
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---------- Dark / light theme toggle ---------- */
  try {
    var stored = localStorage.getItem("specta-theme");
    if (stored === "light") root.classList.remove("dark");
    else root.classList.add("dark");
  } catch (e) {}

  function setTheme(dark) {
    root.classList.toggle("dark", dark);
    try { localStorage.setItem("specta-theme", dark ? "dark" : "light"); } catch (e) {}
  }

  document.querySelectorAll('[aria-label="Toggle Dark Mode"]').forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      setTheme(!root.classList.contains("dark"));
    });
  });

  /* ---------- Mobile menu toggle ---------- */
  document.querySelectorAll('[aria-label="Toggle Menu"]').forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var panel = document.getElementById("specta-mobile-nav");
      if (panel) panel.classList.toggle("hidden");
      else {
        // fallback: toggle a sibling nav list if present
        var nav = btn.closest("header") && btn.closest("header").querySelector("nav, ul");
        if (nav) nav.classList.toggle("hidden");
      }
    });
  });

  /* ---------- Scroll entrance reveals ---------- */
  var targets = document.querySelectorAll(
    "main section, footer, .reveal"
  );
  targets.forEach(function (el) {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
  });

  function revealAll() {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px 10% 0px" }
    );
    targets.forEach(function (el) { io.observe(el); });
    // Safety: if the viewport never scrolls (e.g. headless full-page capture,
    // print, or content shorter than expected), reveal everything anyway so no
    // section is ever stuck invisible.
    window.addEventListener("load", function () {
      setTimeout(revealAll, 1200);
    });
    setTimeout(revealAll, 2500);
  } else {
    revealAll();
  }

  /* ---------- Eagerly decode all images so offscreen webp tiles are paint-ready ---------- */
  document.querySelectorAll("img").forEach(function (img) {
    try {
      img.loading = "eager";
      if (img.decode) img.decode().catch(function () {});
    } catch (e) {}
  });

  /* ---------- Hero video: guarantee autoplay (muted) ---------- */
  document.querySelectorAll("video").forEach(function (v) {
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  });

  /* ---------- Neutralize off-site anchors so the static clone stays put ---------- */
  // (links already point to shipixen.com marketing pages; leave external links,
  //  but prevent the in-template CTA placeholders from jumping the page jarringly)
  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });
})();
