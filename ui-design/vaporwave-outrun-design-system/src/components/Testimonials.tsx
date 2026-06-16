import {
	Eyebrow,
	Reveal,
	Section,
	SectionHeading,
	Shell,
} from "./primitives";

type Msg = {
	user: string;
	color: string;
	time: string;
	text: string;
};

/* IRC-style chat log: <username> angle-bracket syntax, monospace, timestamps. */
const MESSAGES: Msg[] = [
	{
		user: "synthlord_88",
		color: "var(--color-magenta)",
		time: "03:14",
		text: "shipped our dashboard on NEONWAVE OS and the grid floor alone got us 3x demo requests. the sun gradient is unreal.",
	},
	{
		user: "cyber_ami",
		color: "var(--color-cyan)",
		time: "03:15",
		text: "the skewed buttons that un-skew on hover are pure dopamine. our whole team is obsessed with the diamond icons spinning to 90.",
	},
	{
		user: "grid_runner",
		color: "var(--color-orange)",
		time: "03:17",
		text: "centralized tokens meant retheming took ten minutes. one variable and the entire void shifted hue. maintainable AND maximalist?? unheard of.",
	},
	{
		user: "vhs_kid",
		color: "var(--color-magenta)",
		time: "03:19",
		text: "still can't believe the scanlines + chromatic aberration run at 60fps on mobile. accessibility audit passed too. take my license money.",
	},
	{
		user: "miami2099",
		color: "var(--color-cyan)",
		time: "03:22",
		text: "the terminal chrome makes every page feel like booting a machine from a future that never happened. clients think we hired a studio.",
	},
];

export function Testimonials() {
	return (
		<Section className="z-10 py-20 sm:py-32">
			<Shell>
				<Reveal className="mb-12 max-w-3xl sm:mb-16">
					<Eyebrow>#neonwave-os // 88 online</Eyebrow>
					<SectionHeading className="mt-5">Operator chatter</SectionHeading>
					<p className="mt-5 font-mono text-lg text-[var(--color-chrome)]/70">
						Live from the relay. What operators are saying across the grid.
					</p>
				</Reveal>

				<Reveal>
					<div className="window">
						<div className="window-bar">
							<div className="window-dots" aria-hidden>
								<i className="bg-[var(--color-magenta)]" />
								<i className="bg-[var(--color-cyan)]" />
								<i className="bg-[var(--color-orange)]" />
							</div>
							<span className="font-mono text-xs uppercase tracking-widest text-[var(--color-cyan)]">
								irc://relay.grid/#neonwave-os
							</span>
						</div>

						<div className="space-y-1 p-5 font-mono text-sm leading-relaxed sm:text-base">
							{MESSAGES.map((m, i) => (
								<Reveal
									key={i}
									delay={i * 0.05}
									className="group flex flex-wrap items-baseline gap-x-2 gap-y-1 border-l-2 border-transparent py-1.5 pl-3 transition-colors duration-200 ease-linear hover:border-[var(--color-cyan)] hover:bg-[var(--color-cyan)]/5"
								>
									<span className="text-[var(--color-chrome)]/40">[{m.time}]</span>
									<span style={{ color: m.color }} className="font-bold">
										&lt;{m.user}&gt;
									</span>
									<span className="flex-1 text-[var(--color-chrome)]/85">{m.text}</span>
								</Reveal>
							))}
							{/* live input line */}
							<div className="mt-3 flex items-baseline gap-2 border-t border-[var(--color-cyan)]/20 pt-3 text-[var(--color-chrome)]/60">
								<span className="text-[var(--color-orange)]">&lt;you&gt;</span>
								<span className="cursor">type to join the channel</span>
							</div>
						</div>
					</div>
				</Reveal>
			</Shell>
		</Section>
	);
}
