import { forwardRef } from "react";
import { StyledCardContent } from "../styles";

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <StyledCardContent ref={ref} className={className} {...props} />;
});

CardContent.displayName = "CardContent";
