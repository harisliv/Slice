import type { FC } from 'react';
import { DividingLine, FormWrapper, StepIcon } from './FormSection.styles';
import type { IFormSection } from './FormSection.types';
import { Header1, Paragraph } from '../Global';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import CustomTag from '../CustomTag';
import { Stack } from '@mui/system';
import { RequiredLabel } from '../Input';

const FormSection: FC<IFormSection> = ({
  title = '',
  subtitle,
  step,
  children,
  isMandatory,
  variant,
  headerChildren,
  divider = true
}) => (
  <FormWrapper data-testid="form-section-wrapper">
    <Grid container spacing={3}>
      {step && (
        <Grid size={{ sm: 1 }}>
          <Stack spacing={0.5} alignItems={'center'}>
            <Header1>{step}</Header1>
            <StepIcon />
          </Stack>
        </Grid>
      )}
      <Grid size={step ? { sm: 11 } : { sm: 12 }}>
        <Stack spacing={2}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Header1>{title}</Header1>
            <Box display="flex" flexDirection="row" alignItems="center">
              {variant && <CustomTag variant={variant} />}
              {headerChildren && headerChildren}
            </Box>
          </Box>
          {divider && <DividingLine />}
          {subtitle && (
            <Stack spacing={2}>
              {!!subtitle &&
                (typeof subtitle === 'string' ? (
                  <Paragraph variant="small-regular">{subtitle}</Paragraph>
                ) : (
                  subtitle
                ))}
              {isMandatory && (
                <RequiredLabel
                  label="Response required to continue"
                  startWithStar
                  required
                  fontSize="s"
                />
              )}
            </Stack>
          )}
          {children}
        </Stack>
      </Grid>
    </Grid>
  </FormWrapper>
);

export default FormSection;
