"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ trigger, children, className, align = "start", ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div ref={dropdownRef} className={cn("relative inline-block", className)} {...props}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-white text-sm transition-all duration-200",
            "hover:border-blue-400 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-400/40",
            "before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/5 before:to-transparent"
          )}
        >
          {trigger}
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
        
        {isOpen && (
          <div
            className={cn(
              "absolute top-full mt-2 min-w-[200px] rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg z-50",
              "before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/5 before:to-transparent",
              align === "start" && "left-0",
              align === "center" && "left-1/2 -translate-x-1/2",
              align === "end" && "right-0"
            )}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

export interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ children, onClick, className, disabled = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 text-left text-sm text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg",
          "hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownItem.displayName = "DropdownItem"; 