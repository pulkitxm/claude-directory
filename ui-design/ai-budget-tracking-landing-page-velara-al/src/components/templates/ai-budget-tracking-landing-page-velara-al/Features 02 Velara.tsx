"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Bell, ArrowRight, ChevronRight } from "lucide-react";

export default function Features02Velara({ className }: { className?: string }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section
        className={"bg-black py-[90px] px-6 md:px-[60px] font-sans relative overflow-hidden " + (className || "")}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* BACKGROUND ACCENTS */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1350px] mx-auto relative z-10">

          {/* HEADER ROW */}
          <header className="flex flex-col md:flex-row justify-between items-end gap-8 mb-[60px]">
            <div className="flex-1">
              <div className="flex items-center gap-[10px] mb-3">
                <span className="text-[14px] text-[#555555] font-medium">01.</span>
                <span className="text-[#333333]">&mdash;</span>
                <span className="text-[13px] text-[#555555] font-medium tracking-[2px] uppercase">Features</span>
              </div>
              <h2 className="text-[36px] md:text-[52px] font-medium text-white leading-[1.1] max-w-[820px] mb-4">
                Automated budgets, encrypted accounts, clear insights.
              </h2>
              <p className="text-[16px] text-[#666666] font-medium">
                With Velara, you always know where your money&apos;s going.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#f0f0f0" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-white text-[#0a0a0a] text-[14px] font-medium border-none rounded-full flex items-center gap-2 transition-all self-start md:self-end shadow-xl"
            >
              Explore Features <ArrowRight size={16} />
            </motion.button>
          </header>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6">

            {/* CARD 1 — Encrypted Accounts */}
            <div className="md:col-span-4 bg-[#161616] border border-[#222222] rounded-[24px] p-8 min-h-[520px] flex flex-col overflow-hidden relative group">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#252525] rounded-full mb-8 self-start">
                <Lock size={12} className="text-[#888888]" />
                <span className="text-[12px] text-[#888888] font-medium tracking-wide">Encrypted Accounts</span>
              </div>

              <h3 className="text-white text-[32px] font-medium mb-3 opacity-90">256-bit Encryption</h3>
              <p className="text-[#666666] text-[14px] leading-[1.6] max-w-[260px]">
                Accounts are encrypted end-to-end and protected with multi-factor authentication.
              </p>

              <div className="flex-1 flex items-end pt-8 relative">
                <div className="relative w-full h-[300px] mt-auto flex justify-center md:justify-start">
                  {/* Card 3 (Back) */}
                  <div
                    className="absolute bottom-0 left-[60px] w-[350px] h-[220px] rounded-[24px] bg-[#222222] border border-[#333333] z-0 transition-transform duration-500 group-hover:-translate-y-8"
                    style={{ transform: "rotate(-10deg) translateY(-45px)" }}
                  >
                    <div className="absolute top-7 right-7 w-16 h-12 bg-white/5 rounded-lg" />
                  </div>
                  {/* Card 2 (Middle) */}
                  <div
                    className="absolute bottom-0 left-[30px] w-[350px] h-[220px] rounded-[24px] bg-[#1a1a1a] border border-[#2e2e2e] z-10 transition-transform duration-500 group-hover:-translate-y-4"
                    style={{ transform: "rotate(-5deg) translateY(-22px)" }}
                  >
                    <div className="absolute top-7 right-7 w-16 h-12 bg-white/5 rounded-lg" />
                  </div>
                  {/* Card 1 (Front) */}
                  <div
                    className="absolute bottom-0 left-0 w-[350px] h-[220px] rounded-[24px] border border-[#3a3a3a] z-20 transition-all duration-500 group-hover:rotate-0 group-hover:translate-x-5 shadow-2xl overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 50%, #1e1e1e 100%)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
                    <div
                      className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-white/[0.03] pointer-events-none"
                      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                    />
                    <div className="p-9 flex flex-col h-full justify-between relative z-10">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[16px] text-[#A855F7]">&#10035;</span>
                        <span className="text-white text-[24px] font-medium tracking-tight">Velara</span>
                      </div>
                      <div className="opacity-10 text-[18px] font-bold uppercase tracking-[0.4em] pointer-events-none">
                        Velara &reg;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2 — Smart Budgeting */}
            <div className="md:col-span-6 bg-[#161616] border border-[#222222] rounded-[24px] p-8 md:p-10 flex flex-col gap-10 overflow-hidden min-h-[520px]">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#252525] rounded-full mb-8">
                    <span className="text-[14px] text-[#888888] font-medium">$</span>
                    <span className="text-[12px] text-[#888888] font-medium tracking-wide">Smart Budgeting</span>
                  </div>
                  <h3 className="text-white text-[32px] font-medium leading-[1.1] mb-2">
                    Automated Budgets &amp; Alerts
                  </h3>
                </div>
                <p className="text-[#666666] text-[14px] leading-[1.7] flex-1 md:mt-12 transition-colors">
                  Velara builds budgets for you, auto-categorizes spending, and surfaces real-time alerts and insights.
                </p>
              </div>

              <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-[20px] p-6 shadow-inner flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#252525] flex items-center justify-center">
                    <Bell size={18} className="text-[#888888]" />
                  </div>
                  <div>
                    <h4 className="text-white text-[15px] font-medium">Smart Alert System</h4>
                    <p className="text-[#555555] text-[12px]">Get notified instantly about important transactions</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: "Payment received: +$2,450", time: "2m ago", color: "#2ecc71" },
                    { label: "Bill due: Electric -$127.50", time: "1h ago", color: "#3b82f6" },
                    { label: "Low balance warning", time: "5h ago", color: "#f59e0b" },
                  ].map((alert: { label: string; time: string; color: string }, i: number) => (
                    <div
                      key={i}
                      className="bg-[#161616] border border-[#222222] p-3.5 px-5 rounded-[12px] flex items-center justify-between transition-all hover:border-[#333333] cursor-pointer group/alert"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full group-hover/alert:scale-110 transition-transform"
                          style={{ backgroundColor: alert.color }}
                        />
                        <span className={"text-[14px] font-[500] transition-colors group-hover/alert:text-white " + (i === 0 ? "text-white" : "text-[#999999]")}>
                          {alert.label}
                        </span>
                      </div>
                      <span className="text-[#555555] text-[12px]">{alert.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CARD 3 — Clear Insights */}
            <div className="md:col-span-6 bg-[#161616] border border-[#222222] rounded-[24px] p-8 md:p-10 flex flex-col gap-10 overflow-hidden min-h-[440px]">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#252525] rounded-full mb-8">
                    <span className="text-[14px] text-[#888888] font-medium">$</span>
                    <span className="text-[12px] text-[#888888] font-medium tracking-wide">Clear Insights</span>
                  </div>
                  <h3 className="text-white text-[32px] font-medium leading-[1.1] mb-2">
                    Clear Insights at a Glance
                  </h3>
                </div>
                <p className="text-[#666666] text-[14px] leading-[1.7] flex-1 md:mt-12 transition-colors">
                  Track trends, goals, and progress so you always know where your money&apos;s going.
                </p>
              </div>

              <div className="bg-[#1a1a1a]/40 border border-[#252525] rounded-[20px] p-6 flex-1 flex flex-col justify-center overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <motion.span
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" as const }}
                    className="text-[#888888] text-[13px] font-medium uppercase tracking-wider"
                  >
                    Monthly Budget
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
                    className="text-white/60 text-[13px] font-medium tracking-wide"
                  >
                    $3,200
                  </motion.span>
                </div>

                <div className="flex gap-[4px] h-[36px] mb-6">
                  {Array.from({ length: 42 }).map((_: unknown, i: number) => {
                    let color = "#353535";
                    if (i < 12) color = "#A855F7";
                    else if (i < 18) color = "#c084fc";
                    else if (i < 24) color = "#e9d5ff";

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20, scaleY: 0.2 }}
                        whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: i * 0.025,
                          duration: 0.6,
                          ease: [0.215, 0.61, 0.355, 1.0] as const,
                        }}
                        className="flex-1 rounded-full origin-bottom relative"
                        style={{ backgroundColor: color }}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: [0, 1, 0] }}
                          viewport={{ once: true }}
                          transition={{
                            delay: i * 0.025,
                            duration: 0.8,
                          }}
                          className="absolute inset-0 rounded-full bg-white/40 blur-[4px]"
                        />
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" as const, delay: 1.0 }}
                    className="text-[#888888] text-[12px] font-medium"
                  >
                    $2,144 spent
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" as const, delay: 1.2 }}
                    className="text-[#A855F7] text-[12px] font-medium uppercase tracking-wider"
                  >
                    33% remaining
                  </motion.span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — 2 STACKED SMALL CARDS */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {/* MINI CARD 1 — This Month */}
              <div className="bg-[#111111] border border-[#222222] rounded-[32px] p-9 relative overflow-hidden group flex-1 flex flex-col justify-center shadow-xl">
                <p className="text-[#888888] text-[12px] font-medium mb-2">This month</p>
                <h4 className="text-white text-[48px] font-normal tracking-tight leading-none">850$</h4>
                <div className="flex mt-6">
                  <div className="bg-[#0d2e1a] text-[#2ecc71] text-[13px] font-medium px-4 py-1.5 rounded-full">
                    +42% vs last month
                  </div>
                </div>

                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <svg width="110" height="45" viewBox="0 0 80 32" fill="none" className="overflow-visible">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" as const }}
                      d="M0 22 C10 22 15 10 25 14 C35 18 40 10 50 16 C60 22 65 14 80 10"
                      stroke="#A855F7"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* MINI CARD 2 — Investment Growth */}
              <div className="bg-[#111111] border border-[#222222] rounded-[32px] p-9 relative overflow-hidden group flex-1 flex flex-col justify-center shadow-xl">
                <div className="absolute top-8 left-9 right-9 flex justify-end items-center">
                  <div className="text-[12px] text-[#666666] font-medium cursor-pointer flex items-center gap-1 hover:text-white transition-colors">
                    More <ChevronRight size={14} />
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-[#888888] text-[12px] font-medium mb-2">Portfolio Value</p>
                  <h4 className="text-white text-[48px] font-normal tracking-tight leading-none">$12.4k</h4>
                  <div className="flex mt-6">
                    <div className="bg-[#0d2e1a] text-[#2ecc71] text-[13px] font-medium px-4 py-1.5 rounded-full">
                      +8.3% this quarter
                    </div>
                  </div>
                </div>

                <div className="absolute right-10 bottom-12 opacity-90 group-hover:opacity-100 transition-opacity">
                  <svg width="110" height="45" viewBox="0 0 80 32" fill="none" className="overflow-visible">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" as const, delay: 0.3 }}
                      d="M0 25 C15 25 25 15 35 18 C45 21 55 10 80 6"
                      stroke="#A855F7"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
