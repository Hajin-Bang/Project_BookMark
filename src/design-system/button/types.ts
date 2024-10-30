export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  icon?: React.ReactNode;
  as?: React.ElementType;
  type?: ButtonType;
  color?: string;
  full?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
