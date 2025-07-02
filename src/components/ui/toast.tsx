"use client";

import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Loader2,
  X,
  Copy,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

const toastVariants = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-none transition-all duration-200 ease-out",
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
        success: [
          "bg-green-600 text-white shadow-lg",
          "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/25 before:to-transparent",
          "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
          "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/15 after:to-transparent after:pointer-events-none after:opacity-100 after:transition-all after:duration-200 after:ease-out",
          "hover:bg-green-700 hover:after:opacity-200 hover:shadow-xl hover:scale-[1.02]",
          "active:scale-[0.98] active:after:opacity-50",
        ],
        error: [
          "bg-red-600 text-white shadow-lg",
          "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/20 before:to-transparent",
          "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
          "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/10 after:to-transparent after:pointer-events-none after:opacity-100 after:transition-all after:duration-200 after:ease-out",
          "hover:bg-red-700 hover:after:opacity-200 hover:shadow-xl hover:scale-[1.02]",
          "active:scale-[0.98] active:after:opacity-50",
        ],
        warning: [
          "bg-yellow-600 text-white shadow-lg",
          "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/20 before:to-transparent",
          "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
          "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/10 after:to-transparent after:pointer-events-none after:opacity-100 after:transition-all after:duration-200 after:ease-out",
          "hover:bg-yellow-700 hover:after:opacity-200 hover:shadow-xl hover:scale-[1.02]",
          "active:scale-[0.98] active:after:opacity-50",
        ],
        info: [
          "bg-blue-600 text-white shadow-lg",
          "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/25 before:to-transparent",
          "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
          "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/15 after:to-transparent after:pointer-events-none after:opacity-100 after:transition-all after:duration-200 after:ease-out",
          "hover:bg-blue-700 hover:after:opacity-200 hover:shadow-xl hover:scale-[1.02]",
          "active:scale-[0.98] active:after:opacity-50",
        ],
        loading: [
          "bg-neutral-800 text-white shadow-lg border border-neutral-700",
          "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/10 before:to-transparent",
          "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
          "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/5 after:to-transparent after:pointer-events-none after:opacity-100 after:transition-all after:duration-200 after:ease-out",
        ],
      },
      size: {
        default: "h-10 gap-2 rounded-lg px-4 py-2",
        sm: "h-8 gap-2 rounded-md px-3 py-1 text-xs",
        lg: "h-12 gap-3 rounded-xl px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info" | "loading";
  duration?: number;
  variant?: VariantProps<typeof toastVariants>["variant"];
  size?: VariantProps<typeof toastVariants>["size"];
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
}

export interface ToastPromiseProps {
  promise: Promise<any>;
  loading?: string;
  success?: string;
  error?: string;
  loadingIcon?: React.ReactNode;
  successIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
}

export interface ToastState {
  id: string;
  message: string;
  type: ToastProps["type"];
  variant: VariantProps<typeof toastVariants>["variant"];
  size: VariantProps<typeof toastVariants>["size"];
  icon?: React.ReactNode;
  action?: ToastProps["action"];
  dismissible?: boolean;
  onDismiss?: () => void;
  duration?: number;
  timestamp: number;
}

// Toast state management
const useToastState = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const addToast = (toast: Omit<ToastState, "id" | "timestamp">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastState = {
      ...toast,
      id,
      timestamp: Date.now(),
    };
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }

    return id;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const updateToast = (id: string, updates: Partial<ToastState>) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, ...updates } : toast
    ));
  };

  return { toasts, addToast, removeToast, updateToast };
};

// Global toast state
let toastState: ReturnType<typeof useToastState> | null = null;

const getToastState = () => {
  if (!toastState) {
    toastState = {
      toasts: [],
      addToast: () => "",
      removeToast: () => {},
      updateToast: () => {},
    };
  }
  return toastState;
};

