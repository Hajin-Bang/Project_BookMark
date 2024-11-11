import React from "react";
import { SelectTriggerProps } from "../types";
import { useSelectContext } from "../SelectContext";
import { StyledTrigger } from "../styles";
import { ChevronDown } from "lucide-react";

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  placeholder = "선택",
  className,
}) => {
  const { toggleOpen, selectedValue } = useSelectContext();
  return (
    <StyledTrigger onClick={toggleOpen} className={className}>
      {selectedValue?.label || placeholder}
      <ChevronDown />
    </StyledTrigger>
  );
};
