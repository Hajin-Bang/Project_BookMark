import { IconWrapper, StyledButton } from "./styles";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  size = "md",
  variant = "solid",
  disabled = false,
  icon,
  as = "button",
  type = "button",
  color,
  full = false,
  onClick,
  children,
  className,
}) => {
  return (
    <StyledButton
      size={size}
      variant={variant}
      disabled={disabled}
      as={as}
      type={as === "button" ? type : undefined}
      color={color}
      full={full}
      onClick={onClick}
      className={className}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  );
};

export default Button;
