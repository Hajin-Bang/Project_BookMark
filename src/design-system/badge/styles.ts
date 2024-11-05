import styled, { css } from "styled-components";
import { BadgeAppearance, BadgeProps, BadgeShape, BadgeVariant } from "./types";

const variantStyles = (variant: BadgeVariant = "default") => {
  switch (variant) {
    case "primary":
      return css`
        background-color: #1055ff;
        color: #ffffff;
      `;
    case "secondary":
      return css`
        background-color: #f1f3f5;
        color: #6b7280;
      `;

    case "accent":
      return css`
        background-color: #ef4444;
        color: #ffffff;
      `;
    default: // default
      return css`
        background-color: #dde6ff;
        color: #6b7280;
      `;
  }
};

const appearanceStyles = (appearance: BadgeAppearance = "solid") => {
  if (appearance === "outline") {
    return css`
      background-color: transparent;
      border: 1px solid currentColor;
    `;
  }
  return css``;
};

const shapeStyles = (shape: BadgeShape = "rounded") => {
  return shape === "pill"
    ? css`
        border-radius: 9999px;
      `
    : css`
        border-radius: 5px;
      `;
};

export const StyledBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  font-weight: 600;
  font-size: 10px;
  border-radius: 8px;
  padding: 4px 8px;

  ${({ variant }) => variantStyles(variant)}
  ${({ appearance }) => appearanceStyles(appearance)}
  ${({ shape }) => shapeStyles(shape)}
`;
