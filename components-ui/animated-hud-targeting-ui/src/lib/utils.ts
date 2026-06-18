/**
 * Minimal `cn` className combiner — joins truthy class fragments with a space.
 * Kept dependency-free (no clsx/tailwind-merge) so the component stays portable.
 */
export function cn(...inputs: Array<string | false | null | undefined>): string {
	return inputs.filter(Boolean).join(" ");
}
