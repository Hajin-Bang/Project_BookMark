import { forwardRef } from "react";
import { StyledCard } from "../styles";

export const Card = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <StyledCard ref={ref} className={className} {...props} />;
});

Card.displayName = "Card";
