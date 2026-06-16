import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EXPO = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds of delay before this element animates in. */
  delay?: number;
  /** Entrance flavour: fade-up (default) or scale-in. */
  mode?: "up" | "scale";
  as?: "div" | "section" | "li" | "span";
}

/**
 * Scroll-triggered entrance: fades + lifts (or scales) into place once ~18% of
 * the element is in view, animating only once. Movement is small (24px) and the
 * easing is expo-out, per the system. Honours reduced motion automatically via
 * Framer Motion's MotionConfig + our CSS override.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  mode = "up",
  as = "div",
}: RevealProps) {
  const variants: Variants = {
    hidden:
      mode === "scale"
        ? { opacity: 0, scale: 0.95 }
        : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: EXPO, delay },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered container — children using <Reveal> still control their own
 * transition, but this orchestrates an 0.08s cascade when paired with
 * variants-driven children. Used for the bento + logo strips.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** A child of <RevealGroup> that fades up as part of the cascade. */
export function RevealItem({
  children,
  className,
  mode = "up",
}: {
  children: ReactNode;
  className?: string;
  mode?: "up" | "scale";
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden:
          mode === "scale"
            ? { opacity: 0, scale: 0.95 }
            : { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: EXPO },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
