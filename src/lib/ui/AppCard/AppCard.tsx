import type { FC } from 'react';
import { useState } from 'react';
import {
  StyledAppCard,
  IconWrapper,
  CardTopWrapper,
  StyledH3,
  StyledParagraph
} from './AppCard.styles';
import type { AppCardProps } from './AppCard.types';
import { ChevronRightIcon } from '@app/lib/icons';
import ButtonComponent from '../Button';

const AppCard: FC<AppCardProps> = ({
  icon,
  cardTitle,
  cardSubtitle,
  description,
  LinkComponent,
  to,
  ...props
}) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <StyledAppCard
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
      {...props}
    >
      <CardTopWrapper data-testid="card-top-wrapper">
        {(description && !showDescription) || !description ? (
          <IconWrapper>{icon}</IconWrapper>
        ) : null}
        <StyledH3
          variant="bold"
          data-testid="styledH3"
          $showDescription={!!description && showDescription}
        >
          {cardTitle}
        </StyledH3>
        <StyledParagraph
          variant="medium-regular-blue"
          data-testid="styledParagraph"
          $showDescription={!!description && showDescription}
        >
          {cardSubtitle}
        </StyledParagraph>
      </CardTopWrapper>
      {LinkComponent ? (
        <ButtonComponent
          customVariant="primary-m-full-width"
          RouterLink={LinkComponent}
          to={to ?? ''}
          endIcon={<ChevronRightIcon />}
        >
          Enter
        </ButtonComponent>
      ) : null}
    </StyledAppCard>
  );
};

export default AppCard;
