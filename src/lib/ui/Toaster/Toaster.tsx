import type { FC } from 'react';
import {
  CloseButton,
  CloseButtonWrapper,
  IconAndTextWrapper,
  StyledIconWrapper,
  StyledTextWrapper,
  StyledTitle,
  StyledToaster,
  StyledToasterContent,
  ToasterBody,
  CopyButton
} from './Toaster.styles';
import type { IToasterOptions, TToasterCloseReason } from './Toaster.types';
import { ToasterType } from './Toaster.types';
import { CheckCircleIcon, ClearIcon, ExitIcon } from '@app/lib/icons';
import { Theme } from '@app/lib/general';

const Toaster: FC<IToasterOptions> = ({
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  message,
  toastertype,
  onCloseToaster,
  autoHideDuration = 15000,
  open,
  closeButton,
  errorDetails,
  key,
  ...props
}) => {
  const { vertical, horizontal } = anchorOrigin;

  const handleCopyError = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(errorDetails));
    } catch (err) {
      console.error('Failed to copy error message: ', err);
    }
  };

  const handleOnClose = (
    event: React.SyntheticEvent<unknown> | Event,
    reason: TToasterCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    onCloseToaster?.(event, 'clickCloseButton');
  };

  const action = (
    <CloseButtonWrapper data-testid="toaster.closeButtonWrapper">
      <CloseButton
        aria-label="close"
        onClick={(e) => handleOnClose(e, 'clickCloseButton')}
        data-testid="close-toaster-testid"
        toastertype={toastertype}
      >
        <ExitIcon />
      </CloseButton>
    </CloseButtonWrapper>
  );

  const renderIcon = () => {
    switch (toastertype) {
      case ToasterType.SUCCESS:
        return (
          <StyledIconWrapper data-testid="toaster.successIcon">
            <CheckCircleIcon fill={Theme.palette.secondary.successGreen} />
          </StyledIconWrapper>
        );
      case ToasterType.ERROR:
      default:
        return (
          <StyledIconWrapper data-testid="toaster.errorIcon">
            <ClearIcon fill={Theme.palette.secondary.errorPink} />
          </StyledIconWrapper>
        );
    }
  };

  return (
    <StyledToaster
      key={key}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleOnClose}
      data-testid="toaster"
      action={action}
      autoHideDuration={autoHideDuration}
      open={open}
      {...props}
    >
      <StyledToasterContent
        data-testid="toaster.content"
        toastertype={toastertype}
      >
        <ToasterBody>
          <IconAndTextWrapper>
            {renderIcon()}
            <StyledTextWrapper data-testid="toaster.textWrapper">
              <StyledTitle data-testid="toaster.title">
                {message}{' '}
                {toastertype === ToasterType.ERROR && errorDetails && (
                  <CopyButton onClick={handleCopyError}>Copy error</CopyButton>
                )}
              </StyledTitle>
            </StyledTextWrapper>
          </IconAndTextWrapper>
          {closeButton && action}
        </ToasterBody>
      </StyledToasterContent>
    </StyledToaster>
  );
};

export default Toaster;
