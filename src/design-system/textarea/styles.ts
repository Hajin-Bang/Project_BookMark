import styled, { css } from "styled-components";
import { TextareaProps, TextareaResize } from "./types";
import { typography } from "../tokens/typography";
import { palette } from "../tokens/palette";

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
      background-color: ${palette.transparent};
    `};

  ${({ appearance }) =>
    appearance === "none"
      ? { border: "none" }
      : { border: `1px solid ${palette.gray[300]}` }}

  ${({ resize }) => resizeStyles(resize)};

  &:disabled {
    background-color: ${palette.gray[100]};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: ${palette.red[400]};
  font-size: ${typography.fontSizeSM};
  margin-top: 2px;
`;
