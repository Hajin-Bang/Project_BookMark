import React from "react";
import { StyledBadge } from "./styles";
import { BadgeProps } from "./types";

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  appearance = "solid",
  shape = "pill",
  children,
  className,
}) => {
  return (
    <StyledBadge
      variant={variant}
      appearance={appearance}
      shape={shape}
      className={className}
    >
      {children}
    </StyledBadge>
  );
};

export default Badge;
