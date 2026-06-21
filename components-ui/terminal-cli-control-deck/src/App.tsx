import { useEffect, useMemo, useRef, useState } from "react";
import {
	Activity,
	Cpu,
	Power,
	Radio,
	ShieldCheck,
	TerminalSquare,
	Wifi,
} from "lucide-react";
import {
	AsciiBar,
	BracketButton,
	Cursor,
	CrtOverlay,
	Divider,
	Glitch,
	PromptInput,
	StatusBadge,
	Typewriter,
	Window,
} from "./design-system";
import { ACME_LOGO, MANIFEST, METRICS, NODES } from "./data";
import { useLogFeed } from "./useLogFeed";

const ICON = "h-3.5 w-3.5 shrink-0 text-primary [stroke-width:2]";

/** Live wall-clock used in the status bar + log stamps. */
function useClock() {
	const [now, setNow] = useState(() => new Date());
	useEffect(() => {
		const t = window.setInterval(() => setNow(new Date()), 1000);
		return () => window.clearInterval(t);
	}, []);
	return now;
}

const pad = (n: number) => n.toString().padStart(2, "0");

/* ── Top status bar ──────────────────────────────────────────────────────── */
function StatusBar() {
	const now = useClock();
	const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
	return (
		<div className="sticky top-0 z-40 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-border bg-bg/95 px-3 py-1.5 text-2xs backdrop-blur sm:px-5">
			<span className="flex items-center gap-1.5 font-bold tracking-[0.16em] text-primary glow">
				<TerminalSquare className={ICON} />
				TERMINAL&nbsp;OS
			</span>
			<span className="hidden text-dim sm:inline">v4.2.1</span>
			<span className="ml-auto flex items-center gap-1.5 text-dim">
				<Wifi className={ICON} />
				<span className="text-primary">7 NODES</span>
			</span>
			<span className="flex items-center gap-1.5 text-dim">
				<Activity className={ICON} />
				<span className="text-primary">UP 412d</span>
			</span>
			<span className="tabular-nums text-secondary glow-amber">{time}</span>
			<StatusBadge kind="ok" />
		</div>
	);
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
	const [phase, setPhase] = useState(0); // 0 logo → 1 headline → 2 sub
	return (
		<header className="relative px-3 pt-10 pb-8 sm:px-5 sm:pt-14">
			<pre
				aria-hidden
				className="mb-5 inline-block text-[0.5rem] leading-[0.85] text-primary glow [animation:var(--animate-boot)] sm:text-xs md:text-sm"
			>
				{ACME_LOGO}
			</pre>

			<p className="mb-3 flex items-center gap-2 text-xs tracking-[0.18em] text-dim uppercase">
				<span className="text-secondary glow-amber">$</span>
				<span>./control-deck --boot --profile=phosphor</span>
			</p>

			<h1 className="max-w-4xl text-2xl leading-[1.05] font-bold tracking-tight text-primary glow uppercase sm:text-3xl">
				<Typewriter
					text="INFRASTRUCTURE,"
					speed={42}
					onDone={() => setPhase(1)}
				/>
				<br />
				{phase >= 1 ? (
					<span className="text-secondary glow-amber">
						<Typewriter
							text="STRIPPED TO THE SHELL."
							speed={34}
							cursor
							onDone={() => setPhase(2)}
						/>
					</span>
				) : (
					<span className="opacity-0">STRIPPED TO THE SHELL.</span>
				)}
			</h1>

			<p
				className={`mt-5 max-w-2xl text-sm leading-relaxed text-dim transition-opacity duration-700 sm:text-base ${
					phase >= 2 ? "opacity-100" : "opacity-0"
				}`}
			>
				ACME Control Deck is a single-pane command surface for fleets that hate
				dashboards. No charts, no chrome — just{" "}
				<span className="text-primary">phosphor-green truth</span>, ASCII
				meters, and a prompt that does exactly what you type.
			</p>

			<div
				className={`mt-7 flex flex-wrap items-center gap-3 transition-opacity duration-700 ${
					phase >= 2 ? "opacity-100" : "opacity-0"
				}`}
			>
				<BracketButton
					onClick={() =>
						document
							.getElementById("console")
							?.scrollIntoView({ behavior: "smooth", block: "center" })
					}
				>
					INITIATE&nbsp;SESSION
				</BracketButton>
				<BracketButton
					tone="secondary"
					onClick={() =>
						document
							.getElementById("manifest")
							?.scrollIntoView({ behavior: "smooth", block: "center" })
					}
				>
					READ&nbsp;--HELP
				</BracketButton>
				<span className="text-2xs tracking-[0.14em] text-dim">
					exit&nbsp;code&nbsp;<span className="text-primary">0</span>
				</span>
			</div>
		</header>
	);
}

