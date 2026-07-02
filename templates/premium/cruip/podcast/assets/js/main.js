AOS.init({
	once: true,
	disable: "phone",
	duration: 700,
	easing: "ease-out-cubic",
});

const carouselEl = document.querySelectorAll(".carousel");
if (carouselEl.length > 0) {
	const carousel = new Swiper(".carousel", {
		slidesPerView: "auto",
		grabCursor: true,
		loop: false,
		centeredSlides: false,
		initialSlide: 0,
		spaceBetween: 24,
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".carousel-next",
			prevEl: ".carousel-prev",
		},
	});
}
