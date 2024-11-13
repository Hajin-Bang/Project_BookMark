import React from "react";
import { StyledModalActions } from "../styles";
import { ModalCancel } from "./ModalCancel";
import { ModalAction } from "./ModalAction";
import { ModalActionsProps } from "../types";

export const ModalActions: React.FC<ModalActionsProps> = ({ children }) => {
  const buttonCount = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child.type === ModalCancel || child.type === ModalAction)
  ).length;

  return (
    <StyledModalActions buttonCount={buttonCount}>
      {children}
    </StyledModalActions>
  );
};
