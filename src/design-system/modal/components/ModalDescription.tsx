import React from "react";
import { StyledModalDescription } from "../styles";
import { ModalDescriptionProps } from "../types";

export const ModalDescription: React.FC<ModalDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <StyledModalDescription className={className}>
      {children}
    </StyledModalDescription>
  );
};
