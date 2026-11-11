import ScrollHero from "./components/ScrollHero";
const CHAPTERS = [{
  num: "01",
  title: "Beginning",
  copy: "A cool field opens the study. Scroll slowly to explore its changing light."
}, {
  num: "02",
  title: "Movement",
  copy: "The gradient turns through the frame. Every position follows your scroll."
}, {
  num: "03",
  title: "Balance",
  copy: "Warm and cool colors share the canvas in a continuous transition."
}, {
  num: "04",
  title: "Arrival",
  copy: "Reach the final frame, or scroll back to see the sequence in reverse."
}];
const SPECS = [{
  label: "Runtime",
  value: "5.0",
  unit: "sec"
}, {
  label: "Resolution",
  value: "720",
  unit: "p"
}, {
  label: "Frames",
  value: "125",
  unit: "total"
}, {
  label: "Source",
  value: "Local",
  unit: "gradient"
}];
const MARQUEE = Array.from({
  length: 6
});
export default function Home() {
  return <main>
			<ScrollHero />

			<section className="chapters">
				<div className="wrap">
					<p className="chapters-head">The study, frame by frame</p>
					{CHAPTERS.map(c => <article key={c.num} className="chapter">
							<span className="chapter-num">{c.num}</span>
							<h3 className="chapter-title display">{c.title}</h3>
							<p className="chapter-copy">{c.copy}</p>
						</article>)}
				</div>
			</section>

			<div className="marquee" aria-hidden>
				<div className="marquee-inner">
					{MARQUEE.map((_, i) => <span key={i}>
							Chase the light <b>{"///"}</b> Apex <b>{"///"}</b> Follow the light <b>{"///"}</b>
						</span>)}
				</div>
			</div>

			<section className="specs">
				<div className="wrap">
					<dl className="specs-grid">
						{SPECS.map(s => <div key={s.label} className="spec">
								<dt>{s.label}</dt>
								<dd>
									{s.value}
									<small>{s.unit}</small>
								</dd>
							</div>)}
					</dl>
				</div>
			</section>

			<footer className="wrap site-footer">
				<span>
					Apex <b>{"///"}</b> a five-second film
				</span>
				<span>Scrubbed by your scroll wheel</span>
			</footer>
		</main>;
}
