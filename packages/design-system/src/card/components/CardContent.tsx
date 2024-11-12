import React from 'react'
import { forwardRef } from "react";
import { StyledCardContent } from "../styles";

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <StyledCardContent ref={ref} className={className} {...props}>
      {children}
    </StyledCardContent>
  );
});

CardContent.displayName = "CardContent";
