import styled, { css } from "styled-components";
import { BadgeAppearance, BadgeProps, BadgeShape, BadgeVariant } from "./types";
import { typography } from "../tokens/typography";
import { palette } from "../tokens/palette";

const variantStyles = (variant: BadgeVariant = "default") => {
  switch (variant) {
    case "primary":
      return css`
        background-color: ${palette.blue[600]};
        color: ${palette.white};
      `;
    case "secondary":
      return css`
        background-color: ${palette.gray[100]};
        color: ${palette.gray[500]};
      `;

    case "accent":
      return css`
        background-color: ${palette.red[400]};
        color: ${palette.white};
      `;
    default: // default
      return css`
        background-color: ${palette.blue[100]};
        color: ${palette.gray[500]};
      `;
  }
};

const appearanceStyles = (appearance: BadgeAppearance = "solid") => {
  if (appearance === "outline") {
    return css`
      background-color: ${palette.transparent};
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
  font-weight: ${typography.fontWeightMedium};
  font-size: ${typography.fontSizeSM};
  border-radius: 8px;
  padding: 4px 8px;
  ${({ variant }) => variantStyles(variant)}
  ${({ appearance }) => appearanceStyles(appearance)}
  ${({ shape }) => shapeStyles(shape)}
`;
