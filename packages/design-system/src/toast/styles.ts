import styled, { css, keyframes } from "styled-components";
import { ToastVariant } from "./types";
import { typography } from "../tokens/typography";
import { palette } from "../tokens/palette";

const floatUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const variantStyles = (variant: ToastVariant) => {
  switch (variant) {
    case "info":
      return css`
        background-color: ${palette.blue[400]};
        color: ${palette.white};
      `;
    case "success":
      return css`
        background-color: ${palette.green[500]};
        color: ${palette.white};
      `;
    case "error":
      return css`
        background-color: ${palette.red[400]};
        color: ${palette.white};
      `;
  }
};

export const StyledToastContainer = styled.div`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1000;
`;

export const StyledIcon = styled.div<{ variant: ToastVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  ${({ variant }) => variantStyles(variant)};
  border-radius: 50%;
  width: 24px;
  height: 24px;
`;

export const StyledToast = styled.div<{ variant: ToastVariant }>`
  ${({ variant }) => variantStyles(variant)};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  max-width: 320px;
  font-size: ${typography.fontSizeMD};
  animation: ${floatUp} 0.5s ease-out, ${fadeOut} 1s ease-in 3s forwards;
`;
