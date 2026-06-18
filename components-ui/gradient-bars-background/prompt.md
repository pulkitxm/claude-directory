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
gradient-bars-background.tsx
import React from 'react';

interface GradientBarsProps {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  animationDuration?: number;
  className?: string;
}

const GradientBars: React.FC<GradientBarsProps> = ({
  numBars = 15,
  gradientFrom = 'rgb(255, 60, 0)',
  gradientTo = 'transparent',
  animationDuration = 2,
  className = '',
}) => {
  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const maxHeight = 100;
    const minHeight = 30;
    
    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
    
    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <>
      <style>{`
        @keyframes pulseBar {
          0% { transform: scaleY(var(--initial-scale)); }
          100% { transform: scaleY(calc(var(--initial-scale) * 0.7)); }
        }
      `}</style>
      
      <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
        <div 
          className="flex h-full"
          style={{
            width: '100%',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {Array.from({ length: numBars }).map((_, index) => {
            const height = calculateHeight(index, numBars);
            return (
              <div
                key={index}
                style={{
                  flex: `1 0 calc(100% / ${numBars})`,
                  maxWidth: `calc(100% / ${numBars})`,
                  height: '100%',
                  background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
                  transform: `scaleY(${height / 100})`,
                  transformOrigin: 'bottom',
                  transition: 'transform 0.5s ease-in-out',
                  animation: `pulseBar ${animationDuration}s ease-in-out infinite alternate`,
                  animationDelay: `${index * 0.1}s`,
                  outline: '1px solid rgba(0, 0, 0, 0)',
                  boxSizing: 'border-box',
                  // @ts-ignore
                  '--initial-scale': height / 100,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

interface ComponentProps {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  animationDuration?: number;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export default function Component({
  numBars = 7,
  gradientFrom = 'rgb(255, 60, 0)',
  gradientTo = 'transparent',
  animationDuration = 2,
  backgroundColor = 'rgb(10, 10, 10)',
  children,
}: ComponentProps) {
  return (
    <section 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      <GradientBars
        numBars={numBars}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        animationDuration={animationDuration}
      />
      
      {children && (
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
          {children}
        </div>
      )}
    </section>
  );
}

export { Component };

demo.tsx
import React, { useState } from "react";
import { Component } from "@/components/ui/gradient-bars-background";
import { Settings, X } from "lucide-react";

export default function Demo() {
  const [numBars, setNumBars] = useState(7);
  const [gradientColor, setGradientColor] = useState("#ff3c00");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Ensure only odd numbers
  const handleBarsChange = (value: number) => {
    // If even, round to nearest odd number
    const oddValue = value % 2 === 0 ? value + 1 : value;
    setNumBars(oddValue);
  };

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : "rgb(255, 60, 0)";
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
      />
      <style>{`
        .font-modern {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .control-panel {
          backdrop-filter: blur(12px);
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .control-panel.hidden {
          transform: translateX(320px);
          opacity: 0;
          pointer-events: none;
        }
        
        .toggle-btn {
          backdrop-filter: blur(12px);
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s;
        }
        
        .toggle-btn:hover {
          background: rgba(0, 0, 0, 0.95);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        .control-label {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.2);
          outline: none;
        }
        
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          transition: transform 0.2s;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
        
        .color-picker-wrapper {
          position: relative;
          width: 100%;
          height: 40px;
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        
        .color-picker-wrapper:hover {
          border-color: rgba(255, 255, 255, 0.5);
        }
        
        .color-picker {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          cursor: pointer;
          opacity: 0;
        }
        
        .color-display {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
          font-size: 0.75rem;
        }
        
        .preset-btn {
          height: 36px;
          border-radius: 6px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s;
          cursor: pointer;
        }
        
        .preset-btn:hover {
          border-color: rgba(255, 255, 255, 0.6);
          transform: scale(1.05);
        }
      `}</style>

      <Component
        numBars={numBars}
        gradientFrom={hexToRgb(gradientColor)}
        gradientTo="transparent"
        animationDuration={2}
        backgroundColor="rgb(10, 10, 10)"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="fixed top-4 right-4 z-50 toggle-btn rounded-lg p-3 shadow-2xl"
          aria-label={isPanelOpen ? "Close controls" : "Open controls"}
        >
          {isPanelOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Settings className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Control Panel */}
        <div className={`fixed top-16 right-4 z-40 control-panel rounded-xl p-4 w-[260px] shadow-2xl ${!isPanelOpen ? 'hidden' : ''}`}>
          <h3 className="text-white font-bold text-base mb-4">Customize</h3>
          
          {/* Number of Bars */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="control-label">Bars</label>
              <span className="text-white text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                {numBars}
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="20"
              value={numBars}
              onChange={(e) => setNumBars(Number(e.target.value))}
              className="slider"
            />
          </div>

          {/* Color Picker */}
          <div className="mb-4">
            <label className="control-label">Color</label>
            <div className="color-picker-wrapper" style={{ background: gradientColor }}>
              <input
                type="color"
                value={gradientColor}
                onChange={(e) => setGradientColor(e.target.value)}
                className="color-picker"
              />
              <div className="color-display">
                {gradientColor.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Preset Colors */}
          <div>
            <label className="control-label mb-2">Presets</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                "#ff3c00", // Orange
                "#ff006e", // Pink
                "#8338ec", // Purple
                "#3a86ff", // Blue
                "#06ffa5", // Mint
                "#ffbe0b", // Gold
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => setGradientColor(color)}
                  className="preset-btn"
                  style={{ background: color }}
                  aria-label={`Set color to ${color}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center Info */}
        <div className="text-center font-modern">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Gradient Bars
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium">
            {isPanelOpen ? "Customize using the panel" : "Click the settings icon to customize"}
          </p>
        </div>
      </Component>
    </>
  );
}
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
