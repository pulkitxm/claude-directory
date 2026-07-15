(function () {
  'use strict';


  var toggle = document.querySelector('.menu-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () { mobileNav.classList.add('open'); });
    var closeBtn = mobileNav.querySelector('.mobile-nav-close');
    if (closeBtn) closeBtn.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    mobileNav.querySelectorAll(':scope > a').forEach(function (a) {
      a.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    });
    var mDropdown = mobileNav.querySelector('.dropdown > a');
    if (mDropdown) {
      mDropdown.addEventListener('click', function (e) {
        e.preventDefault();
        mDropdown.parentElement.classList.toggle('open');
      });
    }
  }


  var root = document.documentElement;
  var themeBtn = document.querySelector('[data-theme-toggle]');
  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function setIcon() {
    if (!themeBtn) return;
    themeBtn.textContent = currentTheme() === 'dark' ? '☀' : '☽';
  }
  setIcon();
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('dexler-theme', next); } catch (e) {}
      setIcon();
    });
  }


  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }


  var track = document.querySelector('.testi-track');
  if (track) {
    var cards = Array.prototype.slice.call(track.children);
    var dotsWrap = document.querySelector('.testi-dots');
    if (dotsWrap && cards.length > 3) {
      var groups = Math.ceil(cards.length / 3);
      for (var i = 0; i < groups; i++) {
        var d = document.createElement('button');
        if (i === 0) d.className = 'active';
        d.addEventListener('click', function (idx) {
          return function () { showGroup(idx); };
        }(i));
        dotsWrap.appendChild(d);
      }
      function showGroup(idx) {
        cards.forEach(function (c, ci) {
          c.style.display = (ci >= idx * 3 && ci < idx * 3 + 3) ? '' : 'none';
        });
        Array.prototype.forEach.call(dotsWrap.children, function (dot, di) {
          dot.classList.toggle('active', di === idx);
        });
      }
      showGroup(0);
    }
  }


  var priceToggle = document.querySelector('.toggle-wrap');
  if (priceToggle) {
    var btns = priceToggle.querySelectorAll('button');
    var amounts = document.querySelectorAll('[data-monthly]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var mode = btn.getAttribute('data-mode');
        amounts.forEach(function (el) {
          el.textContent = mode === 'yearly' ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
        });
      });
    });
  }


  var tabNav = document.querySelector('.tabs-demo-nav');
  if (tabNav) {
    var tabBtns = tabNav.querySelectorAll('button');
    var panels = document.querySelectorAll('.tabs-demo-panel');
    tabBtns.forEach(function (b, idx) {
      b.addEventListener('click', function () {
        tabBtns.forEach(function (x) { x.classList.remove('active'); });
        panels.forEach(function (p) { p.style.display = 'none'; });
        b.classList.add('active');
        panels[idx].style.display = 'block';
      });
    });
  }
})();
