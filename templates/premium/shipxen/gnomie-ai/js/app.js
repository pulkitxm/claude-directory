/* ============================================================
   GNOMIE AI — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- Theme (light/dark) ---- */
  var root = document.documentElement;
  function applyTheme(t) {
    if (t === 'dark') { root.classList.add('dark'); }
    else { root.classList.remove('dark'); }
    try { localStorage.setItem('gnomie-theme', t); } catch (e) {}
  }
  try {
    var saved = localStorage.getItem('gnomie-theme');
    if (saved) applyTheme(saved);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');
  } catch (e) {}
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(root.classList.contains('dark') ? 'light' : 'dark');
    });
  });

  /* ---- Mobile menu ---- */
  var menu = document.getElementById('mobileMenu');
  document.querySelectorAll('[data-menu-open]').forEach(function (b) {
    b.addEventListener('click', function () { if (menu) { menu.classList.add('open'); document.body.style.overflow = 'hidden'; } });
  });
  document.querySelectorAll('[data-menu-close]').forEach(function (b) {
    b.addEventListener('click', closeMenu);
  });
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  function closeMenu() { if (menu) { menu.classList.remove('open'); document.body.style.overflow = ''; } }

  /* ---- Marquee prev/next + pause ---- */
  document.querySelectorAll('[data-marquee]').forEach(function (wrap) {
    var track = wrap.querySelector('.marquee');
    if (!track) return;
    wrap.addEventListener('mouseenter', function () { track.classList.add('paused'); });
    wrap.addEventListener('mouseleave', function () { track.classList.remove('paused'); });
    var controls = document.querySelector('[data-marquee-controls="' + wrap.dataset.marquee + '"]');
    if (controls) {
      var offset = 0;
      var step = 340;
      controls.querySelectorAll('[data-dir]').forEach(function (b) {
        b.addEventListener('click', function () {
          track.classList.add('paused');
          var dir = b.dataset.dir === 'next' ? 1 : -1;
          offset += dir * step;
          var max = track.scrollWidth / 2;
          if (offset < 0) offset = 0;
          if (offset > max) offset = max;
          track.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1)';
          track.style.animation = 'none';
          track.style.transform = 'translateX(' + (-offset) + 'px)';
        });
      });
    }
  });

  /* ---- Pricing Monthly/Annually ---- */
  var priceData = {
    monthly: { casual: ['$25', '/month'], enthusiast: ['$39', '/month'] },
    annually: { casual: ['$20', '/month'], enthusiast: ['$31', '/month'] }
  };
  var freqLabel = document.querySelector('[data-freq-label]');
  document.querySelectorAll('[data-freq]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var freq = btn.dataset.freq;
      document.querySelectorAll('[data-freq]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      Object.keys(priceData[freq]).forEach(function (plan) {
        var el = document.querySelector('[data-price="' + plan + '"]');
        if (el) {
          el.childNodes[0].nodeValue = priceData[freq][plan][0];
          var small = el.querySelector('small');
          if (small) small.textContent = priceData[freq][plan][1];
        }
      });
      if (freqLabel) freqLabel.textContent = freq === 'annually' ? 'Billed annually — 2 months free' : 'Billed monthly';
    });
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    if (item.classList.contains('open')) a.style.maxHeight = a.scrollHeight + 'px';
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      q.setAttribute('aria-expanded', String(!isOpen));
      a.style.maxHeight = isOpen ? '0px' : a.scrollHeight + 'px';
    });
  });

  /* ---- Scroll reveal ---- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Play buttons on reimagined videos ---- */
  document.querySelectorAll('.play-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var vid = btn.parentElement.querySelector('video');
      if (vid) {
        if (vid.paused) { vid.play(); btn.style.opacity = '0'; btn.style.pointerEvents = 'none'; }
      }
    });
  });
})();
