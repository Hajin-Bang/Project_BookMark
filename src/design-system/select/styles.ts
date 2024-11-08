import styled from "styled-components";
import Button from "../button/Button";
import { palette } from "../tokens/palette";

export const StyledSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledTrigger = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid ${palette.gray[300]};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${palette.transparent};
  color: ${palette.gray[500]};
  &:hover {
    background-color: ${palette.gray[100]};
  }
`;

export const StyledContent = styled.div`
  position: absolute;
  width: inherit;
  background-color: ${palette.white};
  border: 1px solid ${palette.gray[300]};
  border-radius: 5px;
  overflow-y: auto;
  margin-top: 4px;
  z-index: 10;
`;

export const StyledOption = styled.div<{ selected?: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${palette.gray[100]};
  }
`;
