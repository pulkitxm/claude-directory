import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

const SERVICE_OPTIONS = ['Brand', 'Digital', 'Campaign', 'Other'];

export function ServicePills() {
  const [services, setServices] = useState<string[]>([]);

  const toggleService = (option: string) => {
    setServices((current) =>
      current.includes(option) ? current.filter((service) => service !== option) : [...current, option],
    );
  };

  return (
    <section aria-labelledby="service-prompt">
      <h2 id="service-prompt" className="text-2xl font-medium tracking-tight mb-2">
        What sort of service?
      </h2>
      <p className="opacity-85 text-[#738273] mb-8">Select all that apply</p>

      <div className="flex flex-wrap gap-3 mb-7">
        {SERVICE_OPTIONS.map((option) => {
          const isSelected = services.includes(option);
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggleService(option)}
              whileTap={{ scale: 0.96 }}
              aria-pressed={isSelected}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-colors duration-200 ${
                isSelected
                  ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform'
                  : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
              }`}
            >
              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0, y: -8 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-center justify-center"
                  >
                    <Check size={15} strokeWidth={3} aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
              {option}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {services.length === 0 ? (
          <motion.p
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="italic text-xs text-[#1C2E1E]"
          >
            Please click to select services above.
          </motion.p>
        ) : (
          <motion.div
            key="banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="overflow-hidden max-w-2xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 bg-[#FAFBF9] border border-[#ECF0EB] rounded-2xl px-6 py-4">
              <p className="text-sm text-[#1C2E1E]">
                Ready to inquire about: <span className="font-medium">{services.join(', ')}</span>
              </p>
              <button
                type="button"
                className="flex items-center gap-1.5 text-[#4D6D47] uppercase text-xs font-semibold tracking-[0.08em] hover:opacity-70 transition-opacity"
              >
                Let&apos;s Go
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
