import React from "react";
import { StyledModalContainer, StyledModalOverlay } from "../styles";
import { useModalContext } from "../ModalContext";
import { ModalTrigger } from "./ModalTrigger";
import { ModalContent } from "./ModalContent";
import { ModalTitle } from "./ModalTitle";
import { ModalDescription } from "./ModalDescription";
import { ModalCancel } from "./ModalCancel";
import { ModalAction } from "./ModalAction";
import { ModalRootProps } from "../types";
import { ModalActions } from "./ModalActions";

const Modal: React.FC<ModalRootProps> & {
  Trigger: typeof ModalTrigger;
  Content: typeof ModalContent;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Actions: typeof ModalActions;
  Cancel: typeof ModalCancel;
  Action: typeof ModalAction;
} = ({ open: controlledOpen, onOpenChange, children }) => {
  const { isOpen: contextIsOpen, closeModal } = useModalContext();

  const isOpen = controlledOpen !== undefined ? controlledOpen : contextIsOpen;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (onOpenChange) {
        onOpenChange(false);
      } else {
        closeModal();
      }
    }
  };

  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type === ModalTrigger
          ? child
          : null
      )}

      {isOpen && (
        <StyledModalOverlay onClick={handleOverlayClick}>
          <StyledModalContainer>
            {React.Children.map(children, (child) =>
              React.isValidElement(child) && child.type !== ModalTrigger
                ? child
                : null
            )}
          </StyledModalContainer>
        </StyledModalOverlay>
      )}
    </>
  );
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Actions = ModalActions;
Modal.Cancel = ModalCancel;
Modal.Action = ModalAction;

export default Modal;
