import React from "react";
import { ModalCancelProps } from "../types";
import { useModalContext } from "../ModalContext";
import Button from "@/design-system/button/Button";

export const ModalCancel: React.FC<ModalCancelProps> = ({
  children = "Cancel",
  className,
}) => {
  const { closeModal } = useModalContext();

  return (
    <Button
      onClick={closeModal}
      className={className}
      color="#6a6868"
      variant="outline"
    >
      {children}
    </Button>
  );
};
