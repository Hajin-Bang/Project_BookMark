import React from 'react'
import { StyledLabel } from "./styles";
import { LabelProps } from "./types";

const Label: React.FC<LabelProps> = (props) => (
  <StyledLabel {...props}>{props.children}</StyledLabel>
);

export default Label;
