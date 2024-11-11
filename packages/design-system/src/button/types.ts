export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonType = "button" | "submit" | "reset";
export type ButtonPriority = "default" | "important" | "dark" | "custom";

export interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  priority?: ButtonPriority;
  disabled?: boolean;
  icon?: React.ReactNode;
  as?: React.ElementType;
  type?: ButtonType;
  full?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
