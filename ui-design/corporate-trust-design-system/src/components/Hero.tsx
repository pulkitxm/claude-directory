import { motion } from "motion/react";
import {
	ArrowRight,
	PlayCircle,
	Check,
	TrendingUp,
	ShieldCheck,
	Workflow,
	Activity,
} from "lucide-react";
import { Shell, Blob, Pill, cx } from "./primitives";
import { fadeUp, stagger, popIn, EASE_REFINED } from "../lib/motion";
import { HERO_HIGHLIGHT_ICON as Sparkles } from "../lib/content";

/* A tiny inline sparkline for the dashboard mock. */
function Sparkline({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 220 64"
			fill="none"
			className={className}
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="64">
					<stop stopColor="#4F46E5" stopOpacity="0.28" />
					<stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
				</linearGradient>
				<linearGradient id="spark-line" x1="0" y1="0" x2="220" y2="0">
					<stop stopColor="#4F46E5" />
					<stop offset="1" stopColor="#7C3AED" />
				</linearGradient>
			</defs>
			<path
				d="M0 50 L26 44 L52 47 L78 33 L104 38 L130 22 L156 27 L182 12 L208 16 L220 8"
				stroke="url(#spark-line)"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M0 50 L26 44 L52 47 L78 33 L104 38 L130 22 L156 27 L182 12 L208 16 L220 8 L220 64 L0 64 Z"
				fill="url(#spark-fill)"
			/>
		</svg>
	);
}

