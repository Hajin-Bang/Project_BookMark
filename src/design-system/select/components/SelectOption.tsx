import React from "react";
import { SelectOptionProps } from "../types";
import { useSelectContext } from "../SelectContext";
import { StyledOption } from "../styles";

export const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  children,
}) => {
  const { selectOption, selectedValue } = useSelectContext();

  const handleClick = () => {
    selectOption?.(value);
  };

  return (
    <StyledOption onClick={handleClick} selected={selectedValue === value}>
      {children}
    </StyledOption>
  );
};
