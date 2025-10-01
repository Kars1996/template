import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex cursor-pointer select-none items-center gap-3">
        <span className={cn("text-sm text-white", !label && "sr-only")}>
          {label}
        </span>
        <span className="relative inline-block h-6 w-11">
          <input
            type="checkbox"
            className="peer h-0 w-0 opacity-0"
            ref={ref}
            {...props}
          />
          <span className={cn(
            "absolute left-0 top-0 h-6 w-11 rounded-full transition-colors duration-200",
            "bg-gradient-to-t from-neutral-800 to-neutral-800/85",
            "border border-b-2 border-zinc-950/40 ring-1 ring-inset ring-white/5",
            "peer-checked:bg-gradient-to-t peer-checked:from-primary peer-checked:to-primary/85",
            "peer-focus:ring-2 peer-focus:ring-primary/20"
          )} />
          <span className={cn(
            "absolute left-1 top-1 h-4 w-4 rounded-full",
            "bg-gradient-to-t from-white to-white/90",
            "shadow-md shadow-zinc-950/20",
            "transition-transform duration-200",
            "peer-checked:translate-x-5"
          )} />
        </span>
      </label>
    )
  }
)
Switch.displayName = "Switch";

