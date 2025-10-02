import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, ...props }, ref) => {
  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm text-white">{label}</span>}
      <SwitchPrimitive.Root
        className={cn(
          "group relative inline-flex h-6 w-11 items-center rounded-full",
          "bg-gradient-to-t from-neutral-800 to-neutral-800/85",
          "border border-b-2 border-zinc-950/40 ring-1 ring-inset ring-white/5",
          "shadow-md shadow-zinc-950/20",
          "transition-colors duration-200",
          "data-[state=checked]:to-primary/85 data-[state=checked]:bg-gradient-to-t data-[state=checked]:from-primary",
          "focus-visible:ring-primary/20 focus-visible:ring-2",
          className,
        )}
        ref={ref}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "block h-4 w-4 rounded-full",
            "bg-gradient-to-t from-white to-white/90",
            "shadow-md shadow-zinc-950/20",
            "transition-transform duration-200",
            "translate-x-1",
            "data-[state=checked]:translate-x-6",
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
});
Switch.displayName = "Switch";
