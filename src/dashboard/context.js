import { createContext, useContext } from "react";

export const ToastContext = createContext(null);
export const DirtyContext = createContext(null);
export const DataContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast harus dipakai di dalam ToastProvider");
  return context;
}

export function useDirty() {
  const context = useContext(DirtyContext);
  if (!context) throw new Error("useDirty harus dipakai di dalam DirtyProvider");
  return context;
}

export function useDashboardData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDashboardData harus dipakai di dalam DataProvider");
  }
  return context;
}
