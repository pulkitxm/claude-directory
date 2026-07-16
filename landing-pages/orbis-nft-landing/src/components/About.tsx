import { assetUrl } from "../assets";

const ABOUT_VIDEO = assetUrl(
	"assets/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4",
);

const ABOUT_COPY =
	"A digital object fixed beyond time and place. An exploration of distance, form, and silence in space";

function GhostParagraphs() {
	return (
		<div className="flex max-w-[266px] flex-col gap-8">
			{[0, 1].map((i) => (
				<p
					key={i}
					className="font-mono text-[14px] uppercase leading-relaxed text-[#010828] opacity-10 lg:text-[16px] lg:text-cream"
				>
					{ABOUT_COPY}
				</p>
			))}
		</div>
	);
}

export default function About() {
	return (
		<section id="about" className="relative min-h-screen overflow-hidden">
			<video
				className="absolute inset-0 h-full w-full object-cover"
				src={ABOUT_VIDEO}
				autoPlay
				loop
				muted
				playsInline
			/>

			<div className="relative z-10 mx-auto flex min-h-screen max-w-[1831px] flex-col justify-between px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">
				<div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
					<div className="relative">
						<h2 className="font-grotesk text-[32px] uppercase leading-[1.05] text-cream sm:text-[40px] md:text-[48px] lg:text-[60px]">
							Hello!
							<br />
							I&rsquo;m orbis
						</h2>
						<span className="absolute -bottom-6 -right-10 -rotate-2 font-condiment text-[36px] normal-case text-neon mix-blend-exclusion sm:-right-16 sm:text-[48px] md:text-[56px] lg:-bottom-8 lg:-right-24 lg:text-[68px]">
							Orbis
						</span>
					</div>

					<p className="max-w-[266px] font-mono text-[14px] uppercase leading-relaxed text-cream lg:text-[16px]">
						{ABOUT_COPY}
					</p>
				</div>

				<div className="mt-16 flex justify-between">
					<GhostParagraphs />
					<div className="hidden lg:block">
						<GhostParagraphs />
					</div>
				</div>
			</div>
		</section>
	);
}