/* ── Telemetry meters ────────────────────────────────────────────────────── */
function Telemetry() {
	return (
		<Window
			title="resource.telemetry"
			flags={
				<span className="flex items-center gap-1">
					<Cpu className="h-3 w-3 text-bg [stroke-width:2.5]" />
					--watch
				</span>
			}
			className="md:row-span-2"
			bodyClassName="flex flex-col gap-3.5"
		>
			{METRICS.map((m) => (
				<AsciiBar key={m.label} label={m.label} value={m.value} />
			))}
			<Divider label="threshold" className="mt-1" />
			<p className="text-2xs leading-relaxed text-dim">
				meters auto-escalate: <span className="text-primary">|nominal|</span>{" "}
				<span className="text-secondary">|warn ≥75|</span>{" "}
				<span className="text-error">|crit ≥90|</span>
			</p>
		</Window>
	);
}

/* ── Node topology ───────────────────────────────────────────────────────── */
function Topology() {
	return (
		<Window
			title="cluster.nodes"
			variant="ascii"
			flags="--list"
			bodyClassName="flex flex-col gap-1.5"
		>
			<div className="grid grid-cols-[1fr_auto_auto] gap-x-3 gap-y-1 text-2xs tracking-[0.12em] text-dim uppercase">
				<span>host</span>
				<span className="text-right">load</span>
				<span className="text-right">stat</span>
			</div>
			{NODES.map((n) => (
				<div
					key={n.host}
					className="group/row grid grid-cols-[1fr_auto_auto] items-center gap-x-3 border-b border-dashed border-muted/30 py-1 text-xs last:border-0"
				>
					<span className="flex min-w-0 items-center gap-1.5">
						<Radio
							className={`h-3 w-3 shrink-0 ${
								n.status === "err"
									? "text-error glow-error"
									: n.status === "warn"
										? "text-secondary"
										: "text-primary"
							} [stroke-width:2]`}
						/>
						<span className="truncate text-primary transition-colors group-hover/row:text-secondary">
							{n.host}
						</span>
						<span className="hidden text-dim sm:inline">· {n.region}</span>
					</span>
					<span
						className={`tabular-nums ${
							n.load >= 90
								? "text-error"
								: n.load >= 75
									? "text-secondary"
									: "text-dim"
						}`}
					>
						{n.load}%
					</span>
					<span className="text-right">
						<StatusBadge kind={n.status} pulse={n.status === "err"} />
					</span>
				</div>
			))}
		</Window>
	);
}

/* ── Live log feed ───────────────────────────────────────────────────────── */
function LogFeed() {
	const lines = useLogFeed();
	const bottom = useRef<HTMLDivElement>(null);
	useEffect(() => {
		bottom.current?.scrollIntoView({ block: "end" });
	}, [lines]);

	return (
		<Window
			title="syslog.tail -f"
			flags={
				<span className="flex items-center gap-1">
					<span className="inline-block h-1.5 w-1.5 bg-bg [animation:var(--animate-blink)]" />
					LIVE
				</span>
			}
			bodyClassName="h-44 overflow-hidden"
		>
			<div className="flex h-full flex-col justify-end gap-0.5 overflow-hidden text-xs">
				{lines.map((l) => (
					<div
						key={l.id}
						className="flex items-start gap-2 [animation:var(--animate-boot)] leading-snug"
					>
						<span className="shrink-0 tabular-nums text-muted">{l.stamp}</span>
						<StatusBadge kind={l.kind} />
						<span
							className={`min-w-0 break-words ${
								l.kind === "err"
									? "text-error"
									: l.kind === "warn"
										? "text-secondary"
										: "text-primary/90"
							}`}
						>
							{l.text}
						</span>
					</div>
				))}
				<div ref={bottom} />
			</div>
		</Window>
	);
}

/* ── Interactive command console ─────────────────────────────────────────── */
const HELP = [
	"available commands:",
	"  help          show this message",
	"  status        print fleet status",
	"  deploy <env>  roll out to <env>",
	"  scan          probe all nodes",
	"  clear         wipe the buffer",
	"  whoami        print current identity",
];

