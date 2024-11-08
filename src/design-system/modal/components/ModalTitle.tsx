import React from "react";
import { StyledModalTitle } from "../styles";
import { ModalTitleProps } from "../types";

export const ModalTitle: React.FC<ModalTitleProps> = ({
  children,
  className,
}) => {
  return <StyledModalTitle className={className}>{children}</StyledModalTitle>;
};
