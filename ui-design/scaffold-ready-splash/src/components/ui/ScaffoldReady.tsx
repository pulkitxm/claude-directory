"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
	Check,
	FileCode2,
	FolderTree,
	Layers,
	Sparkles,
	Terminal,
	Wand2,
	Boxes,
	PanelsTopLeft,
	ArrowDownToLine,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Static data — the project's own DNA, surfaced as the scaffold splash.      */
/* -------------------------------------------------------------------------- */

const STACK = [
	{ label: "Vite + React", note: "dev server & build", icon: PanelsTopLeft },
	{ label: "TypeScript", note: "strict mode", icon: FileCode2 },
	{ label: "Tailwind CSS", note: "+ tailwind-merge · clsx", icon: Layers },
	{ label: "Framer Motion", note: "animations", icon: Wand2 },
	{ label: "Lucide React", note: "icons", icon: Boxes },
] as const;

const STEPS = [
	{
		id: "01",
		label: "Dependencies installed",
		detail: "framer-motion · lucide-react · clsx · tailwind-merge",
	},
	{
		id: "02",
		label: "Path alias wired",
		detail: "@/ → /src/  (vite.config.ts + tsconfig.json)",
	},
	{ id: "03", label: "cn() utility ready", detail: "/src/lib/utils.ts" },
	{ id: "04", label: "Tailwind base styles", detail: "/src/index.css" },
	{ id: "05", label: "Entry point mounted", detail: "/src/main.tsx" },
	{
		id: "06",
		label: "App shell created",
		detail: "/src/App.tsx · components stack here",
	},
] as const;

type TreeNode = {
	depth: number;
	name: string;
	kind: "dir" | "file";
	hint?: string;
};

const TREE: TreeNode[] = [
	{ depth: 0, name: "src", kind: "dir" },
	{ depth: 1, name: "components", kind: "dir" },
	{ depth: 2, name: "ui", kind: "dir", hint: "← components go here" },
	{ depth: 1, name: "lib", kind: "dir" },
	{ depth: 2, name: "utils.ts", kind: "file", hint: "cn()" },
	{ depth: 1, name: "App.tsx", kind: "file", hint: "stack" },
	{ depth: 1, name: "main.tsx", kind: "file" },
	{ depth: 1, name: "index.css", kind: "file" },
];

/* -------------------------------------------------------------------------- */
/*  Typewriter — types out the "ready" command line once on mount.             */
/* -------------------------------------------------------------------------- */

const COMMAND = "npm run dev  ›  ready — waiting for first component";

/** Honors the user's prefers-reduced-motion setting (SSR-safe, live-updating). */
function useReducedMotion() {
	const [reduced, setReduced] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const onChange = () => setReduced(mq.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);
	return reduced;
}

/** Types `text` out once on mount; with reduced motion it appears instantly. */
function useTypewriter(
	text: string,
	reduced: boolean,
	speed = 34,
	startDelay = 650,
) {
	const [out, setOut] = useState("");
	const [done, setDone] = useState(false);

	useEffect(() => {
		if (reduced) {
			setOut(text);
			setDone(true);
			return;
		}

		setOut("");
		setDone(false);
		let i = 0;
		let timer: ReturnType<typeof setTimeout>;

		const tick = () => {
			i += 1;
			setOut(text.slice(0, i));
			if (i >= text.length) {
				setDone(true);
				return;
			}
			timer = setTimeout(tick, speed);
		};

		const start = setTimeout(tick, startDelay);

		return () => {
			clearTimeout(start);
			clearTimeout(timer);
		};
	}, [text, reduced, speed, startDelay]);

	return { out, done };
}

/* -------------------------------------------------------------------------- */
/*  Ambient background — drifting orbs + a slow panning grid + grain.          */
/* -------------------------------------------------------------------------- */

