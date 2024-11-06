import React, { createContext, useContext, useEffect, useState } from "react";
import { SelectContextType } from "./types";

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a SelectProvider");
  }
  return context;
};

export const SelectProvider: React.FC<
  SelectContextType & { children: React.ReactNode }
> = ({ children, value: controlledValue, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const isControlled = controlledValue !== undefined;

  useEffect(() => {
    if (isControlled) {
      setSelectedValue({
        value: controlledValue || "",
        label: selectedValue?.label || "",
      });
    }
  }, [controlledValue]);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const selectOption = (value: string, label: string) => {
    if (onValueChange) onValueChange(value);
    setSelectedValue({ value, label });
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{ isOpen, selectedValue, toggleOpen, selectOption }}
    >
      {children}
    </SelectContext.Provider>
  );
};
