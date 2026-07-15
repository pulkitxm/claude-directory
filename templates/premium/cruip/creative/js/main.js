AOS.init({
  once: true,
  disable: 'phone',
  duration: 700,
  easing: 'ease-out-cubic',
});

const carouselEl = document.querySelectorAll('.carousel');
if (carouselEl.length > 0) {
  const carousel = new Swiper('.carousel', {
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      640: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 4
      }
    },
    grabCursor: true,
    loop: false,
    centeredSlides: false,
    initialSlide: 0,
    spaceBetween: 24,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.carousel-next',
      prevEl: '.carousel-prev',
    },
  });
}

const testimonialEl = document.querySelectorAll('.testimonial-carousel');
if (testimonialEl.length > 0) {
  const testimonial = new Swiper('.testimonial-carousel', {
    slidesPerView: 1,
    watchSlidesProgress: true,
    pagination: {
      el: '.testimonial-carousel-pagination',
      clickable: true
    },
  });
}