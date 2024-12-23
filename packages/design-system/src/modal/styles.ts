import styled from "styled-components";
import { typography } from "../tokens/typography";
import { palette } from "../tokens/palette";

export const StyledModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const StyledModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  padding: 5px 24px;
`;

export const StyledModalContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const StyledModalTitle = styled.p`
  font-size: ${typography.fontSizeXL};
  font-weight: ${typography.fontWeightBold};
`;

export const StyledModalDescription = styled.p`
  font-size: ${typography.fontSizeMD};
  color: ${palette.gray[700]};
`;

export const StyledModalActions = styled.div<{ buttonCount: number }>`
  display: flex;
  justify-content: center;
  gap: ${({ buttonCount }) => (buttonCount === 2 ? "8px" : "0")};
`;
