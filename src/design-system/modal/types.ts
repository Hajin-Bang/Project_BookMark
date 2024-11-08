import { ButtonPriority } from "../button/types";

export interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export interface ModalRootProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalTriggerProps {
  children: React.ReactNode;
}

export interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalCancelProps {
  children?: React.ReactNode;
  className?: string;
  priority?: ButtonPriority;
}

export interface ModalActionProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  priority?: ButtonPriority;
}
