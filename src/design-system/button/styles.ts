import styled, { css } from "styled-components";
import { ButtonSize, ButtonVariant } from "./types";

export interface StyledButtonProps {
  size: ButtonSize;
  variant: ButtonVariant;
  disabled: boolean;
  color?: string;
  full?: boolean;
}

/* Size */
const sizeStyles = (size: ButtonSize) => {
  switch (size) {
    case "sm":
      return css`
        height: 36px;
        font-size: 12px;
        padding: 0 12px;
      `;
    case "lg":
      return css`
        height: 48px;
        font-size: 16px;
        padding: 0 20px;
      `;
    case "xl":
      return css`
        height: 56px;
        font-size: 18px;
        padding: 0 24px;
      `;
    default: // md
      return css`
        height: 40px;
        font-size: 14px;
        padding: 0 16px;
      `;
  }
};

/* Variant */
const variantStyles = (
  variant: ButtonVariant,
  color: string = "#000000",
  disabled: boolean
) => {
  const baseColor = disabled ? "#B0B0B0" : color;
  switch (variant) {
    case "outline":
      return css`
        border: 1px solid ${baseColor};
        color: ${baseColor};
        background-color: transparent;
        &:hover {
          background-color: ${baseColor}10;
        }
      `;
    case "ghost":
      return css`
        color: ${baseColor};
        background-color: transparent;
        &:hover {
          background-color: ${baseColor}10;
        }
      `;
    case "link":
      return css`
        color: ${baseColor};
        background-color: transparent;
        text-decoration: underline;
      `;
    default: // solid
      return css`
        background-color: ${baseColor};
        color: white;
        &:hover {
          background-color: ${baseColor}cc;
        }
      `;
  }
};

export const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  border-radius: 8px;
  letter-spacing: 1.5px;
  overflow: hidden;
  min-width: fit-content;
  white-space: nowrap;
  line-height: 1.5;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  width: ${({ full }) => (full ? "100%" : "auto")};

  ${({ size }) => sizeStyles(size)}
  ${({ variant, color, disabled }) => variantStyles(variant, color, disabled)}
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  margin-right: 8px;
`;
