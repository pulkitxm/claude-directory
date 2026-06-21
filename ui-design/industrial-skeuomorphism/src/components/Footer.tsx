import {
	Github,
	Twitter,
	Linkedin,
	Youtube,
	type LucideIcon,
} from "lucide-react";
import { Logo } from "./Logo";
import { Container, Led, cx } from "./primitives";

const COLUMNS: { title: string; links: string[] }[] = [
	{
		title: "System",
		links: ["Telemetry", "Control plane", "Interlocks", "Console", "Mesh"],
	},
	{
		title: "Hardware",
		links: ["SX-1 Bridge", "I/O Modules", "Spec sheets", "Compliance"],
	},
	{
		title: "Company",
		links: ["About", "Field stories", "Careers", "Press kit", "Contact"],
	},
];

const SOCIAL: { icon: LucideIcon; label: string }[] = [
	{ icon: Github, label: "GitHub" },
	{ icon: Twitter, label: "Twitter" },
	{ icon: Linkedin, label: "LinkedIn" },
	{ icon: Youtube, label: "YouTube" },
];

export function Footer() {
	return (
		<footer className="mt-24 pb-10">
			<Container>
				<div
					className="rounded-2xl bg-chassis p-8 md:p-12"
					style={{ boxShadow: "var(--shadow-card)" }}
				>
					<div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
						{/* brand col */}
						<div className="flex flex-col items-start gap-4">
							<Logo />
							<p className="max-w-[34ch] text-sm leading-relaxed text-label">
								The machined control plane for hardware fleets. Built to feel as
								solid as the machines it runs.
							</p>
							<span
								className="inline-flex items-center gap-2 rounded-full bg-chassis px-3 py-1.5"
								style={{
									boxShadow: "var(--shadow-recessed-soft)",
								}}
							>
								<Led tone="online" size={8} label="all systems operational" />
								<span className="stamp text-[0.6rem] text-label">
									ALL&nbsp;SYSTEMS&nbsp;OPERATIONAL
								</span>
							</span>
						</div>

						{/* link columns */}
						{COLUMNS.map((col) => (
							<nav key={col.title} aria-label={col.title}>
								<h3 className="stamp mb-4 text-[0.62rem] text-label/80">
									{col.title}
								</h3>
								<ul className="flex flex-col gap-2.5">
									{col.links.map((l) => (
										<li key={l}>
											<a
												href="#top"
												className="text-sm text-ink/80 transition-colors duration-200 hover:text-accent"
											>
												{l}
											</a>
										</li>
									))}
								</ul>
							</nav>
						))}
					</div>

					<hr className="my-8 border-0 border-t border-edge-deep/30" />

					<div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
						<p className="stamp text-[0.6rem] text-label/70">
							© {new Date().getFullYear()} SCHEMATIC CONTROL SYSTEMS · DWG
							0xA417
						</p>
						<div className="flex items-center gap-3">
							{SOCIAL.map(({ icon: Icon, label }) => (
								<a
									key={label}
									href="#top"
									aria-label={label}
									className={cx(
										"grid h-10 w-10 place-items-center rounded-lg bg-chassis text-label",
										"transition-[color,transform,box-shadow] duration-150 ease-mech hover:text-accent active:translate-y-[1px]",
									)}
									style={{ boxShadow: "var(--shadow-card)" }}
								>
									<Icon size={18} strokeWidth={1.75} />
								</a>
							))}
						</div>
					</div>
				</div>
			</Container>
		</footer>
	);
}
