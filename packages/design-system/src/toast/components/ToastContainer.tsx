import React from "react";
import { ToastContainerProps } from "../types";
import { StyledToastContainer } from "../styles";
import { Toast } from "./Toast";

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => (
  <StyledToastContainer>
    {toasts.map((toast) => (
      <Toast key={toast.id} {...toast} />
    ))}
  </StyledToastContainer>
);
