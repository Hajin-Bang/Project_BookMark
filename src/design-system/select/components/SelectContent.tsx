import React from "react";
import { useSelectContext } from "../SelectContext";
import { StyledContent } from "../styles";
import { SelectContentProps } from "../types";

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  const { isOpen } = useSelectContext();
  return isOpen ? <StyledContent>{children}</StyledContent> : null;
};
