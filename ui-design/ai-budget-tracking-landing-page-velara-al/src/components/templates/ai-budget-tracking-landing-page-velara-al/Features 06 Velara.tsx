"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Features06Velara({ className }: { className?: string }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section className={"font-['Inter',_sans-serif] selection:bg-[#A855F7]/30 bg-black py-[96px] px-6 md:px-[60px] relative overflow-hidden " + (className || "")}>
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] bg-[#A855F7]/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1450px] mx-auto relative z-10">
          {/* PART 1 — SECURITY SECTION */}
          <div className="mb-[60px] md:mb-[100px]">
            <header className="mb-[50px]">
              <div className="flex items-center gap-[10px] mb-3">
                <span className="text-[14px] text-[#555555] font-medium">04.</span>
                <span className="text-[#333333]">—</span>
                <span className="text-[13px] text-[#555555] font-medium tracking-[2px] uppercase">Security & Commitment</span>
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[36px] md:text-[52px] font-medium text-white leading-[1.1] max-w-[820px] mb-4 tracking-tight"
              >
                Your Security is Our Commitment
              </motion.h2>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-8 items-start">
              {/* Feature 1 — lock */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group"
              >
                <div className="w-[52px] h-[52px] bg-gradient-to-br from-[#A855F7] to-[#7E22CE] rounded-[14px] flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(168,85,247,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[17px] text-white mb-2.5 transition-colors group-hover:text-[#A855F7]">Bank-Level Security Encryption</h3>
                <p className="text-[14px] text-white/40 leading-[1.6]">256-bit SSL secure environment for all your sensitive operations.</p>
              </motion.div>

              {/* Feature 2 — globe */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group"
              >
                <div className="w-[52px] h-[52px] bg-gradient-to-br from-[#A855F7] to-[#7E22CE] rounded-[14px] flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(168,85,247,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[17px] text-white mb-2.5 transition-colors group-hover:text-[#A855F7]">PCI-DSS & GDPR Compliant</h3>
                <p className="text-[14px] text-white/40 leading-[1.6]">We follow global level security certifications and standards.</p>
              </motion.div>

              {/* Feature 3 — shield */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group"
              >
                <div className="w-[52px] h-[52px] bg-gradient-to-br from-[#A855F7] to-[#7E22CE] rounded-[14px] flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(168,85,247,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12 L11 14 L15 10" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[17px] text-white mb-2.5 transition-colors group-hover:text-[#A855F7]">24/7 Threat Monitoring System</h3>
                <p className="text-[14px] text-white/40 leading-[1.6]">Always-on protection systems monitoring every transaction.</p>
              </motion.div>

              {/* Feature 4 — dollar/coin */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group"
              >
                <div className="w-[52px] h-[52px] bg-gradient-to-br from-[#A855F7] to-[#7E22CE] rounded-[14px] flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(168,85,247,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v12M9 9h4.5a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5H14"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[17px] text-white mb-2.5 transition-colors group-hover:text-[#A855F7]">Insurance Protection For Everything</h3>
                <p className="text-[14px] text-white/40 leading-[1.6]">Your deposits are covered up to $6000 for peace of mind.</p>
              </motion.div>
            </div>
          </div>

          {/* PART 2 — APP DOWNLOAD BANNER */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#111111] border border-[#242424] rounded-[30px] overflow-hidden min-h-[400px] relative flex flex-col lg:flex-row group"
            >
              {/* LEFT CONTENT */}
              <div className="flex-1 p-[40px] md:p-[60px] lg:p-[80px] flex flex-col justify-center relative z-20">
                <h2 className="font-medium text-[36px] md:text-[52px] text-white leading-[1.1] mb-6 tracking-tight">
                  Manage Your Finances Anywhere
                </h2>
                <p className="text-[16px] text-white/40 leading-[1.6] max-w-[400px] mb-10">
                  Fintech is available across all your favorite devices. Access anytime on mobile or web.
                </p>

                <div className="flex flex-wrap gap-[16px]">
                  {/* App Store button */}
                  <button className="bg-[#1c1c1e] border border-[#333333] rounded-[16px] p-[14px_28px] inline-flex items-center gap-[14px] hover:bg-[#2a2a2a] transition-all hover:scale-[1.05] hover:border-[#A855F7]/30 group/btn">
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="white" className="group-hover/btn:scale-110 transition-transform">
                      <path d="M16.7 12.8c0-3.2 2.6-4.7 2.7-4.8-1.5-2.1-3.7-2.4-4.5-2.4-1.9-.2-3.7 1.1-4.7 1.1-.9 0-2.4-1.1-4-1.1C3.9 5.7 1.1 7.3.4 10.1c-1.5 4.3.4 10.7 2.7 14.2 1.2 1.7 2.5 3.6 4.3 3.5 1.7-.1 2.4-1.1 4.5-1.1 2.1 0 2.7 1.1 4.5 1.1 1.8 0 3-1.8 4.2-3.5.7-1 1.3-2.1 1.7-3.2-4.5-1.7-5.2-5.3-4.6-8.3z"/>
                      <path d="M13.7 3.3C14.7 2.1 15.3.5 15.1 0c-1.5.1-3.4 1-4.4 2.2C9.7 3.4 9 5 9.3 6.4c1.7.1 3.4-.8 4.4-3.1z"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-[11px] text-white/40 leading-none mb-1 uppercase tracking-wider font-bold">Download on</p>
                      <p className="text-[17px] font-bold text-white leading-none">App Store</p>
                    </div>
                  </button>

                  {/* Google Play button */}
                  <button className="bg-[#1c1c1e] border border-[#333333] rounded-[16px] p-[14px_28px] inline-flex items-center gap-[14px] hover:bg-[#2a2a2a] transition-all hover:scale-[1.05] hover:border-[#A855F7]/30 group/btn">
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" className="group-hover/btn:scale-110 transition-transform">
                      <path d="M1 1L11 11L1 21" fill="#EA4335"/>
                      <path d="M1 1L11 11L19 6.5L11 2" fill="#FBBC04"/>
                      <path d="M1 21L11 11L19 15.5L11 20" fill="#34A853"/>
                      <path d="M19 6.5L11 11L19 15.5" fill="#4285F4"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-[11px] text-white/40 leading-none mb-1 uppercase tracking-wider font-bold">Download on</p>
                      <p className="text-[17px] font-bold text-white leading-none">Google Play</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE — Dashboard Mockup */}
              <div className="flex-1 relative overflow-hidden hidden lg:flex items-center justify-end">
                <div className="absolute right-[-40px] top-[60px] w-[640px] bg-[#1a1a1a] rounded-[20px_20px_0_0] border border-[#2a2a2a] overflow-hidden z-10 transition-transform duration-1000 group-hover:translate-x-[-10px] group-hover:translate-y-[-10px]">
                  {/* Browser Chrome */}
                  <div className="bg-[#141414] h-[40px] border-b border-[#2a2a2a] px-5 flex items-center gap-3">
                    <div className="flex gap-1.5 opacity-30">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[13px] text-white/60 font-semibold flex items-center gap-1.5 ml-6">
                      <span className="text-[#A855F7] text-[18px]">&#x2B21;</span> Finflow
                    </span>
                  </div>

                  <div className="flex h-[380px]">
                    <div className="w-[120px] bg-[#111111] border-r border-[#1e1e1e] py-6 flex flex-col gap-1">
                      {["Dashboard", "Orders", "Currency", "Gateway", "Reports", "Users"].map((l: string, i: number) => (
                        <div
                          key={i}
                          className={"p-[10px_20px] text-[10px] font-bold uppercase tracking-widest " + (i === 0 ? "text-[#A855F7] bg-[#A855F7]/5 border-l-2 border-[#A855F7]" : "text-white/20 hover:text-white/40 transition-colors")}
                        >
                          {l}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 bg-[#141414] p-6 flex flex-col gap-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[13px] font-bold text-white/80 mb-1">Expenses Summary</p>
                          <p className="text-[9px] text-white/20 tracking-widest uppercase font-bold">Real-time Analytics</p>
                        </div>
                        <div className="text-[20px] font-bold text-[#A855F7]">$142,390</div>
                      </div>
                      <div className="relative h-[120px] w-full">
                        <svg width="100%" height="100%" viewBox="0 0 400 100" fill="none" preserveAspectRatio="none">
                          <line x1="0" y1="25" x2="400" y2="25" stroke="#1e1e1e" strokeWidth="1"/>
                          <line x1="0" y1="50" x2="400" y2="50" stroke="#1e1e1e" strokeWidth="1"/>
                          <line x1="0" y1="75" x2="400" y2="75" stroke="#1e1e1e" strokeWidth="1"/>
                          <path d="M0 80 C30 75 50 60 80 50 C110 40 130 65 160 55 C190 45 210 30 240 25 C270 20 290 40 320 35 C350 30 370 45 400 40 L400 100 L0 100Z" fill="rgba(168,85,247,0.06)"/>
                          <path d="M0 80 C30 75 50 60 80 50 C110 40 130 65 160 55 C190 45 210 30 240 25 C270 20 290 40 320 35 C350 30 370 45 400 40" stroke="#A855F7" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                          <p className="text-[10px] text-white/30 uppercase font-black mb-1">Mutual Funds</p>
                          <p className="text-[16px] text-white font-bold">$12,000</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                          <p className="text-[10px] text-white/30 uppercase font-black mb-1">Crypto Assets</p>
                          <p className="text-[16px] text-white font-bold">$84,300</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-[-100px] w-[600px] h-[600px] bg-[#A855F7]/10 blur-[150px] rounded-full pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
