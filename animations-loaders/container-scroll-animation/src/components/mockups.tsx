import {
	Activity,
	ArrowUpRight,
	Bell,
	Check,
	Circle,
	CircleDot,
	Command,
	GitBranch,
	GitPullRequest,
	LayoutDashboard,
	type LucideIcon,
	MessageSquare,
	Plus,
	Search,
	Settings,
	Sparkles,
	TerminalSquare,
	Users,
	Wallet,
} from "lucide-react";

/**
 * Self-contained product-UI mockups rendered inside the ContainerScroll cards.
 * Each is built from real markup + Tailwind (no external screenshots), so the
 * whole project runs offline. Icons come from lucide-react per the brief.
 */

/* A tiny shared device top-bar (traffic lights + a fake address pill). */
function BrowserBar({ label }: { label: string }) {
	return (
		<div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5">
			<div className="flex gap-1.5">
				<span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
				<span className="h-3 w-3 rounded-full bg-[#febc2e]" />
				<span className="h-3 w-3 rounded-full bg-[#28c840]" />
			</div>
			<div className="mx-auto hidden min-w-[42%] items-center justify-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/40 sm:flex">
				<span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
				{label}
			</div>
			<div className="ml-auto flex items-center gap-2 text-white/30 sm:ml-0">
				<Search className="h-3.5 w-3.5" />
				<Bell className="h-3.5 w-3.5" />
			</div>
		</div>
	);
}

/* ── Mockup 1 — Analytics dashboard ──────────────────────────────────────── */
const navItems: { icon: LucideIcon; label: string; active?: boolean }[] = [
	{ icon: LayoutDashboard, label: "Overview", active: true },
	{ icon: Activity, label: "Signals" },
	{ icon: Wallet, label: "Revenue" },
	{ icon: Users, label: "Cohorts" },
	{ icon: Settings, label: "Settings" },
];

const kpis = [
	{ label: "MRR", value: "$248.7k", delta: "+12.4%" },
	{ label: "Active orgs", value: "3,914", delta: "+5.1%" },
	{ label: "Net retention", value: "118%", delta: "+2.0%" },
];

const SPARK = [18, 26, 22, 34, 30, 46, 41, 58, 52, 67, 61, 78, 84];

