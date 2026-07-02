/* Sidefolio — shared content data */

window.PROJECTS = [
	{
		slug: "aceternity",
		title: "Aceternity",
		thumb: "assets/images/aceternity.png",
		desc: "A design and development studio that focuses on building quality apps.",
		tags: ["Nextjs", "Tailwindcss"],
		href: "projects/aceternity.html",
		live: "https://aceternity.com",
	},
	{
		slug: "algochurn",
		title: "Algochurn",
		thumb: "assets/images/algochurn.png",
		desc: "Practice for technical interviews with hands on coding challenges.",
		tags: ["Nextjs", "Tailwindcss"],
		href: "projects/algochurn.html",
		live: "https://algochurn.com",
	},
	{
		slug: "moonbeam",
		title: "Moonbeam",
		thumb: "assets/images/moonbeam.png",
		desc: "Never write from scratch again with Moonbeam, your AI first writing tool",
		tags: ["Nextjs", "Tailwindcss"],
		href: "projects/moonbeam.html",
		live: "https://gomoonbeam.com",
	},
	{
		slug: "tailwindmasterkit",
		title: "Tailwind Master Kit",
		thumb: "assets/images/tailwindmasterkit.png",
		desc: "A beautiful and comprehensive Tailwind CSS components library for building modern websites and applications.",
		tags: ["Nextjs", "Tailwindcss"],
		href: "projects/tailwindmasterkit.html",
		live: "https://tailwindmasterkit.com",
	},
];

window.ARTICLES = [
	{
		slug: "clean-code",
		title: "Writing Clean Code With React",
		image: "assets/images/p-1542831371.jpg",
		excerpt:
			"Effective and efficient ways to write clean code with React while keeping in mind the performance and maintainability of the codebase.",
		tags: ["Clean Code"],
		date: "August 18, 2023",
		href: "blog/clean-code.html",
	},
	{
		slug: "how-to-win-clients",
		title: "How to win clients",
		image: "assets/images/p-1664575262619.jpg",
		excerpt:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. One more lorem so it looks good.",
		tags: ["tailwindcss", "css", "frontend"],
		date: "August 18, 2023",
		href: "blog/how-to-win-clients.html",
	},
	{
		slug: "tailwindcss-tips-and-tricks",
		title: "Tailwindcss tips and tricks to conquer the world",
		image: "assets/images/p-1555066931.jpg",
		excerpt:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. One more lorem so it looks good.",
		tags: ["tailwindcss", "css", "frontend"],
		date: "August 18, 2023",
		href: "blog/tailwindcss-tips-and-tricks.html",
	},
	{
		slug: "dark-mode-with-nextjs",
		title: "Creating a Dark Mode Toggle with Next.js and Tailwind CSS",
		image: "assets/images/p-1607799632518.jpg",
		excerpt:
			"As a web developer, you may be wondering how to create a dark mode toggle for your web application. In this tutorial, we will explore how to implement a dark mode toggle with Next.js and Tailwind CSS.",
		tags: ["tailwindcss", "css", "frontend"],
		date: "August 18, 2023",
		href: "blog/dark-mode-with-nextjs.html",
	},
];

window.STACK = [
	{ src: "assets/logos/next.png", alt: "Next.js", w: "3.5rem" },
	{ src: "assets/logos/aws.webp", alt: "AWS", w: "2.5rem" },
	{ src: "assets/logos/figma.png", alt: "Figma", w: "2rem" },
	{ src: "assets/logos/framer.webp", alt: "Framer Motion", w: "2.5rem" },
	{ src: "assets/logos/node.png", alt: "Node", w: "3rem" },
	{ src: "assets/logos/tailwind.png", alt: "Tailwind", w: "6rem" },
	{ src: "assets/logos/vercel.png", alt: "Vercel", w: "6rem" },
];

/* card renderer (base = "" for root pages, "../" for nested) */
window.renderCards = function (items, base) {
	base = base || "";
	return `<div class="cards">${items
		.map(
			(p) => `
    <a class="card" href="${base}${p.href}">
      <img class="card__thumb" src="${base}${p.thumb || p.image}" alt="thumbnail" width="200" height="200" />
      <div class="card__body">
        <div>
          <h4 class="cal card__title">${p.title}</h4>
          <p class="card__desc">${p.excerpt || p.desc}</p>
        </div>
        <div class="card__tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
    </a>`,
		)
		.join("")}</div>`;
};
