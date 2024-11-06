import styled from "styled-components";
import Button from "../button/Button";

export const StyledSelectWrapper = styled.div`
  position: relative;
  width: 100%; /* Select 컴포넌트의 기본 너비 설정 */
`;

export const StyledTrigger = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: transparent;
  color: #999ba1;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const StyledContent = styled.div`
  position: absolute;
  width: inherit;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow-y: auto;
  margin-top: 4px;
  z-index: 10;
`;

export const StyledOption = styled.div<{ selected?: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
