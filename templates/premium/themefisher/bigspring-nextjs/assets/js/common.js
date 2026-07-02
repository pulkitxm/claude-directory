/* Bigspring clone — shared interactive behavior (theme toggle, FAQ accordion, swiper carousels).
   Mobile nav + mega-menu dropdown are pure CSS (checkbox hack / group-hover), no JS required. */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Theme toggle (sun/moon button) ---------- */
  var toggleBtn = document.querySelector('.theme-switcher button');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var d = document.documentElement;
      var isDark = d.classList.contains('dark');
      d.classList.remove('light', 'dark');
      var next = isDark ? 'light' : 'dark';
      d.classList.add(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- FAQ accordion ----------
     Source CSS keys everything off a single `.active` class on the `.accordion`
     wrapper: `.accordion.active .accordion-header` (teal fill), `.accordion.active
     .accordion-icon` (180deg rotate), `.accordion.active .accordion-content`
     (max-height: 0 -> 50vh). No inline styles needed — just toggle the class. */
  document.querySelectorAll('.accordion').forEach(function (item) {
    var header = item.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', function () {
      var isOpen = item.classList.contains('active');
      var group = item.parentElement;
      if (group) {
        group.querySelectorAll('.accordion.active').forEach(function (openItem) {
          if (openItem !== item) openItem.classList.remove('active');
        });
      }
      item.classList.toggle('active', !isOpen);
    });
  });

  /* ---------- Swiper carousels (testimonials / logo strips / feature stories) ----------
     The source ships three distinct carousel shapes on Home/Product pages, all sharing
     the same .swiper markup: (1) a brand-logo strip (many small ~40px-tall logo slides),
     (2) a single big alternating feature-story block (one tall ~535px image+copy slide
     at a time), and (3) a 2-up testimonial card strip. Since the compiled markup doesn't
     tag which is which, infer it at runtime from slide count + the tallest image found
     in the first slide, rather than hardcoding per-page config. */
  if (window.Swiper) {
    document.querySelectorAll('.js-swiper').forEach(function (el) {
      var slides = el.querySelectorAll('.swiper-slide');
      var firstSlide = slides[0];
      var tallestImg = 0;
      if (firstSlide) {
        firstSlide.querySelectorAll('img').forEach(function (img) {
          var h = parseInt(img.getAttribute('height') || '0', 10);
          if (h > tallestImg) tallestImg = h;
        });
      }
      var desktopPerView = parseInt(el.getAttribute('data-slides-desktop') || '', 10);
      var mobilePerView = parseInt(el.getAttribute('data-slides-mobile') || '', 10);
      if (!desktopPerView) {
        if (tallestImg >= 200) {
          desktopPerView = 1; mobilePerView = 1; /* feature-story block */
        } else if (slides.length >= 6) {
          desktopPerView = 5; mobilePerView = 2; /* logo strip */
        } else {
          desktopPerView = 2; mobilePerView = 1; /* testimonial cards */
        }
      }
      new Swiper(el, {
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true
        },
        breakpoints: {
          0: { slidesPerView: mobilePerView, spaceBetween: 20 },
          992: { slidesPerView: desktopPerView, spaceBetween: 30 }
        }
      });
    });
  }

});
