(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- cart count ---- */
  var count = 3;
  var countEl = document.getElementById('count');
  function pad(n){ return n < 10 ? '0' + n : '' + n; }
  function addToCart() {
    count++;
    countEl.textContent = pad(count);
    countEl.classList.remove('pulse');
    void countEl.offsetWidth;
    countEl.classList.add('pulse');
  }
  document.querySelectorAll('[data-add]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      addToCart();
    });
  });
  document.getElementById('cart').addEventListener('click', function () {
    countEl.classList.remove('pulse'); void countEl.offsetWidth; countEl.classList.add('pulse');
  });

  /* ---- scroll reveal (staggered) ---- */
  if (!reduce && 'IntersectionObserver' in window) {
    var groups = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) {
      var p = el.parentElement;
      groups[p] = groups[p] || 0;
      el.style.transitionDelay = (Math.min(groups[p], 5) * 80) + 'ms';
      groups[p]++;
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- live stock ticker ---- */
  var stocks = Array.prototype.slice.call(document.querySelectorAll('[data-stock]'));
  var liveDot = document.getElementById('liveDot');
  setInterval(function () {
    var pool = stocks.filter(function (s) { return parseInt(s.textContent, 10) > 1; });
    if (!pool.length) return;
    var el = pool[Math.floor(Math.random() * pool.length)];
    var n = parseInt(el.textContent, 10) - 1;
    el.textContent = (n < 10 ? '0' + n : n) + ' Left';
    el.style.color = '#dc2626';
    setTimeout(function () { el.style.color = ''; }, 700);
    if (liveDot) { liveDot.style.transform = 'scale(1.6)'; setTimeout(function(){ liveDot.style.transform=''; }, 300); }
  }, 4000);

  /* ---- drag-to-scroll horizontal strip ---- */
  var strip = document.getElementById('strip');
  if (strip) {
    var down = false, startX = 0, startScroll = 0, moved = 0;
    strip.addEventListener('pointerdown', function (e) {
      down = true; moved = 0; startX = e.clientX; startScroll = strip.scrollLeft;
      strip.classList.add('drag');
    });
    window.addEventListener('pointerup', function () { down = false; strip.classList.remove('drag'); });
    strip.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX; moved += Math.abs(dx);
      strip.scrollLeft = startScroll - dx;
    });
    strip.addEventListener('click', function (e) {
      if (moved > 6) e.preventDefault();
    }, true);
  }

  /* ---- newsletter ---- */
  var news = document.getElementById('news');
  if (news) news.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = news.querySelector('button');
    btn.textContent = '✓';
    setTimeout(function () { btn.textContent = '→'; news.reset(); }, 1600);
  });
})();
