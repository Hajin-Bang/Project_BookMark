import styled, { css } from "styled-components";
import { ButtonPriority, ButtonSize, ButtonVariant } from "./types";
import { typography } from "../tokens/typography";
import { palette } from "../tokens/palette";

export interface StyledButtonProps {
  size: ButtonSize;
  variant: ButtonVariant;
  priority?: ButtonPriority;
  disabled: boolean;
  full?: boolean;
}

/* Size */
const sizeStyles = (size: ButtonSize) => {
  switch (size) {
    case "sm":
      return css`
        height: 36px;
        font-size: ${typography.fontSizeSM};
        padding: 0 12px;
      `;
    case "lg":
      return css`
        height: 48px;
        font-size: ${typography.fontSizeLG};
        padding: 0 20px;
      `;
    case "xl":
      return css`
        height: 56px;
        font-size: ${typography.fontSizeXL};
        padding: 0 24px;
      `;
    default: // md
      return css`
        height: 40px;
        font-size: ${typography.fontSizeMD};
        padding: 0 16px;
      `;
  }
};

/* Variant */
const variantStyles = (
  variant: ButtonVariant,
  priority: ButtonPriority = "default",
  disabled: boolean
) => {
  if (priority === "custom") {
    return css``;
  }

  const baseColor = disabled
    ? palette.gray[400]
    : priority === "important"
    ? palette.red[300]
    : priority === "dark"
    ? palette.black
    : palette.blue[400];
  switch (variant) {
    case "outline":
      return css`
        border: 1px solid ${baseColor};
        color: ${baseColor};
        background-color: ${palette.transparent};
        &:hover {
          background-color: ${baseColor}10;
        }
      `;
    case "ghost":
      return css`
        color: ${baseColor};
        background-color: ${palette.transparent};
        &:hover {
          background-color: ${baseColor}10;
        }
      `;
    case "link":
      return css`
        color: ${baseColor};
        background-color: ${palette.transparent};
        text-decoration: underline;
      `;
    default: // solid
      return css`
        background-color: ${baseColor};
        color: ${palette.white};
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
  ${({ variant, priority, disabled }) =>
    variantStyles(variant, priority, disabled)}
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  margin-right: 8px;
`;