export function DashboardMockup() {
	const max = Math.max(...SPARK);
	const pts = SPARK.map((v, i) => {
		const x = (i / (SPARK.length - 1)) * 100;
		const y = 100 - (v / max) * 92 - 4;
		return `${x.toFixed(2)},${y.toFixed(2)}`;
	}).join(" ");

	return (
		<div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#0c0d13] text-left">
			<BrowserBar label="app.northwind.dev/overview" />
			<div className="flex min-h-0 flex-1">
				{/* sidebar */}
				<aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-white/[0.06] p-3 md:flex">
					<div className="mb-3 flex items-center gap-2 px-1">
						<div className="grid h-6 w-6 place-items-center rounded-md bg-iris text-[#0b0c10]">
							<Sparkles className="h-3.5 w-3.5" />
						</div>
						<span className="font-display text-sm font-bold text-white">
							Northwind
						</span>
					</div>
					{navItems.map(({ icon: Icon, label, active }) => (
						<div
							key={label}
							className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] ${
								active
									? "bg-iris/15 font-medium text-iris-bright"
									: "text-white/45"
							}`}
						>
							<Icon className="h-4 w-4" />
							{label}
						</div>
					))}
					<div className="mt-auto rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
						<p className="text-[11px] text-white/40">Plan usage</p>
						<div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
							<div className="h-full w-[68%] rounded-full bg-gradient-to-r from-iris to-iris-bright" />
						</div>
					</div>
				</aside>

				{/* main */}
				<div className="flex min-w-0 flex-1 flex-col gap-4 p-4 md:p-5">
					<div className="flex items-end justify-between">
						<div>
							<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-iris/70">
								Overview
							</p>
							<h3 className="font-display text-lg font-bold text-white md:text-xl">
								Good evening, Mara
							</h3>
						</div>
						<button className="flex items-center gap-1.5 rounded-lg bg-iris px-3 py-1.5 text-[12px] font-semibold text-[#0b0c10]">
							<Plus className="h-3.5 w-3.5" /> New report
						</button>
					</div>

					<div className="grid grid-cols-3 gap-3">
						{kpis.map((k) => (
							<div
								key={k.label}
								className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"
							>
								<p className="text-[11px] text-white/40">{k.label}</p>
								<p className="mt-1 font-display text-base font-bold text-white md:text-lg">
									{k.value}
								</p>
								<p className="mt-0.5 flex items-center gap-0.5 text-[11px] font-medium text-emerald-400">
									<ArrowUpRight className="h-3 w-3" />
									{k.delta}
								</p>
							</div>
						))}
					</div>

					<div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
						<div className="flex items-center justify-between">
							<p className="text-[13px] font-medium text-white/70">
								Revenue · last 90 days
							</p>
							<span className="rounded-md bg-emerald-400/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
								▲ 23.8%
							</span>
						</div>
						<svg
							viewBox="0 0 100 60"
							preserveAspectRatio="none"
							className="mt-3 h-[68%] w-full"
						>
							<defs>
								<linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="#7C82FF" stopOpacity="0.45" />
									<stop offset="100%" stopColor="#7C82FF" stopOpacity="0" />
								</linearGradient>
							</defs>
							<polygon points={`0,60 ${pts} 100,60`} fill="url(#area)" />
							<polyline
								points={pts}
								fill="none"
								stroke="#9AA0FF"
								strokeWidth="1.4"
								strokeLinecap="round"
								strokeLinejoin="round"
								vectorEffect="non-scaling-stroke"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}

/* ── Mockup 2 — Kanban board ─────────────────────────────────────────────── */
type Card = { title: string; tag: string; tagColor: string; who: string };
const columns: { name: string; accent: string; cards: Card[] }[] = [
	{
		name: "Backlog",
		accent: "bg-white/30",
		cards: [
			{
				title: "Audit onboarding funnel",
				tag: "Growth",
				tagColor: "text-iris-bright bg-iris/15",
				who: "AL",
			},
			{
				title: "Spike: edge caching",
				tag: "Infra",
				tagColor: "text-emerald-300 bg-emerald-400/10",
				who: "JP",
			},
		],
	},
	{
		name: "In progress",
		accent: "bg-iris",
		cards: [
			{
				title: "Scroll telemetry HUD",
				tag: "Design",
				tagColor: "text-ember bg-ember/10",
				who: "MR",
			},
			{
				title: "Billing webhooks v2",
				tag: "Backend",
				tagColor: "text-sky-300 bg-sky-400/10",
				who: "DK",
			},
		],
	},
	{
		name: "Review",
		accent: "bg-ember",
		cards: [
			{
				title: "Dark-mode tokens",
				tag: "Design",
				tagColor: "text-ember bg-ember/10",
				who: "MR",
			},
		],
	},
	{
		name: "Shipped",
		accent: "bg-emerald-400",
		cards: [
			{
				title: "Org switcher",
				tag: "Frontend",
				tagColor: "text-sky-300 bg-sky-400/10",
				who: "AL",
			},
			{
				title: "SSO via SAML",
				tag: "Security",
				tagColor: "text-rose-300 bg-rose-400/10",
				who: "JP",
			},
		],
	},
];

export function KanbanMockup() {
	return (
		<div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#0c0d13] text-left">
			<BrowserBar label="linear-style.app/board/sprint-14" />
			<div className="flex items-center justify-between px-4 py-3">
				<div className="flex items-center gap-2">
					<CircleDot className="h-4 w-4 text-iris" />
					<h3 className="font-display text-base font-bold text-white">
						Sprint 14
					</h3>
					<span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/40">
						7 issues
					</span>
				</div>
				<div className="flex -space-x-2">
					{["MR", "JP", "AL", "DK"].map((p, i) => (
						<div
							key={p}
							className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#0c0d13] text-[9px] font-semibold text-white"
							style={{
								background: ["#7C82FF", "#F0A35E", "#34d399", "#38bdf8"][i],
							}}
						>
							{p}
						</div>
					))}
				</div>
			</div>
			<div className="grid min-h-0 flex-1 grid-cols-4 gap-2.5 px-3 pb-3">
				{columns.map((col) => (
					<div key={col.name} className="flex min-w-0 flex-col gap-2">
						<div className="flex items-center gap-1.5 px-1">
							<span className={`h-1.5 w-1.5 rounded-full ${col.accent}`} />
							<span className="text-[11px] font-medium text-white/55">
								{col.name}
							</span>
							<span className="ml-auto text-[10px] text-white/30">
								{col.cards.length}
							</span>
						</div>
						{col.cards.map((c) => (
							<div
								key={c.title}
								className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-2.5"
							>
								<p className="text-[12px] font-medium leading-snug text-white/85">
									{c.title}
								</p>
								<div className="mt-2 flex items-center justify-between">
									<span
										className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${c.tagColor}`}
									>
										{c.tag}
									</span>
									<span className="grid h-4 w-4 place-items-center rounded-full bg-white/10 text-[8px] text-white/70">
										{c.who}
									</span>
								</div>
							</div>
						))}
						<button className="flex items-center gap-1 rounded-lg border border-dashed border-white/[0.08] px-2 py-1.5 text-[11px] text-white/35">
							<Plus className="h-3 w-3" /> Add
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

