import styled, { css } from "styled-components";
import { TextareaProps, TextareaResize } from "./types";
import { typography } from "../tokens/typography";

export const StyledTextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const resizeStyles = (resize: TextareaResize = "both") => {
  switch (resize) {
    case "vertical":
      return css`
        resize: vertical;
      `;
    case "horizontal":
      return css`
        resize: horizontal;
      `;
    case "none":
      return css`
        resize: none;
      `;
    default: // both
      return css`
        resize: both;
      `;
  }
};

export const StyledTextarea = styled.textarea.withConfig({
  shouldForwardProp: (prop) =>
    !["resize", "appearance", "hasError"].includes(prop),
})<TextareaProps & { hasError: boolean }>`
  ${({ className }) =>
    !className &&
    css`
      width: 100%;
      padding: 10px;
      font-size: ${typography.fontSizeMD};
      border-radius: 5px;
      outline: none;
      background-color: transparent;
    `};
  ${({ appearance }) =>
    appearance === "none" ? { border: "none" } : { border: "1px solid #ccc" }}
  ${({ hasError }) =>
    hasError && {
      borderColor: "red",
    }}
  
    ${({ resize }) => resizeStyles(resize)};
  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`;
