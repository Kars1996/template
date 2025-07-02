"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, showPasswordToggle = false, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const isPassword = type === "password";

        const inputType = isPassword && showPassword ? "text" : type;

        return (
            <div className="relative">
                <input
                    type={inputType}
                    className={cn(
                        "flex w-full h-10 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-400 transition-all duration-200 outline-none",
                        "focus:border-blue-500 focus:ring-2 focus:ring-blue-400/40 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]",
                        "hover:border-blue-400 hover:shadow-[0_0_0_2px_rgba(59,130,246,0.12)]",
                        "before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/10 before:to-transparent",
                        isPassword && showPasswordToggle && "pr-10",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {isPassword && showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:ring-offset-2"
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                )}
            </div>
        );
    },
);
Input.displayName = "Input";

export { Input };