/* ── Mockup 3 — Code editor / PR review ──────────────────────────────────── */
const codeLines: {
	n: number;
	tokens: { t: string; c: string }[];
	add?: boolean;
}[] = [
	{
		n: 18,
		tokens: [
			{ t: "const ", c: "text-iris-bright" },
			{ t: "rotate ", c: "text-white/90" },
			{ t: "= ", c: "text-white/40" },
			{ t: "useTransform", c: "text-ember" },
			{ t: "(", c: "text-white/40" },
		],
	},
	{ n: 19, tokens: [{ t: "  scrollYProgress,", c: "text-sky-300" }] },
	{
		n: 20,
		tokens: [
			{ t: "  [", c: "text-white/40" },
			{ t: "0, 1", c: "text-emerald-300" },
			{ t: "],", c: "text-white/40" },
		],
	},
	{
		n: 21,
		tokens: [
			{ t: "  [", c: "text-white/40" },
			{ t: "20, 0", c: "text-emerald-300" },
			{ t: "]", c: "text-white/40" },
		],
		add: true,
	},
	{ n: 22, tokens: [{ t: ");", c: "text-white/40" }] },
	{ n: 23, tokens: [{ t: "", c: "" }] },
	{
		n: 24,
		tokens: [
			{ t: "return ", c: "text-iris-bright" },
			{ t: "<", c: "text-white/40" },
			{ t: "motion.div", c: "text-ember" },
		],
	},
	{
		n: 25,
		tokens: [
			{ t: "  style", c: "text-sky-300" },
			{ t: "={{ ", c: "text-white/40" },
			{ t: "rotateX", c: "text-sky-300" },
			{ t: ": rotate }}", c: "text-white/40" },
		],
		add: true,
	},
	{ n: 26, tokens: [{ t: "/>;", c: "text-white/40" }] },
];

export function EditorMockup() {
	return (
		<div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#0c0d13] text-left">
			<BrowserBar label="northwind/web · container-scroll-animation.tsx" />
			<div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2 text-[11px] text-white/40">
				<GitBranch className="h-3.5 w-3.5 text-iris" />
				<span className="font-mono">feat/scroll-deck</span>
				<span className="ml-auto flex items-center gap-1 rounded-md bg-emerald-400/10 px-2 py-0.5 text-emerald-300">
					<GitPullRequest className="h-3 w-3" /> +2 −0
				</span>
			</div>
			<div className="flex min-h-0 flex-1">
				{/* file tree */}
				<aside className="hidden w-40 shrink-0 flex-col gap-0.5 border-r border-white/[0.06] p-3 font-mono text-[11px] md:flex">
					<p className="mb-1 text-white/30">EXPLORER</p>
					{[
						"components/",
						"  ui/",
						"    container-scroll…tsx",
						"  mockups.tsx",
						"lib/utils.ts",
						"App.tsx",
					].map((f, i) => (
						<span
							key={f}
							className={
								i === 2
									? "rounded bg-iris/15 px-1 text-iris-bright"
									: "text-white/45"
							}
						>
							{f.includes(".") && i !== 2 ? "📄 " : ""}
							{f}
						</span>
					))}
				</aside>

				{/* code */}
				<div className="min-w-0 flex-1 overflow-hidden p-3 font-mono text-[12px] leading-relaxed md:p-4 md:text-[13px]">
					{codeLines.map((ln) => (
						<div
							key={ln.n}
							className={`flex gap-3 ${ln.add ? "-mx-3 rounded bg-emerald-400/[0.07] px-3" : ""}`}
						>
							<span className="w-5 shrink-0 select-none text-right text-white/20">
								{ln.n}
							</span>
							<span className="shrink-0 select-none text-emerald-400/70">
								{ln.add ? "+" : " "}
							</span>
							<span className="truncate whitespace-pre">
								{ln.tokens.map((tk, i) => (
									<span key={i} className={tk.c}>
										{tk.t}
									</span>
								))}
							</span>
						</div>
					))}

					{/* review comment */}
					<div className="mt-4 rounded-lg border border-white/[0.07] bg-white/[0.025] p-3">
						<div className="flex items-center gap-2">
							<div className="grid h-5 w-5 place-items-center rounded-full bg-iris text-[9px] font-semibold text-[#0b0c10]">
								MR
							</div>
							<span className="text-[12px] font-medium text-white/80">
								Mara R.
							</span>
							<span className="text-[11px] text-white/35">commented</span>
							<span className="ml-auto flex items-center gap-1 rounded bg-emerald-400/10 px-1.5 py-0.5 text-[10px] text-emerald-300">
								<Check className="h-3 w-3" /> Approved
							</span>
						</div>
						<p className="mt-1.5 flex items-start gap-1.5 text-[12px] text-white/55">
							<MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-iris" />
							Nice — driving rotateX straight off scrollYProgress reads buttery.
						</p>
					</div>
				</div>
			</div>
			{/* status bar */}
			<div className="flex items-center gap-3 border-t border-white/[0.06] bg-iris/[0.06] px-4 py-1.5 font-mono text-[10px] text-white/45">
				<span className="flex items-center gap-1 text-iris-bright">
					<TerminalSquare className="h-3 w-3" /> tsc — 0 errors
				</span>
				<span className="flex items-center gap-1">
					<Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" />{" "}
					Prettier
				</span>
				<span className="ml-auto flex items-center gap-1">
					<Command className="h-3 w-3" /> Ln 21, Col 8
				</span>
			</div>
		</div>
	);
}
