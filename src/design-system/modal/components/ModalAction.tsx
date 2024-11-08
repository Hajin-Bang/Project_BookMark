import React from "react";
import { ModalActionProps } from "../types";
import Button from "@/design-system/button/Button";

export const ModalAction: React.FC<ModalActionProps> = ({
  children,
  onClick,
  className,
  color,
}) => {
  return (
    <Button onClick={onClick} className={className} color={color}>
      {children}
    </Button>
  );
};
