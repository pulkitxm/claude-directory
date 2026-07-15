USE CATEGORY: "UI DESGIN"

## ENVIRONMENT

THIS TEMPLATE IS STRUCTURED FOR A NEXT.JS PROJECT WITH THE APP ROUTER:

- FILE PATHS USE /COMPONENTS/... AND /APP/PAGE.TSX
- COMPONENTS USE THE "USE CLIENT" DIRECTIVE
- IMPORTS USE THE @/COMPONENTS/... PATH ALIAS
- TAILWIND CSS FOR STYLING
- FRAMER-MOTION FOR ANIMATIONS
- LUCIDE-REACT FOR ICONS

IF YOU SUPPORT THIS EXACT STRUCTURE, APPLY THE FILES BELOW AS WRITTEN.

IF YOUR BUILDER USES A DIFFERENT STRUCTURE (E.G. /SRC DIRECTORY, PAGES
ROUTER, OR VITE + REACT), ADAPT THE FILE PATHS AND ENTRY POINT — BUT
KEEP EVERY COMPONENT FILE'S CODE 100% IDENTICAL TO WHAT'S PROVIDED
BELOW. DO NOT REWRITE, REFACTOR, OR REINTERPRET ANY COMPONENT.

THE ONLY ADAPTATIONS ALLOWED ARE:
- FILE PATHS (E.G. /SRC/COMPONENTS/... INSTEAD OF /COMPONENTS/...)
- ENTRY POINT FILE (E.G. SRC/APP.TSX INSTEAD OF APP/PAGE.TSX)
- REMOVING "USE CLIENT" DIRECTIVES IF YOUR BUILDER DOESN'T USE NEXT.JS
- REPLACING THE @/COMPONENTS/... ALIAS WITH THE CORRECT RELATIVE PATH
- REPLACING NEXT.JS-SPECIFIC IMPORTS (E.G. NEXT/IMAGE, NEXT/LINK) WITH
  STANDARD EQUIVALENTS (<IMG>, <A>) — ONLY IF YOUR BUILDER DOESN'T
  SUPPORT NEXT.JS
- INSTALLING ANY MISSING DEPENDENCIES VIA YOUR BUILDER'S PACKAGE MANAGER
  BEFORE APPLYING THE FILES

EVERYTHING ELSE — JSX, HOOKS, COMPONENT NAMES, DEFAULT EXPORTS, PROPS,
CLASSNAME VALUES, ANIMATIONS, STYLING, LOGIC — STAYS EXACTLY AS WRITTEN.
THE OUTPUT MUST RUN WITHOUT ANY ERRORS.

IF YOUR BUILDER CANNOT SUPPORT REACT + JSX AT ALL, STOP AND TELL THE USER
BEFORE PROCEEDING.

## ADD TEMPLATE: AI BUDGET TRACKING LANDING PAGE - VELARA AL

### FILE 1 OF 10: /COMPONENTS/TEMPLATES/AI-BUDGET-TRACKING-LANDING-PAGE-VELARA-AL/AI BUDGET TRACKING HERO VELARA.TSX

```tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Search, Bell, LayoutGrid, ArrowRight, Play, TrendingUp, Wallet, CreditCard, PieChart, MoreHorizontal, Sliders, Plus } from "lucide-react";

export default function AiBudgetTrackerHeroVelara({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const chartData: number[] = [35, 52, 41, 63, 48, 70, 88, 55, 72, 60, 45, 68];

  const navItems: string[] = ["Overview", "Features", "Pricing", "Developers", "Contact"];

  const assets: { label: string; val: string; change: string; color: string }[] = [
    { label: "Cloud Investment", val: "$24,000", change: "+2.4%", color: "#A855F7" },
    { label: "Secure Savings", val: "$12,850", change: "+4.1%", color: "#10b981" },
    { label: "Real Estate", val: "$45,600", change: "+6.2%", color: "#f59e0b" }
  ];

  const sidebarIcons = [LayoutGrid, Wallet, PieChart, CreditCard, Sliders];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" crossOrigin="anonymous" />

      <section className={"relative mb-12 overflow-hidden min-h-[1100px] pt-[10px] px-6 md:px-12 bg-black " + (className || "")}>
        {/* VIDEO BACKGROUND */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
        >
          <source
            src="https://cdn.jiro.build/Velara/Hero%2001.mp4"
            type="video/mp4"
          />
        </video>

        {/* OVERLAY FOR DEPTH */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-0" />

        {/* NAVIGATION INSIDE VIDEO */}
        <nav className="relative flex items-center justify-between py-4 z-50">
          {/* LOGO */}
          <div className="text-[20px] font-bold text-white tracking-tight">
            Velara AI
          </div>

          {/* CENTER LINKS - Desktop */}
          <div className="hidden md:flex items-center gap-[36px]">
            {navItems.map((item: string) => (
              <a
                key={item}
                href="#"
                className="text-[14px] font-medium text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* AUTH BUTTONS & MOBILE TOGGLE */}
          <div className="flex items-center gap-[12px]">
            <div className="hidden sm:flex items-center gap-[12px]">
              <button className="px-[22px] py-[9px] text-[13px] font-medium border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-colors">
                Login
              </button>
              <button className="px-[22px] py-[9px] text-[13px] font-semibold bg-[#A855F7] text-white rounded-full hover:bg-[#9333ea] transition-colors shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                Sign up
              </button>
            </div>
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* MOBILE MENU */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl mt-4 flex flex-col p-6 gap-4 md:hidden shadow-2xl z-[100]">
              {navItems.map((item: string) => (
                <a
                  key={item}
                  href="#"
                  className="text-[16px] font-medium text-white/70 py-2 border-b border-white/5 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <button className="w-full py-3.5 text-[15px] font-medium border border-white/10 bg-white/5 rounded-xl text-white">
                  Login
                </button>
                <button className="w-full py-4 text-[15px] font-semibold bg-[#A855F7] text-white rounded-xl transition-colors active:scale-95 shadow-lg">
                  Sign up
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* CENTERED TEXT CONTENT */}
        <div className="relative z-10 max-w-[820px] mx-auto text-center mt-[120px] mb-[60px]">
          {/* BADGE */}
          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 group cursor-pointer hover:border-[#A855F7]/50 transition-all duration-300">
            <div className="bg-[#A855F7] text-white text-[10px] font-normal px-2 py-0.5 rounded-full uppercase tracking-tighter">
              New
            </div>
            <span className="text-[11px] font-medium text-white/60 uppercase tracking-[0.15em] group-hover:text-white/90 transition-colors">
              AI Predictive Tracking
            </span>
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#A855F7]/20 group-hover:border-[#A855F7]/30 transition-all">
              <svg className="w-2.5 h-2.5 text-white/40 group-hover:text-white transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-[40px] md:text-[68px] font-semibold text-white leading-[1.08] tracking-[-1.5px] mb-5">
            Start Managing Your Finance With Our Tool
          </h1>
          <p className="text-[17px] text-white/55 leading-[1.6] max-w-[580px] mx-auto mb-9">
            Take control of your money with smarter insights. Track spending, manage subscriptions, and reach your financial goals effortlessly.
          </p>

          {/* CTA BUTTONS ROW */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* PRIMARY BUTTON */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto h-14 px-8 bg-[#A855F7] text-white font-bold rounded-full flex items-center justify-center gap-3 transition-all"
            >
              <span>Try it Free</span>
              <ArrowRight size={18} />
            </motion.button>

            {/* SECONDARY BUTTON */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto h-14 px-8 bg-transparent text-white font-semibold border border-white/20 rounded-full backdrop-blur-md flex items-center justify-center gap-3 transition-all"
            >
              <Play size={18} fill="currentColor" className="ml-0.5" />
              <span>See It in Action</span>
            </motion.button>
          </div>
        </div>

        {/* APP DASHBOARD MOCKUP */}
        <div className="relative z-10 max-w-[1250px] mx-auto mt-[100px] px-4 sm:px-0 h-[455px] overflow-hidden">
          {/* EXTERNAL GLOW BEHIND DASHBOARD */}
          <div className="absolute -inset-4 bg-[#A855F7]/20 rounded-[35px] blur-[120px] z-0 opacity-40" />

          <div className="relative bg-[#0c0c0e]/95 backdrop-blur-[50px] rounded-t-[40px] border border-white/10 flex h-[650px] shadow-[0_-40px_120px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">

            {/* SIDEBAR */}
            <aside className="hidden md:flex flex-col w-[80px] bg-white/[0.02] border-r border-white/5 py-10 items-center shrink-0">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#8b5cf6] flex items-center justify-center text-white mb-12 shadow-[0_0_25px_rgba(168,85,247,0.4)] cursor-pointer"
              >
                <TrendingUp size={24} />
              </motion.div>

              <nav className="flex flex-col gap-8">
                {sidebarIcons.map((Icon, i: number) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className={"w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer " + (i === 0 ? "text-[#A855F7] bg-[#A855F7]/10 border border-[#A855F7]/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]" : "text-white/20 hover:text-white/70")}
                  >
                    <Icon size={22} />
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto mb-10 w-11 h-11 rounded-full overflow-hidden border-2 border-white/10 p-0.5">
                <img src="https://i.pravatar.cc/100?img=12" alt="User avatar" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
              </div>
            </aside>

            {/* MAIN DASHBOARD CONTENT */}
            <main className="flex-1 p-10 overflow-hidden bg-gradient-to-br from-transparent to-[#A855F7]/[0.02]">
              {/* SEARCH & HEADER */}
              <div className="flex items-center justify-between gap-8 mb-12">
                <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 flex-1 max-w-[500px] shadow-inner">
                  <Search size={20} className="text-white/20" />
                  <input
                    type="text"
                    placeholder="Search analytics..."
                    className="bg-transparent outline-none w-full text-white/80 text-[14px] placeholder:text-white/10"
                    onChange={(_e: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                  <div className="text-[10px] font-bold text-white/20 border border-white/10 px-2 py-1 rounded bg-white/5">cmd K</div>
                </div>

                <div className="flex items-center gap-5">
                  <button className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:bg-white/5 transition-all">
                    <Bell size={20} />
                  </button>
                  <div className="h-10 w-[1px] bg-white/5" />
                  <button className="bg-[#A855F7] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:brightness-110 transition-all flex items-center gap-2">
                    <Plus size={16} />
                    <span>Deposit</span>
                  </button>
                </div>
              </div>

              {/* CARDS ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* BALANCE CARD */}
                <div className="lg:col-span-2 p-10 rounded-[40px] bg-gradient-to-br from-white/[0.08] to-white/[0.01] border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-2xl">
                  <div className="absolute top-0 right-0 w-[400px] h-full bg-[#A855F7]/10 blur-[100px] -mr-32 -mt-32 rounded-full" />

                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h4 className="text-white/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-4">Current Portfolio Value</h4>
                      <div className="flex items-baseline gap-4">
                        <span className="text-white text-6xl font-bold tracking-tighter">$94,850.45</span>
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-emerald-400 text-[13px] font-bold bg-emerald-400/10 px-4 py-1.5 rounded-full border border-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                        >
                          +18.4%
                        </motion.span>
                      </div>
                    </div>
                    <div className="flex gap-2.5">
                      {["1D", "1W", "1M", "3M", "1Y"].map((t: string) => (
                        <button
                          key={t}
                          className={"w-11 h-11 rounded-xl text-[10px] font-bold border transition-all " + (t === "1M" ? "bg-white text-black border-white shadow-lg" : "text-white/30 border-white/5 hover:border-white/10 hover:bg-white/5")}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* WAVE CHART */}
                  <div className="h-32 flex items-end gap-2.5 relative z-10 px-2 mt-8">
                    {chartData.map((val: number, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: val + "%" }}
                        whileHover={{ scaleY: 1.05 }}
                        className={"flex-1 rounded-t-xl transition-all duration-700 relative " + (i === 6 ? "bg-gradient-to-t from-[#A855F7] to-[#c084fc] shadow-[0_0_40px_rgba(168,85,247,0.5)]" : "bg-white/[0.08] hover:bg-white/[0.15]")}
                      >
                        {i === 6 && (
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded shadow-xl opacity-0 group-hover/bar:opacity-100 transition-opacity">
                            Peak
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* RECENT ACCOUNTS */}
                <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 flex flex-col gap-8">
                  <div className="flex justify-between items-center">
                    <h5 className="text-white font-bold text-lg">My Assets</h5>
                    <button className="text-white/20 hover:text-white/40">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {assets.map((asset: { label: string; val: string; change: string; color: string }, i: number) => (
                      <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: asset.color }} />
                          <div>
                            <p className="text-white text-[15px] font-medium">{asset.label}</p>
                            <p className="text-white/20 text-[11px] font-bold">{asset.change} this week</p>
                          </div>
                        </div>
                        <span className="text-white font-black">{asset.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* BOTTOM FADE OUT GRADIENT */}
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black via-black/20 to-transparent z-20 pointer-events-none" />
        </div>
      </section>
    </>
  );
}
```

