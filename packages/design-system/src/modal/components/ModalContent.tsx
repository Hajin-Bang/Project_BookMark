import React from 'react'
import { StyledModalContent } from "../styles";
import { ModalContentProps } from "../types";

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  className,
}) => {
  return (
    <StyledModalContent className={className}>{children}</StyledModalContent>
  );
};
