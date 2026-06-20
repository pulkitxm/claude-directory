(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    // ---- Live clock ----
    var clock = document.getElementById('clock');
    function tick() {
      clock.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    if (clock) { tick(); setInterval(tick, 1000); }

    // ---- Scroll reveal ----
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    // ---- Process cards springy reveal (staggered) ----
    var cardsWrap = document.getElementById('cards');
    if (cardsWrap) {
      var cardIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var cards = cardsWrap.querySelectorAll('.card');
            cards.forEach(function (c, i) {
              if (reduce) { c.classList.add('go'); return; }
              c.style.animationDelay = (i * 0.12) + 's';
              c.classList.add('go');
            });
            cardIO.disconnect();
          }
        });
      }, { threshold: 0.15 });
      cardIO.observe(cardsWrap);
    }

    // ---- Count-up stats ----
    function animateCount(el) {
      var to = parseFloat(el.getAttribute('data-to'));
      var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      var suf = el.getAttribute('data-suf') || '';
      if (reduce) { el.textContent = to.toFixed(dec) + suf; return; }
      var start = performance.now(), dur = 1400;
      function frame(now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (to * eased).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = to.toFixed(dec) + suf;
      }
      requestAnimationFrame(frame);
    }
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); statIO.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.count').forEach(function (el) { statIO.observe(el); });

    // ---- Pricing toggle ----
    var toggle = document.getElementById('toggle');
    var labM = document.getElementById('lab-m');
    var labA = document.getElementById('lab-a');
    var amts = document.querySelectorAll('.amt[data-m]');
    var annual = true;
    function applyPricing() {
      toggle.classList.toggle('annual', annual);
      labM.classList.toggle('off', annual);
      labA.classList.toggle('off', !annual);
      amts.forEach(function (a) {
        a.textContent = annual ? a.getAttribute('data-a') : a.getAttribute('data-m');
      });
    }
    if (toggle) {
      applyPricing();
      toggle.addEventListener('click', function () { annual = !annual; applyPricing(); });
    }

    // ---- Contact form ----
    var form = document.getElementById('form');
    var btn = document.getElementById('submit');
    if (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var orig = btn.textContent;
        btn.textContent = 'Received.';
        btn.classList.add('done');
        setTimeout(function () {
          btn.textContent = orig;
          btn.classList.remove('done');
          form.reset();
        }, 2800);
      });
    }
  });
})();