function runCommand(raw: string): string[] {
	const [cmd, ...args] = raw.trim().split(/\s+/);
	switch (cmd.toLowerCase()) {
		case "":
			return [];
		case "help":
		case "--help":
			return HELP;
		case "status":
			return [
				"FLEET STATUS // 7 nodes",
				"  5 ok · 1 warn · 1 err",
				"  egress 1.4M ev/s · p99 41ms",
				"[OK] all regions reachable",
			];
		case "deploy": {
			const env = args[0] ?? "staging";
			return [
				`deploy: building artifact for '${env}'...`,
				"deploy: pushing to registry [||||||||||] 100%",
				`[OK] released v4.2.1 → ${env}`,
			];
		}
		case "scan":
			return [
				"scan: probing 7 nodes...",
				"  gpu-sfo-04 ............ [ERR] heartbeat lost",
				"  core-iad-08 ........... [WARN] mem 82%",
				"  5 others .............. [OK]",
			];
		case "whoami":
			return ["root@acme.control-deck (uid=0, ring0)"];
		case "clear":
			return ["__CLEAR__"];
		default:
			return [`zsh: command not found: ${cmd}  —  try 'help'`, "__ERR__"];
	}
}

interface ConsoleLine {
	id: number;
	type: "in" | "out" | "err";
	text: string;
}

function Console() {
	const [value, setValue] = useState("");
	const [history, setHistory] = useState<ConsoleLine[]>([
		{ id: 0, type: "out", text: "ACME shell ready. type 'help' to begin." },
	]);
	const idRef = useRef(1);
	const bottom = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottom.current?.scrollIntoView({ block: "end", behavior: "smooth" });
	}, [history]);

	// One code path for both the form and the quick-command chips.
	const exec = (raw: string) => {
		const out = runCommand(raw);
		setValue("");
		setHistory((prev) => {
			const next = [
				...prev,
				{ id: idRef.current++, type: "in" as const, text: raw || " " },
			];
			if (out[0] === "__CLEAR__") return [];
			let isErr = false;
			for (const line of out) {
				if (line === "__ERR__") {
					isErr = true;
					continue;
				}
				next.push({
					id: idRef.current++,
					type: isErr ? "err" : "out",
					text: line,
				});
				isErr = false;
			}
			return next.slice(-40);
		});
	};

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		exec(value);
	};

	return (
		<Window
			id="console"
			title="zsh — interactive"
			flags="--tty"
			className="md:col-span-2"
			bodyClassName="flex flex-col gap-3"
		>
			<div className="h-40 overflow-y-auto pr-1 text-xs leading-snug">
				{history.map((l) => (
					<div
						key={l.id}
						className={
							l.type === "in"
								? "text-dim"
								: l.type === "err"
									? "text-error"
									: "text-primary/90"
						}
					>
						{l.type === "in" ? (
							<>
								<span className="text-secondary glow-amber">root@acme:~$</span>{" "}
								<span className="text-primary">{l.text}</span>
							</>
						) : (
							<span className="whitespace-pre-wrap">{l.text}</span>
						)}
					</div>
				))}
				<div ref={bottom} />
			</div>
			<form onSubmit={submit}>
				<PromptInput
					prompt="root@acme:~$"
					tone="secondary"
					label="command input"
					placeholder="type a command, e.g. status"
					value={value}
					onChange={setValue}
					autoComplete="off"
					spellCheck={false}
				/>
			</form>
			<div className="flex flex-wrap gap-2">
				{["help", "status", "scan", "deploy prod"].map((c) => (
					<button
						key={c}
						type="button"
						onClick={() => exec(c)}
						className="border border-dashed border-muted px-2 py-0.5 text-2xs tracking-[0.1em] text-dim transition-colors hover:border-primary hover:bg-primary hover:text-bg"
					>
						{c}
					</button>
				))}
			</div>
		</Window>
	);
}

