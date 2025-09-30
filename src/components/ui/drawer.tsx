"use client";

import * as React from "react";
import { Drawer as VaulDrawer } from "vaul";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      trigger,
      open,
      onOpenChange,
      side = "bottom",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <VaulDrawer.Root open={open} onOpenChange={onOpenChange}>
        {trigger && <VaulDrawer.Trigger asChild>{trigger}</VaulDrawer.Trigger>}
        <VaulDrawer.Portal>
          <VaulDrawer.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
          <VaulDrawer.Content
            ref={ref}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[96%] flex-col rounded-t-[10px] border-t border-neutral-700 bg-neutral-900",
              "before:pointer-events-none before:absolute before:inset-0 before:rounded-t-[10px] before:bg-gradient-to-b before:from-white/5 before:to-transparent",
              className,
            )}
            {...props}
          >
            <div className="mx-auto mb-8 mt-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-neutral-700" />
            {children}
          </VaulDrawer.Content>
        </VaulDrawer.Portal>
      </VaulDrawer.Root>
    );
  },
);
Drawer.displayName = "Drawer";

export { VaulDrawer };
