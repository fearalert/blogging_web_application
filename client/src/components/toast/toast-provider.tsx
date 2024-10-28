"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { ToastViewport, Toast } from "./toast";

type ToastContextType = {
  showToast: (title: string, description: string) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastData, setToastData] = React.useState<{ title: string; description: string } | null>(null);

  const showToast = (title: string, description: string) => {
    setToastData({ title, description });
    setTimeout(() => setToastData(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toastData && (
          <Toast title={toastData.title} description={toastData.description} />
        )}
        <ToastViewport />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
