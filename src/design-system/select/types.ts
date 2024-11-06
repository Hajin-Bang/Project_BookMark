export interface SelectContextType {
  isOpen?: boolean;
  selectedValue?: string | null;
  toggleOpen?: () => void;
  selectOption?: (value: string) => void;
  value?: string | null;
  onValueChange?: (value: string) => void;
}

export interface SelectProps {
  children: React.ReactNode;
  className?: string;
  value?: string | null;
  onValueChange?: (value: string) => void;
}

export interface SelectTriggerProps {
  placeholder?: string;
  className?: string;
}

export interface SelectContentProps {
  children: React.ReactNode;
}

export interface SelectOptionProps {
  value: string;
  children: React.ReactNode;
}
