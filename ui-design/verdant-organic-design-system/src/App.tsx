import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { ProductDetail } from "./components/ProductDetail";
import { Benefits } from "./components/Benefits";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Journal } from "./components/Journal";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";

/**
 * Verdant — a full landing page expressing the Organic / Natural design system.
 * The global paper-grain overlay sits above the whole tree (fixed, multiply,
 * ~3.5% opacity) so every section carries the unbleached-paper texture. Section
 * backgrounds alternate between off-white, stone, sand, moss, and terracotta to
 * create the design system's varied, breathing rhythm.
 */
export default function App() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* CRITICAL global texture layer */}
      <div className="grain-overlay" aria-hidden />

      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <ProductDetail />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Journal />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
