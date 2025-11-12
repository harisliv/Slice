import { LogoIcon } from "@app/lib/icons";
import { LogoLoadingWrapper, StyledBackdrop } from "./LoadingBackdrop.styles";
import type { ILoadingBackdrop } from "./LoadingBackdrop.types";

const LoadingBackdrop: React.FC<ILoadingBackdrop> = () => (
  <StyledBackdrop data-testid="loading-backdrop" open>
    <LogoLoadingWrapper data-testid="loading-backdrop.wrapper">
      <LogoIcon />
    </LogoLoadingWrapper>
  </StyledBackdrop>
);

export default LoadingBackdrop;