function Ambience({ reduced }: { reduced: boolean }) {
	return (
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 overflow-hidden"
		>
			{/* Base wash */}
			<div className="absolute inset-0 bg-ink-950" />
			<div
				className="absolute inset-0 opacity-80"
				style={{
					background:
						"radial-gradient(120% 90% at 50% -10%, rgba(125,78,255,0.18), transparent 55%), radial-gradient(90% 70% at 85% 110%, rgba(56,189,248,0.10), transparent 60%)",
				}}
			/>

			{/* Panning grid */}
			<div
				className={cn(
					"absolute inset-0 opacity-[0.18]",
					!reduced && "animate-grid-pan",
				)}
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
					backgroundSize: "64px 64px",
					maskImage:
						"radial-gradient(110% 90% at 50% 30%, black 30%, transparent 78%)",
					WebkitMaskImage:
						"radial-gradient(110% 90% at 50% 30%, black 30%, transparent 78%)",
				}}
			/>

			{/* Drifting orbs */}
			<div
				className={cn(
					"absolute left-[10%] top-[18%] h-[26rem] w-[26rem] rounded-full bg-accent/25 blur-[120px]",
					!reduced && "animate-orb-a",
				)}
			/>
			<div
				className={cn(
					"absolute right-[8%] bottom-[8%] h-[24rem] w-[24rem] rounded-full bg-sky-500/15 blur-[130px]",
					!reduced && "animate-orb-b",
				)}
			/>

			{/* Film grain */}
			<div
				className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
				}}
			/>

			{/* Vignette */}
			<div className="absolute inset-0 shadow-[inset_0_0_220px_60px_rgba(0,0,0,0.7)]" />
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  Animation presets                                                          */
/* -------------------------------------------------------------------------- */

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
	hidden: { opacity: 0, y: 18 },
	show: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease, delay: 0.15 + i * 0.07 },
	}),
};

/* -------------------------------------------------------------------------- */

