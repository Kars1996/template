"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Palette, Copy, Check, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface ColorPickerProps {
  value?: string;
  onValueChange?: (color: string) => void;
  presetColors?: string[];
  outputFormat?: "hex" | "rgb" | "hsl";
  variant?: "input" | "button";
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
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
      const rgb2 = hexToRgb(hex);
      if (!rgb2) return hex;
      const hsl = rgbToHsl(rgb2.r, rgb2.g, rgb2.b);
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    default:
      return hex;
  }
};

interface ColorPickerCanvasProps {
  hue: number;
  saturation: number;
  lightness: number;
  onColorChange: (h: number, s: number, l: number) => void;
}

const ColorPickerCanvas: React.FC<ColorPickerCanvasProps> = ({ hue, saturation, lightness, onColorChange }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isDragging = React.useRef(false);

  const drawCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw saturation/lightness gradient
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const s = (x / width) * 100;
        const l = ((height - y) / height) * 100;
        const rgb = hslToRgb(hue, s, l);
        ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [hue]);

  React.useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    const s = x * 100;
    const l = (1 - y) * 100;
    
    onColorChange(hue, s, l);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  React.useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handleMouseMove(e);
  };

  const sPos = saturation / 100;
  const lPos = 1 - (lightness / 100);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="w-full h-48 rounded-lg cursor-crosshair border border-neutral-700"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
      />
      <div
        className="absolute w-3 h-3 border-2 border-white rounded-full shadow-lg pointer-events-none"
        style={{
          left: `${sPos * 100}%`,
          top: `${lPos * 100}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

interface HueSliderProps {
  hue: number;
  onHueChange: (hue: number) => void;
}

const HueSlider: React.FC<HueSliderProps> = ({ hue, onHueChange }) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    
    const slider = sliderRef.current;
    if (!slider) return;
    
    const rect = slider.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newHue = x * 360;
    
    onHueChange(newHue);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  React.useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e);
  };

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="h-4 rounded-lg cursor-pointer border border-neutral-700"
        style={{
          background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
      />
      <div
        className="absolute w-2 h-6 bg-white rounded border border-neutral-700 shadow-lg pointer-events-none"
        style={{
          left: `${(hue / 360) * 100}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

const ColorPickerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    onValueChange: (color: string) => void;
    outputFormat: "hex" | "rgb" | "hsl";
  }
>(({ className, value, onValueChange, outputFormat, ...props }, ref) => {
  const [hue, setHue] = React.useState(0);
  const [saturation, setSaturation] = React.useState(100);
  const [lightness, setLightness] = React.useState(50);
  const [recentColors, setRecentColors] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState(false);

  // Convert hex to HSL on mount and when value changes
  React.useEffect(() => {
    const rgb = hexToRgb(value);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
    }
  }, [value]);

  React.useEffect(() => {
    const stored = localStorage.getItem("recent-colors");
    if (stored) {
      try {
        const colors = JSON.parse(stored);
        setRecentColors(colors.slice(0, 7)); // max 7
      } catch (e) {
        console.error("Failed to parse recent colors");
      }
    }
  }, []);

  const saveToRecent = (color: string) => {
    const updated = [color, ...recentColors.filter(c => c !== color)].slice(0, 7);
    setRecentColors(updated);
    localStorage.setItem("recent-colors", JSON.stringify(updated));
  };

  const handleColorChange = (h: number, s: number, l: number) => {
    setHue(h);
    setSaturation(s);
    setLightness(l);
    
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    saveToRecent(hex);
    onValueChange(hex);
  };

  const handleHueChange = (h: number) => {
    setHue(h);
    const rgb = hslToRgb(h, saturation, lightness);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    saveToRecent(hex);
    onValueChange(hex);
  };

  const handlePresetClick = (color: string) => {
    const rgb = hexToRgb(color);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
    }
    saveToRecent(color);
    onValueChange(color);
  };

  const copyToClipboard = async () => {
    const formattedColor = formatColor(value, outputFormat);
    await navigator.clipboard.writeText(formattedColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={ref}
      className={cn("space-y-4", className)}
      {...props}
    >
      <div className="space-y-3">
        <ColorPickerCanvas
          hue={hue}
          saturation={saturation}
          lightness={lightness}
          onColorChange={handleColorChange}
        />
        
        <div className="space-y-2">
          <label className="text-xs text-neutral-400 uppercase tracking-wide">Hue</label>
          <HueSlider hue={hue} onHueChange={handleHueChange} />
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={formatColor(value, outputFormat)}
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
                  value === color && "border-blue-500 ring-2 ring-blue-400/40"
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
ColorPickerContent.displayName = "ColorPickerContent";

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ 
    className, 
    value = "#000000", 
    onValueChange, 
    outputFormat = "hex",
    variant = "input",
    placeholder = "Pick a color...",
    disabled = false,
    ...props 
  }, ref) => {
    const [inputValue, setInputValue] = React.useState(formatColor(value, outputFormat));

    React.useEffect(() => {
      setInputValue(formatColor(value, outputFormat));
    }, [value, outputFormat]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      
      // Try to parse as hex color
      if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
        onValueChange?.(newValue);
      }
    };

    const handleInputBlur = () => {
      // Reset to formatted value if invalid
      if (!/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
        setInputValue(formatColor(value, outputFormat));
      }
    };

    const handleValueChange = (color: string) => {
      onValueChange?.(color);
      setInputValue(formatColor(color, outputFormat));
    };

    if (variant === "input") {
      return (
        <div ref={ref} className={cn("relative", className)} {...props}>
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={cn(
                    "flex h-10 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white",
                    "placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-500",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "pr-10"
                  )}
                />
                <button
                  type="button"
                  disabled={disabled}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors",
                    "hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-400/40",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  <div 
                    className="w-4 h-4 rounded border border-neutral-600"
                    style={{ backgroundColor: value }}
                  />
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <ColorPickerContent
                value={value}
                onValueChange={handleValueChange}
                outputFormat={outputFormat}
                className="p-4"
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40",
                "disabled:pointer-events-none disabled:opacity-50",
                "h-10 px-4 py-2 bg-neutral-800 text-white border border-neutral-700",
                "hover:bg-neutral-700 hover:border-neutral-600"
              )}
            >
              <div 
                className="w-4 h-4 rounded mr-2 border border-neutral-600"
                style={{ backgroundColor: value }}
              />
              {formatColor(value, outputFormat)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <ColorPickerContent
              value={value}
              onValueChange={handleValueChange}
              outputFormat={outputFormat}
              className="p-4"
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";