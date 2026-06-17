import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type EyebrowProps = {
  children: ReactNode;
  /** Optional leading icon/dot node, rendered before the label. */
  icon?: ReactNode;
  /** Flip colours for use on dark (moss/terracotta) section backgrounds. */
  onDark?: boolean;
  className?: string;
};

/**
 * The shared pill "eyebrow" used above every section title and on the hero —
 * one definition so the kicker treatment can never drift between sections.
 * Pass `icon` for a leading mark (a dot, a Lucide glyph, etc.).
 */
export function Eyebrow({ children, icon, onDark = false, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]",
        onDark
          ? "border-white/25 bg-white/10 text-primary-foreground"
          : "border-border/70 bg-card text-secondary",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
