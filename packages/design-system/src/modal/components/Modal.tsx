import React from "react";
import { StyledModalContainer, StyledModalOverlay } from "../styles";
import { useModalContext } from "../ModalContext";
import { ModalTrigger } from "./ModalTrigger";
import { ModalContent } from "./ModalContent";
import { ModalTitle } from "./ModalTitle";
import { ModalDescription } from "./ModalDescription";
import { ModalCancel } from "./ModalCancel";
import { ModalAction } from "./ModalAction";

const Modal: React.FC<{ children: React.ReactNode }> & {
  Trigger: typeof ModalTrigger;
  Content: typeof ModalContent;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Cancel: typeof ModalCancel;
  Action: typeof ModalAction;
} = ({ children }) => {
  const { isOpen, closeModal } = useModalContext();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
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
Modal.Cancel = ModalCancel;
Modal.Action = ModalAction;

export default Modal;
