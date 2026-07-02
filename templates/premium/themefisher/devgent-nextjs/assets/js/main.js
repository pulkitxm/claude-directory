document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle
  var root = document.documentElement;
  var stored = localStorage.getItem('devgent-theme');
  if (stored) root.setAttribute('data-theme', stored);
  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('devgent-theme', next);
    });
  }

  // Mobile menu
  var menuToggle = document.querySelector('.menu-toggle');
  var header = document.querySelector('.site-header');
  if (menuToggle && header) {
    menuToggle.addEventListener('click', function () {
      header.classList.toggle('mobile-open');
    });
  }

  // Tabs
  document.querySelectorAll('.tabs').forEach(function (tabs) {
    var panels = tabs.parentElement.querySelectorAll('.tab-panel');
    tabs.querySelectorAll('.tab-btn').forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        tabs.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (q) q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Pricing toggle
  document.querySelectorAll('.switch').forEach(function (sw) {
    sw.addEventListener('click', function () {
      sw.classList.toggle('on');
      var yearly = sw.classList.contains('on');
      document.querySelectorAll('.price-card .amount').forEach(function (amt) {
        var monthly = amt.getAttribute('data-monthly');
        var yearlyVal = amt.getAttribute('data-yearly');
        if (monthly && yearlyVal) {
          amt.childNodes[0].textContent = '$' + (yearly ? yearlyVal : monthly);
        }
      });
      document.querySelectorAll('.price-period').forEach(function (p) {
        p.textContent = yearly ? '/year' : '/month';
      });
    });
  });

  // Testimonial carousel
  document.querySelectorAll('.carousel').forEach(function (car) {
    var slides = car.querySelectorAll('.testimonial-card');
    var idx = 0;
    function show(i) {
      slides.forEach(function (s, si) { s.style.display = si === i ? 'grid' : 'none'; });
    }
    show(0);
    var prev = car.parentElement.querySelector('[data-prev]');
    var next = car.parentElement.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { idx = (idx - 1 + slides.length) % slides.length; show(idx); });
    if (next) next.addEventListener('click', function () { idx = (idx + 1) % slides.length; show(idx); });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  }
});
