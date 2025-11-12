import { Stepper, useMediaQuery, useTheme } from '@mui/material';
import type { FC } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@app/lib/icons';
import { Theme } from '@app/lib/general';
import {
  DividingLine,
  MobileArrowsContainer,
  MobileStepContainer,
  MobileStepText,
  StepperContainer,
  StyledStep,
  StyledStepButton,
  StyledStepIcon,
  StyledStepLabel
} from './FormStepper.styles';
import type { IStepperProps } from '@app/lib/types';
import { StepStatus } from '@app/lib/types';
import { Paragraph } from '../Global';

const FormStepper: FC<IStepperProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(Theme.breakpoints.sm));

  const handleOnClick = (index: number) => {
    onStepClick?.(index);
  };

  const renderMobileLayout = () => {
    const currentStepData = steps[currentStep];
    if (!currentStepData) return null;

    const label = currentStepData.label;
    return (
      <>
        <StyledStepLabel
          data-testid="timeline-label"
          $active={currentStepData.status === StepStatus.ACTIVE}
          $completed={currentStepData.status === StepStatus.COMPLETED}
          onClick={() => handleOnClick(currentStep)}
          $disabled={false}
          $clickable
          icon={
            <StyledStepIcon
              data-testid="timeline-styled-step-icon"
              $active={currentStepData.status === StepStatus.ACTIVE}
              onClick={() => handleOnClick(currentStep)}
              $completed={currentStepData.status === StepStatus.COMPLETED}
              $disabled={currentStepData.status === StepStatus.INACTIVE}
              $clickable
            >
              {currentStep + 1}
            </StyledStepIcon>
          }
          title={label}
        >
          {label}
          {currentStepData.status === StepStatus.COMPLETED && (
            <Paragraph variant="extrasmall-regular-green">
              {'Complete'}
            </Paragraph>
          )}
        </StyledStepLabel>
        <DividingLine />
        <MobileStepContainer>
          {currentStep > 0 && (
            <MobileArrowsContainer
              onClick={() => handleOnClick(currentStep - 1)}
            >
              <ChevronLeftIcon />
            </MobileArrowsContainer>
          )}
          <MobileStepText>
            {`Step length: ${steps.length}, Current Step: ${currentStep + 1}`}
          </MobileStepText>
          {currentStep < steps.length - 1 &&
            steps[currentStep + 1]?.status !== StepStatus.INACTIVE && (
              <MobileArrowsContainer
                onClick={() => handleOnClick(currentStep + 1)}
              >
                <ChevronRightIcon />
              </MobileArrowsContainer>
            )}
        </MobileStepContainer>
      </>
    );
  };

  return (
    <StepperContainer $isMobile={isMobile} data-testid="stepper-container">
      {isMobile ? (
        renderMobileLayout()
      ) : (
        <Stepper
          orientation={isMobile ? 'horizontal' : 'vertical'}
          activeStep={currentStep}
        >
          {steps.map((step, index) => {
            const label = step.label;
            const isDisabled = step?.status === StepStatus.INACTIVE;

            return (
              <StyledStep data-testid="timeline-styled-step" key={label}>
                <StyledStepButton
                  disableRipple
                  disabled={step?.status === StepStatus.INACTIVE}
                  onClick={() => handleOnClick(index)}
                >
                  <StyledStepLabel
                    data-testid="timeline-label"
                    $active={index === currentStep}
                    $completed={step.status === StepStatus.COMPLETED}
                    $disabled={isDisabled}
                    $clickable
                    icon={
                      <StyledStepIcon
                        data-testid="timeline-styled-step-icon"
                        $active={currentStep === index}
                        $completed={step?.status === StepStatus.COMPLETED}
                        $disabled={step?.status === StepStatus.INACTIVE}
                        $clickable
                      >
                        {index + 1}
                      </StyledStepIcon>
                    }
                    title={label}
                  >
                    {label}
                    {step.status === StepStatus.COMPLETED && (
                      <Paragraph variant="extrasmall-regular-green">
                        {'Complete'}
                      </Paragraph>
                    )}
                  </StyledStepLabel>
                </StyledStepButton>
              </StyledStep>
            );
          })}
        </Stepper>
      )}
    </StepperContainer>
  );
};

export default FormStepper;
