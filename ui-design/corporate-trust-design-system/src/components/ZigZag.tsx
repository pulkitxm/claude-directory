import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { Section, Shell, Eyebrow, Reveal, Blob, cx } from "./primitives";
import { ZIGZAG } from "../lib/content";
import { popIn, fadeUp, stagger, inView } from "../lib/motion";

/* Alternating zig-zag deep-dives. Even rows put the visual on the right; odd
   rows reverse it. The visual is an isometric gradient slab (rotate-x / rotate-y)
   holding a small abstract UI — the system's "benefit visualization" pattern. */
export function ZigZag() {
	return (
		<Section id="features" className="overflow-hidden">
			<Shell>
				<div className="space-y-20 lg:space-y-28">
					{ZIGZAG.map((item, i) => {
						const reversed = i % 2 === 1;
						return (
							<div
								key={item.title}
								className={cx(
									"flex flex-col items-center gap-12 lg:gap-16",
									reversed ? "lg:flex-row-reverse" : "lg:flex-row",
								)}
							>
								{/* Copy */}
								<Reveal className="flex-1">
									<Eyebrow icon={item.icon}>{item.eyebrow}</Eyebrow>
									<h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
										{item.title}{" "}
										<span className="text-gradient">{item.titleAccent}</span>
									</h2>
									<p className="mt-5 max-w-xl text-lg text-slate-500">{item.body}</p>
									<motion.ul
										variants={stagger(0.08)}
										initial="hidden"
										whileInView="show"
										viewport={inView}
										className="mt-7 space-y-3.5"
									>
										{item.points.map((p) => (
											<motion.li
												key={p}
												variants={fadeUp}
												className="flex items-start gap-3 text-[0.9375rem] text-slate-700"
											>
												<span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
													<Check className="h-3.5 w-3.5" aria-hidden="true" />
												</span>
												{p}
											</motion.li>
										))}
									</motion.ul>
									<a href="#cta" className="btn btn-primary group mt-9">
										Explore {item.eyebrow.toLowerCase()}
										<ArrowRight
											className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
											aria-hidden="true"
										/>
									</a>
								</Reveal>

								{/* Visual */}
								<motion.div
									variants={popIn}
									initial="hidden"
									whileInView="show"
									viewport={inView}
									className="flex-1"
								>
									<Visual reversed={reversed} index={i} />
								</motion.div>
							</div>
						);
					})}
				</div>
			</Shell>
		</Section>
	);
}

/* The isometric gradient slab. Tilts in 3D and carries a different abstract UI
   per row so the two deep-dives don't look identical. */
function Visual({ reversed, index }: { reversed: boolean; index: number }) {
	const tilt = reversed
		? "[transform:rotateX(6deg)_rotateY(10deg)]"
		: "[transform:rotateX(6deg)_rotateY(-10deg)]";
	return (
		<div className="relative mx-auto max-w-lg [perspective:1600px]">
			<Blob
				tone={reversed ? "violet" : "indigo"}
				className="-inset-6 h-full w-full opacity-60"
			/>
			<div
				className={cx(
					"group relative rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-3 shadow-lift transition-transform duration-500 preserve-3d",
					tilt,
					"hover:[transform:rotateX(3deg)_rotateY(0deg)]",
				)}
			>
				<div className="rounded-2xl bg-white p-5 sm:p-6">
					{index === 0 ? <AutomationUI /> : <CollaborationUI />}
				</div>
			</div>
		</div>
	);
}

/* Abstract "automation pipeline" UI for row 1. */
function AutomationUI() {
	const nodes = [
		{ label: "Trigger", tone: "bg-indigo-600 text-white" },
		{ label: "Condition", tone: "bg-indigo-50 text-indigo-700" },
		{ label: "Action", tone: "bg-violet-600 text-white" },
	];
	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				<p className="text-sm font-bold text-slate-900">Reconcile invoices</p>
				<span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-emerald-600">
					Running
				</span>
			</div>
			<div className="space-y-2.5">
				{nodes.map((n, i) => (
					<div key={n.label} className="relative">
						<div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3">
							<span className={cx("rounded-lg px-2.5 py-1 text-xs font-semibold", n.tone)}>
								{n.label}
							</span>
							<div className="h-2 flex-1 rounded-full bg-slate-100">
								<div
									className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
									style={{ width: `${[100, 64, 38][i]}%` }}
								/>
							</div>
						</div>
						{i < nodes.length - 1 && (
							<div
								aria-hidden="true"
								className="ml-6 h-2.5 w-px bg-slate-200"
							/>
						)}
					</div>
				))}
			</div>
			<div className="mt-4 flex items-center justify-between rounded-xl bg-indigo-50/70 px-4 py-2.5 text-sm">
				<span className="font-medium text-slate-600">Avg. run time</span>
				<span className="font-extrabold text-indigo-700">0.42s</span>
			</div>
		</div>
	);
}

/* Abstract "shared workspace" UI for row 2. */
function CollaborationUI() {
	const people = [
		{ i: "AK", c: "from-indigo-500 to-indigo-600" },
		{ i: "MB", c: "from-violet-500 to-violet-600" },
		{ i: "LF", c: "from-emerald-500 to-emerald-600" },
	];
	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				<p className="text-sm font-bold text-slate-900">Q3 launch runbook</p>
				<div className="flex -space-x-2">
					{people.map((p) => (
						<span
							key={p.i}
							className={cx(
								"inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br text-[0.625rem] font-bold text-white ring-2 ring-white",
								p.c,
							)}
						>
							{p.i}
						</span>
					))}
				</div>
			</div>
			<div className="space-y-2.5">
				{[
					{ who: "AK", msg: "Approvals routed to finance", done: true },
					{ who: "MB", msg: "Access review complete", done: true },
					{ who: "LF", msg: "Drafting rollout checklist…", done: false },
				].map((row) => (
					<div
						key={row.msg}
						className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3"
					>
						<span
							className={cx(
								"inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
								row.done
									? "bg-emerald-100 text-emerald-600"
									: "bg-indigo-100 text-indigo-600",
							)}
						>
							{row.done ? (
								<Check className="h-3.5 w-3.5" aria-hidden="true" />
							) : (
								<span className="h-2 w-2 rounded-full bg-indigo-500" />
							)}
						</span>
						<span className="text-sm text-slate-700">{row.msg}</span>
					</div>
				))}
			</div>
			<div className="mt-4 rounded-xl bg-violet-50/70 px-4 py-2.5 text-sm">
				<span className="font-medium text-slate-600">All actions logged · </span>
				<span className="font-extrabold text-violet-700">audit-ready</span>
			</div>
		</div>
	);
}
