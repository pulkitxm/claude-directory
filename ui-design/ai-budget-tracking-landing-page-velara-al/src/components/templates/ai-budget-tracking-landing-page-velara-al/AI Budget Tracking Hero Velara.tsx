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
