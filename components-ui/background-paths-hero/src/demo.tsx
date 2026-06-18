import { BackgroundPaths } from "@/components/ui/background-paths";

/**
 * Canonical usage example from the integration prompt. The live page in
 * `App.tsx` wraps the same component in a richer showcase (theme toggle +
 * preset switcher), but this is the minimal drop-in the component ships with.
 */
export function DemoBackgroundPaths() {
	return <BackgroundPaths title="Background Paths" />;
}
