import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircuitBoard, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Showcase", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-4",
          scrolled
            ? "border-substrate-500/80 bg-substrate-900/80 shadow-panel backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 pl-1.5 pr-2"
          aria-label="Foundry home"
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-[10px] border border-copper/40 bg-copper/[0.08]">
            <CircuitBoard className="h-[18px] w-[18px] text-copper transition-transform duration-300 group-hover:rotate-90" />
            <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-mask shadow-mask-glow" />
          </span>
          <span className="font-display text-[17px] font-bold tracking-tightest text-silk">
            Foundry
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-silk-dim transition-colors hover:bg-silk/[0.05] hover:text-silk"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#cta"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-silk-dim transition-colors hover:text-silk sm:inline-flex"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2 text-sm font-semibold text-substrate-900 transition-all hover:bg-copper-bright hover:shadow-pad"
          >
            Start a board
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full text-silk-dim transition-colors hover:bg-silk/[0.05] hover:text-silk md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-[68px] z-40 rounded-2xl border border-substrate-500/80 bg-substrate-900/95 p-2 shadow-panel backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-silk-dim transition-colors hover:bg-silk/[0.05] hover:text-silk"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
