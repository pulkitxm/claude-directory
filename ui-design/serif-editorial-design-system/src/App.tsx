import { Header } from "./components/Chrome";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { Benefits } from "./components/Benefits";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Journal } from "./components/Journal";
import { Faq } from "./components/Faq";
import { Correspond } from "./components/Correspond";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Ambient gold glow — warm atmospheric depth behind everything. */}
      <div
        aria-hidden
        className="ambient-glow"
        style={{ top: "-8%", left: "12%", width: "46rem", height: "46rem", background: "rgba(184,134,11,0.05)" }}
      />
      <div
        aria-hidden
        className="ambient-glow"
        style={{ top: "58%", right: "-6%", width: "40rem", height: "40rem", background: "rgba(212,168,75,0.045)" }}
      />

      {/* Paper grain overlay across the whole page (~30% opacity). */}
      <div aria-hidden className="paper-grain" />

      <a
        href="#features"
        className="sr-only z-[60] rounded-md bg-accent px-4 py-2 text-accent-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Header />

      <main>
        <Hero />
        <Stats />
        <Features />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Journal />
        <Faq />
        <Correspond />
      </main>

      <Footer />
    </div>
  );
}
