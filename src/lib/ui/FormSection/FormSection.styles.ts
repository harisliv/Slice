import { Box } from '@mui/material';
import { WizardStepUnderlineIcon } from '@app/lib/icons';
import styled from 'styled-components';

export const FormWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const StyledTopWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

export const StyledChildrenWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    padding: 0;
    margin: 10px 0px 10px 0px;
    gap: 10px;
  }
`;

export const ColumnStep = styled(Box)`
  width: 50px;
  text-align: center;
`;

export const StepIcon = styled(WizardStepUnderlineIcon)``;

export const ColumnContent = styled(Box)`
  width: 100%;
`;

export const DividingLine = styled.hr`
  display: block;
  height: 0px;
  border: 1px solid ${(props) => props.theme.palette.secondary.lightGreen};

  @media (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    margin-top: 10px;
  }
`;

export const FormContainer = styled(Box)<{ $fullWidth?: boolean }>`
  display: flex;
  gap: ${(props) => (props.$fullWidth ? '20px' : '10px')};
  flex-direction: ${(props) => (props.$fullWidth ? 'row' : 'column')};
`;
