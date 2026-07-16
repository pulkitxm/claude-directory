import { ArrowUpRight, Sparkles } from "lucide-react";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export interface MediaAbout {
	overview: string;
	conclusion: string;
}

export interface MediaContentData {
	src: string;
	poster?: string;
	background: string;
	title: string;
	date: string;
	scrollToExpand: string;
	eyebrow: string;
	stats: { label: string; value: string }[];
	about: MediaAbout;
}

export const sampleMediaContent: Record<"video" | "image", MediaContentData> = {
	video: {
		src: assetPath("media/cosmos.mp4"),
		poster: assetPath("media/video-poster.jpg"),
		background: assetPath("media/bg-cosmos.jpg"),
		title: "Immersive Video Experience",
		date: "Cosmic Journey",
		scrollToExpand: "Scroll to expand",
		eyebrow: "Chapter 01 — Motion",
		stats: [
			{ label: "Frames driven", value: "∞ loop" },
			{ label: "Interaction", value: "wheel · touch" },
			{ label: "Render", value: "GPU-cheap" },
		],
		about: {
			overview:
				"This is a demonstration of the ScrollExpandMedia component with a video. As you scroll, the video unfurls from a compact card to fill the viewport, hijacking the wheel so the expansion feels like a single continuous gesture rather than a page scroll.",
			conclusion:
				"Because the wheel is intercepted until the media is fully open, the moment of arrival is deliberate — the title splits apart, the backdrop dissolves, and only then does the page underneath become scrollable. Flip to image mode to see the same choreography without a single byte of video.",
		},
	},
	image: {
		src: assetPath("media/media-mars.jpg"),
		background: assetPath("media/bg-valley.jpg"),
		title: "Dynamic Image Showcase",
		date: "Quiet Frontier",
		scrollToExpand: "Scroll to expand",
		eyebrow: "Chapter 02 — Stillness",
		stats: [
			{ label: "Asset", value: "single still" },
			{ label: "Weight", value: "< 150 KB" },
			{ label: "Motion", value: "scroll-only" },
		],
		about: {
			overview:
				"The very same expansion choreography works with a static image. There is no autoplay, no buffering, no decode cost — just one photograph that grows to command the full frame as you drive the scroll forward.",
			conclusion:
				"Static media keeps the experience featherweight while preserving the cinematic reveal. The component never cares what it is wrapping: video, image, or embed all share one expansion engine and one set of props.",
		},
	},
};

const MediaContent = ({ mediaType }: { mediaType: "video" | "image" }) => {
	const current = sampleMediaContent[mediaType];

	return (
		<div className="max-w-5xl mx-auto text-white">
			<div className="flex items-center gap-2 text-iris-bright font-mono text-xs uppercase tracking-[0.3em] mb-8">
				<Sparkles className="h-3.5 w-3.5" />
				{current.eyebrow}
			</div>

			<h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-[1.05] tracking-tight">
				How the expansion
				<br />
				<span className="text-iris-bright">actually works.</span>
			</h2>

			<div className="grid md:grid-cols-3 gap-8 md:gap-12">
				<div className="md:col-span-2 space-y-6">
					<p className="text-lg md:text-xl text-white/70 leading-relaxed">
						{current.about.overview}
					</p>
					<p className="text-lg md:text-xl text-white/70 leading-relaxed">
						{current.about.conclusion}
					</p>

					<a
						href="#top"
						onClick={(e) => {
							e.preventDefault();
							window.dispatchEvent(new Event("resetSection"));
						}}
						className="inline-flex items-center gap-2 mt-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
					>
						Replay the reveal
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</div>

				<div className="space-y-px rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
					{current.stats.map((s) => (
						<div
							key={s.label}
							className="flex items-center justify-between rounded-xl px-4 py-4"
						>
							<span className="font-mono text-[11px] uppercase tracking-wider text-white/40">
								{s.label}
							</span>
							<span className="font-display text-lg font-semibold text-white">
								{s.value}
							</span>
						</div>
					))}
				</div>
			</div>

			<div className="mt-16 grid sm:grid-cols-3 gap-4">
				{[
					{
						t: "Wheel hijack",
						d: "deltaY drives a 0→1 progress value; the page never scrolls until progress hits 1.",
					},
					{
						t: "Splitting title",
						d: "The first word and the rest translate apart on opposite axes as progress climbs.",
					},
					{
						t: "Backdrop dissolve",
						d: "A full-bleed background fades to reveal the dark stage as the card takes over.",
					},
				].map((c) => (
					<div
						key={c.t}
						className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6"
					>
						<h3 className="font-display text-base font-semibold text-white mb-2">
							{c.t}
						</h3>
						<p className="text-sm text-white/55 leading-relaxed">{c.d}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default MediaContent;
