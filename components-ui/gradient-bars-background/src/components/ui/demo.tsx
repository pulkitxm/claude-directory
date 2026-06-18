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
      {/*
        Note: the source prompt loaded "Inter" from a remote Google Fonts
        <link>. In this offline-first integration "Inter" is vendored locally
        via @font-face in src/index.css, so the remote stylesheet is omitted.
      */}
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
              onChange={(e) => handleBarsChange(Number(e.target.value))}
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
