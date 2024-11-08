import styled, { css, keyframes } from "styled-components";
import { ToastVariant } from "./types";
import { typography } from "../tokens/typography";

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
        background-color: #2196f3;
        color: white;
      `;
    case "success":
      return css`
        background-color: #4caf50;
        color: white;
      `;
    case "error":
      return css`
        background-color: #f44336;
        color: white;
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
