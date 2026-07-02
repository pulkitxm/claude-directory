// ===== Magic UI "Mobile" (Cal AI) clone — behavior =====

// ---- Hero phones (5 devices, scroll-linked vertical parallax) ----
const heroPhones = document.querySelectorAll(".hero-phones img");
const baseOffsets = [100, 50, 0, 50, 100];
heroPhones.forEach((img, i) => {
	img.style.transform = `translateY(${baseOffsets[i]}px)`;
});

// ---- Experience phones (scroll-linked vertical parallax) ----
const expPhoneData = [
	{ el: document.getElementById("exp-phone-1"), base: 150 },
	{ el: document.getElementById("exp-phone-2"), base: 200 },
	{ el: document.getElementById("exp-phone-3"), base: 250 },
];
expPhoneData.forEach(({ el, base }) => {
	if (el) el.style.transform = `translateY(${base}px)`;
});

// ---- Combined scroll handler ----
let ticking = false;
function onScroll() {
	if (ticking) return;
	ticking = true;
	requestAnimationFrame(() => {
		const y = window.scrollY;

		// Hero phones parallax
		heroPhones.forEach((img, i) => {
			const factor = baseOffsets[i] / 100;
			img.style.transform = `translateY(${baseOffsets[i] - y * factor * 0.1}px)`;
		});

		// Experience phones parallax
		expPhoneData.forEach(({ el, base }) => {
			if (!el) return;
			const factor = base / 250;
			el.style.transform = `translateY(${Math.max(0, base - y * factor * 0.3)}px)`;
		});

		ticking = false;
	});
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---- Benefits carousel (scroll-snap, scrollBy navigation) ----
const scrollEl = document.getElementById("carousel-scroll");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

if (scrollEl && prevBtn && nextBtn) {
	prevBtn.addEventListener("click", () => {
		scrollEl.scrollBy({ left: -scrollEl.clientWidth / 3, behavior: "smooth" });
	});
	nextBtn.addEventListener("click", () => {
		scrollEl.scrollBy({ left: scrollEl.clientWidth / 3, behavior: "smooth" });
	});
}

// ---- Testimonials vertical marquee (4 columns, alternating) ----
const testimonials = [
	[
		"Alice Johnson",
		"Freelance Designer",
		"Cal AI has revolutionized how I manage my time. It's like having a personal assistant.",
	],
	[
		"Bob Brown",
		"Project Manager, Tech Innovations",
		"The AI-powered scheduling has significantly reduced conflicts in our team's calendar.",
	],
	[
		"Charlie Davis",
		"Entrepreneur",
		"The smart time blocking feature has helped me maintain a better work-life balance.",
	],
	[
		"Diana Evans",
		"Marketing Director",
		"Cal AI's predictive planning has made my workweek so much more efficient.",
	],
	[
		"Ethan Ford",
		"Software Team Lead",
		"The team collaboration features have streamlined our project management process.",
	],
	[
		"Fiona Grant",
		"HR Manager",
		"Cal AI has helped me balance my work and personal commitments effortlessly.",
	],
	[
		"George Harris",
		"Productivity Coach",
		"The AI-driven insights have helped me optimize my daily routines significantly.",
	],
	[
		"Hannah Irving",
		"Digital Nomad",
		"Cal AI's integration with my other tools has created a seamless workflow.",
	],
	[
		"Ian Johnson",
		"Sales Executive",
		"The smart reminders have drastically reduced my missed appointments.",
	],
	[
		"Julia Kim",
		"Researcher",
		"Cal AI's ability to learn my preferences has made scheduling a breeze.",
	],
	[
		"Kevin Lee",
		"Operations Manager",
		"The AI-suggested meeting times have improved our team's productivity.",
	],
	[
		"Laura Martinez",
		"Urban Planner",
		"Cal AI's travel time estimations have made my commute planning much easier.",
	],
	[
		"Michael Nelson",
		"Entrepreneur",
		"The AI-powered task prioritization has helped me focus on what's truly important.",
	],
	[
		"Natalie Owens",
		"Personal Trainer",
		"Cal AI's habit tracking feature has helped me build better routines.",
	],
	[
		"Oscar Parker",
		"Remote Worker",
		"The AI suggestions for breaks have improved my work-from-home productivity.",
	],
	[
		"Patricia Quinn",
		"Tech Enthusiast",
		"Cal AI's integration with my smart home devices has streamlined my mornings.",
	],
	[
		"Quincy Roberts",
		"Productivity Consultant",
		"The AI-driven energy level tracking has helped me schedule tasks more effectively.",
	],
	[
		"Rachel Stevens",
		"Life Coach",
		"Cal AI's goal-setting features have kept me accountable and on track.",
	],
	[
		"Samuel Thompson",
		"Writer",
		"The AI-suggested focus times have dramatically improved my deep work sessions.",
	],
	[
		"Tina Upton",
		"Global Project Coordinator",
		"Cal AI's team availability feature has made cross-timezone scheduling effortless.",
	],
	[
		"Ulysses Vaughn",
		"Executive Assistant",
		"The AI-powered meeting summarizer has saved me hours of note-taking.",
	],
	[
		"Victoria White",
		"Business Analyst",
		"Cal AI's personalized productivity insights have been eye-opening.",
	],
	[
		"William Xavier",
		"Startup Founder",
		"The AI-suggested networking opportunities have expanded my professional circle.",
	],
	[
		"Xena Yates",
		"Wellness Coach",
		"Cal AI's integration with my fitness tracker has helped me maintain a healthier lifestyle.",
	],
	[
		"Yannick Zimmerman",
		"Project Manager",
		"The AI-driven project timeline suggestions have kept our team ahead of deadlines.",
	],
];
// Masonry columns layout (CSS handles columns, just render all cards)
document.getElementById("testi-cols").innerHTML = testimonials
	.map((t, i) => {
		const img = `./assets/avatars/p${(i % 9) + 1}.jpg`;
		return `<div class="testi-card"><div class="top"><img src="${img}" alt="" loading="lazy"/><div><div class="name">${t[0]}</div><div class="role">${t[1]}</div></div></div><div class="quote">${t[2]}</div></div>`;
	})
	.join("");

// ---- FAQ accordion (height-animated) ----
const faqs = [
	[
		"How does AI improve my scheduling?",
		"Our AI analyzes your scheduling patterns, preferences, and productivity data to suggest optimal times for tasks and meetings. It learns from your behavior to continuously improve its recommendations.",
	],
	[
		"Can I integrate Cal AI with other apps?",
		"Yes, Cal AI integrates with popular productivity tools and calendar apps. You can sync with Google Calendar, Outlook, and more to centralize your scheduling.",
	],
	[
		"How does the team collaboration feature work?",
		"Team collaboration allows you to share availability, schedule group meetings, and coordinate tasks. The AI considers everyone's schedules to find the best times for team activities.",
	],
	[
		"Is my data secure with Cal AI?",
		"We take data security seriously. All your calendar data is encrypted end-to-end and stored securely in the cloud. We never share your personal information or scheduling data with third parties.",
	],
	[
		"Can I use Cal AI offline?",
		"While full functionality requires an internet connection, you can view your schedule and add events offline. The app will sync and apply AI optimizations when you're back online.",
	],
];
const faqList = document.getElementById("faq-list");
faqList.innerHTML = faqs
	.map(
		(f) =>
			`<div class="faq-item"><button class="faq-q">${f[0]}<svg class="chev"><use href="#i-chev-down"/></svg></button><div class="faq-a"><div class="faq-a-inner">${f[1]}</div></div></div>`,
	)
	.join("");
faqList.querySelectorAll(".faq-item").forEach((item) => {
	const q = item.querySelector(".faq-q");
	const a = item.querySelector(".faq-a");
	q.addEventListener("click", () => {
		const open = item.classList.contains("open");
		if (open) {
			a.style.height = a.scrollHeight + "px";
			requestAnimationFrame(() => {
				a.style.height = "0px";
			});
			item.classList.remove("open");
		} else {
			item.classList.add("open");
			a.style.height = a.scrollHeight + "px";
			a.addEventListener("transitionend", function te() {
				if (item.classList.contains("open")) a.style.height = "auto";
				a.removeEventListener("transitionend", te);
			});
		}
	});
});

// ---- Entrance animation on scroll ----
// Sections are always visible (no opacity:0 hidden initial state).
// When a section scrolls into view for the first time after the user
// has begun scrolling, we play a subtle slide-up transition.
let userScrolled = false;
window.addEventListener(
	"scroll",
	() => {
		userScrolled = true;
	},
	{ once: true, passive: true },
);

const io = new IntersectionObserver(
	(entries) => {
		entries.forEach((e) => {
			if (!e.isIntersecting) return;
			if (userScrolled) {
				e.target.classList.add("in");
			}
			io.unobserve(e.target);
		});
	},
	{ threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