export const toast = {
  success: (message: string, options?: Partial<ToastProps>) => {
    const state = getToastState();
    const id = state.addToast({
      message,
      type: "success",
      variant: "success",
      size: "default",
      icon: <CheckCircle className="h-4 w-4" />,
      duration: options?.duration || 5000,
      action: options?.action,
      dismissible: options?.dismissible ?? true,
      onDismiss: options?.onDismiss,
    });
    
    return sonnerToast.success(message, { 
      duration: options?.duration,
      id,
      ...options 
    });
  },
  
  error: (message: string, options?: Partial<ToastProps>) => {
    const state = getToastState();
    const id = state.addToast({
      message,
      type: "error",
      variant: "error",
      size: "default",
      icon: <XCircle className="h-4 w-4" />,
      duration: options?.duration || 7000,
      action: options?.action,
      dismissible: options?.dismissible ?? true,
      onDismiss: options?.onDismiss,
    });
    
    return sonnerToast.error(message, { 
      duration: options?.duration,
      id,
      ...options 
    });
  },
  
  warning: (message: string, options?: Partial<ToastProps>) => {
    const state = getToastState();
    const id = state.addToast({
      message,
      type: "warning",
      variant: "warning",
      size: "default",
      icon: <AlertTriangle className="h-4 w-4" />,
      duration: options?.duration || 6000,
      action: options?.action,
      dismissible: options?.dismissible ?? true,
      onDismiss: options?.onDismiss,
    });
    
    return sonnerToast.warning(message, { 
      duration: options?.duration,
      id,
      ...options 
    });
  },
  
  info: (message: string, options?: Partial<ToastProps>) => {
    const state = getToastState();
    const id = state.addToast({
      message,
      type: "info",
      variant: "info",
      size: "default",
      icon: <Info className="h-4 w-4" />,
      duration: options?.duration || 5000,
      action: options?.action,
      dismissible: options?.dismissible ?? true,
      onDismiss: options?.onDismiss,
    });
    
    return sonnerToast.info(message, { 
      duration: options?.duration,
      id,
      ...options 
    });
  },

  loading: (message: string, options?: Partial<ToastProps>) => {
    const state = getToastState();
    const id = state.addToast({
      message,
      type: "loading",
      variant: "loading",
      size: "default",
      icon: <Loader2 className="h-4 w-4 animate-spin" />,
      duration: options?.duration || Infinity,
      action: options?.action,
      dismissible: options?.dismissible ?? false,
      onDismiss: options?.onDismiss,
    });
    
    return sonnerToast.loading(message, { 
      duration: options?.duration,
      id,
      ...options 
    });
  },

  dismiss: (toastId: string) => {
    const state = getToastState();
    state.removeToast(toastId);
    sonnerToast.dismiss(toastId);
  },
  
  promise: ({ 
    promise, 
    loading = "Loading...", 
    success = "Success!", 
    error = "Something went wrong"
  }: ToastPromiseProps) => 
    sonnerToast.promise(promise, {
      loading,
      success,
      error,
    }),
  
  custom: (message: string, options?: any) => 
    sonnerToast(message, options),
};

export const ToastComponent: React.FC<ToastState & { onRemove: (id: string) => void }> = ({
  id,
  message,
  icon,
  action,
  dismissible,
  onDismiss,
  onRemove,
}) => {
  const handleDismiss = () => {
    onRemove(id);
    onDismiss?.();
  };

  const handleAction = () => {
    action?.onClick();
    if (action?.onClick) {
      handleDismiss();
    }
  };

  return (
    <div className={cn(
      "group relative flex items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-800/90 p-4 backdrop-blur-sm shadow-lg transition-all duration-200 ease-out",
      "hover:bg-neutral-700/90 hover:border-neutral-600 hover:shadow-xl hover:scale-[1.02]",
      "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-gradient-to-b before:p-px before:from-white/10 before:to-transparent",
      "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
      "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/5 after:to-transparent after:pointer-events-none after:opacity-100 after:transition-all after:duration-200 after:ease-out",
    )}>
      {icon && (
        <div className="flex-shrink-0">
          {icon}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{message}</p>
      </div>

      <div className="flex items-center gap-2">
        {action && (
          <button
            onClick={handleAction}
            className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-white/20"
          >
            {action.icon}
            {action.label}
          </button>
        )}
        
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="inline-flex items-center justify-center rounded-md p-1 text-neutral-400 transition-colors hover:text-white hover:bg-white/10"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export const Toaster = () => {
  const { toasts, removeToast } = useToastState();
  
  // Initialize global state
  if (!toastState) {
    toastState = { toasts, addToast: () => "", removeToast, updateToast: () => {} };
  }

  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        style: {
          background: 'transparent',
          border: 'none',
          padding: '0',
          margin: '0',
          boxShadow: 'none',
        },
        className: '!bg-transparent !border-none !p-0 !m-0 !shadow-none',
      }}
    />
  );
};

export { sonnerToast, toastVariants }; 