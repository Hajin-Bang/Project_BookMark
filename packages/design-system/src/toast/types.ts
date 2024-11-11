export type ToastVariant = "info" | "success" | "error";

export interface ToastOptions {
  id: string;
  title: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastState {
  toasts: ToastOptions[];
}

export interface ToastContextType {
  addToast: (toast: Omit<ToastOptions, "id">) => void;
}

export interface ToastContainerProps {
  toasts: ToastOptions[];
}

export type ToastAction =
  | { type: "ADD_TOAST"; payload: ToastOptions }
  | { type: "REMOVE_TOAST"; payload: string };
