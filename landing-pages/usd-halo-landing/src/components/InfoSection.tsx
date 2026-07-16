import PillButton from "./PillButton";

const CARD_IMAGE = `${(import.meta as ImportMeta & { env: { BASE_URL: string } }).env.BASE_URL}assets/hf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.webp`;

export default function InfoSection() {
	return (
		<section className="bg-[#F5F5F5] px-6 py-24">
			<div className="max-w-[88rem] mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
					<div>
						<h2
							className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8"
							style={{ letterSpacing: "-0.03em" }}
						>
							Meet USD Halo.
						</h2>
						<PillButton label="Discover it" />
					</div>
					<p className="text-black/70 text-2xl md:text-3xl leading-relaxed">
						USD Halo is a reward-earning dollar coin that lets your savings grow
						while remaining tied to the U.S. dollar.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<div
						className="lg:col-span-2 rounded-2xl p-7 min-h-80 flex flex-col justify-between"
						style={{
							backgroundImage: `url("${CARD_IMAGE}")`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<h3
							className="text-black text-2xl font-medium leading-snug"
							style={{ letterSpacing: "-0.02em" }}
						>
							Savings that bloom
						</h3>
						<p className="text-black/70 text-base max-w-xs">
							Gain steady returns as your dollar tokens are routed into
							top-performing DeFi strategies.
						</p>
					</div>

					<div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between">
						<h3
							className="text-white text-2xl font-medium leading-snug"
							style={{ letterSpacing: "-0.02em" }}
						>
							Always fluid,
							<br />
							always pegged.
						</h3>
						<p className="text-white/60 text-base">
							Keep fully dollar-anchored with on-demand access to funds, no
							lockups or waits.
						</p>
					</div>

					<div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between">
						<h3
							className="text-white text-2xl font-medium leading-snug"
							style={{ letterSpacing: "-0.02em" }}
						>
							Fully
							<br />
							automated
						</h3>
						<p className="text-white/60 text-base">
							Skip the task of tuning positions yourself. USD Halo runs in the
							background for you.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
