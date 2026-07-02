(function () {
  'use strict';

  /* ---------- theme toggle ---------- */
  var root = document.documentElement;
  var toggles = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];

  function setTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('startd-theme', theme);
  }

  toggles.forEach(function (btn) {
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isDark = root.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark');
    });
  });

  /* ---------- mobile menu ---------- */
  var hamburger = document.getElementById('hamburger-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var iconBars = document.getElementById('icon-bars');
  var iconX = document.getElementById('icon-x');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      iconBars.style.display = isOpen ? 'none' : 'block';
      iconX.style.display = isOpen ? 'block' : 'none';
    });
  }

  /* ---------- testimonial carousel ---------- */
  var testimonials = [
    {
      name: 'John Doe',
      company: 'Alphabet Inc.',
      image: 'assets/social-1.webp',
      text: 'Commodo Lorem consequat ea consectetur pariatur proident excepteur. Pariatur eiusmod minim minim ipsum tempor aute excepteur minim eu nisi laboris. Duis sunt labore eu eu cupidatat labore commodo id aliquip.'
    },
    {
      name: 'Jack Doe',
      company: 'Amazon.com, Inc.',
      image: 'assets/social-2.webp',
      text: 'Anim labore ut amet cupidatat pariatur pariatur labore ad est. Fugiat eiusmod dolore aliquip aute duis esse excepteur amet. Sit cupidatat ipsum culpa nisi esse ipsum culpa in consectetur. Enim incididunt do sunt ex do. Proident duis nulla minim sunt irure est magna nostrud Lorem consectetur irure.'
    }
  ];
  var tIndex = 0;
  var prevBtn = document.getElementById('testimonial-prev');
  var nextBtn = document.getElementById('testimonial-next');
  var textEl = document.getElementById('testimonial-text');
  var nameEl = document.getElementById('testimonial-name');
  var companyEl = document.getElementById('testimonial-company');
  var avatarEl = document.getElementById('testimonial-avatar');

  function renderTestimonial() {
    var t = testimonials[tIndex];
    textEl.textContent = t.text;
    nameEl.textContent = t.name;
    companyEl.textContent = t.company;
    avatarEl.src = t.image;
    avatarEl.alt = t.name;
    prevBtn.disabled = tIndex === 0;
    nextBtn.disabled = tIndex === testimonials.length - 1;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function () {
      if (tIndex > 0) {
        tIndex -= 1;
        renderTestimonial();
      }
    });
    nextBtn.addEventListener('click', function () {
      if (tIndex < testimonials.length - 1) {
        tIndex += 1;
        renderTestimonial();
      }
    });
    renderTestimonial();
  }

  /* ---------- particle background (case-studies dark band) ---------- */
  var particlesHost = document.getElementById('particles');
  if (particlesHost) {
    var canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    particlesHost.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var COUNT = 90;

    function resize() {
      var rect = particlesHost.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    }

    function initParticles() {
      particles = [];
      for (var i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15 * dpr,
          vy: (Math.random() - 0.5) * 0.15 * dpr,
          r: (Math.random() * 1.6 + 0.6) * dpr,
          a: Math.random() * 0.5 + 0.2
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + p.a + ')';
        ctx.fill();
      }
      requestAnimationFrame(step);
    }

    resize();
    initParticles();
    requestAnimationFrame(step);
    window.addEventListener('resize', function () {
      resize();
      initParticles();
    });
  }

})();
