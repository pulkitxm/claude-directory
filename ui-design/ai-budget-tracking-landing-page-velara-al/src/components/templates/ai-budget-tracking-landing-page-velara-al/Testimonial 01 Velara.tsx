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
