import { Glass, Kicker } from "@/components/lab/primitives";
export function IntegrationNotes() {
	return (
		<Glass className="p-6">
			<Kicker>Integration</Kicker>
			<h2 className="mt-3 text-lg font-semibold">
				A licensed renderer with live parameters
			</h2>
			<p className="mt-3 text-sm leading-relaxed">
				This study uses Paper Shaders 0.0.82 under Apache-2.0. The interface
				updates its public Warp parameters. Set speed to zero to pause, or use
				Reset to restore the initial configuration.
			</p>
			<p className="mt-3 text-sm">
				Run npm ci and npm run dev to explore the source. Full license notices
				accompany the build.
			</p>
		</Glass>
	);
}
