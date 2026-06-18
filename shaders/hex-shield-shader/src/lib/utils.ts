/**
 * Tiny className joiner. A generated shadcn project usually pulls in
 * clsx + tailwind-merge; this keeps the experiment dependency-light while
 * honoring the convention so `@/lib/utils` resolves exactly where the pasted
 * `shield-shader.tsx` imports `cn` from.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
