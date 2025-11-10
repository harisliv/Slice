import type { FC } from 'react';
import { StyledContentContainer, SubHeaderWrapper } from './SubHeader.styles';
import type { ISubHeader } from './SubHeader.types';
import { Header2, Paragraph } from '../Global';

const SubHeader: FC<ISubHeader> = ({
  title,
  subtitle,
  backgroundColor,
  children
}) => (
  <SubHeaderWrapper
    data-testid="sub-header-wrapper"
    $backgroundColor={backgroundColor}
  >
    <StyledContentContainer>
      {children}
      <Header2 variant="bold">{title}</Header2>
      <Paragraph variant="medium-regular">{subtitle}</Paragraph>
    </StyledContentContainer>
  </SubHeaderWrapper>
);
export default SubHeader;
