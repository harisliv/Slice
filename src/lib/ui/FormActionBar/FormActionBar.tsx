import type { FC } from 'react';
import { ExitIcon, SaveIcon, SendIcon } from '@app/lib/icons';
import { ChevronLeftIcon, ChevronRightIcon } from '@app/lib/icons';
import {
  StyledFormActionWrapper,
  StyledLeftWrapper,
  StyledRightWrapper
} from './FormActionBar.styles';
import type { IFormActionBar } from '@app/lib/types';
import ButtonComponent from '../Button';
const FormActionBar: FC<IFormActionBar> = (props) => {
  const { next, previous, submit, draft: saveDraft, exit } = props;

  const {
    enabled: nextEnabled = false,
    action: nextAction,
    title: nextTitle = 'Next',
    display: nextDisplay
  } = next;

  const {
    enabled: previousEnabled = false,
    action: previousAction,
    title: previousTitle = 'Previous',
    display: previousDisplay
  } = previous;

  const {
    enabled: submitEnabled = false,
    title: submitTitle = 'Submit',
    display: submitDisplay,
    action: submitAction
  } = submit;

  const {
    enabled: saveDraftEnabled = false,
    title: saveDraftTitle = 'Save as a draft',
    display: saveDraftDisplay,
    action: saveDraftAction
  } = saveDraft || {};

  const {
    enabled: exitEnabled = false,
    action: exitAction,
    title: exitTitle = 'Exit',
    display: exitDisplay
  } = exit;

  return (
    <StyledFormActionWrapper>
      <StyledLeftWrapper>
        {exitDisplay && (
          <ButtonComponent
            customVariant="terciary-m"
            onClick={exitAction}
            aria-label="close"
            aria-controls="buttons"
            data-testid="exit-modal-testid"
            startIcon={<ExitIcon />}
            disabled={!exitEnabled}
          >
            {exitTitle}
          </ButtonComponent>
        )}
      </StyledLeftWrapper>
      <StyledRightWrapper>
        {previousDisplay && (
          <ButtonComponent
            customVariant="terciary-m"
            disabled={!previousEnabled}
            onClick={previousAction}
            aria-label="previous-buttonCButtonComponent"
            aria-controls="buttons"
            data-testid="previous-button-testid"
            startIcon={<ChevronLeftIcon />}
          >
            {previousTitle}
          </ButtonComponent>
        )}
        {nextDisplay && (
          <ButtonComponent
            customVariant="primary-m"
            disabled={!nextEnabled}
            onClick={nextAction}
            aria-label="next-button"
            aria-controls="buttons"
            data-testid="exit-modal-testid"
            endIcon={<ChevronRightIcon />}
          >
            {nextTitle}
          </ButtonComponent>
        )}
        {submitDisplay && (
          <ButtonComponent
            customVariant="primary-m"
            type="submit"
            name="submit"
            disabled={!submitEnabled}
            startIcon={<SendIcon />}
            onClick={submitAction}
          >
            {submitTitle}
          </ButtonComponent>
        )}
        {saveDraftDisplay && (
          <ButtonComponent
            customVariant="secondary-m"
            type="submit"
            name="draft"
            disabled={!saveDraftEnabled}
            startIcon={<SaveIcon />}
            onClick={saveDraftAction}
          >
            {saveDraftTitle}
          </ButtonComponent>
        )}
      </StyledRightWrapper>
    </StyledFormActionWrapper>
  );
};

export default FormActionBar;