### FILE 2 OF 10: /COMPONENTS/TEMPLATES/AI-BUDGET-TRACKING-LANDING-PAGE-VELARA-AL/WHY CHOOSE US 01 VELARA.TSX

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, EyeOff, Wallet, ShieldCheck, Headphones, Globe } from "lucide-react";

export default function WhyChooseUs01Velara({ className }: { className?: string }) {
  const features = [
    {
      title: "Instant payments",
      description: "Send money to friends or family in real-time, for free.",
      icon: (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity as number, ease: "easeInOut" as const }}
        >
          <Zap size={28} className="text-white" strokeWidth={2} />
        </motion.div>
      )
    },
    {
      title: "No hidden fees",
      description: "Clear and simple pricing. Always be aware of costs.",
      icon: (
        <motion.div
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 4, repeat: Infinity as number, ease: "easeInOut" as const }}
        >
          <EyeOff size={28} className="text-white" strokeWidth={2} />
        </motion.div>
      )
    },
    {
      title: "Digital wallet",
      description: "Securely and quickly make fast transfers or purchases.",
      icon: (
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity as number, ease: "easeInOut" as const }}
        >
          <Wallet size={28} className="text-white" strokeWidth={2} />
        </motion.div>
      )
    },
    {
      title: "Secure transactions",
      description: "End-to-end encryption for all transactions and data protection.",
      icon: (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity as number, ease: "easeInOut" as const }}
        >
          <ShieldCheck size={28} className="text-white" strokeWidth={2} />
        </motion.div>
      )
    },
    {
      title: "24/7 Support",
      description: "Our support team is always available to help you anytime.",
      icon: (
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity as number, ease: "easeInOut" as const }}
        >
          <Headphones size={28} className="text-white" strokeWidth={2} />
        </motion.div>
      )
    },
    {
      title: "Global Transfers",
      description: "Send money internationally with fast and reliable processing.",
      icon: (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity as number, ease: "linear" as const }}
        >
          <Globe size={28} className="text-white" strokeWidth={2} />
        </motion.div>
      )
    }
  ];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section className={"bg-black py-20 px-6 md:px-[60px] font-['Inter',_sans-serif] relative overflow-hidden " + (className || "")}>
        {/* BACKGROUND ACCENTS */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1350px] mx-auto relative z-10">

          {/* HEADER */}
          <header className="text-center mb-16">
            <div className="flex items-center justify-center gap-[10px] mb-4">
              <span className="text-[14px] text-[#555555] font-medium">03.</span>
              <span className="text-[#333333]">—</span>
              <span className="text-[13px] text-[#555555] font-medium tracking-[2px] uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-[36px] md:text-[52px] font-medium text-white leading-[1.1] max-w-[820px] mx-auto tracking-tight">
              Why Choose Spenny For Smarter Payments?
            </h2>
          </header>

          {/* FEATURE GRID CONTAINER */}
          <div className="border border-[#242424] rounded-[24px] overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const isLastInRow = (index + 1) % 3 === 0;
              const isFirstRow = index < 3;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={
                    "bg-[#161616] p-10 flex flex-col items-start gap-7 transition-all duration-300 relative group hover:bg-[#1a1a1a] " +
                    (!isLastInRow ? "lg:border-r border-[#242424] " : "") +
                    (isFirstRow ? "lg:border-b border-[#242424] " : "") +
                    (index % 2 === 0 ? "md:border-r border-[#242424] " : "") +
                    (index < 4 ? "md:border-b border-[#242424] " : "")
                  }
                >
                  {/* Hover Glow Accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* ICON */}
                  <div className="w-16 h-16 bg-[#111111] border border-[#222222] rounded-[16px] flex items-center justify-center transition-all duration-300 group-hover:border-[#A855F7]/50 group-hover:bg-[#A855F7]/10 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                    <div className="group-hover:scale-110 transition-transform duration-300 group-hover:text-[#A855F7]">
                      {feature.icon}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 relative z-10">
                    <h3 className="text-[20px] font-medium text-[#ffffff] tracking-tight group-hover:text-[#A855F7] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[14px] text-[#777777] leading-[1.65] font-medium group-hover:text-white/40 transition-colors">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Border Accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A855F7] group-hover:w-full transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
