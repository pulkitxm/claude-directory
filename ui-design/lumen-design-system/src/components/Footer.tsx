import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Product",
    links: ["Surfaces", "Motion", "Tokens", "Spotlights", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Figma kit", "Templates", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Brand", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-white/[0.06] bg-bg-deep">
      <div className="container-page py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <a href="#top" className="flex items-center gap-2.5 text-fg">
              <Logo className="h-7 w-7" />
              <span className="text-[15px] font-semibold tracking-tight">
                Lumen
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              The interface layer for software that feels fast. Cinematic
              ambient lighting, shipped as composable primitives.
            </p>
            <p className="mt-6 font-mono text-[11px] text-fg-muted/60">
              © {new Date().getFullYear()} Lumen Labs · MIT
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted/60">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-fg-muted transition-colors duration-quick ease-expo hover:text-fg"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="section-rule mt-12" />
        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] tracking-wider text-fg-muted/60">
            Built to express the Linear / Modern design language.
          </p>
          <div className="flex items-center gap-4 text-sm text-fg-muted">
            <a href="#" className="transition-colors hover:text-fg">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-fg">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-fg">
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
