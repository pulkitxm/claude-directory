import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Monospace uppercase section label — the recurring "FILED UNDER / SECTION 02"
 * tag that gives every block its newspaper rubric.
 */
export function Kicker({
  children,
  className,
  marker = true,
}: {
  children: ReactNode;
  className?: string;
  marker?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.25em]",
        className,
      )}
    >
      {marker && (
        <span
          aria-hidden
          className="inline-block h-2 w-2 bg-editorial"
        />
      )}
      {children}
    </span>
  );
}
