import React from "react";
import { useModalContext } from "../ModalContext";
import Button from "@/design-system/button/Button";

export const ModalTrigger: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { openModal } = useModalContext();

  return <Button onClick={openModal}>{children}</Button>;
};
