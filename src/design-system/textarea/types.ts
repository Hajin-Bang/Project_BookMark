export type TextareaResize = "none" | "vertical" | "horizontal" | "both";
export type TextareaAppearance = "standard" | "none";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: TextareaResize;
  appearance?: TextareaAppearance;
  disabled?: boolean;
  error?: string;
  label?: string;
  className?: string;
}
