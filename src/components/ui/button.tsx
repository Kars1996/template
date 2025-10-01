import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-1 ring-inset transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus:outline-none",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-t from-neutral-900 to-neutral-900/85 text-white",
          "border border-b-2 border-zinc-950/40 ring-white/5",
          "shadow-md shadow-zinc-950/20",
          "hover:brightness-110 active:brightness-90",
        ],
        primary: [
          "bg-gradient-to-t from-blue-600 to-blue-600/85 text-white",
          "border border-b-2 border-zinc-950/40 ring-white/10",
          "shadow-md shadow-zinc-950/20",
          "hover:brightness-110 active:brightness-90",
        ],
        secondary: [
          "bg-gradient-to-t from-neutral-800 to-neutral-800/85 text-white",
          "border border-b-2 border-zinc-950/40 ring-white/5",
          "shadow-md shadow-zinc-950/20",
          "hover:brightness-110 active:brightness-90",
        ],
        outline: [
          "bg-gradient-to-t from-transparent to-white/5 text-white",
          "border border-b-2 border-zinc-800 ring-white/10",
          "hover:brightness-110 active:brightness-90",
        ],
        ghost: [
          "bg-transparent text-white ring-0",
          "hover:bg-white/5 active:bg-white/10",
        ],
        destructive: [
          "bg-gradient-to-t from-red-600 to-red-600/85 text-white",
          "border border-b-2 border-zinc-950/40 ring-white/10",
          "shadow-md shadow-zinc-950/20",
          "hover:brightness-110 active:brightness-90",
        ],
      },
      size: {
        default: "h-10 gap-2 rounded-lg px-4 py-2",
        sm: "h-8 gap-2 rounded-md px-3 py-1 text-xs",
        lg: "h-12 gap-3 rounded-xl px-6 py-3 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
