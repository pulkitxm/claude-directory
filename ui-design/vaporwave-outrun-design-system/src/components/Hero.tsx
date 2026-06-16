import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Zap, ArrowRight } from "lucide-react";
import { ButtonLink, Eyebrow, Shell } from "./primitives";
import { fadeUp } from "../lib/motion";

/* A self-typing terminal line for the hero's window mockup. */
const BOOT_LINES = [
	"> initializing neonwave kernel...",
	"> mounting /dev/grid ............ OK",
	"> loading synthwave drivers ..... OK",
	"> calibrating sunset gradient ... OK",
	"> welcome to the year 2088_",
];

function BootLog() {
	const [shown, setShown] = useState<string[]>([]);
	const [typed, setTyped] = useState("");

	useEffect(() => {
		let line = 0;
		let char = 0;
		let cancelled = false;
		const tick = () => {
			if (cancelled || line >= BOOT_LINES.length) return;
			const current = BOOT_LINES[line];
			char += 1;
			setTyped(current.slice(0, char));
			if (char >= current.length) {
				setShown((s) => [...s, current]);
				setTyped("");
				line += 1;
				char = 0;
				setTimeout(tick, 420);
			} else {
				setTimeout(tick, 26);
			}
		};
		const start = setTimeout(tick, 700);
		return () => {
			cancelled = true;
			clearTimeout(start);
		};
	}, []);

	return (
		<pre className="m-0 overflow-hidden whitespace-pre-wrap break-words p-5 font-mono text-xs leading-relaxed text-[var(--color-cyan)] sm:text-sm">
			{shown.map((l, i) => (
				<div key={i} className="text-[var(--color-cyan)]/70">
					{l}
				</div>
			))}
			{typed && (
				<div>
					<span className="text-[var(--color-magenta)]">{typed}</span>
					<span className="cursor" />
				</div>
			)}
		</pre>
	);
}

export function Hero() {
	return (
		<section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
			<Shell className="relative z-10">
				<div className="mx-auto grid max-w-5xl items-center gap-12 lg:max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
					{/* Left: copy */}
					<div>
						<motion.div
							initial="hidden"
							animate="show"
							variants={fadeUp}
							transition={{ duration: 0.4, ease: "linear" }}
						>
							<Eyebrow>v2.088 // synthetic reality engine</Eyebrow>
						</motion.div>

						<motion.h1
							initial="hidden"
							animate="show"
							variants={fadeUp}
							transition={{ duration: 0.45, ease: "linear", delay: 0.08 }}
							className="mt-6 font-heading text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl xl:text-8xl"
						>
							<span className="block text-glow-white">Design from</span>
							<span className="block text-sunset">the year</span>
							<span className="block text-glow-white">2088.</span>
						</motion.h1>

						<motion.p
							initial="hidden"
							animate="show"
							variants={fadeUp}
							transition={{ duration: 0.45, ease: "linear", delay: 0.16 }}
							className="mt-7 max-w-xl font-mono text-lg leading-relaxed text-[var(--color-chrome)]/80 sm:text-xl"
						>
							NEONWAVE OS is a retro-futuristic interface kit drenched in neon. Hot
							magenta, electric cyan, and a sunset gradient pierce an infinite grid
							under CRT scanlines. Boot it up and command reality like a vintage
							terminal.
						</motion.p>

						<motion.div
							initial="hidden"
							animate="show"
							variants={fadeUp}
							transition={{ duration: 0.45, ease: "linear", delay: 0.24 }}
							className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
						>
							<ButtonLink href="#cta" variant="secondary" size="lg" className="w-full sm:w-auto">
								<Zap size={18} /> Boot the OS
							</ButtonLink>
							<ButtonLink href="#features" variant="primary" size="lg" className="w-full sm:w-auto">
								Explore modules <ArrowRight size={18} />
							</ButtonLink>
						</motion.div>

						<motion.div
							initial="hidden"
							animate="show"
							variants={fadeUp}
							transition={{ duration: 0.45, ease: "linear", delay: 0.32 }}
							className="mt-9 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--color-chrome)]/60"
						>
							<span className="pulse-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-cyan)] text-[var(--color-cyan)]" />
							12,088 operators online · synthwave servers nominal
						</motion.div>
					</div>

					{/* Right: terminal window mockup */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: "linear", delay: 0.3 }}
						className="window relative"
					>
						<div className="window-bar">
							<div className="window-dots" aria-hidden>
								<i className="bg-[var(--color-magenta)]" />
								<i className="bg-[var(--color-cyan)]" />
								<i className="bg-[var(--color-orange)]" />
							</div>
							<span className="font-mono text-xs uppercase tracking-widest text-[var(--color-cyan)]">
								neonwave://boot
							</span>
						</div>
						<BootLog />
						{/* mini perspective grid inside the window for depth */}
						<div className="dots border-t border-[var(--color-cyan)]/30 px-5 py-4">
							<div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-widest text-[var(--color-chrome)]/50">
								<span>cpu: synth-z80 @ 88mhz</span>
								<span className="text-[var(--color-orange)]">mem: 640k OK</span>
							</div>
						</div>
					</motion.div>
				</div>
			</Shell>
		</section>
	);
}
