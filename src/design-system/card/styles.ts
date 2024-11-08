import styled from "styled-components";
import { typography } from "../tokens/typography";

export const StyledCard = styled.div`
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(63, 63, 63, 0.1);
  display: flex;
`;

export const StyledCardTitle = styled.p`
  color: #3c4049;
  font-weight: ${typography.fontWeightBold};
`;

export const StyledCardContent = styled.div`
  color: #666;
`;