/* ── Access / key request form ───────────────────────────────────────────── */
function AccessForm() {
	const [user, setUser] = useState("");
	const [key, setKey] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const valid = useMemo(
		() => user.trim().length >= 2 && /^acme-[a-z0-9]{4,}$/i.test(key.trim()),
		[user, key],
	);

	return (
		<Window
			title="access.request"
			variant="ascii"
			flags="--auth"
			bodyClassName="flex flex-col gap-4"
		>
			{submitted ? (
				<div className="flex flex-col gap-2 py-2 text-sm">
					<span className="flex items-center gap-2 text-primary glow">
						<ShieldCheck className={ICON} />
						[OK] credentials accepted
					</span>
					<p className="text-xs text-dim">
						welcome, <span className="text-primary">{user || "operator"}</span>.
						a one-time token has been written to{" "}
						<span className="text-secondary">~/.acme/token</span>.
					</p>
					<div className="mt-1">
						<BracketButton onClick={() => setSubmitted(false)}>
							NEW&nbsp;REQUEST
						</BracketButton>
					</div>
				</div>
			) : (
				<form
					className="flex flex-col gap-4"
					onSubmit={(e) => {
						e.preventDefault();
						if (valid) setSubmitted(true);
					}}
				>
					<p className="text-xs leading-relaxed text-dim">
						request ring-0 access. callsign + an{" "}
						<span className="text-secondary">acme-XXXX</span> key are required.
					</p>
					<PromptInput
						prompt="callsign:~$"
						label="callsign"
						placeholder="e.g. nightowl"
						value={user}
						onChange={setUser}
						autoComplete="off"
					/>
					<PromptInput
						prompt="key:~$"
						tone="secondary"
						label="access key"
						placeholder="acme-1337"
						value={key}
						onChange={setKey}
						autoComplete="off"
					/>
					<div className="flex items-center justify-between gap-2">
						<BracketButton type="submit" disabled={!valid}>
							GRANT&nbsp;ACCESS
						</BracketButton>
						<span className="text-2xs tracking-[0.12em]">
							{key.length === 0 ? (
								<span className="text-dim">awaiting input</span>
							) : valid ? (
								<span className="text-primary glow">[OK] format valid</span>
							) : (
								<span className="text-error glow-error">[ERR] bad key</span>
							)}
						</span>
					</div>
				</form>
			)}
		</Window>
	);
}

/* ── Manifest / spec pane ────────────────────────────────────────────────── */
function Manifest() {
	return (
		<Window
			id="manifest"
			title="control-deck --help"
			flags="--man"
			bodyClassName="flex flex-col gap-2"
		>
			<p className="text-xs text-dim">
				<span className="text-secondary">USAGE:</span> control-deck [FLAGS]
			</p>
			<div className="flex flex-col gap-1.5">
				{MANIFEST.map((m) => (
					<div
						key={m.flag}
						className="grid grid-cols-[7.5rem_1fr] items-start gap-2 border-b border-dashed border-muted/25 pb-1.5 text-xs last:border-0"
					>
						<span className="font-bold text-primary glow">{m.flag}</span>
						<span className="text-dim">{m.desc}</span>
					</div>
				))}
			</div>
			<p className="mt-1 text-2xs text-dim">
				<Cursor char="_" /> press <span className="text-primary">q</span> to
				quit · <span className="text-primary">/</span> to search
			</p>
		</Window>
	);
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
	const links = ["man", "changelog", "status.acme.sh", "github", "rss"];
	return (
		<footer className="px-3 pt-4 pb-10 sm:px-5">
			<Divider glyph="═" className="mb-4 text-[0.7rem]" />
			<div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-2xs">
				<span className="flex items-center gap-1.5 text-dim">
					<Power className={ICON} />
					<span className="text-primary">ACME&nbsp;CONTROL&nbsp;DECK</span>
				</span>
				{links.map((l) => (
					<a
						key={l}
						href="#"
						className="group/link text-dim transition-colors hover:text-primary"
						onClick={(e) => e.preventDefault()}
					>
						<span className="text-muted group-hover/link:text-primary">~/</span>
						{l}
					</a>
				))}
				<span className="ml-auto flex items-center gap-2 text-dim">
					<span>session</span>
					<Glitch className="text-primary glow">#7F3A-0xC0FFEE</Glitch>
					<Cursor />
				</span>
			</div>
			<p className="mt-3 text-2xs text-muted">
				// no cookies. no charts. no rounded corners. exit 0.
			</p>
		</footer>
	);
}

/* ── Root ────────────────────────────────────────────────────────────────── */
export default function App() {
	return (
		<div className="relative min-h-screen w-full overflow-x-hidden [animation:var(--animate-flicker)]">
			<CrtOverlay />
			<div className="relative z-10 mx-auto max-w-6xl">
				<StatusBar />
				<Hero />
				<Divider label="live deck" className="px-3 pb-4 sm:px-5" />
				<main className="grid grid-cols-1 gap-3 px-3 sm:px-5 md:grid-cols-2 lg:grid-cols-3">
					<Telemetry />
					<LogFeed />
					<Topology />
					<Console />
					<AccessForm />
					<Manifest />
				</main>
				<Footer />
			</div>
		</div>
	);
}
