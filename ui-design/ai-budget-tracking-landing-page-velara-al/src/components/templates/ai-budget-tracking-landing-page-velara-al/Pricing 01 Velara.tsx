"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Rocket, Building2 } from "lucide-react";

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M6 10 L9 13 L14 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing01Velara({ className }: { className?: string }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" crossOrigin="anonymous" />

      <section className={"bg-black pt-[96px] pb-[160px] px-6 md:px-[60px] relative overflow-hidden " + (className || "")} style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A855F7]/5 blur-[120px] rounded-full" />
        </div>

        {/* Cosmic Horizon Effect */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden isolate">
          <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 w-[220%] aspect-[4/1] bg-black rounded-[100%] border-t border-[#A855F7]/50 shadow-[0_-30px_70px_rgba(168,85,247,0.3)]" />
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[140%] h-[250px] bg-gradient-to-t from-[#A855F7]/60 via-[#A855F7]/10 to-transparent blur-[60px] opacity-80" />
          <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-[#A855F7]/40 blur-[80px] rounded-full" />
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[250px] h-[80px] bg-[#A855F7]/50 blur-[50px] rounded-full" />
          <div className="absolute bottom-[0px] left-1/2 -translate-x-1/2 w-[120px] h-[40px] bg-white/40 blur-[15px] rounded-full" />
          {Array.from({ length: 40 }).map((_: unknown, i: number) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-40 animate-pulse"
              style={{
                width: ((i % 3) + 1.5) + "px",
                height: ((i % 3) + 1.5) + "px",
                left: ((i * 12.7) % 100) + "%",
                bottom: ((i * 17.3) % 550) + "px",
                animationDelay: (i * 0.1) + "s",
                animationDuration: ((i % 4) + 2) + "s"
              }}
            />
          ))}
        </div>

        <div className="max-w-[1450px] mx-auto relative z-10">

          {/* HEADER */}
          <header className="mb-[60px]">
            <div className="flex items-center gap-[10px] mb-3">
              <span className="text-[14px] text-[#555555] font-medium">05.</span>
              <span className="text-[#333333]">&#8212;</span>
              <span className="text-[13px] text-[#555555] font-medium tracking-[2px] uppercase">Pricing Plans</span>
            </div>
            <h2 className="text-[36px] md:text-[52px] font-medium text-white leading-[1.1] max-w-[820px] mb-4 tracking-tight">
              Select the Ideal Strategy for Your Monetary Requirements
            </h2>
            <p className="text-[16px] text-white/40 font-medium">
              Choose a plan that scales with your financial goals and team size.
            </p>
          </header>

          {/* PRICING CARDS ROW */}
          <div className="flex flex-col lg:flex-row gap-[24px] items-stretch">

            {/* CARD 1 — Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-[32px] flex flex-col group hover:border-[#A855F7]/50 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(168,85,247,0.1)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-[24px]">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[40px] h-[40px] bg-white/10 rounded-[12px] flex items-center justify-center ring-1 ring-white/20">
                    <Zap size={20} className="text-white" />
                  </div>
                  <span className="font-semibold text-[16px] text-white/90">Basic Plan</span>
                </div>
              </div>

              <div className="mb-[14px]">
                <span className="text-[48px] md:text-[56px] font-medium text-white tracking-tight">$10</span>
                <span className="text-[14px] text-white/40 font-medium ml-[8px]">per month</span>
              </div>

              <p className="text-[14px] text-white/50 mb-[32px] font-medium leading-[1.6]">
                Small-sized Teams of up to 20 employees
              </p>

              <button className="bg-white text-black rounded-full py-[14px] px-[20px] w-full text-[15px] font-semibold border-none cursor-pointer mb-[12px] hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Get Started
              </button>
              <button className="bg-transparent text-white/80 border border-white/10 rounded-full py-[13px] px-[20px] w-full text-[15px] font-medium cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all">
                Chat to sales
              </button>

              <div className="h-[1px] bg-white/5 my-[32px]" />

              <div className="flex flex-col gap-[16px]">
                <p className="text-[11px] font-bold text-white/30 tracking-[2px] mb-[4px] uppercase">FEATURES</p>
                {[
                  "Personalized Mindfulness",
                  "Simple dashboard for financial reports",
                  "Basic project management tools",
                  "Up to 10 users",
                  "Basic team collaboration tools"
                ].map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-[14px]">
                    <CheckIcon color="#FFFFFF" />
                    <span className="text-[14px] text-white/70 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 2 — Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 bg-white/[0.05] backdrop-blur-xl border border-[#A855F7]/40 rounded-[32px] p-[32px] flex flex-col group transition-all duration-500 relative shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(168,85,247,0.25)] hover:border-[#A855F7]"
            >
              <div className="flex items-center justify-between mb-[24px]">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[40px] h-[40px] bg-[#A855F7]/20 rounded-[12px] flex items-center justify-center ring-1 ring-[#A855F7]/40">
                    <Rocket size={20} className="text-[#A855F7]" />
                  </div>
                  <span className="font-semibold text-[16px] text-white/90">Pro Plan</span>
                </div>
                <div className="bg-[#A855F7] text-white rounded-full py-[5px] px-[14px] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  Popular
                </div>
              </div>

              <div className="mb-[14px]">
                <span className="text-[48px] md:text-[56px] font-medium text-white tracking-tight">$20</span>
                <span className="text-[14px] text-white/40 font-medium ml-[8px]">per month</span>
              </div>

              <p className="text-[14px] text-white/50 mb-[32px] font-medium leading-[1.6]">
                Medium-sized businesses 100 employees
              </p>

              <button className="bg-[#A855F7] text-white rounded-full py-[14px] px-[20px] w-full text-[15px] font-semibold border-none cursor-pointer mb-[12px] hover:bg-[#9333EA] transition-all hover:scale-[1.02] active:scale-[0.98]">
                Get Started
              </button>
              <button className="bg-transparent text-white/80 border border-white/10 rounded-full py-[13px] px-[20px] w-full text-[15px] font-medium cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all">
                Chat to sales
              </button>

              <div className="h-[1px] bg-white/5 my-[32px]" />

              <div className="flex flex-col gap-[16px]">
                <p className="text-[11px] font-bold text-white/30 tracking-[2px] mb-[4px] uppercase">FEATURES</p>
                {[
                  "Access to advanced features",
                  "Project and time tracking",
                  "Guided Mindfulness Activities",
                  "Up to 50 users",
                  "Integration with third-party apps"
                ].map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-[14px]">
                    <CheckIcon color="#A855F7" />
                    <span className="text-[14px] text-white/70 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 3 — Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-[32px] flex flex-col group hover:border-[#A855F7]/50 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(168,85,247,0.1)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-[24px]">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[40px] h-[40px] bg-white/10 rounded-[12px] flex items-center justify-center ring-1 ring-white/20">
                    <Building2 size={20} className="text-white" />
                  </div>
                  <span className="font-semibold text-[16px] text-white/90">Enterprise Plan</span>
                </div>
              </div>

              <div className="mb-[14px]">
                <span className="text-[48px] md:text-[56px] font-medium text-white tracking-tight">Custom</span>
              </div>

              <p className="text-[14px] text-white/50 mb-[32px] font-medium leading-[1.6]">
                Large corporations (200+ employees)
              </p>

              <button className="bg-white text-black rounded-full py-[14px] px-[20px] w-full text-[15px] font-semibold border-none cursor-pointer mb-[12px] hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Get Started
              </button>
              <button className="bg-transparent text-white/80 border border-white/10 rounded-full py-[13px] px-[20px] w-full text-[15px] font-medium cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all">
                Chat to sales
              </button>

              <div className="h-[1px] bg-white/5 my-[32px]" />

              <div className="flex flex-col gap-[16px]">
                <p className="text-[11px] font-bold text-white/30 tracking-[2px] mb-[4px] uppercase">FEATURES</p>
                {[
                  "Personalized Mindfulness",
                  "Basic Mood Tracking",
                  "Guided Mindfulness Activities",
                  "Personal Growth Tracker",
                  "Zen Zone (Basic Features)"
                ].map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-[14px]">
                    <CheckIcon color="#FFFFFF" />
                    <span className="text-[14px] text-white/70 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
