/* =========================================
   GLASTO TEMPLATE - Shared JavaScript
   ========================================= */

/* ---- Announcement Bar ---- */
(function () {
  const bar = document.getElementById('announcement');
  const closeBtn = document.getElementById('close-announcement');
  if (!bar || !closeBtn) return;
  if (localStorage.getItem('glasto-ann-closed') === '1') {
    bar.style.display = 'none';
  }
  closeBtn.addEventListener('click', function () {
    bar.style.display = 'none';
    localStorage.setItem('glasto-ann-closed', '1');
  });
})();

/* ---- Sticky Header ---- */
(function () {
  const header = document.querySelector('.header');
  if (!header) return;
  function updateSticky() {
    if (window.scrollY > 60) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }
  window.addEventListener('scroll', updateSticky, { passive: true });
  updateSticky();
})();

/* ---- Mobile Nav Toggle ---- */
(function () {
  // The checkbox hack handles basic toggle
  // But we also want to show/hide the dropdown in mobile on click
  const toggle = document.getElementById('nav-toggle');
  if (!toggle) return;
  const navMenu = document.getElementById('nav-menu');
  if (!navMenu) return;

  // When checked, show nav
  toggle.addEventListener('change', function () {
    navMenu.style.display = this.checked ? 'flex' : '';
    navMenu.style.flexDirection = this.checked ? 'column' : '';
  });

  // Mobile: click on "All Pages" to expand dropdown
  const dropdownTrigger = navMenu.querySelector('.nav-dropdown > .nav-link');
  const dropdownList = navMenu.querySelector('.nav-dropdown-list');
  if (dropdownTrigger && dropdownList) {
    dropdownTrigger.addEventListener('click', function (e) {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        const isOpen = dropdownList.style.display === 'flex';
        dropdownList.style.display = isOpen ? 'none' : 'flex';
        dropdownList.style.flexDirection = 'column';
      }
    });
  }
})();

/* ---- AOS - Animate on Scroll ---- */
(function () {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 60 && rect.bottom > 0;
  }

  function checkAOS() {
    elements.forEach(function (el) {
      if (isInViewport(el)) {
        const delay = parseInt(el.getAttribute('data-aos-delay') || 0);
        setTimeout(function () {
          el.classList.add('aos-animate');
        }, delay);
      }
    });
  }

  // Initial check after short delay for page load
  setTimeout(checkAOS, 100);
  window.addEventListener('scroll', checkAOS, { passive: true });
  window.addEventListener('resize', checkAOS, { passive: true });
})();

/* ---- FAQ Accordion ---- */
(function () {
  const faqs = document.querySelectorAll('details.faq-item');
  faqs.forEach(function (faq) {
    faq.addEventListener('toggle', function () {
      // close others in same group
      if (this.open) {
        faqs.forEach(function (other) {
          if (other !== faq && other.open) {
            other.open = false;
          }
        });
      }
    });
  });

  // Handle media advantage accordion (details/summary with exclusive open)
  const mediaItems = document.querySelectorAll('details.media-advantage-item');
  mediaItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (this.open) {
        mediaItems.forEach(function (other) {
          if (other !== item && other.open) other.open = false;
        });
      }
    });
  });
})();

/* ---- Pricing Toggle (Monthly/Yearly) ---- */
(function () {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;
  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const yearlyPrices = document.querySelectorAll('.price-yearly');
  const yearlyLabel = document.querySelector('.yearly-label');
  const monthlyLabel = document.querySelector('.monthly-label');

  toggle.addEventListener('change', function () {
    const isYearly = this.checked;
    monthlyPrices.forEach(el => { el.style.display = isYearly ? 'none' : 'block'; });
    yearlyPrices.forEach(el => { el.style.display = isYearly ? 'block' : 'none'; });
    if (yearlyLabel) yearlyLabel.style.fontWeight = isYearly ? '700' : '400';
    if (monthlyLabel) monthlyLabel.style.fontWeight = isYearly ? '400' : '700';
  });
})();

/* ---- Feature Tabs ---- */
(function () {
  const tabNavItems = document.querySelectorAll('.tab-nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  if (!tabNavItems.length) return;

  tabNavItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      tabNavItems.forEach(el => el.classList.remove('active'));
      tabContents.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      if (tabContents[index]) tabContents[index].classList.add('active');
    });
  });
})();

/* ---- Testimonials Swiper ---- */
(function () {
  if (typeof Swiper === 'undefined') return;
  const swiperEl = document.querySelector('.testimonials-swiper');
  if (!swiperEl) return;
  new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      768:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
})();

/* ---- Reviews Swiper ---- */
(function () {
  if (typeof Swiper === 'undefined') return;
  const el = document.querySelector('.reviews-swiper');
  if (!el) return;
  new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '.reviews-pagination', clickable: true },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
})();
