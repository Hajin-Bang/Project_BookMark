export type InputSize = "sm" | "md" | "lg" | "xl";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  disabled?: boolean;
  icon?: React.ReactNode;
  error?: string;
  label?: string;
  full?: boolean;
  className?: string;
}
