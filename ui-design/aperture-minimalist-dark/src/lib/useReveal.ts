import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook backed by IntersectionObserver.
 *
 * Returns a ref to attach to an element and a boolean that flips to `true` once
 * the element scrolls into view (one-shot). Pair it with the `.reveal` /
 * `reveal-in` pattern in components for gentle fade-up entrances that honour
 * the design system's "smooth and subtle" motion philosophy. If the user
 * prefers reduced motion, content is shown immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string } = {},
) {
  const { threshold = 0.18, rootMargin = "0px 0px -10% 0px" } = options;
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, shown };
}
