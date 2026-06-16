import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/content";

/* ---- Paper-grain noise overlay: fixed, full-viewport, ~2%, z-50 --------- */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="paper-grain pointer-events-none fixed inset-0 z-[60] opacity-[0.02]"
    />
  );
}

/* ---- Four visible vertical gridlines at column boundaries (desktop) -----
   Positioned to match the max-w-[1600px] container's px-16 edges and the
   middle thirds. Fixed, full-height, low opacity, pointer-events disabled. */
export function GridLines() {
  // Percentages chosen to read as an editorial 12-col frame.
  const positions = ["16.6%", "38.2%", "61.8%", "83.4%"];
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
    >
      <div className="relative mx-auto h-full max-w-[1600px]">
        {positions.map((left) => (
          <span
            key={left}
            style={{ left }}
            className="absolute top-0 h-full w-px bg-foreground/[0.12]"
          />
        ))}
      </div>
    </div>
  );
}

/* ---- Editorial navbar — thin, monogram left, links right ---------------- */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-luxe",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-foreground/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-5 md:px-16 md:py-6">
        <a
          href="#top"
          className="font-serif text-xl tracking-tight text-foreground transition-colors duration-500 ease-luxe hover:text-accent"
        >
          MAISON
          <span className="ml-2 align-top font-sans text-[10px] uppercase tracking-overline text-muted-fg">
            Vol. 01
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-sans text-xs font-medium uppercase tracking-overline text-foreground transition-colors duration-500 ease-luxe hover:text-accent"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-foreground transition-colors duration-500 ease-luxe hover:text-accent md:hidden focus-visible:outline-none focus-visible:text-accent"
        >
          {open ? (
            <X strokeWidth={1.25} className="h-6 w-6" />
          ) : (
            <Menu strokeWidth={1.25} className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-foreground/10 bg-background/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col px-8 py-6">
            {navLinks.map((link) => (
              <li key={link} className="border-b border-foreground/10 last:border-0">
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-sans text-xs font-medium uppercase tracking-overline text-foreground transition-colors duration-500 ease-luxe hover:text-accent"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
