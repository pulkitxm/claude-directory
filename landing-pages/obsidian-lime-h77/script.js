(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    // Hero load-in
    var hero = document.getElementById('hero');
    if (hero) {
      requestAnimationFrame(function () { hero.classList.add('is-in'); });

      if (!reduced) {
        var bg = hero.querySelector('.hero__bg img');
        hero.addEventListener('mousemove', function (e) {
          var mx = (e.clientX - window.innerWidth / 2) * 0.012;
          var my = (e.clientY - window.innerHeight / 2) * 0.012;
          bg.style.transform = 'scale(1.06) translate(' + mx + 'px,' + my + 'px)';
        });
        hero.addEventListener('mouseleave', function () {
          bg.style.transform = 'scale(1) translate(0,0)';
        });
      }
    }

    // Navbar condense
    var nav = document.getElementById('nav');
    var onScroll = function () {
      if (window.scrollY > 50) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Stats count-up
    function animateCount(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduced || isNaN(target)) { el.textContent = prefix + target + suffix; return; }
      var dur = 1600, start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    // Scroll reveal
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-in');
        if (el.classList.contains('stagger')) {
          Array.prototype.forEach.call(el.children, function (child, i) {
            child.style.transitionDelay = (i * 0.14) + 's';
          });
        }
        if (el.id === 'intelligence') {
          el.querySelectorAll('[data-count]').forEach(animateCount);
        }
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .stagger, #intelligence').forEach(function (el) {
      io.observe(el);
    });
  });
})();
