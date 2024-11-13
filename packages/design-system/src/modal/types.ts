import { ButtonPriority } from "../button/types";

export interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export interface ModalRootProps {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export interface ModalTriggerProps {
  children?: React.ReactNode;
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

export interface ModalActionsProps {
  children: React.ReactNode;
}

export interface ModalCancelProps {
  children?: React.ReactNode;
  className?: string;
  priority?: ButtonPriority;
  onOpenChange?: (isOpen: boolean) => void;
}

export interface ModalActionProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  priority?: ButtonPriority;
}
