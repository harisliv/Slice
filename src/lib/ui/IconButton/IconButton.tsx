import type { FC } from "react";
import { StyledButton } from "./IconButton.styles";
import type { IIconButton } from "./IconButton.types";

const IconButton: FC<IIconButton> = ({ children, ...props }) => (
  <StyledButton data-testid="icon-button" {...props}>
    {children}
  </StyledButton>
);

export default IconButton;
