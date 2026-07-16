import type { LucideIcon } from "lucide-react";
import {
	ArrowRight,
	BookOpen,
	Download,
	Instagram,
	Linkedin,
	Menu,
	Sparkles,
	Twitter,
	Wand2,
} from "lucide-react";
import type { CSSProperties } from "react";
import heroFlowers from "@/assets/hero-flowers.png";

const VIDEO_SRC =
	"./assets/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4";
const LOGO_SRC = "./logo.png";

const PILLS = ["Artistic Gallery", "AI Generation", "3D Structures"];

const SOCIALS = [
	{ label: "Twitter", href: "https://twitter.com", Icon: Twitter },
	{ label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
	{ label: "Instagram", href: "https://instagram.com", Icon: Instagram },
];

const rise = (delayMs: number): CSSProperties =>
	({ "--rise-delay": `${delayMs}ms` }) as CSSProperties;

export default function App() {
	return (
		<div className="relative min-h-screen overflow-hidden">
			<video
				className="absolute inset-0 z-0 h-full w-full object-cover"
				src={VIDEO_SRC}
				autoPlay
				loop
				muted
				playsInline
			/>

			<main className="relative z-10 flex min-h-screen flex-row">
				<LeftPanel />
				<RightPanel />
			</main>
		</div>
	);
}

function LeftPanel() {
	return (
		<section className="relative flex min-h-screen w-full flex-col px-9 py-10 lg:w-[52%] lg:px-14 lg:py-12">
			<div
				className="liquid-glass-strong absolute inset-4 rounded-3xl lg:inset-6"
				aria-hidden="true"
			/>

			<div className="relative z-10 flex flex-1 flex-col">
				<header
					className="animate-rise flex items-center justify-between"
					style={rise(0)}
				>
					<a
						href="#"
						className="flex items-center gap-2.5 transition-transform hover:scale-105"
						aria-label="Bloom home"
					>
						<img
							src={LOGO_SRC}
							alt="Bloom logo"
							width={32}
							height={32}
							className="h-8 w-8"
						/>
						<span className="text-2xl font-semibold tracking-tighter text-white">
							bloom
						</span>
					</a>
					<button
						type="button"
						className="liquid-glass flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm text-white transition-transform hover:scale-105"
					>
						Menu
						<Menu className="h-4 w-4" aria-hidden="true" />
					</button>
				</header>

				<div className="flex flex-1 flex-col items-center justify-center gap-8 py-14 text-center">
					<img
						src={LOGO_SRC}
						alt=""
						width={80}
						height={80}
						className="animate-rise h-20 w-20"
						style={rise(80)}
						aria-hidden="true"
					/>

					<h1
						className="animate-rise text-6xl leading-[1.05] tracking-[-0.05em] text-white lg:text-7xl"
						style={rise(160)}
					>
						Innovating the
						<br />
						<em className="font-serif italic text-white/80">spirit</em> of bloom
						AI
					</h1>

					<button
						type="button"
						className="liquid-glass-strong animate-rise flex items-center gap-3 rounded-full py-2.5 pl-7 pr-3 text-sm text-white transition-transform hover:scale-105 active:scale-95"
						style={rise(260)}
					>
						Explore Now
						<span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
							<Download className="h-3.5 w-3.5" aria-hidden="true" />
						</span>
					</button>

					<ul
						className="animate-rise flex flex-wrap items-center justify-center gap-3"
						style={rise(340)}
					>
						{PILLS.map((pill) => (
							<li
								key={pill}
								className="liquid-glass rounded-full px-4 py-2 text-xs text-white/80 transition-transform hover:scale-105"
							>
								{pill}
							</li>
						))}
					</ul>
				</div>

				<footer
					className="animate-rise flex flex-col items-center gap-4 pb-2 text-center"
					style={rise(420)}
				>
					<span className="text-xs uppercase tracking-widest text-white/50">
						Visionary Design
					</span>
					<p className="max-w-md text-xl text-white/80">
						<span className="font-display">&ldquo;We imagined a&nbsp;</span>
						<span className="font-serif italic">realm</span>
						<span className="font-display">&nbsp;with&nbsp;</span>
						<span className="font-serif italic">no ending</span>
						<span className="font-display">.&rdquo;</span>
					</p>
					<div className="flex w-full max-w-xs items-center gap-4 text-xs tracking-widest text-white/60">
						<span className="h-px flex-1 bg-white/20" aria-hidden="true" />
						MARCUS AURELIO
						<span className="h-px flex-1 bg-white/20" aria-hidden="true" />
					</div>
				</footer>
			</div>
		</section>
	);
}

function RightPanel() {
	return (
		<aside className="relative hidden min-h-screen w-[48%] flex-col gap-6 py-6 pl-2 pr-6 lg:flex">
			<div
				className="animate-rise flex items-center justify-between"
				style={rise(120)}
			>
				<div className="liquid-glass flex items-center gap-1.5 rounded-full p-1.5">
					{SOCIALS.map(({ label, href, Icon }) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noreferrer"
							aria-label={label}
							className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:text-white/80"
						>
							<Icon className="h-4 w-4" aria-hidden="true" />
						</a>
					))}
					<span
						className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
						aria-hidden="true"
					>
						<ArrowRight className="h-4 w-4" />
					</span>
				</div>

				<div className="flex items-center gap-3">
					<button
						type="button"
						className="liquid-glass rounded-full px-5 py-2.5 text-sm text-white transition-transform hover:scale-105"
					>
						Account
					</button>
					<button
						type="button"
						aria-label="AI assistant"
						className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
					>
						<Sparkles className="h-4 w-4" aria-hidden="true" />
					</button>
				</div>
			</div>

			<div
				className="liquid-glass animate-rise w-56 self-end rounded-3xl p-5"
				style={rise(220)}
			>
				<h3 className="text-sm text-white">Enter our ecosystem</h3>
				<p className="mt-2 text-xs leading-relaxed text-white/60">
					Join a living community of botanical artists cultivating the next
					generation of digital flora.
				</p>
			</div>

			<div
				className="liquid-glass animate-rise mt-auto rounded-[2.5rem] p-3"
				style={rise(320)}
			>
				<div className="flex gap-3">
					<FeatureCard
						Icon={Wand2}
						title="Processing"
						description="Generative engines translate your intent into living botanical form."
					/>
					<FeatureCard
						Icon={BookOpen}
						title="Growth Archive"
						description="Every bloom is versioned, revisit and evolve any stage of growth."
					/>
				</div>

				<div className="liquid-glass mt-3 flex items-center gap-4 rounded-3xl p-4">
					<img
						src={heroFlowers}
						alt="AI-sculpted flowers"
						width={96}
						height={64}
						className="h-16 w-24 rounded-2xl object-cover"
					/>
					<div className="min-w-0 flex-1">
						<h3 className="text-sm text-white">Advanced Plant Sculpting</h3>
						<p className="mt-1 text-xs leading-relaxed text-white/60">
							Shape petals, stems and structure in real time with AI-guided
							precision.
						</p>
					</div>
					<button
						type="button"
						aria-label="Explore Advanced Plant Sculpting"
						className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg text-white transition-transform hover:scale-105"
					>
						+
					</button>
				</div>
			</div>
		</aside>
	);
}

function FeatureCard({
	Icon,
	title,
	description,
}: {
	Icon: LucideIcon;
	title: string;
	description: string;
}) {
	return (
		<div className="liquid-glass flex-1 rounded-3xl p-5 transition-transform hover:scale-105">
			<span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
				<Icon className="h-4 w-4 text-white" aria-hidden="true" />
			</span>
			<h3 className="mt-4 text-sm text-white">{title}</h3>
			<p className="mt-1.5 text-xs leading-relaxed text-white/60">
				{description}
			</p>
		</div>
	);
}
