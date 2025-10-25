import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const Slot = SlotPrimitive.Root

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3 leading-normal outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow,transform]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-b from-sidebar-primary to-sidebar-primary/70 text-sidebar-primary-foreground shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)] [a&]:hover:from-sidebar-primary/90 [a&]:hover:to-sidebar-primary/60 [a&]:active:from-sidebar-primary [a&]:active:to-sidebar-primary/50 focus-visible:ring-sidebar-primary/20 dark:focus-visible:ring-sidebar-primary/40",
        secondary:
          "border-transparent bg-gradient-to-b from-secondary to-secondary/90 text-secondary-foreground shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)] [a&]:hover:from-secondary/90 [a&]:hover:to-secondary/80 [a&]:active:from-secondary [a&]:active:to-secondary/70",
        destructive:
          "border-transparent bg-gradient-to-b from-destructive to-destructive/90 text-white shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)] [a&]:hover:from-destructive/90 [a&]:hover:to-destructive/80 [a&]:active:from-destructive [a&]:active:to-destructive/70 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border-input bg-background shadow-xs text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground [a&]:active:bg-accent/80",
        ghost:
          "border-transparent text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground [a&]:active:bg-accent/80",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[0.6875rem]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };