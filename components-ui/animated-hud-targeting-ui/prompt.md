# ANIMATED HUD TARGETING UI — COMPONENT INTEGRATION

YOU ARE GIVEN A TASK TO INTEGRATE AN EXISTING REACT COMPONENT IN THE CODEBASE

THE CODEBASE SHOULD SUPPORT:

- SHADCN PROJECT STRUCTURE
- TAILWIND CSS
- TYPESCRIPT

IF IT DOESN'T, PROVIDE INSTRUCTIONS ON HOW TO SETUP PROJECT VIA SHADCN CLI, INSTALL TAILWIND OR TYPESCRIPT.

DETERMINE THE DEFAULT PATH FOR COMPONENTS AND STYLES.
IF DEFAULT PATH FOR COMPONENTS IS NOT /COMPONENTS/UI, PROVIDE INSTRUCTIONS ON WHY IT'S IMPORTANT TO CREATE THIS FOLDER
COPY-PASTE THIS COMPONENT TO /COMPONENTS/UI FOLDER:

```tsx
animated-hud-targeting-ui.tsx
"use client";

import type React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface TargetingUIProps {
  className?: string;
  pathColors?: {
    light?: string;
    dark?: string;
  };
}

interface HudFrameProps {
  children?: React.ReactNode
  backgroundImage?: string
  backgroundColor?: string
  backgroundVideo?: string
}

export function TargetingUI({
  className,
  pathColors = { light: "white", dark: "white" }
}: TargetingUIProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : true; // Default to dark mode during SSR
  const pathColor = isDark ? pathColors.dark : pathColors.light;
  return (
    <svg 
      width="237" 
      height="220" 
      viewBox="0 0 237 220" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* TOP TARGETING SYSTEM */}
      {/* TOP ROUNDED PATTERN */}
      <motion.g
        transform="translate(90, 50)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.2 }}
      >
        <motion.path d="M28 0.953125H27.75V2.82313H28V0.953125Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8, duration: 0.1 }}
        />
        <motion.path d="M25.0776 1.03902L24.8281 1.05469L24.9453 2.92101L25.1948 2.90534L25.0776 1.03902Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.82, duration: 0.1 }}
        />
        <motion.path d="M22.1621 1.3046L21.9141 1.33594L22.1485 3.19119L22.3965 3.15985L22.1621 1.3046Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.84, duration: 0.1 }}
        />
        <motion.path d="M19.2778 1.75763L19.0312 1.80469L19.3818 3.64153L19.6284 3.59448L19.2778 1.75763Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.86, duration: 0.1 }}
        />
        <motion.path d="M16.4218 2.38304L16.1797 2.44531L16.6455 4.25637L16.8876 4.19409L16.4218 2.38304Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.88, duration: 0.1 }}
        />
        <motion.path d="M13.9452 5.05031L13.3672 3.27231L13.6052 3.19531L14.1832 4.97331L13.9452 5.05031Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.90, duration: 0.1 }}
        />
        <motion.path d="M10.8575 4.18149L10.625 4.27344L11.3124 6.01144L11.5449 5.9195L10.8575 4.18149Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.92, duration: 0.1 }}
        />
        <motion.path d="M8.16372 5.32327L7.9375 5.42969L8.7335 7.12181L8.95972 7.0154L8.16372 5.32327Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.94, duration: 0.1 }}
        />
        <motion.path d="M5.55504 6.66086L5.33594 6.78125L6.23644 8.42015L6.45555 8.29976L5.55504 6.66086Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.96, duration: 0.1 }}
        />
        <motion.path d="M3.0392 8.13947L2.82812 8.27344L3.8302 9.85228L4.04128 9.71831L3.0392 8.13947Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.98, duration: 0.1 }}
        />
        <motion.path d="M1.51206 11.4324L0.414062 9.91944L0.617058 9.77344L1.71506 11.2864L1.51206 11.4324Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.0, duration: 0.1 }}
        />
        <motion.path d="M30.6713 1.03208L30.5547 2.89844L30.8042 2.91403L30.9208 1.04767L30.6713 1.03208Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.82, duration: 0.1 }}
        />
        <motion.path d="M33.5853 1.30873L33.3516 3.16406L33.5996 3.19531L33.8334 1.33998L33.5853 1.30873Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.84, duration: 0.1 }}
        />
        <motion.path d="M36.4749 1.75677L36.125 3.59375L36.3716 3.64071L36.7215 1.80374L36.4749 1.75677Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.86, duration: 0.1 }}
        />
        <motion.path d="M39.1092 4.25681L38.8672 4.19381L39.3312 2.38281L39.5742 2.44581L39.1092 4.25681Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.88, duration: 0.1 }}
        />
        <motion.path d="M41.8005 5.05031L41.5625 4.97331L42.1405 3.19531L42.3785 3.27231L41.8005 5.05031Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.90, duration: 0.1 }}
        />
        <motion.path d="M44.8979 4.16698L44.2109 5.90625L44.4435 5.99809L45.1304 4.25882L44.8979 4.16698Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.92, duration: 0.1 }}
        />
        <motion.path d="M47.5842 5.32312L46.7891 7.01562L47.0153 7.12193L47.8105 5.42942L47.5842 5.32312Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.94, duration: 0.1 }}
        />
        <motion.path d="M50.197 6.65775L49.2969 8.29688L49.516 8.41721L50.4161 6.77808L50.197 6.65775Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.96, duration: 0.1 }}
        />
        <motion.path d="M52.7203 8.13959L51.7188 9.71875L51.9299 9.85265L52.9315 8.27349L52.7203 8.13959Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.98, duration: 0.1 }}
        />
        <motion.path d="M54.2421 11.4324L54.0391 11.2864L55.1371 9.77344L55.3401 9.91944L54.2421 11.4324Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.0, duration: 0.1 }}
        />
      </motion.g>

      {/* Left diagonal line - animates from top to bottom */}
      <motion.line 
        x1="0.176777" 
        y1="0.823223" 
        x2="74.1768" 
        y2="74.8232" 
        stroke={pathColor} 
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2 
        }}
      />
      
      {/* Middle horizontal line - expands from center outward */}
      <motion.line 
        x1="74" 
        y1="74.75" 
        x2="164" 
        y2="74.75" 
        stroke={pathColor} 
        strokeWidth="0.5"
        initial={{ 
          pathLength: 0,
          pathOffset: 0.5 
        }}
        animate={{ 
          pathLength: 1,
          pathOffset: 0 
        }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut" 
        }}
      />
      
      {/* Right diagonal line - animates from top to bottom */}
      <motion.line 
        x1="236.822" 
        y1="0.82443" 
        x2="163.822" 
        y2="74.8244" 
        stroke={pathColor} 
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2 
        }}
      />
      
      {/* Top system - Left side L-shaped dots */}
      <motion.circle
        cx="78"
        cy="66"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      />
      <motion.circle
        cx="78"
        cy="70"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.3 }}
      />
      <motion.circle
        cx="82"
        cy="70"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.3 }}
      />
      
      {/* Top system - Right side L-shaped dots (mirrored) */}
      <motion.circle
        cx="159"
        cy="66"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      />
      <motion.circle
        cx="155"
        cy="70"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.3 }}
      />
      <motion.circle
        cx="159"
        cy="70"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.3 }}
      />

      {/* OUTER CIRCLE - centered between targeting systems */}
      <g transform="translate(29, 22)">
        <motion.path 
          d="M89.455 175.334C69.3083 175.288 49.7881 168.326 34.1599 155.612C18.5318 142.898 7.74354 125.203 3.6 105.486L0 101.886V73.5335L3.578 69.9575C7.65877 50.1962 18.4297 32.4468 34.0743 19.7028C49.7188 6.95881 69.2797 0 89.458 0C109.636 0 129.197 6.95881 144.842 19.7028C160.486 32.4468 171.257 50.1962 175.338 69.9575L178.914 73.5335V101.884L175.314 105.484C171.171 125.202 160.383 142.898 144.753 155.613C129.124 168.328 109.603 175.29 89.455 175.334ZM0.747999 101.574L4.289 105.116L4.312 105.225C8.35779 124.817 19.0363 142.414 34.5465 155.048C50.0567 167.683 69.4496 174.582 89.4545 174.582C109.459 174.582 128.852 167.683 144.363 155.048C159.873 142.414 170.551 124.817 174.597 105.225L174.62 105.116L178.161 101.574V73.8445L174.646 70.3275L174.623 70.2165C170.598 50.6003 159.926 32.9746 144.408 20.3176C128.891 7.66049 109.48 0.747999 89.455 0.747999C69.4302 0.747999 50.0192 7.66049 34.5017 20.3176C18.9842 32.9746 8.31157 50.6003 4.287 70.2165L4.264 70.3275L0.747999 73.8445V101.574Z" 
          fill="#ffffff80"
          style={{ transformOrigin: "89.5px 87.5px" }}
          initial={{ rotate: 90 }}
          animate={{ rotate: 0 }}
          transition={{ 
            duration: 1.0, 
            ease: "easeOut"
          }}
        />

        {/* LEFT CHAMBER INSERT */}
        <motion.g
          transform="translate(3, 82)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.4 }}
        >
          <motion.path d="M1.25362 0.601562H0.640625V1.21456H1.25362V0.601562Z" fill={pathColor}/>
          <motion.path d="M1.25362 2.82812H0.640625V2.97112H1.25362V2.82812Z" fill={pathColor}/>
          <motion.path d="M1.25362 3.14844H0.640625V3.29144H1.25362V3.14844Z" fill={pathColor}/>
          <motion.path d="M1.25362 6.67969H0.640625V9.15668H1.25362V6.67969Z" fill={pathColor}/>
          <motion.path d="M1.25362 3.95312H0.640625V4.09612H1.25362V3.95312Z" fill={pathColor}/>
          <motion.path d="M1.25362 4.8125H0.640625V4.9555H1.25362V4.8125Z" fill={pathColor}/>
          <motion.path d="M1.25362 5.09375H0.640625V5.23675H1.25362V5.09375Z" fill={pathColor}/>
          <motion.path d="M1.25362 5.375H0.640625V5.51801H1.25362V5.375Z" fill={pathColor}/>
          <motion.path d="M1.25362 5.65625H0.640625V5.79925H1.25362V5.65625Z" fill={pathColor}/>
          <motion.path d="M1.25362 10.0312H0.640625V10.1742H1.25362V10.0312Z" fill={pathColor}/>
          <motion.path d="M1.25362 10.5312H0.640625V10.6742H1.25362V10.5312Z" fill={pathColor}/>
        </motion.g>

        {/* RIGHT CHAMBER INSERT */}
        <motion.g
          transform="translate(174, 82)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.4 }}
        >
          <motion.path d="M1.25362 0.601562H0.640625V1.21456H1.25362V0.601562Z" fill={pathColor}/>
          <motion.path d="M1.25362 2.82812H0.640625V2.97112H1.25362V2.82812Z" fill={pathColor}/>
          <motion.path d="M1.25362 3.14844H0.640625V3.29144H1.25362V3.14844Z" fill={pathColor}/>
          <motion.path d="M1.25362 6.67969H0.640625V9.15668H1.25362V6.67969Z" fill={pathColor}/>
          <motion.path d="M1.25362 3.95312H0.640625V4.09612H1.25362V3.95312Z" fill={pathColor}/>
          <motion.path d="M1.25362 4.8125H0.640625V4.9555H1.25362V4.8125Z" fill={pathColor}/>
          <motion.path d="M1.25362 5.09375H0.640625V5.23675H1.25362V5.09375Z" fill={pathColor}/>
          <motion.path d="M1.25362 5.375H0.640625V5.51801H1.25362V5.375Z" fill={pathColor}/>
          <motion.path d="M1.25362 5.65625H0.640625V5.79925H1.25362V5.65625Z" fill={pathColor}/>
          <motion.path d="M1.25362 10.0312H0.640625V10.1742H1.25362V10.0312Z" fill={pathColor}/>
          <motion.path d="M1.25362 10.5312H0.640625V10.6742H1.25362V10.5312Z" fill={pathColor}/>
        </motion.g>

        {/* INNER CIRCLES */}
        {/* First inner circle - starts from top (0 degrees) */}
        <motion.circle
          cx="89.5"
          cy="87.5"
          r="80"
          fill="none"
          stroke={pathColor}
          strokeWidth="0.5"
          strokeLinecap="round"
          style={{ transformOrigin: "89.5px 87.5px" }}
          initial={{ 
            pathLength: 0,
            rotate: 0 
          }}
          animate={{ 
            pathLength: 1.1,
            rotate: 0 
          }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            delay: 0.2
          }}
        />

        {/* Second inner circle - starts from bottom (180 degrees) */}
        <motion.circle
          cx="89.5"
          cy="87.5"
          r="72"
          fill="none"
          stroke={pathColor}
          strokeWidth="0.5"
          strokeLinecap="round"
          style={{ transformOrigin: "89.5px 87.5px" }}
          initial={{ 
            pathLength: 0,
            rotate: 180 
          }}
          animate={{ 
            pathLength: 1.1,
            rotate: 180 
          }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            delay: 0.2
          }}
        />

        {/* CENTER TARGETING SYSTEM */}
        <g transform="translate(44.5, 70)">
          {/* TOP LEFT CORNER */}
          <motion.path 
            d="M22.5038 34.3712H16.8358L16.7988 34.3342L12.7578 30.2942L12.9358 30.1172L16.9398 34.1212H22.5038V34.3712Z" 
            fill="none"
            stroke={pathColor}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 1.2 
            }}
          />
          
          {/* TOP RIGHT CORNER */}
          <motion.path 
            d="M72.9112 34.3712H67.2422V34.1212H72.8072L76.8102 30.1172L76.9882 30.2942L72.9112 34.3712Z" 
            fill="none"
            stroke={pathColor}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 1.2 
            }}
          />
          
          {/* CENTER TRIANGLE */}
          <motion.path 
            d="M45.9778 21.5266H43.9898L39.7578 14.1966L40.7508 12.4766H49.2148L50.2148 14.1966L45.9778 21.5266ZM44.2778 21.0266H45.6878L49.6308 14.1966L48.9248 12.9766H41.0408L40.3358 14.1966L44.2778 21.0266Z" 
            fill="none"
            stroke={pathColor}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 1.6 
            }}
          />
          
          {/* LEFT SIDE BRACKET */}
          <motion.path 
            d="M1.48806 20.6704L0.414062 19.5954V16.0804L1.50806 14.9844L1.68606 15.1614L0.664062 16.1834V19.4924L1.66606 20.4934L1.48806 20.6704Z" 
            fill="none"
            stroke={pathColor}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 2.0 
            }}
          />
          
          {/* RIGHT SIDE BRACKET */}
          <motion.path 
            d="M88.2663 20.6704L88.0903 20.4934L89.0923 19.4924V16.1834L88.0703 15.1614L88.2463 14.9844L89.3423 16.0804V19.5954L88.2663 20.6704Z" 
            fill="none"
            stroke={pathColor}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 2.0 
            }}
          />
          
          {/* BOTTOM LEFT CORNER */}
          <motion.path 
            d="M12.9358 4.98056L12.7578 4.80356L16.8358 0.726562H22.5038V0.976562H16.9398L12.9358 4.98056Z" 
            fill="none"
            stroke={pathColor}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 2.0 
            }}
          />
          
          {/* BOTTOM RIGHT CORNER */}
          <motion.path 
            d="M76.8102 4.98056L72.8072 0.976562H67.2422V0.726562H72.9112L72.9482 0.763557L76.9882 4.80356L76.8102 4.98056Z" 
            fill="none"
            stroke={pathColor}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 2.0 
            }}
          />
        </g>
      </g>

      {/* LEFT SIDE 2x2 GRID - Outside outer circle */}
      <motion.circle
        cx="15"
        cy="107"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      />
      <motion.circle
        cx="20"
        cy="107"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.3 }}
      />
      <motion.circle
        cx="15"
        cy="112"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.3 }}
      />
      <motion.circle
        cx="20"
        cy="112"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
      />

      {/* RIGHT SIDE 2x2 GRID - Outside outer circle */}
      <motion.circle
        cx="217"
        cy="107"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      />
      <motion.circle
        cx="222"
        cy="107"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.3 }}
      />
      <motion.circle
        cx="217"
        cy="112"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.3 }}
      />
      <motion.circle
        cx="222"
        cy="112"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
      />

      {/* BOTTOM TARGETING SYSTEM (FLIPPED) */}
      {/* BOTTOM ROUNDED PATTERN (FLIPPED) */}
      <motion.g
        transform="translate(90.5, 173) scale(1, -1)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.2 }}
      >
        <motion.path d="M28 0.953125H27.75V2.82313H28V0.953125Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8, duration: 0.1 }}
        />
        <motion.path d="M25.0776 1.03902L24.8281 1.05469L24.9453 2.92101L25.1948 2.90534L25.0776 1.03902Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.82, duration: 0.1 }}
        />
        <motion.path d="M22.1621 1.3046L21.9141 1.33594L22.1485 3.19119L22.3965 3.15985L22.1621 1.3046Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.84, duration: 0.1 }}
        />
        <motion.path d="M19.2778 1.75763L19.0312 1.80469L19.3818 3.64153L19.6284 3.59448L19.2778 1.75763Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.86, duration: 0.1 }}
        />
        <motion.path d="M16.4218 2.38304L16.1797 2.44531L16.6455 4.25637L16.8876 4.19409L16.4218 2.38304Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.88, duration: 0.1 }}
        />
        <motion.path d="M13.9452 5.05031L13.3672 3.27231L13.6052 3.19531L14.1832 4.97331L13.9452 5.05031Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.90, duration: 0.1 }}
        />
        <motion.path d="M10.8575 4.18149L10.625 4.27344L11.3124 6.01144L11.5449 5.9195L10.8575 4.18149Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.92, duration: 0.1 }}
        />
        <motion.path d="M8.16372 5.32327L7.9375 5.42969L8.7335 7.12181L8.95972 7.0154L8.16372 5.32327Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.94, duration: 0.1 }}
        />
        <motion.path d="M5.55504 6.66086L5.33594 6.78125L6.23644 8.42015L6.45555 8.29976L5.55504 6.66086Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.96, duration: 0.1 }}
        />
        <motion.path d="M3.0392 8.13947L2.82812 8.27344L3.8302 9.85228L4.04128 9.71831L3.0392 8.13947Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.98, duration: 0.1 }}
        />
        <motion.path d="M1.51206 11.4324L0.414062 9.91944L0.617058 9.77344L1.71506 11.2864L1.51206 11.4324Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.0, duration: 0.1 }}
        />
        <motion.path d="M30.6713 1.03208L30.5547 2.89844L30.8042 2.91403L30.9208 1.04767L30.6713 1.03208Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.82, duration: 0.1 }}
        />
        <motion.path d="M33.5853 1.30873L33.3516 3.16406L33.5996 3.19531L33.8334 1.33998L33.5853 1.30873Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.84, duration: 0.1 }}
        />
        <motion.path d="M36.4749 1.75677L36.125 3.59375L36.3716 3.64071L36.7215 1.80374L36.4749 1.75677Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.86, duration: 0.1 }}
        />
        <motion.path d="M39.1092 4.25681L38.8672 4.19381L39.3312 2.38281L39.5742 2.44581L39.1092 4.25681Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.88, duration: 0.1 }}
        />
        <motion.path d="M41.8005 5.05031L41.5625 4.97331L42.1405 3.19531L42.3785 3.27231L41.8005 5.05031Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.90, duration: 0.1 }}
        />
        <motion.path d="M44.8979 4.16698L44.2109 5.90625L44.4435 5.99809L45.1304 4.25882L44.8979 4.16698Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.92, duration: 0.1 }}
        />
        <motion.path d="M47.5842 5.32312L46.7891 7.01562L47.0153 7.12193L47.8105 5.42942L47.5842 5.32312Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.94, duration: 0.1 }}
        />
        <motion.path d="M50.197 6.65775L49.2969 8.29688L49.516 8.41721L50.4161 6.77808L50.197 6.65775Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.96, duration: 0.1 }}
        />
        <motion.path d="M52.7203 8.13959L51.7188 9.71875L51.9299 9.85265L52.9315 8.27349L52.7203 8.13959Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.98, duration: 0.1 }}
        />
        <motion.path d="M54.2421 11.4324L54.0391 11.2864L55.1371 9.77344L55.3401 9.91944L54.2421 11.4324Z" fill={pathColor} opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.0, duration: 0.1 }}
        />
      </motion.g>
      {/* Left diagonal line - animates from bottom to top (flipped) */}
      <motion.line 
        x1="0.176777" 
        y1="219.176777" 
        x2="74.1768" 
        y2="145.1768" 
        stroke={pathColor} 
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2 
        }}
      />
      
      {/* Middle horizontal line - expands from center outward (flipped) */}
      <motion.line 
        x1="74" 
        y1="145.25" 
        x2="164" 
        y2="145.25" 
        stroke={pathColor} 
        strokeWidth="0.5"
        initial={{ 
          pathLength: 0,
          pathOffset: 0.5 
        }}
        animate={{ 
          pathLength: 1,
          pathOffset: 0 
        }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut" 
        }}
      />
      
      {/* Right diagonal line - animates from bottom to top (flipped) */}
      <motion.line 
        x1="236.822" 
        y1="219.17557" 
        x2="163.822" 
        y2="145.1756" 
        stroke={pathColor} 
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2 
        }}
      />
      
      {/* Bottom system - Left side L-shaped dots (flipped) */}
      <motion.circle
        cx="78"
        cy="154"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      />
      <motion.circle
        cx="78"
        cy="150"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.3 }}
      />
      <motion.circle
        cx="82"
        cy="150"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.3 }}
      />
      
      {/* Bottom system - Right side L-shaped dots (flipped) */}
      <motion.circle
        cx="159"
        cy="154"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      />
      <motion.circle
        cx="155"
        cy="150"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.3 }}
      />
      <motion.circle
        cx="159"
        cy="150"
        r=".75"
        fill={pathColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.3 }}
      />
    </svg>
  );
}

export function HudFrame({ children, backgroundImage, backgroundColor, backgroundVideo }: HudFrameProps) {
  return (
    <div className="relative w-full h-full">
      {/* Content area - this is where children will render */}
      <div className="w-full h-full relative z-20">{children}</div>

      {/* HUD Frame Overlay */}
      <div
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-10"
        style={
          {
            "--frame-thickness": "8px",
            "--corner-chamfer": "16px",
            "--notch-width": "240px",
            "--notch-depth": "16px",
            "--notch-chamfer": "12px",
            "--frame-padding": "8px",
            "--edge-radius": "50px",
            "--border-width": "0px",
          } as React.CSSProperties
        }
      >
        {/* White border layer (behind) */}
        <div
          className="w-full h-full bg-white"
          style={{
            clipPath: `polygon(
        calc(var(--frame-padding) - var(--border-width)) calc(var(--corner-chamfer) + var(--frame-padding) - var(--border-width)),
        calc(var(--corner-chamfer) + var(--frame-padding) - var(--border-width)) calc(var(--frame-padding) - var(--border-width)),
        calc(50% - var(--notch-width)/2) calc(var(--frame-padding) - var(--border-width)),
        calc(50% - var(--notch-width)/2 + var(--notch-chamfer)) calc(var(--notch-depth) + var(--frame-padding) - var(--border-width)),
        calc(50% + var(--notch-width)/2 - var(--notch-chamfer)) calc(var(--notch-depth) + var(--frame-padding) - var(--border-width)),
        calc(50% + var(--notch-width)/2) calc(var(--frame-padding) - var(--border-width)),
        calc(100% - var(--corner-chamfer) - var(--frame-padding) + var(--border-width)) calc(var(--frame-padding) - var(--border-width)),
        calc(100% - var(--frame-padding) + var(--border-width)) calc(var(--corner-chamfer) + var(--frame-padding) - var(--border-width)),
        calc(100% - var(--frame-padding) + var(--border-width)) calc(50% - var(--notch-width)/2),
        calc(100% - var(--notch-depth) - var(--frame-padding) + var(--border-width)) calc(50% - var(--notch-width)/2 + var(--notch-chamfer)),
        calc(100% - var(--notch-depth) - var(--frame-padding) + var(--border-width)) calc(50% + var(--notch-width)/2 - var(--notch-chamfer)),
        calc(100% - var(--frame-padding) + var(--border-width)) calc(50% + var(--notch-width)/2),
        calc(100% - var(--frame-padding) + var(--border-width)) calc(100% - var(--corner-chamfer) - var(--frame-padding) + var(--border-width)),
        calc(100% - var(--corner-chamfer) - var(--frame-padding) + var(--border-width)) calc(100% - var(--frame-padding) + var(--border-width)),
        calc(50% + var(--notch-width)/2) calc(100% - var(--frame-padding) + var(--border-width)),
        calc(50% + var(--notch-width)/2 - var(--notch-chamfer)) calc(100% - var(--notch-depth) - var(--frame-padding) + var(--border-width)),
        calc(50% - var(--notch-width)/2 + var(--notch-chamfer)) calc(100% - var(--notch-depth) - var(--frame-padding) + var(--border-width)),
        calc(50% - var(--notch-width)/2) calc(100% - var(--frame-padding) + var(--border-width)),
        calc(var(--corner-chamfer) + var(--frame-padding) - var(--border-width)) calc(100% - var(--frame-padding) + var(--border-width)),
        calc(var(--frame-padding) - var(--border-width)) calc(100% - var(--corner-chamfer) - var(--frame-padding) + var(--border-width)),
        calc(var(--frame-padding) - var(--border-width)) calc(50% + var(--notch-width)/2),
        calc(var(--notch-depth) + var(--frame-padding) - var(--border-width)) calc(50% + var(--notch-width)/2 - var(--notch-chamfer)),
        calc(var(--notch-depth) + var(--frame-padding) - var(--border-width)) calc(50% - var(--notch-width)/2 + var(--notch-chamfer)),
        calc(var(--frame-padding) - var(--border-width)) calc(50% - var(--notch-width)/2)
      )`,
            borderRadius: "var(--edge-radius)",
          }}
        />

        {/* Main frame layer with background image */}
        <div
          className={cn("absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat", backgroundColor ? `bg-[${backgroundColor}]` : "bg-zinc-600 dark:bg-zinc-800")}
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            clipPath: `polygon(
        var(--frame-padding) calc(var(--corner-chamfer) + var(--frame-padding)),
        calc(var(--corner-chamfer) + var(--frame-padding)) var(--frame-padding),
        calc(50% - var(--notch-width)/2) var(--frame-padding),
        calc(50% - var(--notch-width)/2 + var(--notch-chamfer)) calc(var(--notch-depth) + var(--frame-padding)),
        calc(50% + var(--notch-width)/2 - var(--notch-chamfer)) calc(var(--notch-depth) + var(--frame-padding)),
        calc(50% + var(--notch-width)/2) var(--frame-padding),
        calc(100% - var(--corner-chamfer) - var(--frame-padding)) var(--frame-padding),
        calc(100% - var(--frame-padding)) calc(var(--corner-chamfer) + var(--frame-padding)),
        calc(100% - var(--frame-padding)) calc(50% - var(--notch-width)/2),
        calc(100% - var(--notch-depth) - var(--frame-padding)) calc(50% - var(--notch-width)/2 + var(--notch-chamfer)),
        calc(100% - var(--notch-depth) - var(--frame-padding)) calc(50% + var(--notch-width)/2 - var(--notch-chamfer)),
        calc(100% - var(--frame-padding)) calc(50% + var(--notch-width)/2),
        calc(100% - var(--frame-padding)) calc(100% - var(--corner-chamfer) - var(--frame-padding)),
        calc(100% - var(--corner-chamfer) - var(--frame-padding)) calc(100% - var(--frame-padding)),
        calc(50% + var(--notch-width)/2) calc(100% - var(--frame-padding)),
        calc(50% + var(--notch-width)/2 - var(--notch-chamfer)) calc(100% - var(--notch-depth) - var(--frame-padding)),
        calc(50% - var(--notch-width)/2 + var(--notch-chamfer)) calc(100% - var(--notch-depth) - var(--frame-padding)),
        calc(50% - var(--notch-width)/2) calc(100% - var(--frame-padding)),
        calc(var(--corner-chamfer) + var(--frame-padding)) calc(100% - var(--frame-padding)),
        var(--frame-padding) calc(100% - var(--corner-chamfer) - var(--frame-padding)),
        var(--frame-padding) calc(50% + var(--notch-width)/2),
        calc(var(--notch-depth) + var(--frame-padding)) calc(50% + var(--notch-width)/2 - var(--notch-chamfer)),
        calc(var(--notch-depth) + var(--frame-padding)) calc(50% - var(--notch-width)/2 + var(--notch-chamfer)),
        var(--frame-padding) calc(50% - var(--notch-width)/2)
      )`,
            borderRadius: "var(--edge-radius)",
          }}
        >
          {/* Background Video */}
          {backgroundVideo && (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={backgroundVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{
                clipPath: `polygon(
            var(--frame-padding) calc(var(--corner-chamfer) + var(--frame-padding)),
            calc(var(--corner-chamfer) + var(--frame-padding)) var(--frame-padding),
            calc(50% - var(--notch-width)/2) var(--frame-padding),
            calc(50% - var(--notch-width)/2 + var(--notch-chamfer)) calc(var(--notch-depth) + var(--frame-padding)),
            calc(50% + var(--notch-width)/2 - var(--notch-chamfer)) calc(var(--notch-depth) + var(--frame-padding)),
            calc(50% + var(--notch-width)/2) var(--frame-padding),
            calc(100% - var(--corner-chamfer) - var(--frame-padding)) var(--frame-padding),
            calc(100% - var(--frame-padding)) calc(var(--corner-chamfer) + var(--frame-padding)),
            calc(100% - var(--frame-padding)) calc(50% - var(--notch-width)/2),
            calc(100% - var(--notch-depth) - var(--frame-padding)) calc(50% - var(--notch-width)/2 + var(--notch-chamfer)),
            calc(100% - var(--notch-depth) - var(--frame-padding)) calc(50% + var(--notch-width)/2 - var(--notch-chamfer)),
            calc(100% - var(--frame-padding)) calc(50% + var(--notch-width)/2),
            calc(100% - var(--frame-padding)) calc(100% - var(--corner-chamfer) - var(--frame-padding)),
            calc(100% - var(--corner-chamfer) - var(--frame-padding)) calc(100% - var(--frame-padding)),
            calc(50% + var(--notch-width)/2) calc(100% - var(--frame-padding)),
            calc(50% + var(--notch-width)/2 - var(--notch-chamfer)) calc(100% - var(--notch-depth) - var(--frame-padding)),
            calc(50% - var(--notch-width)/2 + var(--notch-chamfer)) calc(100% - var(--notch-depth) - var(--frame-padding)),
            calc(50% - var(--notch-width)/2) calc(100% - var(--frame-padding)),
            calc(var(--corner-chamfer) + var(--frame-padding)) calc(100% - var(--frame-padding)),
            var(--frame-padding) calc(100% - var(--corner-chamfer) - var(--frame-padding)),
            var(--frame-padding) calc(50% + var(--notch-width)/2),
            calc(var(--notch-depth) + var(--frame-padding)) calc(50% + var(--notch-width)/2 - var(--notch-chamfer)),
            calc(var(--notch-depth) + var(--frame-padding)) calc(50% - var(--notch-width)/2 + var(--notch-chamfer)),
            var(--frame-padding) calc(50% - var(--notch-width)/2)
          )`
              }}
            />
          )}

          {/* Inner transparent cutout */}
          <div
            className="w-full h-full bg-transparent"
            style={{
              clipPath: `polygon(
          calc(var(--frame-thickness) + var(--frame-padding)) calc(var(--corner-chamfer) + var(--frame-thickness) + var(--frame-padding)),
          calc(var(--corner-chamfer) + var(--frame-thickness) + var(--frame-padding)) calc(var(--frame-thickness) + var(--frame-padding)),
          calc(50% - var(--notch-width)/2) calc(var(--frame-thickness) + var(--frame-padding)),
          calc(50% - var(--notch-width)/2 + var(--notch-chamfer)) calc(var(--notch-depth) + var(--frame-thickness) + var(--frame-padding)),
          calc(50% + var(--notch-width)/2 - var(--notch-chamfer)) calc(var(--notch-depth) + var(--frame-thickness) + var(--frame-padding)),
          calc(50% + var(--notch-width)/2) calc(var(--frame-thickness) + var(--frame-padding)),
          calc(100% - var(--corner-chamfer) - var(--frame-thickness) - var(--frame-padding)) calc(var(--frame-thickness) + var(--frame-padding)),
          calc(100% - var(--frame-thickness) - var(--frame-padding)) calc(var(--corner-chamfer) + var(--frame-thickness) + var(--frame-padding)),
          calc(100% - var(--frame-thickness) - var(--frame-padding)) calc(50% - var(--notch-width)/2),
          calc(100% - var(--notch-depth) - var(--frame-thickness) - var(--frame-padding)) calc(50% - var(--notch-width)/2 + var(--notch-chamfer)),
          calc(100% - var(--notch-depth) - var(--frame-thickness) - var(--frame-padding)) calc(50% + var(--notch-width)/2 - var(--notch-chamfer)),
          calc(100% - var(--frame-thickness) - var(--frame-padding)) calc(50% + var(--notch-width)/2),
          calc(100% - var(--frame-thickness) - var(--frame-padding)) calc(100% - var(--corner-chamfer) - var(--frame-thickness) - var(--frame-padding)),
          calc(100% - var(--corner-chamfer) - var(--frame-thickness) - var(--frame-padding)) calc(100% - var(--frame-thickness) - var(--frame-padding)),
          calc(50% + var(--notch-width)/2) calc(100% - var(--frame-thickness) - var(--frame-padding)),
          calc(50% + var(--notch-width)/2 - var(--notch-chamfer)) calc(100% - var(--notch-depth) - var(--frame-thickness) - var(--frame-padding)),
          calc(50% - var(--notch-width)/2 + var(--notch-chamfer)) calc(100% - var(--notch-depth) - var(--frame-thickness) - var(--frame-padding)),
          calc(50% - var(--notch-width)/2) calc(100% - var(--frame-thickness) - var(--frame-padding)),
          calc(var(--corner-chamfer) + var(--frame-thickness) + var(--frame-padding)) calc(100% - var(--frame-thickness) - var(--frame-padding)),
          calc(var(--frame-thickness) + var(--frame-padding)) calc(100% - var(--corner-chamfer) - var(--frame-thickness) - var(--frame-padding)),
          calc(var(--frame-thickness) + var(--frame-padding)) calc(50% + var(--notch-width)/2),
          calc(var(--notch-depth) + var(--frame-thickness) + var(--frame-padding)) calc(50% + var(--notch-width)/2 - var(--notch-chamfer)),
          calc(var(--notch-depth) + var(--frame-thickness) + var(--frame-padding)) calc(50% - var(--notch-width)/2 + var(--notch-chamfer)),
          calc(var(--frame-thickness) + var(--frame-padding)) calc(50% - var(--notch-width)/2)
        )`,
              borderRadius: "calc(var(--edge-radius) - 2px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}


demo.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HudFrame, TargetingUI } from "@/components/ui/animated-hud-targeting-ui";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [showTargeting, setShowTargeting] = useState(true);
  const [targetingKey, setTargetingKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const svgAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hide: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <HudFrame>
        <div className="flex flex-col w-full h-screen relative overflow-hidden">
            <TargetingUI className="w-128 h-full" />
        </div>
      </HudFrame>
    </div>
  );
}

```