export function Hero() {
	return (
		<section id="top" className="relative overflow-hidden pt-28 lg:pt-36">
			{/* Atmospheric blob field */}
			<Blob
				tone="indigo"
				className="-left-32 -top-24 h-[34rem] w-[34rem] opacity-70"
			/>
			<Blob
				tone="violet"
				slow
				className="-right-28 top-10 h-[30rem] w-[30rem] opacity-60"
			/>
			<div
				aria-hidden="true"
				className="dot-grid absolute inset-x-0 top-0 -z-10 h-[60vh] opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
			/>

			<Shell>
				<div className="grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24">
					{/* ---- Left: copy ---- */}
					<motion.div
						variants={stagger(0.1)}
						initial="hidden"
						animate="show"
						className="relative z-10 text-center lg:text-left"
					>
						<motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
							<Pill>
								<span className="inline-flex items-center gap-1.5">
									<span className="inline-flex h-5 items-center rounded-full bg-indigo-600 px-2 text-[0.6875rem] font-bold uppercase tracking-wide text-white">
										New
									</span>
									<Sparkles className="h-4 w-4 text-violet-600" aria-hidden="true" />
									Northwind AI now writes your workflows
								</span>
							</Pill>
						</motion.div>

						<motion.h1
							variants={fadeUp}
							className="mt-6 text-4xl sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]"
						>
							The operations platform{" "}
							<span className="text-gradient">teams actually trust</span>
						</motion.h1>

						<motion.p
							variants={fadeUp}
							className="mx-auto mt-6 max-w-xl text-lg text-slate-500 lg:mx-0"
						>
							Northwind unifies your tools, automates the busywork, and turns
							operational data into decisions — with the security and polish your
							enterprise expects.
						</motion.p>

						<motion.div
							variants={fadeUp}
							className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
						>
							<a href="#cta" className="btn btn-primary btn-lg group w-full sm:w-auto">
								Start building free
								<ArrowRight
									className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
									aria-hidden="true"
								/>
							</a>
							<a
								href="#platform"
								className="btn btn-secondary btn-lg group w-full sm:w-auto"
							>
								<PlayCircle
									className="h-5 w-5 text-indigo-600 transition-transform duration-200 group-hover:scale-110"
									aria-hidden="true"
								/>
								Watch the tour
							</a>
						</motion.div>

						<motion.ul
							variants={fadeUp}
							className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 lg:justify-start"
						>
							{["Free forever plan", "No credit card", "SOC 2 Type II"].map((t) => (
								<li key={t} className="inline-flex items-center gap-2">
									<Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
									{t}
								</li>
							))}
						</motion.ul>
					</motion.div>

					{/* ---- Right: isometric dashboard card ---- */}
					<motion.div
						variants={popIn}
						initial="hidden"
						animate="show"
						className="relative z-10 mx-auto w-full max-w-xl lg:max-w-none"
					>
						<div className="scene">
							{/* The card tilts into an isometric pose at rest and eases toward
							    the viewer on hover. */}
							<div className="group preserve-3d iso-tilt hover:[transform:rotateX(2deg)_rotateY(-8deg)]">
								{/* Glow puddle beneath the card */}
								<div
									aria-hidden="true"
									className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo-500/30 to-violet-500/30 blur-2xl"
								/>

								<div className="card !rounded-2xl overflow-hidden !shadow-lift">
									{/* Window chrome */}
									<div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
										<span className="h-3 w-3 rounded-full bg-rose-500/80" />
										<span className="h-3 w-3 rounded-full bg-amber-400/90" />
										<span className="h-3 w-3 rounded-full bg-emerald-500/80" />
										<span className="ml-3 inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs font-medium text-slate-400 ring-1 ring-slate-200">
											<span className="relative flex h-2 w-2">
												<span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping-soft" />
												<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
											</span>
											app.northwind.io/flows
										</span>
									</div>

									{/* Body */}
									<div className="space-y-5 p-5 sm:p-6">
										{/* KPI row */}
										<div className="grid grid-cols-3 gap-3">
											{[
												{ label: "Active flows", value: "248", delta: "+12%" },
												{ label: "Runs / hr", value: "9.4k", delta: "+31%" },
												{ label: "Saved / wk", value: "1,920h", delta: "+8%" },
											].map((kpi) => (
												<div
													key={kpi.label}
													className="rounded-xl border border-slate-100 bg-white p-3"
												>
													<p className="text-[0.6875rem] font-medium uppercase tracking-wide text-slate-400">
														{kpi.label}
													</p>
													<p className="mt-1 text-lg font-extrabold text-slate-900">
														{kpi.value}
													</p>
													<p className="mt-0.5 inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-emerald-600">
														<TrendingUp className="h-3 w-3" aria-hidden="true" />
														{kpi.delta}
													</p>
												</div>
											))}
										</div>

										{/* Chart panel */}
										<div className="rounded-xl border border-slate-100 bg-gradient-to-br from-indigo-50/60 to-violet-50/40 p-4">
											<div className="mb-2 flex items-center justify-between">
												<p className="text-sm font-semibold text-slate-700">
													Throughput
												</p>
												<span className="rounded-full bg-white px-2.5 py-1 text-[0.6875rem] font-medium text-slate-500 ring-1 ring-slate-200">
													Last 7 days
												</span>
											</div>
											<Sparkline className="h-16 w-full" />
										</div>

										{/* Flow row */}
										<div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5">
											<span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
												<Workflow className="h-5 w-5" aria-hidden="true" />
											</span>
											<div className="min-w-0 flex-1">
												<p className="truncate text-sm font-semibold text-slate-800">
													Vendor onboarding
												</p>
												<div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
													<div className="h-full w-[78%] rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
												</div>
											</div>
											<span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-emerald-600">
												Live
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Floating accent cards (gentle pulse) — pop toward the viewer in 3D. */}
						<motion.div
							initial={{ opacity: 0, scale: 0.85 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.6, duration: 0.6, ease: EASE_REFINED }}
							className="absolute -left-4 top-24 hidden animate-float sm:block lg:-left-10"
						>
							<FloatCard
								icon={ShieldCheck}
								title="SOC 2 verified"
								sub="Audit-ready"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, scale: 0.85 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.8, duration: 0.6, ease: EASE_REFINED }}
							className="absolute -bottom-5 right-0 hidden animate-float-delayed sm:block lg:-right-8"
						>
							<FloatCard icon={Activity} title="99.99% uptime" sub="30-day SLA" />
						</motion.div>
					</motion.div>
				</div>
			</Shell>
		</section>
	);
}

function FloatCard({
	icon: Icon,
	title,
	sub,
}: {
	icon: typeof ShieldCheck;
	title: string;
	sub: string;
}) {
	return (
		<div
			className={cx(
				"flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/90 px-4 py-3 shadow-lift backdrop-blur",
			)}
		>
			<span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-glow">
				<Icon className="h-5 w-5" aria-hidden="true" />
			</span>
			<div>
				<p className="text-sm font-bold text-slate-900">{title}</p>
				<p className="text-xs text-slate-500">{sub}</p>
			</div>
		</div>
	);
}