```


### FILE 3 OF 10: /COMPONENTS/TEMPLATES/AI-BUDGET-TRACKING-LANDING-PAGE-VELARA-AL/HOW IT WORKS 02 VELARA.TSX

```tsx
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
```


### FILE 4 OF 10: /COMPONENTS/TEMPLATES/AI-BUDGET-TRACKING-LANDING-PAGE-VELARA-AL/FEATURES 02 VELARA.TSX

```tsx
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
```


### FILE 5 OF 10: /COMPONENTS/TEMPLATES/AI-BUDGET-TRACKING-LANDING-PAGE-VELARA-AL/FEATURES 03 VELARA.TSX

```tsx
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
```

### FILE 6 OF 10: /COMPONENTS/TEMPLATES/AI-BUDGET-TRACKING-LANDING-PAGE-VELARA-AL/TESTIMONIAL 01 VELARA.TSX

```tsx
"use client";

import { motion } from "framer-motion";

export default function Testimonial01({ className }: { className?: string }) {
  const fullStar = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="#A855F7" className="shrink-0">
      <path d="M9 1l2.4 5 5.5.8-4 3.9.9 5.4L9 13.5l-4.8 2.5.9-5.4-4-3.9 5.5-.8z"/>
    </svg>
  );

  const halfStar = (
    <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0">
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="#A855F7"/>
          <stop offset="50%" stopColor="#333333"/>
        </linearGradient>
      </defs>
      <path d="M9 1l2.4 5 5.5.8-4 3.9.9 5.4L9 13.5l-4.8 2.5.9-5.4-4-3.9 5.5-.8z" fill="url(#half)"/>
    </svg>
  );

  const emptyStar = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="#333333" className="shrink-0">
      <path d="M9 1l2.4 5 5.5.8-4 3.9.9 5.4L9 13.5l-4.8 2.5.9-5.4-4-3.9 5.5-.8z"/>
    </svg>
  );

  const column1 = [
    {
      avatar: "https://i.pravatar.cc/64?img=47",
      name: "Emily Smith",
      location: "Lyon, France",
      rating: 4.5,
      text: "The app is intuitive and easy to navigate, and it's helped me reach my financial goals faster than I ever thought possible."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=33",
      name: "Michael Brown",
      location: "London, UK",
      rating: 5,
      text: "I was skeptical at first, but then I have completely transformed my relationship with money."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=48",
      name: "Sarah Jenkins",
      location: "Berlin, DE",
      rating: 5,
      text: "Absolutely phenomenal tools for wealth management. The visibility into my future spending is crystal clear now."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=47",
      name: "Emily Smith",
      location: "Lyon, France",
      rating: 4.5,
      text: "The app is intuitive and easy to navigate, and it's helped me reach my financial goals faster than I ever thought possible."
    }
  ];

  const column2 = [
    {
      avatar: "https://i.pravatar.cc/64?img=11",
      name: "Wade Warren",
      location: "Michigan, US",
      rating: 4.5,
      text: "I've finally taken control of my finances. It's so easy to use and has helped me save more money than ever before."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=25",
      name: "Jane Cooper",
      location: "Montreal, Canada",
      rating: 5,
      text: "The app is intuitive and easy to navigate, and it's helped me reach my financial goals faster than I..."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=12",
      name: "Arthur Dent",
      location: "Woking, UK",
      rating: 4.5,
      text: "A Guide to the Financial Galaxy. This app is exactly what I needed to stop panicking about my savings."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=11",
      name: "Wade Warren",
      location: "Michigan, US",
      rating: 4.5,
      text: "I've finally taken control of my finances. It's so easy to use and has helped me save more money than ever before."
    }
  ];

  const renderCard = (item: { avatar: string; name: string; location: string; rating: number; text: string }, idx: number) => (
    <div
      key={idx}
      className="w-full bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-[24px] p-[28px] flex flex-col items-center text-center hover:border-[#A855F7]/30 transition-all duration-500 mb-5 last:mb-0"
    >
      <img
        src={item.avatar}
        alt={item.name}
        referrerPolicy="no-referrer"
        className="w-16 h-16 rounded-full border-2 border-white/10 shadow-lg object-cover mb-4 bg-white/5"
      />

      <h3 className="font-bold text-[16px] text-white tracking-tight mb-1">{item.name}</h3>
      <p className="text-[13px] text-white/40 mb-4">{item.location}</p>

      <div className="w-full h-[1px] bg-white/5 mb-4" />

      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_: undefined, sIdx: number) => {
          const starVal = sIdx + 1;
          if (item.rating >= starVal) return <div key={sIdx}>{fullStar}</div>;
          if (item.rating > sIdx && item.rating < starVal) return <div key={sIdx}>{halfStar}</div>;
          return <div key={sIdx}>{emptyStar}</div>;
        })}
      </div>

      <p className="text-[14px] text-white/60 leading-[1.7] font-medium italic">
        &ldquo;{item.text}&rdquo;
      </p>
    </div>
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section className={"bg-black py-[96px] px-6 md:px-[60px] font-['Inter',_sans-serif] relative overflow-hidden " + (className || "")}>
        {/* Ambient BG Glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#A855F7]/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1450px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[120px] items-start relative z-10">

          {/* LEFT COLUMN */}
          <div className="w-full lg:w-[30%] lg:sticky lg:top-[96px] flex flex-col items-start h-auto lg:h-[700px]">
            {/* Header Metadata */}
            <div className="flex items-center gap-[10px] mb-8">
              <span className="text-[14px] text-[#555555] font-medium">06.</span>
              <span className="text-[#333333]">&#8212;</span>
              <span className="text-[13px] text-[#555555] font-medium tracking-[2px] uppercase">Testimonials</span>
            </div>

            <h2 className="text-[42px] lg:text-[56px] font-medium leading-[1.1] text-white mb-8 tracking-tight max-w-[400px]">
              What Our Users Say About Velara
            </h2>

            {/* Rating Summary */}
            <div className="mt-auto flex flex-col gap-4 pt-10">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/40?img=11" alt="User" className="w-10 h-10 rounded-full border-2 border-black object-cover shadow-xl bg-gray-900" />
                <img src="https://i.pravatar.cc/40?img=45" alt="User" className="w-10 h-10 rounded-full border-2 border-black object-cover -ml-3 shadow-xl bg-gray-900" />
                <img src="https://i.pravatar.cc/40?img=32" alt="User" className="w-10 h-10 rounded-full border-2 border-black object-cover -ml-3 shadow-xl bg-gray-900" />
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-[18px] text-white">4.8/5</span>
                <div className="flex items-center text-[#f5a623] text-[14px] gap-0.5">
                  &#9733; &#9733; &#9733; &#9733; &#9733;
                </div>
              </div>

              <p className="text-[14px] text-white/40">Based on 14,000+ verifiable reviews</p>
            </div>
          </div>

          {/* RIGHT COLUMN — Animated Ticker */}
          <div className="w-full lg:w-[70%] h-[600px] lg:h-[750px] relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">

              {/* Column 1 - Scroll Up */}
              <div className="relative overflow-hidden h-full">
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ duration: 25, repeat: Infinity as number, ease: "linear" as const }}
                  className="flex flex-col"
                >
                  {column1.map((item: { avatar: string; name: string; location: string; rating: number; text: string }, idx: number) => renderCard(item, idx))}
                </motion.div>
              </div>

              {/* Column 2 - Scroll Down */}
              <div className="relative overflow-hidden h-full">
                <motion.div
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{ duration: 30, repeat: Infinity as number, ease: "linear" as const }}
                  className="flex flex-col"
                >
                  {column2.map((item: { avatar: string; name: string; location: string; rating: number; text: string }, idx: number) => renderCard(item, idx))}
                </motion.div>
              </div>

            </div>

            {/* FADE OVERLAYS */}
            <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none z-[5]" />
            <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-[5]" />
          </div>

        </div>
      </section>
    </>
  );
}
```

### FILE 7 OF 10: /COMPONENTS/TEMPLATES/AI-BUDGET-TRACKING-LANDING-PAGE-VELARA-AL/FEATURES 06 VELARA.TSX

```tsx
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
```


### FILE 8 OF 10: /COMPONENTS/TEMPLATES/AI-BUDGET-TRACKING-LANDING-PAGE-VELARA-AL/PRICING 01 VELARA.TSX

```tsx
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
```


### FILE 9 OF 10: /COMPONENTS/TEMPLATES/AI-BUDGET-TRACKING-LANDING-PAGE-VELARA-AL/FAQ 02 VELARA.TSX

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ02Velara({ className }: { className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "What are your operating hours?",
      answer: "We operate Monday through Friday, 9 AM to 6 PM (EST). Our online store is available 24/7, and customer support responds within 24 hours on weekdays."
    },
    {
      question: "How does your delivery service work?",
      answer: "We partner with leading courier services to ensure fast and reliable delivery. Standard shipping takes 3-5 business days, while express delivery is available for 1-2 business day turnaround. Free shipping on orders over $50."
    },
    {
      question: "What's covered by your return policy?",
      answer: "We offer a 30-day hassle-free return policy on all products. Items must be in their original condition and packaging. Simply contact our support team to initiate a return and receive a prepaid shipping label."
    },
    {
      question: "Which payment methods do you accept?",
      answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secured with 256-bit SSL encryption."
    },
    {
      question: "How does the rewards program benefit me?",
      answer: "Our rewards program lets you earn points on every purchase. Accumulate 100 points to unlock a $5 discount. Members also get early access to sales, exclusive deals, and birthday bonuses."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" crossOrigin="anonymous" />

      <section className={"bg-black py-[96px] px-6 md:px-[60px] font-sans relative overflow-hidden " + (className || "")} style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#A855F7]/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1450px] mx-auto relative z-10">

          {/* HEADER */}
          <header className="mb-[64px] flex flex-col items-center text-center">
            <div className="flex items-center gap-[10px] mb-3">
              <span className="text-[14px] text-[#555555] font-medium">07.</span>
              <span className="text-[#333333]">—</span>
              <span className="text-[13px] text-[#555555] font-medium tracking-[2px] uppercase">Questions & Support</span>
            </div>
            <h2 className="text-[36px] md:text-[52px] font-medium text-white leading-[1.1] max-w-[820px] mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] text-white/40 font-medium max-w-[600px]">
              Find answers to common questions about our platform and financial management tools.
            </p>
          </header>

          {/* ACCORDION LIST */}
          <div className="grid grid-cols-1 gap-4 max-w-[1000px] mx-auto">
            {faqData.map((item: { question: string; answer: string }, index: number) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={
                    "relative overflow-hidden rounded-[16px] border transition-all duration-500 " +
                    (isOpen
                      ? "bg-white/[0.05] border-[#A855F7]/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                      : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.03]")
                  }
                >
                  {/* BRAND ACCENT BAR */}
                  <div
                    className={
                      "absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500 bg-[#A855F7] " +
                      (isOpen ? "opacity-100 scale-y-100" : "opacity-40 scale-y-75")
                    }
                  />

                  {/* QUESTION ROW */}
                  <div
                    className="flex items-center justify-between py-[24px] pr-[28px] pl-[32px] cursor-pointer"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3
                      className={
                        "text-[16px] md:text-[18px] font-medium transition-colors duration-300 " +
                        (isOpen ? "text-white" : "text-white/80")
                      }
                    >
                      {item.question}
                    </h3>

                    {/* ICON */}
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                      className="flex-shrink-0 ml-4"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isOpen ? "#A855F7" : "currentColor"}
                        strokeWidth={2}
                        strokeLinecap="round"
                        className={isOpen ? "" : "text-white/40"}
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* ANSWER PANEL */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key={"answer-" + index}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                      >
                        <div className="px-[32px] pb-[28px]">
                          <p className="text-[15px] text-white/50 leading-[1.8] font-medium max-w-[90%]">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
```


