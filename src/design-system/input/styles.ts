import styled, { css } from "styled-components";
import { InputSize } from "./types";

export const InputContainer = styled.div<{ full: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ full }) => (full ? "100%" : "auto")};
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
  color: #333;
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
  color: #999ba1;
`;

const sizeStyles = (size: InputSize) => {
  switch (size) {
    case "sm":
      return {
        padding: "6px 6px 6px 36px",
        fontSize: "13px",
      };
    case "lg":
      return {
        padding: "12px 12px 12px 36px",
        fontSize: "14px",
      };
    case "xl":
      return {
        padding: "12px 12px 12px 36px",
        fontSize: "16px",
      };
    default:
      // "md"
      return {
        padding: "8px 12px 8px 36px",
        fontSize: "14px",
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
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  outline: none;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #f0f0f0;
      cursor: not-allowed;
    `}
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
  margin-top: 2px;
`;
