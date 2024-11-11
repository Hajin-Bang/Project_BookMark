import React, { createContext, ReactNode, useContext, useReducer } from "react";
import {
  ToastAction,
  ToastContextType,
  ToastOptions,
  ToastState,
} from "./types";
import { ToastContainer } from "./components/ToastContainer";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, { ...action.payload }] };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    default:
      return state;
  }
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = (toast: Omit<ToastOptions, "id">) => {
    const id = Date.now().toString();
    dispatch({ type: "ADD_TOAST", payload: { ...toast, id } });

    if (toast.duration) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_TOAST", payload: id });
      }, toast.duration);
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={state.toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
