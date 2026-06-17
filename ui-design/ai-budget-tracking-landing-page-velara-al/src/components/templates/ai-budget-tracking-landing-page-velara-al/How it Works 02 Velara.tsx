"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Wallet, TrendingUp, CheckCircle2, ArrowUpRight, Zap, Sparkles } from "lucide-react";

export default function HowItWorks02Velara({ className }: { className?: string }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section
        className={"bg-black py-[90px] px-6 md:px-[60px] font-['Inter',_sans-serif] relative overflow-hidden " + (className || "")}
      >
        {/* BACKGROUND ACCENTS */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[60%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1450px] mx-auto relative z-10">

          {/* HEADER */}
          <header className="mb-[60px]">
            <div className="flex items-center gap-[10px] mb-3">
              <span className="text-[14px] text-[#555555] font-medium">02.</span>
              <span className="text-[#333333]">&#8212;</span>
              <span className="text-[13px] text-[#555555] font-medium tracking-[2px] uppercase">How It Works</span>
            </div>
            <h2 className="text-[36px] md:text-[52px] font-medium text-white leading-[1.1] max-w-[820px] mb-4">
              Your Financial Partner<br />
              in 3 Easy Steps
            </h2>
            <p className="text-[16px] text-[#666666] font-medium">
              Follow our simple process to take complete control of your financial future.
            </p>
          </header>

          {/* 3-STEP CARDS ROW */}
          <div className="flex flex-col lg:flex-row gap-5 items-stretch">

            {/* CARD 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1 bg-[#161616] border border-[#242424] rounded-[20px] overflow-hidden flex flex-col group"
            >
              <div className="bg-[#111111] p-12 border-b border-[#222222]/60 relative min-h-[480px] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                    backgroundSize: "100% 4px"
                  }}
                />
                <div className="relative z-10 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[24px] p-[28px] w-[300px] md:w-[340px] transition-transform duration-500 group-hover:scale-[1.03]">
                  <div className="flex flex-col items-center">
                    <h4 className="text-[15px] text-[#ffffff] font-semibold mb-6">Create your account</h4>
                    <div className="w-full space-y-3 mb-5">
                      <div className="bg-[#222222] border border-[#2a2a2a] rounded-[12px] px-4 py-3.5 text-[14px] text-[#777777] font-medium">
                        Email Address
                      </div>
                      <div className="bg-[#222222] border border-[#2a2a2a] rounded-[12px] px-4 py-3.5 text-[14px] text-[#777777] font-medium">
                        Password
                      </div>
                    </div>
                    <button className="w-full bg-[#A855F7] text-[#ffffff] rounded-[12px] py-3.5 text-[15px] font-bold border-none hover:brightness-110 active:scale-[0.98] transition-all">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-7 md:p-8 pb-8 md:pb-10 bg-[#161616] flex-1 flex flex-col justify-start min-h-[160px]">
                <h3 className="text-white text-[22px] font-medium mb-2.5 tracking-tight leading-tight">Sign Up in Minutes</h3>
                <p className="text-[#777777] text-[14px] leading-[1.65] font-medium">
                  Create your Fintech account anywhere on web or mobile.
                </p>
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 bg-[#161616] border border-[#242424] rounded-[20px] overflow-hidden flex flex-col group"
            >
              <div className="bg-[#111111] p-12 border-b border-[#222222]/60 relative min-h-[480px] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                    backgroundSize: "100% 4px"
                  }}
                />
                <div className="relative z-10 w-[300px] md:w-[340px] flex flex-col gap-4 transition-transform duration-500 group-hover:translate-y-[-5px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-white font-bold">Financial Goals</span>
                    <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                      <Target size={12} className="text-[#A855F7]" />
                      <span className="text-[10px] text-white/40 uppercase font-black">active</span>
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7]">
                          <Wallet size={18} />
                        </div>
                        <div>
                          <p className="text-[13px] text-white font-semibold">New House</p>
                          <p className="text-[10px] text-white/30 font-medium">Target: $150k</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] text-[#A855F7] font-black">45%</p>
                      </div>
                    </div>
                    <div className="relative h-1.5 bg-[#222222] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "45%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute left-0 top-0 h-full bg-[#A855F7] rounded-full"
                      />
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 shadow-xl translate-x-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          <TrendingUp size={18} />
                        </div>
                        <div>
                          <p className="text-[13px] text-white font-semibold">Stock Portfolio</p>
                          <p className="text-[10px] text-white/30 font-medium">Target: $25k</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] text-emerald-500 font-black">72%</p>
                      </div>
                    </div>
                    <div className="relative h-1.5 bg-[#222222] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "72%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="absolute left-0 top-0 h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 self-center mt-2 shadow-2xl">
                    <CheckCircle2 size={14} className="text-[#A855F7]" />
                    <span className="text-[11px] text-white/80 font-medium tracking-wide">AI Optimization Enabled</span>
                    <ArrowUpRight size={12} className="text-white/20" />
                  </div>
                </div>
              </div>
              <div className="p-7 md:p-8 pb-8 md:pb-10 bg-[#161616] flex-1 flex flex-col justify-start min-h-[160px]">
                <h3 className="text-white text-[22px] font-medium mb-2.5 tracking-tight leading-tight">Set Your Financial Goals</h3>
                <p className="text-[#777777] text-[14px] leading-[1.65] font-medium">
                  Customize your savings, investments, spendings and tracking.
                </p>
              </div>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 bg-[#161616] border border-[#242424] rounded-[20px] overflow-hidden flex flex-col group"
            >
              <div className="bg-[#111111] p-12 border-b border-[#222222]/60 relative min-h-[480px] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                    backgroundSize: "100% 4px"
                  }}
                />
                <div className="relative z-10 w-[300px] md:w-[340px] flex flex-col gap-3 group/mockup">
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#A855F7]/10 blur-2xl rounded-full -mr-10 -mt-10" />
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-[#A855F7]" />
                        <span className="text-[11px] text-white/50 font-bold uppercase tracking-wider">AI Insight</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-black">+14.2% Growth</span>
                    </div>
                    <h4 className="text-white text-[18px] font-bold leading-tight mb-4">
                      Your portfolio is currently outperforming the market.
                    </h4>
                    <div className="flex items-end gap-1.5 h-12 px-1">
                      {[40, 60, 35, 75, 55, 90, 65].map((h: number, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: h + "%" }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={"flex-1 rounded-t-sm " + (i === 5 ? "bg-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.3)]" : "bg-white/10")}
                        />
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-[#222222] border border-[#333333] rounded-2xl p-4 flex items-center justify-between shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <Zap size={16} />
                      </div>
                      <div>
                        <p className="text-[12px] text-white font-bold">Auto-Invest triggered</p>
                        <p className="text-[10px] text-white/30">$200 to S&P 500 Index</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-white/40">
                      <ArrowUpRight size={14} />
                    </div>
                  </motion.div>

                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-4 ml-6 backdrop-blur-sm">
                    <div className="w-3 h-3 rounded-full bg-[#A855F7] animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    <div>
                      <p className="text-[11px] text-white/70 font-semibold tracking-wide">Optimizing Portfolio Strategy</p>
                      <p className="text-[9px] text-white/20 font-medium">Rebalancing based on current trends</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-7 md:p-8 pb-8 md:pb-10 bg-[#161616] flex-1 flex flex-col justify-start min-h-[160px]">
                <h3 className="text-white text-[22px] font-medium mb-2.5 tracking-tight leading-tight">Grow Your Wealth</h3>
                <p className="text-[#777777] text-[14px] leading-[1.65] font-medium">
                  Monitor your financial growth with AI-powered insights with us.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