export default function ScaffoldReady() {
	const reduced = useReducedMotion();
	const { out, done } = useTypewriter(COMMAND, reduced);
	const stepsRef = useRef<HTMLOListElement>(null);
	const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });

	return (
		<section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink-950 px-5 py-20 font-sans text-white sm:px-8">
			<Ambience reduced={reduced} />

			<div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
				{/* Status pill */}
				<motion.div
					variants={fadeUp}
					initial="hidden"
					animate="show"
					custom={0}
					className="group relative inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[12.5px] font-medium tracking-tight text-white/70 backdrop-blur-md"
				>
					<span className="relative flex h-2 w-2 items-center justify-center">
						{!reduced && (
							<span className="absolute inline-flex h-2 w-2 animate-pulse-ring rounded-full bg-emerald-400" />
						)}
						<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)]" />
					</span>
					Scaffold online
					<span className="text-white/25">·</span>
					<span className="font-mono text-[11.5px] text-white/45">v1.0.0</span>
				</motion.div>

				{/* Headline */}
				<motion.h1
					variants={fadeUp}
					initial="hidden"
					animate="show"
					custom={1}
					className="mt-7 text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl"
				>
					Project setup
					<span className="relative ml-3 inline-block bg-gradient-to-br from-accent-soft via-accent to-sky-400 bg-clip-text text-transparent">
						complete
						<Sparkles className="absolute -right-7 -top-3 h-5 w-5 text-accent-soft/80" />
					</span>
					.
				</motion.h1>

				<motion.p
					variants={fadeUp}
					initial="hidden"
					animate="show"
					custom={2}
					className="mt-5 max-w-xl text-balance text-center text-[15px] leading-relaxed text-white/55 sm:text-base"
				>
					A single-page landing scaffold — Vite, React, TypeScript, Tailwind,
					Framer Motion &amp; Lucide, with the{" "}
					<code className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[13px] text-accent-soft">
						@/
					</code>{" "}
					alias and{" "}
					<code className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[13px] text-accent-soft">
						cn()
					</code>{" "}
					wired. Components stack into{" "}
					<code className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[13px] text-white/70">
						App.tsx
					</code>
					.
				</motion.p>

				{/* Terminal */}
				<motion.div
					variants={fadeUp}
					initial="hidden"
					animate="show"
					custom={3}
					className="relative mt-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
				>
					{/* sheen */}
					{!reduced && (
						<div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
							<div className="absolute -inset-y-10 left-0 w-1/3 -skew-x-12 animate-sheen bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
						</div>
					)}
					<div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
						<span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
						<span className="h-3 w-3 rounded-full bg-[#febc2e]" />
						<span className="h-3 w-3 rounded-full bg-[#28c840]" />
						<div className="ml-3 flex items-center gap-1.5 text-[12px] text-white/40">
							<Terminal className="h-3.5 w-3.5" />
							<span className="font-mono">landing-page-scaffold — zsh</span>
						</div>
					</div>
					<div className="px-5 py-5 font-mono text-[13px] leading-relaxed sm:text-sm">
						<p className="text-white/40">
							<span className="text-emerald-400">➜</span>{" "}
							<span className="text-sky-400">~/landing-page-scaffold</span>
						</p>
						<p className="mt-1 text-white/80">
							<span className="text-accent-soft">$</span> {out}
							<span
								className={cn(
									"ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-accent-soft",
									done ? "animate-caret-blink" : "opacity-100",
								)}
							/>
						</p>
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: done ? 1 : 0 }}
							transition={{ duration: 0.4 }}
							className="mt-2 text-emerald-400/90"
						>
							✓ VITE ready — Local: http://localhost:5173/
						</motion.p>
					</div>
				</motion.div>

				{/* Stack chips */}
				<motion.ul
					variants={fadeUp}
					initial="hidden"
					animate="show"
					custom={4}
					className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
				>
					{STACK.map(({ label, note, icon: Icon }) => (
						<li
							key={label}
							className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[13px] backdrop-blur-md transition-colors duration-300 hover:border-accent/40 hover:bg-accent/[0.07]"
						>
							<Icon className="h-4 w-4 text-accent-soft transition-transform duration-300 group-hover:scale-110" />
							<span className="font-medium text-white/85">{label}</span>
							<span className="hidden text-white/35 sm:inline">· {note}</span>
						</li>
					))}
				</motion.ul>

				{/* Two-column: checklist + file tree */}
				<div className="mt-12 grid w-full gap-5 lg:grid-cols-[1.35fr_1fr]">
					{/* Checklist */}
					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="show"
						custom={5}
						className="rounded-2xl border border-white/10 bg-ink-900/60 p-6 backdrop-blur-xl"
					>
						<div className="mb-4 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white/40">
							<Check className="h-4 w-4 text-emerald-400" />
							Setup checklist
						</div>
						<ol ref={stepsRef} className="space-y-3.5">
							{STEPS.map((step, i) => (
								<motion.li
									key={step.id}
									initial={{ opacity: 0, x: -10 }}
									animate={stepsInView ? { opacity: 1, x: 0 } : {}}
									transition={{ duration: 0.5, ease, delay: i * 0.09 }}
									className="flex items-start gap-3.5"
								>
									<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
										<Check className="h-3.5 w-3.5" strokeWidth={3} />
									</span>
									<div className="min-w-0">
										<p className="text-[14px] font-medium text-white/90">
											<span className="mr-2 font-mono text-[12px] text-white/30">
												{step.id}
											</span>
											{step.label}
										</p>
										<p className="mt-0.5 truncate font-mono text-[12px] text-white/40">
											{step.detail}
										</p>
									</div>
								</motion.li>
							))}
						</ol>
					</motion.div>

					{/* File tree */}
					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="show"
						custom={6}
						className="rounded-2xl border border-white/10 bg-ink-900/60 p-6 backdrop-blur-xl"
					>
						<div className="mb-4 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white/40">
							<FolderTree className="h-4 w-4 text-accent-soft" />
							Structure
						</div>
						<ul className="space-y-1.5 font-mono text-[13px]">
							{TREE.map((node, i) => (
								<li
									key={i}
									className="flex items-center gap-2 text-white/60"
									style={{ paddingLeft: `${node.depth * 16}px` }}
								>
									{node.kind === "dir" ? (
										<FolderTree className="h-3.5 w-3.5 shrink-0 text-accent-soft/70" />
									) : (
										<FileCode2 className="h-3.5 w-3.5 shrink-0 text-white/40" />
									)}
									<span
										className={cn(
											node.kind === "dir" ? "text-white/80" : "text-white/60",
										)}
									>
										{node.name}
										{node.kind === "dir" ? "/" : ""}
									</span>
									{node.hint && (
										<span className="text-[11px] text-accent-soft/60">
											{node.hint}
										</span>
									)}
								</li>
							))}
						</ul>
					</motion.div>
				</div>

				{/* Drop target */}
				<motion.div
					variants={fadeUp}
					initial="hidden"
					animate="show"
					custom={7}
					className="group relative mt-12 w-full max-w-2xl"
				>
					<div className="relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.015] px-6 py-9 text-center transition-colors duration-300 hover:border-accent/45 hover:bg-accent/[0.04]">
						<span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-ink-850 text-accent-soft">
							<span
								className={cn(
									"absolute inset-0 rounded-full border border-dashed border-accent/40",
									!reduced && "animate-spin-slow",
								)}
							/>
							<ArrowDownToLine className="h-5 w-5" />
						</span>
						<p className="text-[15px] font-medium text-white/85">
							Drop your first component here
						</p>
						<p className="max-w-md font-mono text-[12px] leading-relaxed text-white/40">
							add it to{" "}
							<span className="text-white/70">src/components/ui/</span>, then
							import &amp; stack it inside{" "}
							<span className="text-white/70">App.tsx</span>
						</p>
					</div>
				</motion.div>

				{/* Footer note */}
				<motion.p
					variants={fadeUp}
					initial="hidden"
					animate="show"
					custom={8}
					className="mt-10 flex items-center gap-2 font-mono text-[11.5px] text-white/30"
				>
					<Layers className="h-3.5 w-3.5" />
					components render with their own colors, layout &amp; values — the
					scaffold stays out of the way
				</motion.p>
			</div>
		</section>
	);
}
