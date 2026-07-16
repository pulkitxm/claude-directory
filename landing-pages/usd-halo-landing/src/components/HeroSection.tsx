import Marquee, { type MarqueeBrand } from "./Marquee";
import PillButton from "./PillButton";

const HERO_VIDEO = `${(import.meta as ImportMeta & { env: { BASE_URL: string } }).env.BASE_URL}assets/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4`;

const BRANDS: MarqueeBrand[] = [
	{
		name: "Stripe",
		style: {
			fontFamily: "Georgia, 'Times New Roman', serif",
			fontWeight: 700,
			letterSpacing: "-0.02em",
			fontSize: "15px",
		},
	},
	{
		name: "Coinbase",
		style: {
			fontFamily: "Arial, Helvetica, sans-serif",
			fontWeight: 900,
			letterSpacing: "0.08em",
			fontSize: "13px",
			textTransform: "uppercase",
		},
	},
	{
		name: "Uniswap",
		style: {
			fontFamily: "'Trebuchet MS', sans-serif",
			fontWeight: 600,
			letterSpacing: "0.01em",
			fontSize: "15px",
			fontStyle: "italic",
		},
	},
	{
		name: "Aave",
		style: {
			fontFamily: "'Courier New', monospace",
			fontWeight: 700,
			letterSpacing: "0.12em",
			fontSize: "13px",
			textTransform: "uppercase",
		},
	},
	{
		name: "Compound",
		style: {
			fontFamily: "Palatino, 'Book Antiqua', serif",
			fontWeight: 400,
			letterSpacing: "-0.01em",
			fontSize: "16px",
		},
	},
	{
		name: "MakerDAO",
		style: {
			fontFamily: "Impact, 'Arial Narrow', sans-serif",
			fontWeight: 400,
			letterSpacing: "0.04em",
			fontSize: "14px",
		},
	},
	{
		name: "Chainlink",
		style: {
			fontFamily: "Verdana, sans-serif",
			fontWeight: 700,
			letterSpacing: "-0.03em",
			fontSize: "13px",
		},
	},
];

export default function HeroSection() {
	return (
		<section className="flex-1 px-6 pt-20 pb-6 flex items-end">
			<div
				className="relative w-full max-w-[88rem] mx-auto rounded-2xl overflow-hidden"
				style={{ height: "calc(100vh - 96px)" }}
			>
				<video
					className="absolute inset-0 w-full h-full object-cover"
					src={HERO_VIDEO}
					autoPlay
					muted
					loop
					playsInline
				/>

				<div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36">
					<h1
						className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4"
						style={{ letterSpacing: "-0.04em" }}
					>
						Your Wealth
						<br />
						Works
					</h1>
					<p
						className="text-black/70 text-base md:text-lg max-w-md mb-8 leading-relaxed"
						style={{
							fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
						}}
					>
						An automated, reward-powered digital dollar built for native passive
						earnings and effortless connection into DeFi.
					</p>
					<PillButton label="Join us" large />

					<div className="mt-24 w-full max-w-md overflow-hidden">
						<Marquee
							brands={BRANDS}
							trackClass="marquee-track"
							keyframesName="marquee"
							durationSeconds={22}
							itemClass="mx-7 shrink-0 text-black/60 whitespace-nowrap"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
