import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "relative inline-flex h-10 items-center justify-center space-x-2 whitespace-nowrap rounded-lg px-4 text-center text-sm font-medium transition before:absolute before:inset-0 before:rounded-lg disabled:pointer-events-none disabled:opacity-75 focus:outline-0",
    {
        variants: {
            variant: {
                default:
                    "bg-neutral-900 bg-gradient-to-b from-white/10 to-transparent text-white before:shadow-inner before:shadow-white/20 hover:bg-neutral-800 focus-visible:ring-1 focus-visible:ring-neutral-400",
                secondary:
                    "border border-neutral-700 bg-neutral-800 bg-gradient-to-b from-transparent to-neutral-900/20 text-white shadow-sm hover:bg-neutral-700 focus-visible:border-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-400",
                outline:
                    "border border-neutral-700 bg-transparent text-white hover:bg-neutral-800 focus-visible:border-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-400",
                ghost:
                    "bg-transparent text-white hover:bg-neutral-800 focus-visible:ring-1 focus-visible:ring-neutral-400",
                destructive:
                    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-1 focus-visible:ring-red-500",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 px-3 text-xs",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 