import { display } from "./primitives";

/* A quiet "trusted by" strip — seamless CSS marquee of wordmarks set in the
   display face. Sits in a recessed clay tray so it reads as a shelf. */
const BRANDS = [
	"Marshmallow",
	"Puffin Labs",
	"Doughy",
	"Velvet",
	"Pillowfort",
	"Mochi",
	"Gummi Co.",
	"Squish",
];

export function LogoStrip() {
	return (
		<section aria-label="Trusted by" className="py-10">
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
				<div className="relative overflow-hidden rounded-[32px] clay-tray py-6 shadow-clay-deep">
					{/* edge fades */}
					<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#ece7f6] to-transparent" />
					<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#ece7f6] to-transparent" />

					<div className="marquee flex w-max items-center gap-14 px-7">
						{[...BRANDS, ...BRANDS].map((b, i) => (
							<span
								key={`${b}-${i}`}
								style={display}
								className="select-none whitespace-nowrap text-xl font-extrabold tracking-tight text-clay-muted/70"
							>
								{b}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Local marquee keyframes — scoped to this strip */}
			<style>{`
				.marquee { animation: clay-marquee 28s linear infinite; }
				@keyframes clay-marquee { to { transform: translateX(-50%); } }
				@media (prefers-reduced-motion: reduce) { .marquee { animation: none; } }
			`}</style>
		</section>
	);
}
