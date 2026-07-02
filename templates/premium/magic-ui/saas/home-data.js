// Populate logo marquee + testimonial wall
(function () {
	const companies = [
		"Netflix",
		"Uber",
		"Instagram",
		"Google",
		"Amazon",
		"Microsoft",
		"Spotify",
		"YouTube",
	];
	const logoTrack = document.getElementById("logo-track");
	if (logoTrack) {
		const make = () =>
			companies
				.map((c) => `<img src="./assets/companies/${c}.svg" alt="${c}" />`)
				.join("");
		logoTrack.innerHTML = make() + make(); // duplicate for seamless loop
	}

	const tweets = [
		{
			name: "Alex Rivera",
			role: "CTO at InnovateTech",
			img: "men-1",
			text: "The AI-driven analytics from #QuantumInsights have revolutionized our product development cycle. Insights are now more accurate and faster than ever. A game-changer for tech companies.",
		},
		{
			name: "Samantha Lee",
			role: "Marketing Director at NextGen Solutions",
			img: "women-12",
			text: "Implementing #AIStream's customer prediction model has drastically improved our targeting strategy. Seeing a 50% increase in conversion rates! Highly recommend their solutions.",
		},
		{
			name: "Raj Patel",
			role: "Founder & CEO at StartUp Grid",
			img: "men-14",
			text: "As a startup, we need to move fast and stay ahead. #CodeAI's automated coding assistant helps us do just that. Our development speed has doubled. Essential tool for any startup.",
		},
		{
			name: "Emily Chen",
			role: "Product Manager at Digital Wave",
			img: "women-5",
			text: "#VoiceGen's AI-driven voice synthesis has made creating global products a breeze. Localization is now seamless and efficient. A must-have for global product teams.",
		},
		{
			name: "Michael Brown",
			role: "Data Scientist at FinTech Innovations",
			img: "men-18",
			text: "Leveraging #DataCrunch's AI for our financial models has given us an edge in predictive accuracy. Our investment strategies are now powered by real-time data analytics.",
		},
		{
			name: "Linda Wu",
			role: "VP of Operations at LogiChain Solutions",
			img: "women-56",
			text: "#LogiTech's supply chain optimization tools have drastically reduced our operational costs. Efficiency and accuracy in logistics have never been better.",
		},
		{
			name: "Carlos Gomez",
			role: "Head of R&D at EcoInnovate",
			img: "men-25",
			text: "By integrating #GreenTech's sustainable energy solutions, we've seen a significant reduction in carbon footprint. Leading the way in eco-friendly business practices.",
		},
		{
			name: "Aisha Khan",
			role: "CMO at Fashion Forward",
			img: "women-73",
			text: "#TrendSetter's market analysis AI has transformed how we approach fashion trends. Our campaigns are now data-driven with higher customer engagement.",
		},
		{
			name: "Tom Chen",
			role: "Director of IT at HealthTech Solutions",
			img: "men-45",
			text: "Implementing #MediCareAI in our patient care systems has improved patient outcomes significantly. Technology and healthcare working hand in hand for better health.",
		},
		{
			name: "Sofia Martinez",
			role: "CEO at Innovatech",
			img: "women-78",
			text: "#CloudMaster's AI-driven cloud management has streamlined our operations. We've optimized resources and improved system reliability beyond expectations.",
		},
		{
			name: "Jay Patel",
			role: "Senior Developer at Tech Solutions",
			img: "men-54",
			text: "#AIStream's predictive maintenance has saved us countless hours of downtime. Our infrastructure is more resilient than ever.",
		},
		{
			name: "Liam Smith",
			role: "Product Designer at Creatives",
			img: "men-91",
			text: "#PixelPerfect's design assistant has elevated our creative process. We ship polished interfaces faster, with AI handling the tedious work.",
		},
	];

	const star =
		'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 6 6.5.5-5 4.3 1.6 6.4L12 17l-5.6 3.2L8 12.8 3 8.5l6.5-.5L12 2z"/></svg>';
	const card = (t) => `
    <div class="tweet">
      <div class="head">
        <img src="./assets/avatars/${t.img}.jpg" alt="${t.name}" />
        <div><div class="name">${t.name}</div><div class="role">${t.role}</div></div>
      </div>
      <p>${t.text}</p>
      <div class="stars">${star.repeat(5)}</div>
    </div>`;

	const cols = document.getElementById("tcols");
	if (cols) {
		const groups = [[], [], []];
		tweets.forEach((t, i) => groups[i % 3].push(t));
		cols.innerHTML = groups
			.map((g) => {
				const inner = g.map(card).join("");
				return `<div class="tcol"><div class="vtrack">${inner}${inner}</div></div>`;
			})
			.join("");
	}
})();
