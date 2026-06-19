/* ===== Scroll reveals (translateY(10px) + opacity over 1000ms) ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* ===== Testimonial carousel ===== */
(function () {
  const slides = Array.from(document.querySelectorAll('#testiTrack .testi'));
  const dotsWrap = document.getElementById('testiDots');
  if (!slides.length || !dotsWrap) return;

  let i = 0;
  let timer = null;

  // size the track to the tallest slide so absolutely-positioned slides don't collapse
  function sizeTrack() {
    const track = document.getElementById('testiTrack');
    let max = 0;
    slides.forEach((s) => {
      const wasActive = s.classList.contains('is-active');
      s.classList.add('is-active');
      max = Math.max(max, s.offsetHeight);
      if (!wasActive) s.classList.remove('is-active');
    });
    track.style.minHeight = max + 'px';
  }

  slides.forEach((_, idx) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Show testimonial ' + (idx + 1));
    if (idx === 0) b.classList.add('on');
    b.addEventListener('click', () => { go(idx); restart(); });
    dotsWrap.appendChild(b);
  });
  const dots = Array.from(dotsWrap.children);

  function go(n) {
    slides[i].classList.remove('is-active');
    dots[i].classList.remove('on');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('is-active');
    dots[i].classList.add('on');
  }
  function next() { go(i + 1); }
  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  sizeTrack();
  window.addEventListener('resize', sizeTrack);
  restart();
})();
