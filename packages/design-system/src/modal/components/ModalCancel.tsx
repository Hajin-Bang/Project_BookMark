import React from "react";
import { ModalCancelProps } from "../types";
import { useModalContext } from "../ModalContext";
import Button from "../../button/Button";

export const ModalCancel: React.FC<ModalCancelProps> = ({
  children = "Cancel",
  className,
  priority = "default",
  onOpenChange,
}) => {
  const { closeModal } = useModalContext();

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      closeModal();
    }
  };

  return (
    <Button
      onClick={handleClose}
      className={className}
      variant="outline"
      priority={priority}
    >
      {children}
    </Button>
  );
};
