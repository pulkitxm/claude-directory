/**
 * Tiny className joiner. shadcn projects usually pull in clsx + tailwind-merge;
 * this keeps the experiment dependency-light while honoring the convention so
 * `@/lib/utils` resolves exactly where a generated shadcn project would put it.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
