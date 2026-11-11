export function AmbientBackground() {
    return (<div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-dotgrid">
			
			<div className="aurora left-1/2 top-[-12%] h-[34rem] w-[34rem] -translate-x-1/2 animate-aurora bg-primary/25" style={{ animationDelay: "0s" }}/>
			
			<div className="aurora left-[6%] top-[42%] h-[26rem] w-[26rem] animate-aurora bg-accent/40" style={{ animationDelay: "-7s" }}/>
			
			<div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,transparent_55%,hsl(var(--background))_100%)]"/>
		</div>);
}
