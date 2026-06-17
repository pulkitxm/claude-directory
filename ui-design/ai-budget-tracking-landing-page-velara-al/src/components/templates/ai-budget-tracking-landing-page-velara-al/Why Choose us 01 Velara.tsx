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
