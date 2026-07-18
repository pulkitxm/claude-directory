import { Button } from "@/components/ui/button";

const VIDEO_SRC = `${import.meta.env.BASE_URL}assets/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`;

const NAV_LINKS = ["Studio", "About", "Journal", "Reach Us"];

const displayFont = { fontFamily: "'Instrument Serif', serif" };

export default function App() {
	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
			<video
				className="absolute inset-0 z-0 h-full w-full object-cover"
				src={VIDEO_SRC}
				autoPlay
				loop
				muted
				playsInline
				aria-hidden="true"
				tabIndex={-1}
			/>

			<header className="relative z-10 mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-8 py-6">
				<a
					href="./"
					className="text-3xl tracking-tight text-foreground"
					style={displayFont}
					aria-label="Velorah home"
				>
					Velorah<sup className="text-xs">&reg;</sup>
				</a>

				<nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
					<a
						href="./"
						className="text-sm text-foreground transition-colors"
						aria-current="page"
					>
						Home
					</a>
					{NAV_LINKS.map((label) => (
						<a
							key={label}
							href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							{label}
						</a>
					))}
				</nav>

				<Button
					variant="glass"
					size="pill"
					className="px-6 py-2.5 text-sm text-foreground hover:scale-[1.03]"
				>
					Begin Journey
				</Button>
			</header>

			<main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-40 pt-32 text-center py-[90px]">
				<h1
					className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl sm:leading-[0.95] md:text-8xl md:leading-[0.95]"
					style={displayFont}
				>
					Where <em className="not-italic text-muted-foreground">dreams</em>{" "}
					rise{" "}
					<em className="not-italic text-muted-foreground">
						through the silence.
					</em>
				</h1>

				<p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
					We&rsquo;re designing tools for deep thinkers, bold creators, and
					quiet rebels. Amid the chaos, we build digital spaces for sharp focus
					and inspired work.
				</p>

				<Button
					variant="glass"
					size="pill"
					className="animate-fade-rise-delay-2 mt-12 cursor-pointer px-14 py-5 text-base text-foreground hover:scale-[1.03]"
				>
					Begin Journey
				</Button>
			</main>
		</div>
	);
}
