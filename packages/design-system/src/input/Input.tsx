import React from "react";
import {
  ErrorMessage,
  IconWrapper,
  InputContainer,
  InputWrapper,
  LabelWrapper,
  StyledInput,
} from "./styles";
import { InputProps } from "./types";
import Label from "../label/Label";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      disabled = false,
      icon,
      error,
      label,
      full = false,
      className,
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <InputContainer full={full}>
        {label && (
          <LabelWrapper>
            <Label htmlFor={rest.id}>{label}</Label>
          </LabelWrapper>
        )}
        <InputWrapper full={full}>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <StyledInput
            ref={ref}
            size={size}
            disabled={disabled}
            onChange={onChange}
            full={full}
            hasError={!!error}
            hasIcon={!!icon}
            className={className}
            {...rest}
          />
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  }
);

export default Input;