### FILE 10 OF 10: /COMPONENTS/TEMPLATES/AI-BUDGET-TRACKING-LANDING-PAGE-VELARA-AL/FOOTER 02 VELARA.TSX

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Footer02Velara({ className }: { className?: string }) {
  const [activeBadge, setActiveBadge] = useState<number>(-1);
  const socialLinks = ["Webflow", "Framer", "Dribbble", "Behance", "Facebook", "LinkedIn"];

  const badges = [
    { name: "🇸🇬 Singapore", left: "11%", top: "38%", flareX: 190 },
    { name: "🇲🇾 Malaysia", left: "23%", top: "25%", flareX: 370 },
    { name: "🇺🇸 United States", left: "46%", top: "12%", flareX: 680 },
    { name: "🇮🇩 Indonesia", left: "62%", top: "21%", flareX: 870 },
    { name: "🇯🇵 Japan", left: "81%", top: "37%", flareX: 1180 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBadge((prev) => (prev + 1) % badges.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [badges.length]);

  const sparkles = Array.from({ length: 35 }).map((_, i) => {
    const angle = (Math.PI / 180) * (180 + (i * 180 / 35));
    const rx = 860 + (Math.random() * 20 - 10);
    const ry = 200 + (Math.random() * 20 - 10);
    return {
      cx: 700 + rx * Math.cos(angle),
      cy: 430 + ry * Math.sin(angle),
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3
    };
  });

  return (
    <>
      <footer className={"bg-black text-[#AAA] font-sans overflow-hidden select-none antialiased " + (className || "")}>

        {/* SECTION 1: GLOBE ARC VISUAL */}
        <div className="relative w-full h-[420px] bg-black overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />

          <svg
            viewBox="0 0 1400 420"
            className="w-full h-full"
            preserveAspectRatio="xMidYMax slice"
          >
            <defs>
              <radialGradient id="planetGrad" cx="50%" cy="100%" r="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="60%" stopColor="#2e1065" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <ellipse cx="700" cy="420" rx="900" ry="220" fill="url(#planetGrad)" />

            <ellipse
              cx="700" cy="430" rx="860" ry="200"
              fill="none" stroke="#A855F7" strokeWidth="2.5" opacity="0.9"
            />
            <ellipse
              cx="700" cy="430" rx="860" ry="200"
              fill="none" stroke="#C084FC" strokeWidth="12" opacity="0.15"
              filter="url(#glow)"
            />

            <motion.path
              d="M -160 430 A 860 200 0 0 1 1560 430"
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
              strokeDasharray="120 1800"
              animate={{ strokeDashoffset: [1920, -1920] }}
              transition={{
                duration: 5,
                repeat: Infinity as number,
                ease: "linear" as const
              }}
              filter="url(#glow)"
            />

            {sparkles.map((s, i) => (
              <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#D8B4FE" opacity={s.opacity} />
            ))}

            {[190, 370, 680, 870, 1180].map((x, i) => {
              const h = 700;
              const k = 430;
              const a = 860;
              const b = 200;
              const term = 1 - Math.pow(x - h, 2) / Math.pow(a, 2);
              const y = k - Math.sqrt(Math.max(0, term)) * b;
              const isActive = activeBadge === i;

              return (
                <g key={i}>
                  <motion.circle
                    cx={x} cy={y} r="14" fill="#A855F7"
                    animate={{ opacity: isActive ? 0.6 : 0.2, scale: isActive ? 1.5 : 1 }}
                    transition={{ duration: 0.8 }}
                    filter="url(#glow)"
                  />
                  <motion.circle
                    cx={x} cy={y} r={4} fill="#FAF5FF"
                    animate={{ r: isActive ? 6 : 4, fill: isActive ? "#FFF" : "#FAF5FF" }}
                    transition={{ duration: 0.8 }}
                  />
                </g>
              );
            })}
          </svg>

          {badges.map((badge, i) => {
            const isActive = activeBadge === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isActive ? 1 : 0.4,
                  y: isActive ? -5 : 0,
                  scale: isActive ? 1.1 : 1
                }}
                className="absolute pointer-events-none"
                style={{ left: badge.left, top: badge.top }}
              >
                <div className={"bg-[#1A1A1A] border " + (isActive ? "border-[#A855F7]" : "border-[#333]") + " rounded-md px-3 py-1.5 whitespace-nowrap shadow-lg shadow-purple-500/20 transition-all duration-700"}>
                  <span className={(isActive ? "text-white" : "text-[#888]") + " text-[13px] font-medium tracking-tight transition-colors duration-700"}>
                    {badge.name}
                  </span>
                </div>
                <motion.div
                  animate={{ opacity: isActive ? 0.8 : 0.3, height: isActive ? "45px" : "40px" }}
                  className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#A855F7] to-transparent"
                  style={{ marginTop: "4px" }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* SECTION 2: FOOTER LINKS */}
        <div className="relative bg-[#0A0A0A] py-16 px-10 md:px-16">
          <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

          <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-white text-[15px] font-semibold mb-6">Instant Links</h4>
              <ul className="space-y-3">
                {["Home", "About Us", "Projects", "Pricing"].map((link: string) => (
                  <li key={link} className="text-[#AAA] text-[14px] hover:text-white transition-colors cursor-pointer leading-loose">{link}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[15px] font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {["UI/UX Design", "Web Development", "Framer Development", "Webflow Development"].map((link: string) => (
                  <li key={link} className="text-[#AAA] text-[14px] hover:text-white transition-colors cursor-pointer leading-loose">{link}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[15px] font-semibold mb-6">Explore Now</h4>
              <ul className="space-y-3">
                {["Blogs", "License", "Contact Us", "Case Study"].map((link: string) => (
                  <li key={link} className="text-[#AAA] text-[14px] hover:text-white transition-colors cursor-pointer leading-loose">{link}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[15px] font-semibold mb-6">Specialized Industry</h4>
              <ul className="space-y-3">
                {["Tech & SaaS", "E-commerce & Retail", "Healthcare & Medical", "Creative Agency"].map((link: string) => (
                  <li key={link} className="text-[#AAA] text-[14px] hover:text-white transition-colors cursor-pointer leading-loose">{link}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECTION 3: SOCIAL BUTTONS */}
          <div className="max-w-[1440px] mx-auto mt-16 flex flex-wrap items-center gap-3">
            {socialLinks.map((label: string, i: number) => (
              <motion.button
                key={i}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "#666" }}
                className="px-7 py-3 border border-[#444] rounded-md text-white text-[14px] font-medium transition-colors"
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* SECTION 4: COPYRIGHT BAR */}
        <div className="w-full">
          <div className="border-t border-dashed border-[#2A2A2A]" />
          <div className="max-w-[1440px] mx-auto px-10 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4" />
        </div>

        {/* SECTION 5: LARGE BRAND TEXT */}
        <div className="relative w-full h-[400px] overflow-hidden bg-black flex items-center justify-center">
          <motion.h1
            initial={{ y: 150, opacity: 0, color: "#A855F7", scale: 0.95 }}
            whileInView={{
              y: 0,
              opacity: 1,
              scale: 1,
              color: "#FFFFFF"
            }}
            viewport={{ once: false, amount: 0.1 }}
            animate={{
              opacity: [1, 0.85, 1, 0.7, 1, 0.9, 1],
              textShadow: [
                "0 0 20px rgba(255,255,255,0.4)",
                "0 0 80px rgba(255,255,255,0.8)",
                "0 0 20px rgba(255,255,255,0.4)"
              ],
            }}
            transition={{
              y: { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const },
              color: { duration: 1.5, ease: "easeOut" as const },
              opacity: { repeat: Infinity as number, duration: 1.2, times: [0, 0.2, 0.4, 0.5, 0.7, 0.8, 1] },
              textShadow: { repeat: Infinity as number, duration: 3, ease: "easeInOut" as const }
            }}
            className="text-[120px] sm:text-[180px] md:text-[340px] font-black leading-none tracking-[-0.05em] whitespace-nowrap pl-0 pointer-events-none select-none blur-[0.3px] text-center"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" } as React.CSSProperties}
          >
            VELARAAI
          </motion.h1>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent z-10" />
        </div>

      </footer>
    </>
  );
}
```


### INSTALL DEPENDENCIES:
NPM INSTALL FRAMER-MOTION LUCIDE-REACT

### UPDATE /APP/PAGE.TSX:

REPLACE THE CONTENTS OF /APP/PAGE.TSX WITH:

```tsx
"use client";

import AIBudgetTrackingHeroVelara from "@/components/templates/ai-budget-tracking-landing-page-velara-al/AI Budget Tracking Hero Velara";
import WhyChooseUs01Velara from "@/components/templates/ai-budget-tracking-landing-page-velara-al/Why Choose us 01 Velara";
import HowItWorks02Velara from "@/components/templates/ai-budget-tracking-landing-page-velara-al/How it Works 02 Velara";
import Features02Velara from "@/components/templates/ai-budget-tracking-landing-page-velara-al/Features 02 Velara";
import Features03Velara from "@/components/templates/ai-budget-tracking-landing-page-velara-al/Features 03 Velara";
import Testimonial01Velara from "@/components/templates/ai-budget-tracking-landing-page-velara-al/Testimonial 01 Velara";
import Features06Velara from "@/components/templates/ai-budget-tracking-landing-page-velara-al/Features 06 Velara";
import Pricing01Velara from "@/components/templates/ai-budget-tracking-landing-page-velara-al/Pricing 01 Velara";
import FAQ02Velara from "@/components/templates/ai-budget-tracking-landing-page-velara-al/FAQ 02 velara";
import Footer02Velara from "@/components/templates/ai-budget-tracking-landing-page-velara-al/Footer 02 Velara";

export default function Home() {
  return (
    <main className="min-h-screen">
      <AIBudgetTrackingHeroVelara />
      <WhyChooseUs01Velara />
      <HowItWorks02Velara />
      <Features02Velara />
      <Features03Velara />
      <Testimonial01Velara />
      <Features06Velara />
      <Pricing01Velara />
      <FAQ02Velara />
      <Footer02Velara />
    </main>
  );
}
```

### RULES:
- COPY EACH FILE EXACTLY AS PROVIDED
- DO NOT MODIFY, REFACTOR, OR RENAME ANYTHING
- DO NOT CHANGE ANY TAILWIND CLASSES
- DO NOT ADD FEATURES OR "IMPROVEMENTS"
- JUST CREATE THE 10 FILES AND UPDATE PAGE.TSX
