AOS.init({
	once: true,
	disable: "phone",
	duration: 600,
	easing: "ease-out-sine",
});

// Cards spotlight
class Spotlight {
	constructor(containerElement) {
		this.container = containerElement;
		this.cards = Array.from(this.container.children);
		this.mouse = {
			x: 0,
			y: 0,
		};
		this.containerSize = {
			w: 0,
			h: 0,
		};
		this.initContainer = this.initContainer.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.init();
	}

	initContainer() {
		this.containerSize.w = this.container.offsetWidth;
		this.containerSize.h = this.container.offsetHeight;
	}

	onMouseMove(event) {
		const { clientX, clientY } = event;
		const rect = this.container.getBoundingClientRect();
		const { w, h } = this.containerSize;
		const x = clientX - rect.left;
		const y = clientY - rect.top;
		const inside = x < w && x > 0 && y < h && y > 0;
		if (inside) {
			this.mouse.x = x;
			this.mouse.y = y;
			this.cards.forEach((card) => {
				const cardX =
					-(card.getBoundingClientRect().left - rect.left) + this.mouse.x;
				const cardY =
					-(card.getBoundingClientRect().top - rect.top) + this.mouse.y;
				card.style.setProperty("--mouse-x", `${cardX}px`);
				card.style.setProperty("--mouse-y", `${cardY}px`);
			});
		}
	}

	init() {
		this.initContainer();
		window.addEventListener("resize", this.initContainer);
		window.addEventListener("mousemove", this.onMouseMove);
	}
}

// Init Spotlight
const spotlights = document.querySelectorAll("[data-spotlight]");

window.addEventListener("load", () => {
	spotlights.forEach((spotlight) => {
		new Spotlight(spotlight);
	});
});

// Masonry layout
const masonryLayout = (parent) => {
	const childElements = Array.from(parent.children);
	const gapSize = parseInt(
		window.getComputedStyle(parent).getPropertyValue("grid-row-gap"),
	);

	childElements.forEach((el) => {
		let previous = el.previousSibling;
		while (previous) {
			if (previous.nodeType === 1) {
				el.style.marginTop = 0;
				if (elementLeft(previous) === elementLeft(el)) {
					el.style.marginTop =
						-(elementTop(el) - elementBottom(previous) - gapSize) + "px";
					break;
				}
			}
			previous = previous.previousSibling;
		}
	});
};

const elementLeft = (el) => {
	return el.getBoundingClientRect().left;
};

const elementTop = (el) => {
	return el.getBoundingClientRect().top + window.scrollY;
};

const elementBottom = (el) => {
	return el.getBoundingClientRect().bottom + window.scrollY;
};

const masonryElements = document.querySelectorAll("[data-masonry]");

masonryElements.forEach(masonryLayout);

window.addEventListener("load", () => {
	masonryElements.forEach(masonryLayout);
});

window.addEventListener("resize", () => {
	masonryElements.forEach(masonryLayout);
});
