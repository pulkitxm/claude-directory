export default function Hero() {
	return (
		<section
			className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 text-center"
			style={{ paddingTop: "calc(8rem - 75px)" }}
		>
			<h1
				className="animate-fade-rise max-w-7xl font-display text-5xl font-normal text-ink sm:text-7xl md:text-8xl"
				style={{ lineHeight: 0.95, letterSpacing: "-2.46px" }}
			>
				Beyond <em className="italic text-muted">silence,</em> we build{" "}
				<em className="italic text-muted">the eternal.</em>
			</h1>

			<p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
				Building platforms for brilliant minds, fearless makers, and thoughtful
				souls. Through the noise, we craft digital havens for deep work and pure
				flows.
			</p>

			<button
				type="button"
				className="animate-fade-rise-delay-2 mt-12 rounded-full bg-ink px-14 py-5 text-base text-background transition-transform duration-300 ease-out hover:scale-103"
			>
				Begin Journey
			</button>
		</section>
	);
}
