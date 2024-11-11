import { IconWrapper, StyledButton } from "./styles";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  size = "md",
  variant = "solid",
  priority = "default",
  disabled = false,
  icon,
  as = "button",
  type = "button",
  full = false,
  onClick,
  children,
  className,
}) => {
  return (
    <StyledButton
      size={size}
      variant={variant}
      priority={priority}
      disabled={disabled}
      as={as}
      type={as === "button" ? type : undefined}
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
