export type BadgeVariant = "default" | "primary" | "secondary" | "accent";
export type BadgeAppearance = "solid" | "outline";
export type BadgeShape = "rounded" | "pill";

export interface BadgeProps {
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
  shape?: BadgeShape;
  children: React.ReactNode;
  className?: string;
}
