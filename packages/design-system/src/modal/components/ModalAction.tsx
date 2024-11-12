import React from "react";
import { ModalActionProps } from "../types";
import Button from "../../button/Button";
import { useModalContext } from "../ModalContext";

export const ModalAction: React.FC<ModalActionProps> = ({
  children,
  onClick,
  className,
  priority = "default",
}) => {
  const { closeModal } = useModalContext();

  const handleClick = () => {
    closeModal();
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button onClick={handleClick} className={className} priority={priority}>
      {children}
    </Button>
  );
};
