import type { ReactNode } from "react";

/* ----------------------------------------------------------------------------
   Shared layout + typographic primitives for the Serif system.
   Centralising these keeps every section visually consistent and avoids
   one-off styles.
---------------------------------------------------------------------------- */

function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** The signature section label: hairline rule · small-caps · hairline rule. */
export function SectionLabel({
  children,
  align = "center",
  tone = "default",
  className,
}: {
  children: ReactNode;
  align?: "center" | "left";
  tone?: "default" | "onDark";
  className?: string;
}) {
  // On the dark correspond panel the rule needs to be a light hairline and the
  // label switches to the lighter gold for contrast.
  const labelColor = tone === "onDark" ? "text-accent-secondary" : "text-accent";
  const ruleColor = tone === "onDark" ? "!bg-background/25" : "";

  if (align === "left") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <span className={cn("small-caps", labelColor)}>{children}</span>
        <span className={cn("rule w-16 origin-left animate-rule-grow", ruleColor)} aria-hidden />
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className={cn("rule flex-1 origin-right animate-rule-grow", ruleColor)} aria-hidden />
      <span className={cn("small-caps whitespace-nowrap", labelColor)}>{children}</span>
      <span className={cn("rule flex-1 origin-left animate-rule-grow", ruleColor)} aria-hidden />
    </div>
  );
}

/** A standalone decorative gold rule with a centred ornament. */
export function OrnamentRule({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="rule w-12" />
      <span className="text-accent" style={{ fontFamily: '"Playfair Display", serif' }}>
        &#10086;
      </span>
      <span className="rule w-12" />
    </div>
  );
}

/** Standard editorial card. Composes accentTop / hover / elevated / featured. */
export function Card({
  children,
  accentTop = false,
  hover = false,
  elevated = false,
  featured = false,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  accentTop?: boolean;
  hover?: boolean;
  elevated?: boolean;
  featured?: boolean;
  as?: "div" | "article" | "li";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        // base: hairline border (color from the global `* { border-color }`
        // rule). No inline border style, so `hover:border-border-hover` is free
        // to win on hover.
        "relative rounded-lg border border-border transition-all duration-200 ease-out",
        elevated ? "shadow-md" : "shadow-sm",
        // surface: featured layers a 6% gold wash over an opaque white base via
        // stacked gradients (stays opaque, reads as a lifted card); otherwise a
        // plain white card.
        featured
          ? "bg-[linear-gradient(var(--accent-muted),var(--accent-muted)),linear-gradient(var(--card),var(--card))]"
          : "bg-card",
        hover && "hover:border-border-hover hover:bg-muted/30 hover:shadow-md",
        className,
      )}
    >
      {(accentTop || featured) && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] rounded-t-lg bg-accent"
        />
      )}
      {children}
    </Tag>
  );
}

/** Section wrapper that applies the generous vertical rhythm of the system. */
export function Section({
  id,
  children,
  className,
  bleed = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative z-10 py-24 md:py-32 lg:py-40", className)}
    >
      {bleed ? children : <div className="container-reading">{children}</div>}
    </section>
  );
}

export { cn };
