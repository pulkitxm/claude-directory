import { AnimatePresence, motion } from "framer-motion";
import { Github, Moon, Shuffle, Sparkles, Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackgroundPaths } from "@/components/ui/background-paths";

/** Titles cycled by the preset switcher to replay the letter-stagger entrance. */
const PRESETS = [
	"Background Paths",
	"Ship With Motion",
	"shadcn Ready",
	"Built To Move",
];

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
	if (typeof window === "undefined") return "dark";
	const stored = window.localStorage.getItem("bg-paths-theme");
	if (stored === "light" || stored === "dark") return stored;
	// No stored preference -> default to dark, mirroring the pre-paint script in
	// index.html so React never disagrees with the class already on <html> (no
	// flash on first load). The hero is designed to shine in dark mode.
	return "dark";
}

function useTheme(): [Theme, () => void] {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);
	const crossfadeTimer = useRef<number | undefined>(undefined);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		window.localStorage.setItem("bg-paths-theme", theme);
	}, [theme]);

	const toggle = useCallback(() => {
		// Add a transient class so only intentional toggles animate the crossfade
		// (avoids a flash of transition on the very first paint).
		const root = document.documentElement;
		root.classList.add("theme-animate");
		window.clearTimeout(crossfadeTimer.current);
		crossfadeTimer.current = window.setTimeout(
			() => root.classList.remove("theme-animate"),
			500,
		);
		setTheme((t) => (t === "dark" ? "light" : "dark"));
	}, []);

	return [theme, toggle];
}

function PillButton({
	children,
	onClick,
	label,
}: {
	children: React.ReactNode;
	onClick: () => void;
	label: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={label}
			className="group inline-flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 text-sm font-medium text-neutral-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200 dark:hover:bg-white/10"
		>
			{children}
		</button>
	);
}

export default function App() {
	const [theme, toggleTheme] = useTheme();
	const [presetIndex, setPresetIndex] = useState(0);
	const title = PRESETS[presetIndex];

	const nextPreset = useCallback(
		() => setPresetIndex((i) => (i + 1) % PRESETS.length),
		[],
	);

	return (
		<main className="relative min-h-screen w-full bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
			{/* The integrated component — full-bleed animated hero. The `title` key
			    drives a fresh per-letter spring entrance whenever it changes, and the
			    CTA advances the preset to show that off. */}
			<BackgroundPaths
				title={title}
				ctaLabel="Discover Excellence"
				onCtaClick={nextPreset}
			/>

			{/* ---- Floating top bar ---- */}
			<motion.header
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
				className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8"
			>
				<div className="pointer-events-auto flex items-center gap-2.5">
					<span className="grid h-8 w-8 place-items-center rounded-lg bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-900">
						<Sparkles className="h-4 w-4" strokeWidth={2.4} />
					</span>
					<span className="text-[15px] font-semibold tracking-tight">
						Background&nbsp;Paths
					</span>
				</div>

				<a
					href="https://ui.shadcn.com"
					target="_blank"
					rel="noreferrer noopener"
					className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 font-mono text-xs text-neutral-600 backdrop-blur-md transition-colors hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-300 dark:hover:text-white"
				>
					<Github className="h-3.5 w-3.5" />
					shadcn/ui
				</a>
			</motion.header>

			{/* ---- Floating bottom dock: theme toggle + preset switcher ---- */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
				className="fixed inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 px-5 pb-6 sm:pb-8"
			>
				<div className="flex items-center gap-2.5">
					<PillButton
						onClick={nextPreset}
						label="Replay with the next headline"
					>
						<Shuffle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
						<span className="hidden sm:inline">Next headline</span>
						<span className="sm:hidden">Next</span>
					</PillButton>

					<PillButton
						onClick={toggleTheme}
						label={
							theme === "dark"
								? "Switch to light theme"
								: "Switch to dark theme"
						}
					>
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={theme}
								initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
								animate={{ rotate: 0, opacity: 1, scale: 1 }}
								exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
								transition={{ duration: 0.25 }}
								className="grid place-items-center"
							>
								{theme === "dark" ? (
									<Sun className="h-4 w-4" />
								) : (
									<Moon className="h-4 w-4" />
								)}
							</motion.span>
						</AnimatePresence>
						<span className="hidden sm:inline">
							{theme === "dark" ? "Light" : "Dark"}
						</span>
					</PillButton>
				</div>

				{/* Tiny dotted progress for the preset carousel. */}
				<div className="flex items-center gap-1.5">
					{PRESETS.map((preset, i) => (
						<button
							key={preset}
							type="button"
							aria-label={`Show headline: ${preset}`}
							onClick={() => setPresetIndex(i)}
							className={`h-1.5 rounded-full transition-all duration-300 ${
								i === presetIndex
									? "w-6 bg-neutral-900 dark:bg-white"
									: "w-1.5 bg-neutral-900/25 hover:bg-neutral-900/50 dark:bg-white/25 dark:hover:bg-white/50"
							}`}
						/>
					))}
				</div>
			</motion.div>
		</main>
	);
}
