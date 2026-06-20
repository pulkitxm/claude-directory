(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Star icons ---------- */
  var STAR = '<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>';
  document.querySelectorAll('[data-stars]').forEach(function (el) {
    el.innerHTML = STAR.repeat(5);
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Nav: hide announcement offset on scroll ---------- */
  var navShell = document.getElementById('navShell');
  if (navShell) {
    var onScroll = function () {
      navShell.style.top = window.scrollY > 60 ? '14px' : '50px';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Generic cross-fade rotator ---------- */
  function rotate(items, activeClass, interval) {
    if (!items.length || reduceMotion) return;
    var i = 0;
    setInterval(function () {
      items[i].classList.remove(activeClass);
      i = (i + 1) % items.length;
      items[i].classList.add(activeClass);
    }, interval);
  }

  rotate(document.querySelectorAll('#heroSlider .slide'), 'active', 5000);
  rotate(document.querySelectorAll('#lifestyleSlider .ls-slide'), 'active', 6000);

  /* ---------- Testimonial track ---------- */
  var track = document.getElementById('tTrack');
  if (track && !reduceMotion) {
    var slides = track.children.length;
    var step = function () {
      return track.children[0].getBoundingClientRect().width;
    };
    var idx = 0;
    var perView = window.innerWidth > 960 ? 3 : 1;
    var maxIdx = Math.max(0, slides - perView);
    setInterval(function () {
      perView = window.innerWidth > 960 ? 3 : 1;
      maxIdx = Math.max(0, slides - perView);
      idx = idx >= maxIdx ? 0 : idx + 1;
      track.style.transform = 'translateX(-' + idx * step() + 'px)';
    }, 4500);
  }

  /* ---------- Countdown ---------- */
  var cdH = document.getElementById('cdH'),
      cdM = document.getElementById('cdM'),
      cdS = document.getElementById('cdS');
  if (cdH && cdM && cdS) {
    var target = Date.now() + (4 * 3600 + 22 * 60 + 10) * 1000;
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var diff = Math.max(0, target - Date.now());
      var h = Math.floor(diff / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      cdH.textContent = pad(h) + 'h';
      cdM.textContent = pad(m) + 'm';
      cdS.textContent = pad(s) + 's';
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll('#faq .faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      var open = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-a').style.maxHeight = '0';
        other.querySelector('.faq-a').style.opacity = '0';
      });
      if (!open) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        ans.style.maxHeight = ans.scrollHeight + 'px';
        ans.style.opacity = '1';
      }
    });
  });

  /* ---------- Toast on add-to-collection ---------- */
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span></span>';
      document.body.appendChild(toastEl);
    }
    toastEl.querySelector('span').textContent = msg;
    requestAnimationFrame(function () { toastEl.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  document.querySelectorAll('.prod-img, .offer').forEach(function (el) {
    el.addEventListener('click', function () { toast('Added to collection'); });
  });

  /* ---------- Newsletter form ---------- */
  var form = document.getElementById('newsForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      var btn = form.querySelector('button');
      if (!input.value || !/.+@.+\..+/.test(input.value)) {
        input.focus();
        return;
      }
      var original = btn.textContent;
      btn.textContent = 'Welcome ✓';
      btn.disabled = true;
      form.reset();
      toast('You are on the list');
      setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 2800);
    });
  }
})();
