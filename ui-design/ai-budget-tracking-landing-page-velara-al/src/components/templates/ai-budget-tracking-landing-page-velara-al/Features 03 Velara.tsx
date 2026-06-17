"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Features03Velara({ className }: { className?: string }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <section className={"bg-black py-[90px] px-6 md:px-[60px] font-['Inter',_sans-serif] relative overflow-hidden " + (className || "")}>
        {/* BACKGROUND ACCENTS */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1350px] mx-auto relative z-10">

          {/* TOP ROW: Two Columns */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20">

            {/* LEFT COLUMN: Map Mockup */}
            <div className="w-full lg:w-[55%] relative">
              <div className="bg-[#111111] border border-[#222222] rounded-[24px] p-8 md:p-12 min-h-[480px] relative overflow-hidden group">

                {/* Immersive Video Map Background */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none mix-blend-screen"
                >
                  <source src="https://cdn.jiro.build/Velara/make-it-169-and-make-this-animation-like-world-cir.mp4" type="video/mp4" />
                </video>

                {/* Flag Pin 1 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute top-[20%] right-[12%] w-12 h-12 border-2 border-white/20 rounded-full p-1 bg-black/40 backdrop-blur-md z-20"
                >
                  <div className="w-full h-full rounded-full bg-[#DE2910] flex items-center justify-center shadow-lg">
                    <span className="text-[#FFDE00] text-[14px]">★</span>
                  </div>
                </motion.div>

                {/* Flag Pin 2 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-[25%] right-[30%] w-12 h-12 border-2 border-white/20 rounded-full p-1 bg-black/40 backdrop-blur-md z-20"
                >
                  <div className="w-full h-full rounded-full overflow-hidden flex shadow-lg">
                    <div className="w-1/3 h-full bg-[#D91023]" />
                    <div className="w-1/3 h-full bg-white" />
                    <div className="w-1/3 h-full bg-[#D91023]" />
                  </div>
                </motion.div>

                {/* Primary Glass Card: Bank Transfer */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="absolute top-1/2 left-8 md:left-12 -translate-y-1/2 w-[300px] bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[28px] p-7 shadow-2xl z-30"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-[#A855F7]/20 rounded-xl flex items-center justify-center border border-[#A855F7]/30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                      <span className="text-[11px] text-white/50 font-medium">Auto-Free</span>
                    </div>
                  </div>

                  <h4 className="text-[17px] font-bold text-white mb-6">Transfer Tracking</h4>

                  <div className="flex items-center justify-between mb-8 relative">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border-2 border-white/10 p-0.5">
                        <div className="w-full h-full rounded-full bg-[#A855F7] flex items-center justify-center text-[10px] font-bold text-white">US</div>
                      </div>
                      <span className="text-[9px] font-bold text-[#A855F7] uppercase tracking-tighter">Paypal</span>
                    </div>

                    <div className="flex-1 px-4 relative">
                      <div className="w-full border-t border-dashed border-white/20 relative">
                        <motion.div
                          animate={{ x: [-10, 40, -10] }}
                          transition={{ duration: 4, repeat: Infinity as number, repeatType: "loop" as const }}
                          className="absolute -top-1.5 left-0 text-[12px] text-[#A855F7]"
                        >
                          ↗
                        </motion.div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border-2 border-white/10 p-0.5">
                        <div className="w-full h-full rounded-full bg-[#DE2910] flex items-center justify-center text-[8px]">★</div>
                      </div>
                      <span className="text-[9px] font-bold text-[#A855F7] uppercase tracking-tighter">Paypal</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] text-white/40 font-medium">Balance Amount</p>
                    <p className="text-[32px] font-extrabold text-white leading-none">$4,850.00</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      </div>
                      <p className="text-[10px] text-white/30">Secure Encrypted Session</p>
                    </div>
                  </div>
                </motion.div>

                {/* Secondary Floating Card: Stats / Exchange */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="hidden xl:block absolute bottom-8 right-12 w-[220px] bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl p-4 z-30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Rate Live</span>
                    <span className="text-[10px] text-[#A855F7] font-bold">+0.12%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-[18px] font-bold text-white leading-tight">1 USD = 0.92 EUR</div>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-[#A855F7]"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* RIGHT COLUMN: Content */}
            <div className="w-full lg:w-[45%]">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-[44px] md:text-[54px] font-medium text-white leading-[1.15] mb-6 tracking-tight">
                  Built For A Global World Move Money Smarter
                </h2>
                <p className="text-[17px] text-[#777777] leading-[1.7] mb-8 font-medium">
                  Managing your finances shouldn't be complicated. Our intelligent payment platform gives you full control over your money — whether you're spending locally or globally.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    "Send and receive international payments",
                    "Spend worldwide with one smart card",
                    "Convert currencies at competitive rates"
                  ].map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-[18px] h-[18px] flex-shrink-0">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M3 9.5 L7 13.5 L15 5.5" stroke="#A855F7" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[16px] text-[#ffffff] font-semibold">{item}</span>
                    </div>
                  ))}
                </div>

                <button className="bg-[#ffffff] text-[#111111] px-10 py-5 rounded-full text-[17px] font-bold shadow-lg shadow-white/5 hover:bg-[#f5f5f5] hover:-translate-y-0.5 transition-all duration-300">
                  Try for Free
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
