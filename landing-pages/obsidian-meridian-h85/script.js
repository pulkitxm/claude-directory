(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- per-letter wordmark reveal ---- */
  function splitLine(el, startIndex) {
    var text = el.textContent;
    el.textContent = '';
    var i = 0;
    for (; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'glyph';
      span.textContent = text[i];
      span.style.transitionDelay = (startIndex + i) * 0.055 + 's';
      el.appendChild(span);
    }
    return i;
  }

  var wm = document.querySelector('[data-wordmark]');
  if (wm) {
    var lines = wm.querySelectorAll('.wordmark__line');
    var idx = 0;
    lines.forEach(function (line) { idx += splitLine(line, idx); });
    var glyphs = wm.querySelectorAll('.glyph');
    if (reduce) {
      glyphs.forEach(function (g) { g.classList.add('in'); });
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          glyphs.forEach(function (g) { g.classList.add('in'); });
        });
      });
    }
  }

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- stat count-up ---- */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var raw = el.getAttribute('data-raw') === '1';
    if (reduce) { el.textContent = raw ? target : target.toLocaleString(); return; }
    var dur = 1400, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(eased * target);
      el.textContent = raw ? String(val) : val.toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('.stat__num[data-count]');
  if ('IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); sio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { sio.observe(n); });
  } else {
    nums.forEach(countUp);
  }

  /* ---- form ---- */
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.submit');
      var original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span>Processing…</span>';
      setTimeout(function () {
        btn.innerHTML = '<span>Inquiry Sent</span>';
        form.reset();
        setTimeout(function () { btn.innerHTML = original; btn.disabled = false; }, 2600);
      }, 1400);
    });
  }
})();
