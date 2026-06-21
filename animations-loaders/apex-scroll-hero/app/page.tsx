import ScrollHero from "./components/ScrollHero";

const CHAPTERS = [
	{
		num: "01",
		title: "Launch",
		copy: "Zero to two hundred in the length of a breath. The lights go out, the rear tires bite, and the horizon starts coming at you all at once.",
	},
	{
		num: "02",
		title: "The wing",
		copy: "We thread the camera straight through the rear wing — carbon, decals, heat shimmer — close enough to read the torque in it.",
	},
	{
		num: "03",
		title: "Elevation",
		copy: "The shot lifts away from the gearbox and the circuit unrolls below. For the first time you see what the driver sees: the corner ahead.",
	},
	{
		num: "04",
		title: "Sunset",
		copy: "Full send into the light. The braking marker disappears into an orange flare and the film holds there, wide open, until you let go of the scroll.",
	},
];

const SPECS = [
	{ label: "Runtime", value: "5.0", unit: "sec" },
	{ label: "Resolution", value: "1080", unit: "p" },
	{ label: "Top speed", value: "200+", unit: "km/h" },
	{ label: "Model", value: "Seedance", unit: "2.0" },
];

const MARQUEE = Array.from({ length: 6 });

export default function Home() {
	return (
		<main>
			<ScrollHero />

			<section className="chapters">
				<div className="wrap">
					<p className="chapters-head">The film, corner by corner</p>
					{CHAPTERS.map((c) => (
						<article key={c.num} className="chapter">
							<span className="chapter-num">{c.num}</span>
							<h3 className="chapter-title display">{c.title}</h3>
							<p className="chapter-copy">{c.copy}</p>
						</article>
					))}
				</div>
			</section>

			<div className="marquee" aria-hidden>
				<div className="marquee-inner">
					{MARQUEE.map((_, i) => (
						<span key={i}>
							Chase the light <b>{"///"}</b> Apex <b>{"///"}</b> Zero to two
							hundred <b>{"///"}</b>
						</span>
					))}
				</div>
			</div>

			<section className="specs">
				<div className="wrap">
					<dl className="specs-grid">
						{SPECS.map((s) => (
							<div key={s.label} className="spec">
								<dt>{s.label}</dt>
								<dd>
									{s.value}
									<small>{s.unit}</small>
								</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<footer className="wrap site-footer">
				<span>
					Apex <b>{"///"}</b> a five-second film
				</span>
				<span>Scrubbed by your scroll wheel</span>
			</footer>
		</main>
	);
}
