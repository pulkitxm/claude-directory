// ===== Scroll reveal =====
(function () {
  const reveals = document.querySelectorAll('.reveal');
  // stagger grid children
  document.querySelectorAll('.grid-3, .grid-4, .check-list, .logos').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      if (child.classList.contains('reveal')) child.style.transitionDelay = (i * 80) + 'ms';
    });
  });
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => io.observe(r));
})();

// ===== KPI count-up =====
(function () {
  function format(v, dec) {
    return (dec ? v.toFixed(dec) : Math.floor(v))
      .toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const dec = parseInt(el.dataset.dec || '0', 10);
    const dur = 2000, start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = format(target * eased, dec);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = format(target, dec);
    }
    requestAnimationFrame(step);
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-target]').forEach(el => io.observe(el));
})();

// ===== Policy toggles =====
document.querySelectorAll('[data-toggle]').forEach(t => {
  t.addEventListener('click', () => t.classList.toggle('on'));
});

// ===== FAQ accordion =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const ans = item.querySelector('.faq-a');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!open) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});
