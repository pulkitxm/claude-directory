import {
	Calendar,
	ChevronLeft,
	ChevronRight,
	Clock,
	Menu,
	Pause,
	Play,
	Search,
	Star,
	User,
	X,
} from "lucide-react";
import { useRef, useState } from "react";

const VIDEO_SRC = `${import.meta.env.BASE_URL}assets/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4`;

const NAV_LINKS = [
	"Movies",
	"TV Series",
	"Editor's Pick",
	"Interviews",
	"User Reviews",
];

const FEATURES = [
	{
		title: "Step Through. Work Smarter.",
		description:
			"A voyage through forgotten realms, where past and future intertwine.",
		rating: "8.7/10 IMDB",
		duration: "132 min",
		date: "April, 2025",
	},
	{
		title: "Beyond the Quiet Horizon.",
		description:
			"Follow a signal beyond the mapped world and into a story without limits.",
		rating: "8.9/10 IMDB",
		duration: "118 min",
		date: "May, 2025",
	},
	{
		title: "Every Frame Holds a Secret.",
		description:
			"An atmospheric mystery built from memories, movement, and impossible light.",
		rating: "9.1/10 IMDB",
		duration: "126 min",
		date: "June, 2025",
	},
];

export default function App() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);
	const [playing, setPlaying] = useState(true);
	const [expanded, setExpanded] = useState(false);
	const [featureIndex, setFeatureIndex] = useState(0);
	const feature = FEATURES[featureIndex];

	function togglePlayback() {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) {
			void video.play();
			setPlaying(true);
			return;
		}
		video.pause();
		setPlaying(false);
	}

	function moveFeature(direction: number) {
		setFeatureIndex(
			(current) => (current + direction + FEATURES.length) % FEATURES.length,
		);
		setExpanded(false);
	}

	return (
		<div className="relative flex h-dvh flex-col overflow-hidden bg-black text-white">
			<video
				ref={videoRef}
				className="fixed inset-0 z-0 h-full w-full object-cover"
				src={VIDEO_SRC}
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				tabIndex={-1}
				aria-hidden="true"
			/>

			<div
				className="bottom-blur-mask pointer-events-none fixed inset-0 z-[1] backdrop-blur-xl"
				aria-hidden="true"
			/>

			<header className="relative z-50 flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-6">
				<a
					href="#feature"
					className="animate-blur-fade-up flex h-8 items-center md:h-10"
					style={{ animationDelay: "0ms" }}
					aria-label="LUMIÈRE home"
				>
					<span className="text-lg font-light leading-none tracking-[0.35em] md:text-xl">
						LUMI<span className="font-semibold">È</span>RE
					</span>
				</a>

				<nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
					{NAV_LINKS.map((label, i) => (
						<a
							key={label}
							href="#feature"
							className="animate-blur-fade-up text-sm transition-colors hover:text-gray-300"
							style={{ animationDelay: `${100 + i * 50}ms` }}
						>
							{label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={() => setSearchOpen((open) => !open)}
						aria-expanded={searchOpen}
						className="liquid-glass animate-blur-fade-up hidden items-center gap-2 rounded-full px-4 py-2 text-sm sm:flex md:px-6"
						style={{ animationDelay: "350ms" }}
					>
						<Search size={18} aria-hidden="true" />
						<span>Search</span>
					</button>

					<button
						type="button"
						onClick={() => setProfileOpen((open) => !open)}
						aria-pressed={profileOpen}
						className="liquid-glass animate-blur-fade-up hidden h-10 w-10 items-center justify-center rounded-full sm:flex"
						style={{ animationDelay: "400ms" }}
						aria-label="Your profile"
					>
						<User size={18} aria-hidden="true" />
					</button>

					<button
						type="button"
						className="liquid-glass animate-blur-fade-up flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
						style={{ animationDelay: "350ms" }}
						aria-label={menuOpen ? "Close menu" : "Open menu"}
						aria-expanded={menuOpen}
						aria-controls="mobile-menu"
						onClick={() => setMenuOpen((open) => !open)}
					>
						<Menu
							size={18}
							aria-hidden="true"
							className={`absolute transition-all duration-500 ease-out ${
								menuOpen
									? "rotate-180 scale-50 opacity-0"
									: "rotate-0 scale-100 opacity-100"
							}`}
						/>
						<X
							size={18}
							aria-hidden="true"
							className={`absolute transition-all duration-500 ease-out ${
								menuOpen
									? "rotate-0 scale-100 opacity-100"
									: "-rotate-180 scale-50 opacity-0"
							}`}
						/>
					</button>
				</div>
			</header>

			<div
				id="mobile-menu"
				className={`absolute inset-x-0 top-[72px] z-40 border-t border-b border-gray-800 bg-gray-900/95 shadow-2xl backdrop-blur-lg transition-all duration-500 ease-out lg:hidden ${
					menuOpen
						? "translate-y-0 opacity-100"
						: "pointer-events-none -translate-y-4 opacity-0"
				}`}
			>
				<nav
					className="flex flex-col gap-1 px-4 py-4 sm:px-6"
					aria-label="Mobile"
				>
					{NAV_LINKS.map((label, i) => (
						<a
							key={label}
							href="#feature"
							tabIndex={menuOpen ? 0 : -1}
							onClick={() => setMenuOpen(false)}
							className={`rounded-lg px-3 py-3 text-sm transition-all duration-500 ease-out hover:bg-gray-800/50 ${
								menuOpen
									? "translate-x-0 opacity-100"
									: "-translate-x-4 opacity-0"
							}`}
							style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
						>
							{label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-3 border-t border-gray-800 px-4 py-4 sm:hidden">
					<button
						type="button"
						onClick={() => {
							setSearchOpen(true);
							setMenuOpen(false);
						}}
						className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-sm"
					>
						<Search size={18} aria-hidden="true" />
						<span>Search</span>
					</button>
					<button
						type="button"
						onClick={() => setProfileOpen((open) => !open)}
						aria-pressed={profileOpen}
						className="liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
						aria-label="Your profile"
					>
						<User size={18} aria-hidden="true" />
					</button>
				</div>
			</div>

			{searchOpen && (
				<form
					onSubmit={(event) => event.preventDefault()}
					className="liquid-glass absolute top-20 right-4 left-4 z-50 flex items-center gap-3 rounded-full p-2 pl-5 sm:top-24 sm:right-6 sm:left-auto sm:w-96 md:right-12"
				>
					<Search size={18} aria-hidden="true" />
					<input
						autoFocus
						type="search"
						aria-label="Search movies"
						placeholder="Search movies and series"
						className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-400"
					/>
					<button
						type="button"
						onClick={() => setSearchOpen(false)}
						aria-label="Close search"
						className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
					>
						<X size={17} aria-hidden="true" />
					</button>
				</form>
			)}

			{profileOpen && (
				<div className="liquid-glass absolute top-20 right-4 z-50 rounded-2xl px-5 py-4 text-sm sm:top-24 sm:right-6 md:right-12">
					<p className="font-medium">Your watchlist is ready.</p>
					<p className="mt-1 text-gray-400">Sign in to keep your progress.</p>
				</div>
			)}

			<main
				id="feature"
				className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-8 sm:px-6 md:px-12 md:pb-16"
			>
				<div className="flex flex-col items-end gap-8 md:flex-row">
					<div className="w-full flex-1">
						<div
							className="animate-blur-fade-up mb-6 flex flex-wrap items-center gap-3 text-xs sm:gap-6 sm:text-sm md:mb-8"
							style={{ animationDelay: "300ms" }}
						>
							<span className="flex items-center gap-2 font-medium">
								<Star
									size={16}
									className="fill-white sm:h-5 sm:w-5"
									aria-hidden="true"
								/>
								{feature.rating}
							</span>
							<span className="flex items-center gap-2">
								<Clock size={16} aria-hidden="true" />
								{feature.duration}
							</span>
							<span className="flex items-center gap-2">
								<Calendar size={16} aria-hidden="true" />
								{feature.date}
							</span>
						</div>

						<h1
							className="animate-blur-fade-up mb-4 text-3xl font-normal tracking-[-0.04em] sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl"
							style={{ animationDelay: "400ms" }}
						>
							{feature.title}
						</h1>

						<p
							className="animate-blur-fade-up mb-6 max-w-2xl text-base text-gray-400 sm:text-lg md:mb-12 md:text-xl"
							style={{ animationDelay: "500ms" }}
						>
							{feature.description}
							{expanded &&
								" Explore cast notes, production details, and the complete story behind this feature."}
						</p>

						<div className="flex flex-wrap gap-3 sm:gap-4">
							<button
								type="button"
								onClick={togglePlayback}
								aria-pressed={!playing}
								className="animate-blur-fade-up flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-medium text-black transition-colors hover:bg-gray-200 sm:px-8 sm:py-3"
								style={{ animationDelay: "600ms" }}
							>
								{playing ? (
									<Pause size={18} className="fill-black" aria-hidden="true" />
								) : (
									<Play size={18} className="fill-black" aria-hidden="true" />
								)}
								{playing ? "Pause" : "Watch Now"}
							</button>
							<button
								type="button"
								onClick={() => setExpanded((open) => !open)}
								aria-expanded={expanded}
								className="liquid-glass animate-blur-fade-up rounded-full px-6 py-2.5 font-medium sm:px-8 sm:py-3"
								style={{ animationDelay: "700ms" }}
							>
								{expanded ? "Show Less" : "Learn More"}
							</button>
						</div>
					</div>

					<div className="flex w-full items-center gap-3 sm:gap-4 md:w-auto md:justify-end">
						<button
							type="button"
							onClick={() => moveFeature(-1)}
							className="liquid-glass animate-blur-fade-up flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm sm:px-6 sm:py-3"
							style={{ animationDelay: "800ms" }}
						>
							<ChevronLeft size={18} aria-hidden="true" />
							Previous
						</button>
						<button
							type="button"
							onClick={() => moveFeature(1)}
							className="liquid-glass animate-blur-fade-up flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm sm:px-6 sm:py-3"
							style={{ animationDelay: "900ms" }}
						>
							Next
							<ChevronRight size={18} aria-hidden="true" />
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
