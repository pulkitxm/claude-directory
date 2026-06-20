/* SLATE & STONE — interactions */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loaded');

    /* ---- Scroll reveals ---- */
    var revealEls = document.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var el = e.target;
            var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
            setTimeout(function () { el.classList.add('in'); }, delay);
            io.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }

    /* ---- Header scrolled state ---- */
    var header = document.querySelector('.site-header');
    var onScroll = function () {
      if (window.scrollY > 80) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Mobile menu ---- */
    var burger = document.querySelector('.burger');
    var mobileLinks = document.querySelectorAll('.mobile-menu a');
    var close = function () {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileLinks.forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    /* ---- Stats count-up ---- */
    var stats = document.querySelectorAll('.stat__num[data-to]');
    var animateNum = function (el) {
      var to = parseFloat(el.getAttribute('data-to'));
      var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduce) { el.textContent = prefix + to.toFixed(dec) + suffix; return; }
      var dur = 1400, start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (to * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = prefix + to.toFixed(dec) + suffix;
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateNum(e.target); sio.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      stats.forEach(function (el) { sio.observe(el); });
    } else {
      stats.forEach(animateNum);
    }

    /* ---- Contact form ---- */
    var form = document.querySelector('#enquiry-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var note = form.querySelector('.form-note');
        var name = (form.querySelector('input[name="name"]').value || '').trim();
        note.textContent = 'Thank you' + (name ? ', ' + name.split(' ')[0] : '') + ' — we will be in touch within one business day.';
        note.classList.add('show');
        form.reset();
      });
    }
  });
})();
