import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { brand, nav } from "../data/content";
import { Button } from "./Button";
import { CRISP } from "../motion";

// ─────────────────────────────────────────────────────────────────────────────
// Header — a thin, sticky editorial bar: wordmark on the left, mono links in the
// middle, a primary underline CTA on the right. Collapses to a full-screen
// typographic overlay menu on mobile. No fills, no shadow — just a hairline rule.
// ─────────────────────────────────────────────────────────────────────────────

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-colors duration-200 ease-crisp ${
          scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
      >
        <div className="container-bold flex h-16 items-center justify-between md:h-20">
          {/* Wordmark */}
          <a
            href="#top"
            className="group inline-flex items-baseline gap-1.5 text-foreground"
            aria-label={`${brand.name} home`}
          >
            <span className="text-xl font-extrabold tracking-tight md:text-2xl">{brand.name}</span>
            <span aria-hidden className="h-1.5 w-1.5 bg-accent transition-transform duration-150 group-hover:scale-150" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative label-mono text-foreground/80 transition-colors duration-150 hover:text-foreground"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-150 ease-crisp group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href="#pricing" variant="primary" size="sm">
              Get OBELISK
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
          </div>

          {/* Mobile toggle — 44px hit area */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center text-foreground lg:hidden"
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu — type as the whole interface */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: CRISP }}
            className="fixed inset-0 top-16 z-40 flex flex-col bg-background lg:hidden"
          >
            <nav className="container-bold flex flex-1 flex-col justify-center gap-2 py-10" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: CRISP, delay: 0.05 + i * 0.05 }}
                  className="border-b border-border py-4 text-4xl font-extrabold uppercase tracking-tight text-foreground"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="pt-8">
                <Button href="#pricing" variant="outline" size="lg" onClick={() => setOpen(false)}>
                  Get OBELISK
                  <ArrowRight size={18} strokeWidth={1.5} />
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
