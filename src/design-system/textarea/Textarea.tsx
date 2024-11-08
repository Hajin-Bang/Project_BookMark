import React from "react";
import { TextareaProps } from "./types";
import { StyledTextarea, StyledTextareaContainer } from "./styles";
import Label from "../label/Label";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      resize = "both",
      appearance = "standard",
      disabled = false,
      error,
      label,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledTextareaContainer>
        {label && <Label htmlFor={rest.id}>{label}</Label>}
        <StyledTextarea
          ref={ref}
          resize={resize}
          appearance={appearance}
          disabled={disabled}
          className={className}
          hasError={!!error}
          {...rest}
        />
      </StyledTextareaContainer>
    );
  }
);

export default Textarea;
