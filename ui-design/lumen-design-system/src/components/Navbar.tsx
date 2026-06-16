import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Product", href: "#features" },
  { label: "Tokens", href: "#tokens" },
  { label: "Components", href: "#components" },
  { label: "Pricing", href: "#pricing" },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Subtle frosted backdrop appears once the page scrolls off the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          "transition-[background-color,border-color,backdrop-filter] duration-std ease-expo",
          scrolled
            ? "border-b border-white/[0.06] bg-bg-base/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <nav className="container-page flex h-16 items-center justify-between">
          <a
            href="#top"
            className="flex items-center gap-2.5 text-fg"
            aria-label="Lumen home"
          >
            <Logo className="h-7 w-7" />
            <span className="text-[15px] font-semibold tracking-tight">
              Lumen
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors duration-quick ease-expo hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" href="#">
              Sign in
            </Button>
            <Button variant="primary" size="sm" href="#pricing">
              Start building
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-fg transition-colors duration-quick hover:bg-white/[0.06] md:hidden"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2, ease: EXPO }}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EXPO }}
            className="border-b border-white/[0.06] bg-bg-base/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-fg-muted transition-colors duration-quick hover:bg-white/[0.05] hover:text-fg"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <Button variant="secondary" size="md" href="#">
                  Sign in
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  href="#pricing"
                  className="w-full"
                >
                  Start building
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
