import React from "react";
import { ModalCancelProps } from "../types";
import { useModalContext } from "../ModalContext";
import Button from "@design-system/button/Button";

export const ModalCancel: React.FC<ModalCancelProps> = ({
  children = "Cancel",
  className,
  priority = "default",
}) => {
  const { closeModal } = useModalContext();

  return (
    <Button
      onClick={closeModal}
      className={className}
      variant="outline"
      priority={priority}
    >
      {children}
    </Button>
  );
};
