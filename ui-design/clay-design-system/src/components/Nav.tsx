import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink, display } from "./primitives";
const LINKS = [{
  label: "Features",
  href: "#features"
}, {
  label: "Showcase",
  href: "#showcase"
}, {
  label: "Pricing",
  href: "#pricing"
}, {
  label: "FAQ",
  href: "#faq"
}];
export function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return <header className="fixed inset-x-0 top-0 z-50">
			<div className="relative z-50 mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6">
				<nav className="flex h-16 items-center justify-between rounded-[28px] bg-clay-cardBg px-3 shadow-clay-button-soft backdrop-blur-xl sm:h-20 sm:rounded-[36px] sm:px-5" aria-label="Primary">
					<Logo className="pl-1.5" />

					{}
					<ul className="hidden items-center gap-1 lg:flex">
						{LINKS.map(l => <li key={l.href}>
								<a href={l.href} style={display} className="rounded-2xl px-4 py-2.5 text-sm font-bold text-clay-muted outline-none transition-colors duration-200 hover:bg-clay-accent/8 hover:text-clay-accent focus-visible:ring-4 focus-visible:ring-clay-accent/30">
									{l.label}
								</a>
							</li>)}
					</ul>

					<div className="flex items-center gap-2">
						{}
						<div className="hidden items-center gap-2 sm:flex">
							<ButtonLink href="#pricing" variant="ghost" size="sm">
								Sign in
							</ButtonLink>
							<ButtonLink href="#cta" size="sm">
								Get clay
							</ButtonLink>
						</div>

						{}
						<button type="button" onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-clay-foreground shadow-clay-button-soft outline-none transition-all duration-200 active:scale-[0.9] active:shadow-clay-pressed focus-visible:ring-4 focus-visible:ring-clay-accent/35 lg:hidden">
							{open ? <X size={22} /> : <Menu size={22} />}
						</button>
					</div>
				</nav>
			</div>

			{}
			<div className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
				<div className="absolute inset-0 bg-clay-canvas/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
				<div className={`absolute inset-x-4 top-28 rounded-[36px] bg-clay-cardBg p-6 shadow-clay-card backdrop-blur-xl transition-all duration-300 ${open ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"}`}>
					<ul className="flex flex-col gap-2">
						{LINKS.map(l => <li key={l.href}>
								<a href={l.href} onClick={() => setOpen(false)} style={display} className="block rounded-2xl px-5 py-4 text-lg font-bold text-clay-foreground outline-none transition-all duration-200 hover:bg-clay-accent/8 hover:text-clay-accent active:scale-[0.97] focus-visible:ring-4 focus-visible:ring-clay-accent/30">
									{l.label}
								</a>
							</li>)}
					</ul>
					<div className="mt-4 flex flex-col gap-3">
						<ButtonLink href="#cta" onClick={() => setOpen(false)} className="w-full">
							Get clay
						</ButtonLink>
						<ButtonLink href="#pricing" variant="secondary" onClick={() => setOpen(false)} className="w-full">
							Sign in
						</ButtonLink>
					</div>
				</div>
			</div>
		</header>;
}
