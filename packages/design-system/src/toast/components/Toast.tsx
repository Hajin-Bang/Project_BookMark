import React from "react";
import { ToastOptions } from "../types";
import { StyledIcon, StyledToast } from "../styles";
import { CheckCircle, Info, AlertCircle } from "lucide-react";

const iconMap = {
  success: <CheckCircle />,
  error: <AlertCircle />,
  info: <Info />,
};

export const Toast: React.FC<ToastOptions> = ({
  title,
  variant = "success",
}) => {
  return (
    <StyledToast variant={variant}>
      <StyledIcon variant={variant}>{iconMap[variant]}</StyledIcon>
      {title}
    </StyledToast>
  );
};
