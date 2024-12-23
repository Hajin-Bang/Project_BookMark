import styled from "styled-components";
import { typography } from "../tokens/typography";
import { palette } from "../tokens/palette";

export const StyledLabel = styled.label`
  font-size: ${typography.fontSizeMD};
  font-weight: ${typography.fontWeightMedium};
  margin-bottom: 4px;
  color: ${palette.gray[900]};
`;
