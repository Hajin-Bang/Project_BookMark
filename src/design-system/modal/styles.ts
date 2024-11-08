import styled from "styled-components";

export const StyledModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
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
  gap: 20px;
`;

export const StyledModalTitle = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
`;

export const StyledModalDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;
