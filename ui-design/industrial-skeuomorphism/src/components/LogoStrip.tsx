import { Container, MonoLabel } from "./primitives";

/** Stamped partner marks — etched into the chassis like a rating plate. */
const PARTNERS = [
	"NORTHGATE ROBOTICS",
	"VALERA GRID",
	"OMNI-FAB",
	"HELIOS POWER",
	"DELTA MACHINEWORKS",
	"AXION FREIGHT",
];

export function LogoStrip() {
	return (
		<section aria-label="Trusted by" className="pb-4">
			<Container>
				<div
					className="rounded-xl bg-chassis px-6 py-6"
					style={{ boxShadow: "var(--shadow-recessed-soft)" }}
				>
					<p className="mb-5 text-center">
						<MonoLabel>FIELDED ON 4,200+ MACHINES ACROSS 38 PLANTS</MonoLabel>
					</p>
					<ul className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
						{PARTNERS.map((p) => (
							<li
								key={p}
								className="stamp text-center text-[0.7rem] text-label/70 transition-colors duration-300 hover:text-ink"
							>
								{p}
							</li>
						))}
					</ul>
				</div>
			</Container>
		</section>
	);
}
