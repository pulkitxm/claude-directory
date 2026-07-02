/**
 * CLARITY - Main JavaScript
 * Handles: navbar toggle, dropdown, pricing toggle, FAQ accordion,
 *          AOS scroll animations, Swiper carousel, marquee
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR TOGGLE (mobile) =====
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }

  // ===== NAV DROPDOWNS =====
  const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.nav-item');
      const isOpen = parent.classList.contains('open');

      // Close all dropdowns
      document.querySelectorAll('.nav-item.open').forEach(item => {
        if (item !== parent) item.classList.remove('open');
      });

      parent.classList.toggle('open', !isOpen);
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.open').forEach(item => {
        item.classList.remove('open');
      });
    }
  });

  // ===== PRICING TOGGLE =====
  const pricingToggle = document.getElementById('pricing-toggle');
  const monthlyLabel = document.getElementById('billing-monthly');
  const yearlyLabel = document.getElementById('billing-yearly');
  const pricingSection = document.querySelector('.pricing-section');

  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      const isYearly = pricingToggle.classList.toggle('yearly');
      if (pricingSection) {
        pricingSection.classList.toggle('billing-yearly', isYearly);
      }
      if (monthlyLabel) monthlyLabel.classList.toggle('active', !isYearly);
      if (yearlyLabel) yearlyLabel.classList.toggle('active', isYearly);
    });
  }

  // ===== FAQ ACCORDION =====
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all accordion items
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ===== JOB LISTING ACCORDION (Careers page) =====
  const jobHeaders = document.querySelectorAll('.job-header');
  jobHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.job-card');
      card.classList.toggle('open');
    });
  });

  // ===== AOS (Animate On Scroll) =====
  const initAOS = () => {
    const aosElements = document.querySelectorAll('[data-aos]');
    if (aosElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
          setTimeout(() => {
            el.classList.add('aos-animate');
          }, delay);
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    aosElements.forEach(el => observer.observe(el));
  };

  initAOS();

  // ===== TESTIMONIALS SWIPER =====
  const initSwiper = () => {
    const swiperEl = document.querySelector('.reviews-swiper');
    if (!swiperEl) return;

    const wrapper = swiperEl.querySelector('.swiper-wrapper');
    const slides = swiperEl.querySelectorAll('.swiper-slide');
    const prevBtn = document.getElementById('swiper-prev');
    const nextBtn = document.getElementById('swiper-next');
    if (!wrapper || slides.length === 0) return;

    let currentIndex = 0;
    let slidesPerView = 1;

    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) slidesPerView = 3;
      else if (window.innerWidth >= 640) slidesPerView = 2;
      else slidesPerView = 1;
    };

    const maxIndex = () => Math.max(0, slides.length - slidesPerView);

    const goTo = (index) => {
      currentIndex = Math.max(0, Math.min(index, maxIndex()));
      const slideWidth = slides[0].offsetWidth;
      wrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      wrapper.style.transition = 'transform 500ms ease';
    };

    updateSlidesPerView();
    window.addEventListener('resize', () => {
      updateSlidesPerView();
      goTo(currentIndex);
    });

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    // Auto-play
    setInterval(() => {
      if (currentIndex >= maxIndex()) goTo(0);
      else goTo(currentIndex + 1);
    }, 4000);
  };

  initSwiper();

  // ===== ACTIVE NAV LINK =====
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link[href], .nav-dropdown-link[href]');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('active');
    }
    if (href === '/' && currentPath === '/') {
      link.classList.add('active');
    }
  });

  // ===== STICKY HEADER =====
  const header = document.querySelector('.header-wrap');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
        header.style.backgroundColor = 'rgba(255,255,255,0.95)';
        header.style.backdropFilter = 'blur(12px)';
      } else {
        header.style.boxShadow = '';
        header.style.backgroundColor = '';
        header.style.backdropFilter = '';
      }
    });
  }

  // ===== DOUBLE MARQUEE for seamless loop =====
  // The HTML already has two .marquee divs inside .marquee-wrapper for the loop
  // So we just need the CSS animation to work

  // ===== PRICING TABLE TOGGLE (on pricing page) =====
  const pricingTableToggle = document.getElementById('pricing-table-toggle');
  if (pricingTableToggle) {
    pricingTableToggle.addEventListener('click', () => {
      const isYearly = pricingTableToggle.classList.toggle('yearly');
      document.querySelectorAll('.pricing-section').forEach(section => {
        section.classList.toggle('billing-yearly', isYearly);
      });
      const ml = document.getElementById('billing-monthly-2');
      const yl = document.getElementById('billing-yearly-2');
      if (ml) ml.classList.toggle('active', !isYearly);
      if (yl) yl.classList.toggle('active', isYearly);
    });
  }

  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

// Secondary pricing toggle (pricing page)
const pricingTableToggle = document.getElementById('pricing-table-toggle');
if (pricingTableToggle) {
  pricingTableToggle.addEventListener('click', () => {
    const section = document.querySelector('.pricing-section');
    if (section) {
      section.classList.toggle('billing-yearly');
      pricingTableToggle.classList.toggle('yearly');
    }
    // Update billing label active states
    const monthlyLabel = document.getElementById('billing-monthly-2');
    const yearlyLabel = document.getElementById('billing-yearly-2');
    const isYearly = pricingTableToggle.classList.contains('yearly');
    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isYearly);
    if (yearlyLabel) yearlyLabel.classList.toggle('active', isYearly);
  });
}
