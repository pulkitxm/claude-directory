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
