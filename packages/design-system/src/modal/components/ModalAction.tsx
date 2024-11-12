import React from "react";
import { ModalActionProps } from "../types";
import Button from "../../button/Button";

export const ModalAction: React.FC<ModalActionProps> = ({
  children,
  onClick,
  className,
  priority = "default",
}) => {
  return (
    <Button onClick={onClick} className={className} priority={priority}>
      {children}
    </Button>
  );
};
