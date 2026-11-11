const COMPANIES = ["Ashby Foundry", "Birch Works", "Cedar Studio", "Delta Guild", "Ember House", "Fern Labs", "Grove Team", "Harbor Collective"];
export function LogoMarquee() {
  return <div className="container-page py-10">
			<p className="mb-7 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted/60">
				Fictional teams in this demonstration
			</p>
			<div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
				<div className="animate-marquee flex w-max items-center gap-14">
					{[...COMPANIES, ...COMPANIES].map((name, i) => <span key={`${name}-${i}`} className="select-none whitespace-nowrap text-lg font-semibold tracking-tight text-fg-muted/55 transition-colors duration-std hover:text-fg-muted">
							{name}
						</span>)}
				</div>
			</div>
		</div>;
}
