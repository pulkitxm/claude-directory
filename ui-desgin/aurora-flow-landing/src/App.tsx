import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Ritual } from "@/components/ui/Ritual";
import { Soundscapes } from "@/components/ui/Soundscapes";
import { Stats } from "@/components/ui/Stats";
import { Pricing } from "@/components/ui/Pricing";
import { FAQ } from "@/components/ui/FAQ";
import { CTA } from "@/components/ui/CTA";
import { Footer } from "@/components/ui/Footer";

function App() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* fine grain over the whole page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] bg-grain opacity-[0.035] mix-blend-soft-light"
      />

      <Navbar />
      <Hero />
      <Marquee />
      <Ritual />
      <Soundscapes />
      <Stats />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

export default App;
