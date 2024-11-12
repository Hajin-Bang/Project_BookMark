import styled from "styled-components";
import { typography } from "../tokens/typography";
import { palette } from "../tokens/palette";
import { CardProps } from "./types";

export const StyledCard = styled.div<CardProps>`
  border-radius: 8px;
  border: 1px solid ${palette.gray[200]};
  background-color: ${palette.white};
  box-shadow: 0px 4px 8px rgba(63, 63, 63, 0.1);
  display: flex;
  flex-direction: ${({ direction = "column" }) => direction};
  padding: 1em;
  gap: ${({ direction }) => (direction === "row" ? "1em" : "0.5em")};
  align-items: center;
`;

export const StyledCardTitle = styled.p`
  color: ${palette.gray[800]};
  font-weight: ${typography.fontWeightBold};
`;

export const StyledCardContent = styled.div<CardProps>`
  color: ${palette.gray[700]};
`;
