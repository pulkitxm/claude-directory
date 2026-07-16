import { LogIn, Menu, Play, Sparkles, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import BoomerangVideoBg from "./BoomerangVideoBg";

const BG_VIDEO =
	"./assets/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4";

function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	const navLinks = [
		{ href: "#mission", label: "Purpose" },
		{ href: "#how", label: "The Process" },
		{ href: "#pricing", label: "Tariffs" },
	];

	return (
		<section className="relative w-full min-h-screen sm:h-screen overflow-hidden">
			<BoomerangVideoBg
				src={BG_VIDEO}
				className="absolute inset-0 w-full h-full"
			/>
			<nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6">
				<div className="flex items-center gap-2 text-[#2d3a2a]">
					<span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
						LinkFlow<sup className="text-[10px] sm:text-xs font-medium">TM</sup>
					</span>
				</div>

				<div className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60">
					{navLinks.map((link, i) => (
						<a
							key={link.href}
							href={link.href}
							className={`text-sm px-3 py-2 transition-colors ${
								i === 0
									? "font-semibold text-[#1f2a1d]"
									: "font-medium text-[#4b5b47] hover:text-[#1f2a1d]"
							}`}
						>
							{link.label}
						</a>
					))}
					<button className="ml-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">
						Try it Live
					</button>
				</div>

				<div className="flex items-center gap-3 sm:gap-6 text-[#2d3a2a]">
					<a
						href="#signup"
						className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
					>
						<UserPlus className="w-4 h-4" />
						Sign Me Up!
					</a>
					<a
						href="#login"
						className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
					>
						<LogIn className="w-4 h-4" />
						Enter
					</a>
					<button
						onClick={() => setMenuOpen((v) => !v)}
						className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[#1f2a1d] transition-all duration-300 hover:bg-white/90"
						aria-label={menuOpen ? "Close menu" : "Open menu"}
						aria-expanded={menuOpen}
					>
						<Menu
							className={`w-5 h-5 absolute transition-all duration-300 ${
								menuOpen
									? "opacity-0 rotate-90 scale-50"
									: "opacity-100 rotate-0 scale-100"
							}`}
						/>
						<X
							className={`w-5 h-5 absolute transition-all duration-300 ${
								menuOpen
									? "opacity-100 rotate-0 scale-100"
									: "opacity-0 -rotate-90 scale-50"
							}`}
						/>
					</button>
				</div>
			</nav>

			<div
				className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
					menuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
				onClick={() => setMenuOpen(false)}
			>
				<div className="absolute inset-0 bg-[#1f2a1d]/40 backdrop-blur-sm" />
			</div>

			<div
				className={`lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
					menuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full pt-24 px-8 pb-8">
					<div className="flex flex-col gap-1">
						{navLinks.map((link, i) => (
							<a
								key={link.href}
								href={link.href}
								onClick={() => setMenuOpen(false)}
								className={`text-2xl font-semibold text-[#1f2a1d] py-4 border-b border-[#1f2a1d]/10 transition-all duration-500 ${
									menuOpen
										? "translate-x-0 opacity-100"
										: "translate-x-8 opacity-0"
								}`}
								style={{
									transitionDelay: menuOpen ? `${150 + i * 70}ms` : "0ms",
								}}
							>
								{link.label}
							</a>
						))}
					</div>

					<div
						className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
							menuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
						}`}
						style={{ transitionDelay: menuOpen ? "400ms" : "0ms" }}
					>
						<a
							href="#signup"
							className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden"
						>
							<UserPlus className="w-4 h-4" />
							Sign Me Up!
						</a>
						<a
							href="#login"
							className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden"
						>
							<LogIn className="w-4 h-4" />
							Enter
						</a>
						<button className="mt-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors">
							Try it Live
						</button>
					</div>
				</div>
			</div>

			<div className="relative z-10 flex flex-col items-center text-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6">
				<h1
					className="font-normal leading-[0.95] text-[#336443] text-[2rem] sm:text-4xl md:text-5xl lg:text-[4.75rem] xl:text-[5.25rem] max-w-5xl"
					style={{
						fontFamily:
							'"Neue Haas Grotesk Display Pro 55 Roman", "Neue Haas Grotesk Text Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
						letterSpacing: "-0.035em",
					}}
				>
					Close the rift{" "}
					<span className="text-[#85AB8B]">
						linking
						<br className="hidden sm:block" /> signals and action
					</span>
				</h1>
				<p className="mt-6 sm:mt-8 text-[#4b5b47] text-sm sm:text-base md:text-lg leading-relaxed max-w-md px-2">
					Shape scattered signals into meaningful outcomes via AI-driven
					workflows.
				</p>
			</div>

			<div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
				<div className="flex items-center gap-2 text-white/95 mb-3">
					<Sparkles className="w-4 h-4" />
					<span className="text-sm font-medium">
						FluxEngine<sup className="text-[10px]">TM</sup>
					</span>
				</div>
				<p className="text-white/85 text-xs leading-relaxed mb-6 max-w-xs font-normal">
					LinkFlow smoothly unites your company systems, streamlining data paths
					between services without having to write custom scripts.
				</p>
				<div className="flex items-center gap-4 flex-wrap">
					<button className="bg-white hover:bg-white/90 text-[#1f2a1d] text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors shadow-sm">
						Try it Live
					</button>
					<button className="text-white text-sm font-medium hover:opacity-80 transition-opacity">
						Know More.
					</button>
				</div>
			</div>

			<div className="hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 z-10 items-center gap-2 text-white/90 text-sm">
				<button className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
					<Play className="w-3 h-3 fill-white text-white ml-0.5" />
				</button>
				<span className="font-medium">How we build?</span>
				<span className="text-white/60">1:35</span>
			</div>
		</section>
	);
}

export default App;
