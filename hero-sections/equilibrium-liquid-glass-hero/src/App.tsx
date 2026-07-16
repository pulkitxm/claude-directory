import { ChevronDown, Infinity, Menu, X } from "lucide-react";
import { useState } from "react";

const BG_VIDEO = `${import.meta.env.BASE_URL}assets/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4`;

interface NavLink {
	label: string;
	dropdown?: boolean;
}

const navLinks: NavLink[] = [
	{ label: "Home" },
	{ label: "Wellness", dropdown: true },
	{ label: "Routine" },
	{ label: "Our Team" },
];

export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeNav, setActiveNav] = useState("Home");
	const [dialog, setDialog] = useState<"login" | "begin" | null>(null);
	const [submitted, setSubmitted] = useState(false);
	const [discoverOpen, setDiscoverOpen] = useState(false);

	function selectNav(label: string) {
		setActiveNav(label);
		setMenuOpen(false);
	}

	function openDialog(next: "login" | "begin") {
		setDialog(next);
		setSubmitted(false);
		setMenuOpen(false);
	}

	return (
		<div className="relative w-full h-screen overflow-hidden">
			<video
				className="absolute inset-0 w-full h-full object-cover"
				src={BG_VIDEO}
				autoPlay
				muted
				loop
				playsInline
			/>

			<nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-8 py-5">
				<div className="flex items-center gap-2 text-white font-medium text-base">
					<Infinity size={22} strokeWidth={1.5} />
					<span>Equilibrium</span>
				</div>

				<div className="liquid-glass hidden md:flex items-center gap-1 rounded-xl px-2 py-2">
					{navLinks.map((link) => (
						<button
							type="button"
							key={link.label}
							onClick={() => selectNav(link.label)}
							aria-pressed={activeNav === link.label}
							className={`flex items-center gap-0.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
								activeNav === link.label
									? "bg-white/15 text-white"
									: "text-white/70 hover:text-white"
							}`}
						>
							{link.label}
							{link.dropdown && <ChevronDown size={13} className="mt-px" />}
						</button>
					))}
				</div>

				<div className="hidden md:flex items-center gap-3">
					<button
						type="button"
						onClick={() => openDialog("login")}
						className="liquid-glass text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/5 transition-colors"
					>
						Log in
					</button>
					<button
						type="button"
						onClick={() => openDialog("begin")}
						className="bg-white text-black text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors"
					>
						Begin Now
					</button>
				</div>

				<button
					type="button"
					className="md:hidden liquid-glass text-white p-2 rounded-lg"
					onClick={() => setMenuOpen((open) => !open)}
					aria-label={menuOpen ? "Close menu" : "Open menu"}
				>
					{menuOpen ? <X size={18} /> : <Menu size={18} />}
				</button>
			</nav>

			{menuOpen && (
				<div className="absolute top-[72px] left-4 right-4 z-30 md:hidden liquid-glass rounded-2xl p-4 flex flex-col gap-1">
					{navLinks.map((link) => (
						<button
							type="button"
							key={link.label}
							onClick={() => selectNav(link.label)}
							aria-pressed={activeNav === link.label}
							className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm transition-colors ${
								activeNav === link.label
									? "bg-white/15 text-white"
									: "text-white/70 hover:text-white"
							}`}
						>
							{link.label}
							{link.dropdown && <ChevronDown size={13} className="mt-px" />}
						</button>
					))}
					<div className="flex gap-2 mt-2 pt-3 border-t border-white/10">
						<button
							type="button"
							onClick={() => openDialog("login")}
							className="flex-1 liquid-glass text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/5 transition-colors"
						>
							Log in
						</button>
						<button
							type="button"
							onClick={() => openDialog("begin")}
							className="flex-1 bg-white text-black text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors"
						>
							Begin Now
						</button>
					</div>
				</div>
			)}

			<div className="absolute bottom-0 left-0 z-20 px-6 sm:px-12 pb-10 sm:pb-16 max-w-2xl">
				<h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-4">
					Live Better, Feel Whole Every Day
				</h1>
				<p className="text-white/60 text-sm leading-relaxed mb-7 max-w-md">
					Take charge of how you feel with a companion built for your journey,
					build routines, follow your growth, and unlock tailored insights for a
					steadier, more vibrant life each day.
					{discoverOpen &&
						" Set gentle goals, track the patterns that matter, and adjust your plan as your needs change."}
				</p>
				<div className="flex flex-wrap items-center gap-3">
					<button
						type="button"
						onClick={() => openDialog("begin")}
						className="bg-white text-black text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/90 transition-colors"
					>
						Start Today
					</button>
					<button
						type="button"
						onClick={() => setDiscoverOpen((open) => !open)}
						aria-expanded={discoverOpen}
						className="liquid-glass text-white text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/5 transition-colors"
					>
						{discoverOpen ? "Show Less" : "Discover How"}
					</button>
				</div>
			</div>

			{dialog && (
				<div className="absolute inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-md">
					<div className="liquid-glass w-full max-w-sm rounded-3xl p-6 text-white">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-xs uppercase tracking-[0.18em] text-white/55">
									Equilibrium
								</p>
								<h2 className="mt-2 text-2xl font-medium">
									{dialog === "login"
										? "Welcome back"
										: "Begin your wellness plan"}
								</h2>
							</div>
							<button
								type="button"
								onClick={() => setDialog(null)}
								aria-label="Close dialog"
								className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/75"
							>
								Close
							</button>
						</div>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								setSubmitted(true);
							}}
							className="mt-6 space-y-4"
						>
							<label className="block text-sm text-white/70">
								Email
								<input
									required
									type="email"
									name="email"
									className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none focus:border-white/50"
								/>
							</label>
							<button
								type="submit"
								className="w-full rounded-full bg-white px-5 py-3 font-medium text-black"
							>
								{dialog === "login" ? "Continue" : "Create my plan"}
							</button>
							<p aria-live="polite" className="min-h-5 text-sm text-white/70">
								{submitted ? "Your request is ready." : ""}
							</p>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
