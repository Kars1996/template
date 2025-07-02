import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "group relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-none transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 focus:outline-none",
    {
        variants: {
            variant: {
                default: [
                    "bg-neutral-900 text-white shadow-lg",
                    "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/20 before:to-transparent",
                    "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
                    "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/10 after:to-transparent after:pointer-events-none after:opacity-100 after:transition-all after:duration-200 after:ease-out",
                    "hover:bg-neutral-800 hover:after:opacity-150 hover:shadow-xl hover:scale-[1.02]",
                    "active:scale-[0.98] active:after:opacity-50",
                ],
                primary: [
                    "bg-blue-600 text-white shadow-lg",
                    "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/25 before:to-transparent",
                    "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
                    "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/15 after:to-transparent after:pointer-events-none after:opacity-100 after:transition-all after:duration-200 after:ease-out",
                    "hover:bg-blue-700 hover:after:opacity-200 hover:shadow-xl hover:scale-[1.02]",
                    "active:scale-[0.98] active:after:opacity-50",
                ],
                secondary: [
                    "border border-neutral-700 bg-neutral-800/50 text-white backdrop-blur-sm",
                    "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/10 before:to-transparent",
                    "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
                    "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/5 after:to-transparent after:pointer-events-none after:opacity-100 after:transition-all after:duration-200 after:ease-out",
                    "hover:bg-neutral-700/70 hover:border-neutral-600 hover:after:opacity-150 hover:shadow-lg hover:scale-[1.02]",
                    "active:scale-[0.98] active:after:opacity-50",
                ],
                outline: [
                    "border border-neutral-600 bg-transparent text-white",
                    "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/15 before:to-transparent",
                    "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
                    "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/5 after:to-transparent after:pointer-events-none after:opacity-0 after:transition-all after:duration-200 after:ease-out",
                    "hover:bg-neutral-800/30 hover:border-neutral-500 hover:after:opacity-100 hover:shadow-md hover:scale-[1.02]",
                    "active:scale-[0.98] active:after:opacity-50",
                ],
                ghost: [
                    "bg-transparent text-white",
                    "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/5 after:to-transparent after:pointer-events-none after:opacity-0 after:transition-all after:duration-200 after:ease-out",
                    "hover:bg-neutral-800/50 hover:after:opacity-100 hover:shadow-sm hover:scale-[1.02]",
                    "active:scale-[0.98] active:after:opacity-50",
                ],
                destructive: [
                    "bg-red-600 text-white shadow-lg",
                    "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/20 before:to-transparent",
                    "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
                    "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/10 after:to-transparent after:pointer-events-none after:opacity-100 after:transition-all after:duration-200 after:ease-out",
                    "hover:bg-red-700 hover:after:opacity-200 hover:shadow-xl hover:scale-[1.02]",
                    "active:scale-[0.98] active:after:opacity-50",
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