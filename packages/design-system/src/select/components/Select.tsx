import React from "react";
import { SelectProvider } from "../SelectContext";
import {
  SelectContentProps,
  SelectOptionProps,
  SelectProps,
  SelectTriggerProps,
} from "../types";
import { SelectTrigger } from "./SelectTrigger";
import { SelectContent } from "./SelectContent";
import { SelectOption } from "./SelectOption";
import { StyledSelectWrapper } from "../styles";

const Select: React.FC<SelectProps> & {
  Trigger: React.FC<SelectTriggerProps>;
  Content: React.FC<SelectContentProps>;
  Option: React.FC<SelectOptionProps>;
} = ({ children, className, value, onValueChange }) => {
  return (
    <SelectProvider value={value} onValueChange={onValueChange}>
      <StyledSelectWrapper className={className}>
        {children}
      </StyledSelectWrapper>
    </SelectProvider>
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Option = SelectOption;

export default Select;
