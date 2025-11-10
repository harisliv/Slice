import type { FC } from 'react';
import { Theme } from '@app/lib/general';
import {
  CardButtonContainer,
  CardContentContainer,
  CardTitleContainer,
  CardWrapper,
  StyledIconContainer
} from './Card.styles';
import type { ICard } from './Card.types';
import { Header3, Paragraph } from '../Global';

const Card: FC<ICard> = ({
  icon,
  title,
  subtitle,
  backgroundColor = Theme.palette.background.azur8,
  fullWidth = false,
  children
}) => (
  <CardWrapper $backgroundColor={backgroundColor} data-testid="card-wrapper">
    {icon && (
      <StyledIconContainer data-testid="card-icon">{icon}</StyledIconContainer>
    )}
    <CardContentContainer
      $fullWidth={fullWidth}
      data-testid="card-content-container"
    >
      {(title || subtitle) && (
        <CardTitleContainer data-testid="card-title-container">
          <Header3 variant="bold" data-testid="card-title">
            {title}
          </Header3>
          <Paragraph data-testid="card-subtitle">{subtitle}</Paragraph>
        </CardTitleContainer>
      )}
      {children && (
        <CardButtonContainer data-testid="card-button-container">
          {children}
        </CardButtonContainer>
      )}
    </CardContentContainer>
  </CardWrapper>
);

export default Card;
