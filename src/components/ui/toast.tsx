"use client";

import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info" | "fail" | "loading";
  duration?: number;
}

export interface ToastPromiseProps {
  promise: Promise<any>;
  loading?: string;
  success?: string;
  error?: string;
  fail?: string;
}

export const toast = {
  success: (message: string, duration?: number) => 
    sonnerToast.success(message, { duration }),
  
  error: (message: string, duration?: number) => 
    sonnerToast.error(message, { duration }),
  
  warning: (message: string, duration?: number) => 
    sonnerToast.warning(message, { duration }),
  
  info: (message: string, duration?: number) => 
    sonnerToast.info(message, { duration }),
  
  fail: (message: string, duration?: number) => 
    sonnerToast.error(message, { duration }),
  
  loading: (message: string, duration?: number) => 
    sonnerToast.loading(message, { duration }),
  
  promise: ({ promise, loading = "Loading...", success = "Success!", error = "Something went wrong", fail = "Failed!" }: ToastPromiseProps) => 
    sonnerToast.promise(promise, {
      loading,
      success,
      error: fail || error,
    }),
  
  custom: (message: string, options?: any) => 
    sonnerToast(message, options),
};

export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        style: {
          background: 'rgb(38 38 38)',
          color: 'white',
          border: '1px solid rgb(64 64 64)',
        },
        className: 'bg-neutral-800 border-neutral-700 text-white',
      }}
      theme="dark"
      richColors
    />
  );
};

export { sonnerToast }; 