import type { InputHTMLAttributes, ReactNode } from "react";

/* ---- Decorative line + uppercase overline label ------------------------- */
export function Overline({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const lineColor = tone === "dark" ? "bg-foreground" : "bg-background/70";
  const textColor = tone === "dark" ? "text-muted-fg" : "text-background/70";
  return (
    <div className={["flex items-center gap-4", className].join(" ")}>
      {/* Decorative horizontal line: h-px w-8 md:w-12 */}
      <span aria-hidden className={["h-px w-8 md:w-12", lineColor].join(" ")} />
      <span
        className={[
          "font-sans text-[10px] sm:text-xs font-medium uppercase tracking-overline",
          textColor,
        ].join(" ")}
      >
        {children}
      </span>
    </div>
  );
}

/* ---- Mixed-italic / gold-emphasis headline fragment --------------------- */
export function Emphasis({ children }: { children: ReactNode }) {
  return <em className="font-serif italic text-accent">{children}</em>;
}

/* ---- Grayscale → colour editorial image, framed, with vertical label ---- */
export function EditorialImage({
  src,
  alt,
  aspect = "aspect-[3/4]",
  shadow = "shadow-feature",
  hoverShadow = "",
  verticalLabel,
  labelSide = "left",
  className = "",
}: {
  src: string;
  alt: string;
  aspect?: string;
  shadow?: string;
  hoverShadow?: string;
  verticalLabel?: string;
  labelSide?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden bg-muted-bg",
        aspect,
        shadow,
        hoverShadow,
        "transition-shadow duration-700 ease-luxe",
        className,
      ].join(" ")}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover grayscale transition-all duration-[1500ms] ease-luxe group-hover:grayscale-0 group-hover:scale-105 reduce-motion-noscale"
      />
      {/* Subtle inner border framing. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 shadow-frame" />
      {verticalLabel && (
        <span
          aria-hidden
          className={[
            "vertical-label absolute top-6 hidden lg:block",
            labelSide === "left" ? "left-5" : "right-5",
            "font-sans text-[10px] font-medium uppercase text-background",
            "mix-blend-difference",
          ].join(" ")}
        >
          {verticalLabel}
        </span>
      )}
    </div>
  );
}

/* ---- Underline-only input with italic Playfair placeholder -------------- */
export function Input({
  className = "",
  tone = "dark",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { tone?: "dark" | "light" }) {
  const border = tone === "dark" ? "border-foreground" : "border-background/40";
  const text = tone === "dark" ? "text-foreground" : "text-background";
  const placeholder =
    tone === "dark"
      ? "placeholder:text-muted-fg"
      : "placeholder:text-background/60";
  return (
    <input
      className={[
        "h-12 w-full bg-transparent border-b px-0 py-2",
        border,
        text,
        "font-sans text-sm",
        "placeholder:font-serif placeholder:italic",
        placeholder,
        "transition-colors duration-500 ease-luxe",
        "focus:outline-none focus-visible:outline-none focus-visible:border-accent",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
