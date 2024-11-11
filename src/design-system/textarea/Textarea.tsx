import React from "react";
import { TextareaProps } from "./types";
import {
  ErrorMessage,
  LabelWrapper,
  StyledTextarea,
  StyledTextareaContainer,
} from "./styles";
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
        {label && (
          <LabelWrapper>
            <Label htmlFor={rest.id}>{label}</Label>
          </LabelWrapper>
        )}
        <StyledTextarea
          ref={ref}
          resize={resize}
          appearance={appearance}
          disabled={disabled}
          className={className}
          hasError={!!error}
          {...rest}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </StyledTextareaContainer>
    );
  }
);

export default Textarea;
