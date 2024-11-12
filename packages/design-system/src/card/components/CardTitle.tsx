import React from 'react'
import { forwardRef } from "react";
import { StyledCardTitle } from "../styles";

export const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return <StyledCardTitle ref={ref} className={className} {...props} />;
});

CardTitle.displayName = "CardTitle";
