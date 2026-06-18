/**
 * Tiny className joiner. shadcn projects usually pull in clsx + tailwind-merge;
 * this keeps the experiment dependency-light while honouring the convention so
 * the component's `cn(...)` calls resolve from `@/lib/utils`.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
