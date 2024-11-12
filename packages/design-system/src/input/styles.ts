import styled, { css } from "styled-components";
import { InputSize } from "./types";
import { typography } from "../tokens/typography";
import { palette } from "../tokens/palette";

export const InputContainer = styled.div<{ full: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ full }) => (full ? "100%" : "auto")};
`;

export const LabelWrapper = styled.div`
  padding-left: 0.2em;
`;

export const InputWrapper = styled.div<{ full: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ full }) => (full ? "100%" : "auto")};
`;

export const IconWrapper = styled.span`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  color: ${palette.gray[500]};
`;

const sizeStyles = (size: InputSize) => {
  switch (size) {
    case "sm":
      return {
        padding: "6px 6px 6px 36px",
        fontSize: typography.fontSizeSM,
      };
    case "lg":
      return {
        padding: "12px 12px 12px 36px",
        fontSize: typography.fontSizeLG,
      };
    case "xl":
      return {
        padding: "12px 12px 12px 36px",
        fontSize: typography.fontSizeXL,
      };
    default:
      // "md"
      return {
        padding: "8px 12px 8px 36px",
        fontSize: typography.fontSizeMD,
      };
  }
};

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !["hasError", "hasIcon", "full"].includes(prop),
})<{
  size: InputSize;
  hasError: boolean;
  hasIcon: boolean;
  full: boolean;
}>`
  width: ${({ full }) => (full ? "100%" : "auto")};
  padding: ${({ size, hasIcon }) =>
    hasIcon
      ? sizeStyles(size).padding
      : sizeStyles(size).padding.replace("36px", "12px")};
  font-size: ${({ size }) => sizeStyles(size).fontSize};
  border: 1px solid ${palette.gray[200]};
  border-radius: 5px;
  background-color: ${palette.transparent};
  outline: none;
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${palette.gray[100]};
      cursor: not-allowed;
    `}
`;

export const ErrorMessage = styled.p`
  color: ${palette.red[400]};
  font-size: ${typography.fontSizeSM};
  margin-top: 2px;
  padding-left: 0.3em;
`;
