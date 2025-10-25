"use client";
import { Toaster as Sonner, toast as sonnerToast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="bottom-center"
      visibleToasts={3}
      duration={1500}
      richColors
      gap={8}
      theme="dark"
      toastOptions={{
        unstyled: false,
        closeButton: false,
        classNames: {
          toast:
            "flex justify-center items-center w-fit! mx-auto px-1 py-2.5! rounded-full! bg-card dark:bg-card",
        },
      }}
      className="flex items-center justify-center"
      {...props}
    />
  );
};

// Composed API
type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "default";

interface ShowToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

const toastIcons = {
  success: <CheckCircle2 className="size-4" />,
  error: <XCircle className="size-4" />,
  warning: <AlertCircle className="size-4" />,
  info: <Info className="size-4" />,
  loading: <Loader2 className="size-4 animate-spin" />,
  default: null,
};

function showToast(
  type: ToastType,
  message: string,
  options?: ShowToastOptions
) {
  const icon = toastIcons[type];
  const toastOptions = {
    description: options?.description,
    action: options?.action,
    cancel: options?.cancel,
    duration: options?.duration,
    icon,
  };

  switch (type) {
    case "success":
      return sonnerToast.success(message, toastOptions);
    case "error":
      return sonnerToast.error(message, toastOptions);
    case "warning":
      return sonnerToast.warning(message, toastOptions);
    case "info":
      return sonnerToast.info(message, toastOptions);
    case "loading":
      return sonnerToast.loading(message, toastOptions);
    default:
      return sonnerToast(message, toastOptions);
  }
}

const toast = sonnerToast;

export { Toaster, showToast, toast };
