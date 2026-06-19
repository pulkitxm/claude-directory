/* ============================================================
   STACKING CARDS — scroll-linked deck scrub
   ============================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- read tokens from CSS so JS + CSS stay in sync ---- */
  const rootStyle = getComputedStyle(document.documentElement);
  const NAV = parseInt(rootStyle.getPropertyValue('--nav'), 10) || 84;

  function stackStep() {
    return parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--stack-step'),
      10
    ) || 22;
  }

  const cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  const covers = cards.map((c) => c.querySelector('.card__cover'));

  /* ---- per-card sticky offsets: each pins slightly lower -> deck edge ---- */
  function layout() {
    const step = stackStep();
    cards.forEach((card, i) => {
      card.style.top = NAV + i * step + 'px';
    });
  }

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const clamp01 = (n) => Math.min(1, Math.max(0, n));

  /* ---- main scroll-linked frame ---- */
  function frame() {
    ticking = false;
    if (prefersReduced) return;

    const vh = window.innerHeight;
    const step = stackStep();

    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) {
        // last card never gets buried
        card.style.transform = '';
        card.style.filter = '';
        if (covers[i]) covers[i].style.opacity = '0';
        return;
      }

      const pinTop = NAV + i * step;
      const nextRect = next.getBoundingClientRect();

      // progress: 0 when the next card is at the bottom of the viewport,
      // 1 when the next card has slid up to the pinned card's deck edge.
      const start = vh;
      const end = pinTop + step;
      let p = (start - nextRect.top) / (start - end);
      p = easeOutCubic(clamp01(p));

      const scale = 1 - 0.06 * p;          // shrink slightly
      const bright = 1 - 0.18 * p;         // dim slightly
      card.style.transform = 'scale(' + scale.toFixed(4) + ')';
      card.style.filter = 'brightness(' + bright.toFixed(3) + ')';
      if (covers[i]) covers[i].style.opacity = (0.5 * p).toFixed(3);
    });
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(frame);
    }
  }

  /* ---- generative grid for the Field Notes card ---- */
  function buildGenGrid() {
    const grid = document.getElementById('genGrid');
    if (!grid) return;
    const CELLS = 36; // 6 x 6
    for (let i = 0; i < CELLS; i++) {
      const cell = document.createElement('b');
      // randomised but deterministic-feeling stagger
      cell.style.animationDelay = (Math.random() * 3.2).toFixed(2) + 's';
      cell.style.animationDuration = (2.4 + Math.random() * 1.6).toFixed(2) + 's';
      grid.appendChild(cell);
    }
  }

  /* ---- nav: subtle shadow lift once scrolled ---- */
  function navShadow() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const update = () => {
      if (window.scrollY > 24) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---- init ---- */
  buildGenGrid();
  layout();
  navShadow();
  frame();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    layout();
    frame();
  });
})();
