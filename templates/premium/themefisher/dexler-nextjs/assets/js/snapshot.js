document.addEventListener('DOMContentLoaded', function () {
  function sizeCarousels() {
    var width = window.innerWidth;
    var brands = document.querySelector('.brands .swiper-wrapper');
    if (brands && width < 1024) {
      var brandGap = width < 640 ? 60 : 90;
      var brandCount = width < 640 ? 3 : 4;
      var brandWidth = (brands.parentElement.clientWidth - brandGap) / brandCount;
      brands.querySelectorAll('.swiper-slide').forEach(function (slide) {
        slide.style.width = brandWidth + 'px';
        var image = slide.querySelector('img');
        if (image) image.style.width = brandWidth * (width < 640 ? 0.52 : 0.7) + 'px';
      });
    }

    var testimonials = document.querySelector('.testimonials .swiper-wrapper');
    if (testimonials && width < 1024) {
      var swiperWidth = testimonials.parentElement.clientWidth;
      var slideWidth = width < 640 ? swiperWidth : (swiperWidth - 24) / 2;
      var slides = Array.from(testimonials.querySelectorAll('.swiper-slide'));
      slides.forEach(function (slide) {
        slide.style.width = slideWidth + 'px';
      });
      var activeIndex = Math.max(0, slides.findIndex(function (slide) {
        return slide.classList.contains('swiper-slide-active');
      }));
      testimonials.style.transform = 'translate3d(' + (-activeIndex * (slideWidth + 24)) + 'px, 0px, 0px)';
    }
  }

  sizeCarousels();
  window.addEventListener('resize', sizeCarousels);

  var navigationToggle = document.querySelector('#nav-toggle');
  var navigationMenu = document.querySelector('#nav-menu');
  if (navigationToggle && navigationMenu) {
    navigationToggle.addEventListener('change', function () {
      navigationMenu.classList.toggle('hidden', !navigationToggle.checked);
      var show = document.querySelector('#show-button');
      var hide = document.querySelector('#hide-button');
      if (show) show.classList.toggle('hidden', navigationToggle.checked);
      if (hide) hide.classList.toggle('hidden', !navigationToggle.checked);
    });
  }

  document.querySelectorAll('.accordion-header').forEach(function (button) {
    button.addEventListener('click', function () {
      button.parentElement.classList.toggle('active');
    });
  });

  function findModal(trigger) {
    var current = trigger;
    while (current && current !== document.body) {
      var sibling = current.nextElementSibling;
      if (sibling && sibling.tagName === 'SECTION' && sibling.querySelectorAll('div.fixed').length >= 2) return sibling;
      current = current.parentElement;
    }
    return null;
  }

  function closeModal(section) {
    section.querySelectorAll('div.fixed').forEach(function (element) {
      element.classList.add('hidden');
    });
    document.body.style.overflow = '';
  }

  Array.from(document.querySelectorAll('button')).filter(function (button) {
    return button.textContent.trim().toLowerCase() === 'watch a video' || button.classList.contains('video-play-btn');
  }).forEach(function (trigger) {
    var section = findModal(trigger);
    if (!section) return;
    trigger.addEventListener('click', function () {
      section.querySelectorAll('div.fixed').forEach(function (element) {
        element.classList.remove('hidden');
      });
      document.body.style.overflow = 'hidden';
    });
    var fixed = section.querySelectorAll('div.fixed');
    if (fixed[0]) fixed[0].addEventListener('click', function () {
      closeModal(section);
    });
    if (fixed[1]) fixed[1].querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function () {
        closeModal(section);
      });
    });
  });
});
