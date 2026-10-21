"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type ToastType = "success" | "error";
type ToastItem = { id: number; message: string; type: ToastType };
type ToastContextValue = { toast: (message: string, type?: ToastType) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.random();
    setItems((current) => [...current, { id, message, type }]);
    window.setTimeout(() => setItems((current) => current.filter((item) => item.id !== id)), 3500);
  }, []);

  return <ToastContext.Provider value={{ toast }}>{children}<div aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-[2000] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">{items.map((item) => <div key={item.id} className={`rounded-lg px-4 py-3 text-white shadow-lg ${item.type === "error" ? "bg-red-700" : "bg-brand-petroleo"}`}>{item.message}</div>)}</div></ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast deve ser usado dentro de ToastProvider");
  return context;
}