"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ResponsiveModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  isDesktop: boolean;
}

const ResponsiveModalContext = React.createContext<
  ResponsiveModalContextValue | undefined
>(undefined);

function useResponsiveModal() {
  const context = React.useContext(ResponsiveModalContext);
  if (!context) {
    throw new Error(
      "ResponsiveModal compound components must be used within ResponsiveModal"
    );
  }
  return context;
}

interface ResponsiveModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  modal?: boolean;
}

function ResponsiveModal({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  modal = true,
}: ResponsiveModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const contextValue = React.useMemo(
    () => ({ open, setOpen, isDesktop }),
    [open, setOpen, isDesktop]
  );

  return (
    <ResponsiveModalContext.Provider value={contextValue}>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen} modal={modal}>
          {children}
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen} modal={modal}>
          {children}
        </Drawer>
      )}
    </ResponsiveModalContext.Provider>
  );
}

interface ResponsiveModalTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

function ResponsiveModalTrigger({
  children,
  asChild,
}: ResponsiveModalTriggerProps) {
  const { isDesktop } = useResponsiveModal();

  if (isDesktop) {
    return <DialogTrigger asChild={asChild}>{children}</DialogTrigger>;
  }

  return <DrawerTrigger asChild={asChild}>{children}</DrawerTrigger>;
}

interface ResponsiveModalContentProps {
  children: React.ReactNode;
  className?: string;
  dialogClassName?: string;
  drawerClassName?: string;
}

function ResponsiveModalContent({
  children,
  className,
  dialogClassName,
  drawerClassName,
}: ResponsiveModalContentProps) {
  const { isDesktop } = useResponsiveModal();

  if (isDesktop) {
    return (
      <DialogContent
        className={cn("sm:max-w-[405px]", dialogClassName, className)}
      >
        {children}
      </DialogContent>
    );
  }

  return (
    <DrawerContent className={cn(drawerClassName, className)}>
      {children}
    </DrawerContent>
  );
}

interface ResponsiveModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function ResponsiveModalHeader({
  children,
  className,
}: ResponsiveModalHeaderProps) {
  const { isDesktop } = useResponsiveModal();

  if (isDesktop) {
    return <DialogHeader className={className}>{children}</DialogHeader>;
  }

  return <DrawerHeader className={className}>{children}</DrawerHeader>;
}

interface ResponsiveModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

function ResponsiveModalTitle({
  children,
  className,
}: ResponsiveModalTitleProps) {
  const { isDesktop } = useResponsiveModal();

  if (isDesktop) {
    return (
      <DialogTitle className={cn("flex items-center gap-2.5", className)}>
        {children}
      </DialogTitle>
    );
  }

  return (
    <DrawerTitle className={cn("flex items-center gap-2", className)}>
      {children}
    </DrawerTitle>
  );
}

interface ResponsiveModalDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

function ResponsiveModalDescription({
  children,
  className,
}: ResponsiveModalDescriptionProps) {
  const { isDesktop } = useResponsiveModal();

  if (isDesktop) {
    return (
      <DialogDescription className={className}>{children}</DialogDescription>
    );
  }

  return (
    <DrawerDescription className={className}>{children}</DrawerDescription>
  );
}

interface ResponsiveModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

function ResponsiveModalBody({
  children,
  className,
}: ResponsiveModalBodyProps) {
  const { isDesktop } = useResponsiveModal();

  if (isDesktop) {
    return (
      <div className={cn("space-y-6 overflow-y-auto", className)}>
        {children}
      </div>
    );
  }

  return (
    <ScrollArea className={cn("overflow-y-auto px-4 pb-4", className)}>
      {children}
    </ScrollArea>
  );
}

interface ResponsiveModalComposedProps {
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  containerClassName?: string;
  dialogClassName?: string;
  drawerClassName?: string;
}

export function ResponsiveModalComposed({
  title,
  description,
  trigger,
  containerClassName,
  children,
  open,
  setOpen,
  dialogClassName,
  drawerClassName,
}: ResponsiveModalComposedProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen} modal>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className={cn("sm:max-w-[405px]", dialogClassName)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2.5">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className={cn("space-y-6 overflow-y-auto", containerClassName)}>
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} modal>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className={cn("", drawerClassName)}>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <ScrollArea className="overflow-y-auto px-4 pb-4">
          {children}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
  ResponsiveModalBody,
};
