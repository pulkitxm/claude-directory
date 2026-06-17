import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Manifesto } from "./components/Manifesto";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { Process } from "./components/Process";
import { Specimen } from "./components/Specimen";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { Journal } from "./components/Journal";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";

// ─────────────────────────────────────────────────────────────────────────────
// OBELISK — Bold Typography design system, expressed as a single-page editorial
// manifesto. Sections flow headline → subhead → body → action, alternating the
// background ↔ muted grounds, separated by full-width hairline rules.
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      {/* Skip link for keyboard users */}
      <a
        href="#manifesto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <Header />

      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Stats />
        <Features />
        <Process />
        <Specimen />
        <Pricing />
        <Testimonials />
        <Faq />
        <Journal />
        <FinalCta />
      </main>

      <Footer />

      {/* Full-page noise grain at ~1.5% opacity */}
      <div className="grain-overlay" aria-hidden />
    </>
  );
}
