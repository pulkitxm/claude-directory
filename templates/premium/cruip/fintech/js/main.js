AOS.init({
	once: true,
	disable: "phone",
	duration: 700,
	easing: "ease-out-cubic",
});

const testimonialEl = document.querySelectorAll(".testimonial-carousel");
if (testimonialEl.length > 0) {
	const testimonial = new Swiper(".testimonial-carousel", {
		slidesPerView: 1,
		watchSlidesProgress: true,
		effect: "fade",
		pagination: {
			el: ".testimonial-carousel-pagination",
			clickable: true,
		},
	});
}
