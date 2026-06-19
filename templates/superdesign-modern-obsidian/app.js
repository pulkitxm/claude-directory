/* ===== Modern Obsidian — interactions ===== */

/* Reveal on scroll (staggered slide-up) */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (e.target.dataset.delay || 0) + 'ms';
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* Countdown — ~42 days out, fixed target so it's deterministic per load */
const cdD = document.getElementById('cd-d');
const cdH = document.getElementById('cd-h');
const cdM = document.getElementById('cd-m');
const cdS = document.getElementById('cd-s');
const target = new Date(Date.now() + 1000 * 60 * 60 * 24 * 42 + 1000 * 60 * 60 * 7);
const pad = (n) => String(n).padStart(2, '0');
function tick() {
  let s = Math.max(0, (target - Date.now()) / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (cdD) cdD.textContent = pad(d);
  if (cdH) cdH.textContent = pad(h);
  if (cdM) cdM.textContent = pad(m);
  if (cdS) cdS.textContent = pad(sec);
}
tick();
setInterval(tick, 1000);

/* Urgency progress bar fills when scrolled into view */
const bar = document.getElementById('progress-bar');
if (bar) {
  const pio = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      bar.style.width = '69.4%';
      pio.disconnect();
    }
  }, { threshold: 0.4 });
  pio.observe(bar);
}

/* Floating mobile nav — show only after hero is scrolled past */
const mobileNav = document.getElementById('mobile-nav');
const hero = document.getElementById('hero');
if (mobileNav && hero) {
  new IntersectionObserver(([e]) => {
    mobileNav.classList.toggle('show', !e.isIntersecting);
  }, { threshold: 0, rootMargin: '-20% 0px 0px 0px' }).observe(hero);
}

/* Beta form */
const form = document.getElementById('beta-form');
const note = document.getElementById('form-note');
if (form) {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const email = document.getElementById('beta-email');
    if (email && email.value) {
      note.textContent = '✓ Received. We will be in touch.';
      note.classList.add('form-success');
      email.value = '';
      email.disabled = true;
    }
  });
}
