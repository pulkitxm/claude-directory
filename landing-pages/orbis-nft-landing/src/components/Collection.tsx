import { assetUrl } from "../assets";

const CARDS = [
	{
		video: assetUrl(
			"assets/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4",
		),
		score: "8.7/10",
		name: "Orbis #001",
	},
	{
		video: assetUrl(
			"assets/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4",
		),
		score: "9/10",
		name: "Orbis #002",
	},
	{
		video: assetUrl(
			"assets/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4",
		),
		score: "8.2/10",
		name: "Orbis #003",
	},
];

function NftCard({ video, score, name }: (typeof CARDS)[number]) {
	return (
		<article className="liquid-glass rounded-[32px] p-[18px] transition hover:bg-white/10">
			<div className="relative overflow-hidden rounded-[24px] pb-[100%]">
				<video
					className="absolute inset-0 h-full w-full object-cover"
					src={video}
					autoPlay
					loop
					muted
					playsInline
				/>

				<div className="liquid-glass absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-[20px] px-5 py-4">
					<div>
						<p className="font-mono text-[11px] uppercase tracking-wide text-cream/70">
							Rarity score:
						</p>
						<p className="font-grotesk text-[16px] uppercase text-cream">
							{score}
						</p>
					</div>
					<button
						type="button"
						aria-label={`Open ${name}`}
						onClick={() => document.querySelector("#contact")?.scrollIntoView()}
						className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] text-cream shadow-lg shadow-purple-500/50 transition hover:scale-110"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</button>
				</div>
			</div>
		</article>
	);
}

export default function Collection() {
	return (
		<section id="gallery" className="bg-[#010828] py-16 md:py-20 lg:py-24">
			<div className="mx-auto max-w-[1831px] px-5 sm:px-8 lg:px-12">
				<div className="mb-12 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
					<h2 className="font-grotesk text-[32px] uppercase leading-[1.1] text-cream sm:text-[40px] md:text-[48px] lg:text-[60px]">
						Collection of
						<span className="ml-12 block sm:ml-24 lg:ml-32">
							<span className="font-condiment normal-case text-neon">
								Space{" "}
							</span>
							objects
						</span>
					</h2>

					<a href="#gallery" className="group inline-block shrink-0">
						<span className="flex items-end gap-3">
							<span className="font-grotesk text-[32px] uppercase leading-none text-cream sm:text-[40px] md:text-[48px] lg:text-[60px]">
								See
							</span>
							<span className="flex flex-col font-grotesk text-[20px] uppercase leading-[1.05] text-cream sm:text-[24px] md:text-[30px] lg:text-[36px]">
								<span>All</span>
								<span>Creators</span>
							</span>
						</span>
						<span className="mt-3 block h-[6px] w-full bg-neon transition group-hover:bg-cream md:h-[8px] lg:h-[10px]" />
					</a>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{CARDS.map((card) => (
						<NftCard key={card.video} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
