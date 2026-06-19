// Season 04 — scroll reveal + cart counter micro-interaction
(function () {
  'use strict';

  // Staggered reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          setTimeout(function () { el.classList.add('in'); }, (i % 4) * 90);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Cart counter
  var cartBtn = document.querySelector('.nav__icons button[aria-label="Cart"]');
  var count = 0;
  document.querySelectorAll('.product__media').forEach(function (m) {
    m.addEventListener('click', function (e) {
      e.preventDefault();
      count++;
      if (cartBtn) {
        cartBtn.style.color = '#31EF07';
        setTimeout(function () { cartBtn.style.color = ''; }, 400);
      }
    });
  });

  // Newsletter feedback
  var form = document.querySelector('.news__form');
  if (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button');
      var input = form.querySelector('input');
      if (input && input.value.trim()) {
        btn.textContent = 'Sent';
        input.value = '';
        setTimeout(function () { btn.textContent = 'Send'; }, 1800);
      }
    });
  }
})();
