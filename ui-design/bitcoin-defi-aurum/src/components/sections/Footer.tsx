import { Github, Twitter, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/data/content";

const COLUMNS: { title: string; links: string[] }[] = [
	{
		title: "Protocol",
		links: [
			"Vaults",
			"Yield Strategies",
			"Proof of Reserves",
			"Whitepaper",
			"Audits",
		],
	},
	{
		title: "Developers",
		links: ["Documentation", "API Reference", "SDK", "GitHub", "Bug Bounty"],
	},
	{
		title: "Network",
		links: ["Governance", "Validators", "Roadmap", "Brand Kit", "Status"],
	},
];

const SOCIALS = [
	{ icon: Twitter, label: "Twitter / X", href: "#" },
	{ icon: Github, label: "GitHub", href: "#" },
	{ icon: Send, label: "Telegram", href: "#" },
];

export function Footer() {
	return (
		<footer
			className="relative border-t border-white/10 bg-void"
			aria-label="Footer"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-cubes opacity-[0.025]"
				aria-hidden="true"
			/>
			<Container className="relative py-16">
				<div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
					{/* Brand block */}
					<div className="flex flex-col gap-5">
						<a
							href="#top"
							className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
						>
							<Logo className="h-9 w-9" />
							<span className="flex flex-col leading-none">
								<span className="font-heading text-lg font-bold tracking-tight text-white">
									{BRAND.name}
								</span>
								<span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-stardust">
									{BRAND.tagline}
								</span>
							</span>
						</a>
						<p className="max-w-xs text-sm leading-relaxed text-stardust">
							Self-sovereign Bitcoin DeFi. Engineered for precision, security,
							and digital value.
						</p>
						<div className="flex gap-3">
							{SOCIALS.map(({ icon: Icon, label, href }) => (
								<a
									key={label}
									href={href}
									aria-label={label}
									className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-stardust transition-all duration-300 hover:border-orange/50 hover:text-orange hover:shadow-node focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
								>
									<Icon className="h-4 w-4" />
								</a>
							))}
						</div>
					</div>

					{/* Link columns */}
					<div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
						{COLUMNS.map((col) => (
							<div key={col.title} className="flex flex-col gap-4">
								<h3 className="font-mono text-[0.7rem] uppercase tracking-widest text-orange/80">
									{col.title}
								</h3>
								<ul className="flex flex-col gap-2.5">
									{col.links.map((link) => (
										<li key={link}>
											<a
												href="#"
												className="text-sm text-stardust transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white"
											>
												{link}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
					<p className="font-mono text-[0.7rem] uppercase tracking-widest text-white/40">
						© {new Date().getFullYear()} {BRAND.name} Protocol · Built on
						Bitcoin
					</p>
					<div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-stardust">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
						</span>
						All systems operational
					</div>
				</div>
			</Container>
		</footer>
	);
}
