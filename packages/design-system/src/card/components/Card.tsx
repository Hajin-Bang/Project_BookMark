import React from 'react'
import { forwardRef } from "react";
import { StyledCard } from "../styles";
import { CardProps } from "../types";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, direction = "column", children, ...props }, ref) => {
    return (
      <StyledCard
        ref={ref}
        className={className}
        direction={direction}
        {...props}
      >
        {children}
      </StyledCard>
    );
  }
);

Card.displayName = "Card";