INSTALL NPM DEPENDENCIES:

```bash
next-themes, framer-motion
```

IMPLEMENTATION GUIDELINES

1. ANALYZE THE COMPONENT STRUCTURE AND IDENTIFY ALL REQUIRED DEPENDENCIES
2. REVIEW THE COMPONENT'S ARGUMENS AND STATE
3. IDENTIFY ANY REQUIRED CONTEXT PROVIDERS OR HOOKS AND INSTALL THEM
4. QUESTIONS TO ASK

- WHAT DATA/PROPS WILL BE PASSED TO THIS COMPONENT?
- ARE THERE ANY SPECIFIC STATE MANAGEMENT REQUIREMENTS?
- ARE THERE ANY REQUIRED ASSETS (IMAGES, ICONS, ETC.)?
- WHAT IS THE EXPECTED RESPONSIVE BEHAVIOR?
- WHAT IS THE BEST PLACE TO USE THIS COMPONENT IN THE APP?

STEPS TO INTEGRATE

0. COPY PASTE ALL THE CODE ABOVE IN THE CORRECT DIRECTORIES
1. INSTALL EXTERNAL DEPENDENCIES
2. FILL IMAGE ASSETS WITH UNSPLASH STOCK IMAGES YOU KNOW EXIST
3. USE LUCIDE-REACT ICONS FOR SVGS OR LOGOS IF COMPONENT REQUIRES THEM
