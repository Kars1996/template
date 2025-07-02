"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Palette, Copy, Check } from "lucide-react";

export interface ColorPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onColorChange?: (color: string) => void;
  presetColors?: string[];
  outputFormat?: "hex" | "rgb" | "hsl";
}

const defaultColors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
  "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
  "#F8C471", "#82E0AA", "#F1948A", "#85C1E9", "#D7BDE2"
];

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const hexToHsl = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  
  const { r, g, b } = rgb;
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r1: h = (g1 - b1) / d + (g1 < b1 ? 6 : 0); break;
      case g1: h = (b1 - r1) / d + 2; break;
      case b1: h = (r1 - g1) / d + 4; break;
    }
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const formatColor = (hex: string, format: "hex" | "rgb" | "hsl") => {
  switch (format) {
    case "hex":
      return hex.toUpperCase();
    case "rgb":
      const rgb = hexToRgb(hex);
      return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : hex;
    case "hsl":
      const hsl = hexToHsl(hex);
      return hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : hex;
    default:
      return hex;
  }
};

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ className, label, onColorChange, presetColors = defaultColors, value = "#000000", outputFormat = "hex", ...props }, ref) => {
    const [selectedColor, setSelectedColor] = React.useState(value as string);
    const [recentColors, setRecentColors] = React.useState<string[]>([]);
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
      const stored = localStorage.getItem("recent-colors");
      if (stored) {
        try {
          const colors = JSON.parse(stored);
          setRecentColors(colors.slice(0, 8)); // max 8
        } catch (e) {
          console.error("Failed to parse recent colors");
        }
      }
    }, []);

    const saveToRecent = (color: string) => {
      const updated = [color, ...recentColors.filter(c => c !== color)].slice(0, 8);
      setRecentColors(updated);
      localStorage.setItem("recent-colors", JSON.stringify(updated));
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      setSelectedColor(newColor);
      saveToRecent(newColor);
      onColorChange?.(newColor);
    };

    const handlePresetClick = (color: string) => {
      setSelectedColor(color);
      saveToRecent(color);
      onColorChange?.(color);
    };

    const copyToClipboard = async () => {
      const formattedColor = formatColor(selectedColor, outputFormat);
      await navigator.clipboard.writeText(formattedColor);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {label && (
          <label className="text-sm font-medium text-white">{label}</label>
        )}
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              ref={ref}
              type="color"
              value={selectedColor}
              onChange={handleColorChange}
              className={cn(
                "w-12 h-12 rounded-lg border-2 border-neutral-700 bg-transparent cursor-pointer transition-all duration-200",
                "hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/40",
                "before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/10 before:to-transparent"
              )}
              {...props}
            />
            <div 
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ backgroundColor: selectedColor }}
            />
          </div>
          
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={formatColor(selectedColor, outputFormat)}
              readOnly
              className={cn(
                "flex-1 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-white text-sm font-mono",
                "focus:outline-none"
              )}
            />
            <button
              onClick={copyToClipboard}
              className={cn(
                "px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-white transition-all duration-200",
                "hover:border-blue-400 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
              )}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {recentColors.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs text-neutral-400 uppercase tracking-wide">Recent</label>
            <div className="flex gap-2 flex-wrap">
              {recentColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetClick(color)}
                  className={cn(
                    "w-8 h-8 rounded-lg border-2 border-neutral-700 transition-all duration-200 cursor-pointer",
                    "hover:scale-110 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40",
                    selectedColor === color && "border-blue-500 ring-2 ring-blue-400/40"
                  )}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs text-neutral-400 uppercase tracking-wide">Presets</label>
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((color, index) => (
              <button
                key={index}
                onClick={() => handlePresetClick(color)}
                className={cn(
                  "w-8 h-8 rounded-lg border-2 border-neutral-700 transition-all duration-200 cursor-pointer",
                  "hover:scale-110 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40",
                  selectedColor === color && "border-blue-500 ring-2 ring-blue-400/40"
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);
ColorPicker.displayName = "ColorPicker"; 