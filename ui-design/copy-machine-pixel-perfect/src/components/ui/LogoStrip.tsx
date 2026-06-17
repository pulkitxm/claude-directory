import { motion } from "framer-motion";

const TEAMS = [
  "Helion Robotics",
  "Polaris Audio",
  "Northbridge Labs",
  "Verde Power",
  "Cobalt Sensors",
  "Atlas Avionics",
  "Marrow Medical",
  "Driftwood IoT",
];

export function LogoStrip() {
  return (
    <section
      aria-label="Teams shipping hardware on Foundry"
      className="relative border-y border-substrate-600/60 bg-substrate-900/40 py-8"
    >
      <div className="mx-auto mb-6 max-w-6xl px-5">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-silk-faint">
          Boards shipped on Foundry by hardware teams at
        </p>
      </div>

      {/* edge-fade marquee */}
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <motion.div
          className="flex w-max items-center gap-12 pr-12 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 34, ease: "linear", repeat: Infinity }}
        >
          {[...TEAMS, ...TEAMS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center gap-2.5 whitespace-nowrap font-display text-lg font-semibold tracking-tight text-silk-dim/80 transition-colors hover:text-silk"
            >
              <span className="grid h-6 w-6 place-items-center rounded-md border border-substrate-500 bg-substrate-800">
                <span className="h-1.5 w-1.5 rounded-full bg-copper/70" />
              </span>
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
