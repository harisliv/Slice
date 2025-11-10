import {
  FormInputDescription,
  GoalsTargetsAndMonitoringControlledInput,
  GoalsTargetsAndMonitoringControlledSelect
} from '@app/components';
import { ButtonComponent } from '@app/lib/ui';
import { Stack } from '@mui/system';
import type { GoalsFormData } from '@app/types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useDeleteModal, useDropdownValues } from '@app/hooks';
import { GOALS_FIELD_INFO } from '@app/constants';
import ClimateRelatedAlignmentTitle from './ClimateRelatedAlignmentTitle';

export default function AlignementMultilateral() {
  const { showDeleteModal } = useDeleteModal();
  const { watch, control, setValue } = useFormContext<GoalsFormData>();

  const { append, remove } = useFieldArray({
    control,
    name: 'climateRelatedGoalAlignmentMultilateral'
  });

  const climateRelatedGoalAlignmentMultilateral = watch(
    'climateRelatedGoalAlignmentMultilateral'
  );

  const tempClimateRelatedGoalAlignmentMultilateralAgreements = watch(
    'tempClimateRelatedGoalAlignmentMultilateralAgreements'
  );

  const tempClimateRelatedGoalAlignmentMultilateralDescription = watch(
    'tempClimateRelatedGoalAlignmentMultilateralDescription'
  );

  const { data: agreements, mappedData } = useDropdownValues('Agreements');

  const agreementsLeft = agreements?.filter(
    (agreement) =>
      !climateRelatedGoalAlignmentMultilateral?.some(
        (a) => a.agreement === agreement.value
      )
  );

  return (
    <Stack spacing={3}>
      <FormInputDescription
        title={GOALS_FIELD_INFO.climateRelatedGoalAlignmentMultilateral.title}
        subtitle={
          GOALS_FIELD_INFO.climateRelatedGoalAlignmentMultilateral.subtitle
        }
      />
      {!!climateRelatedGoalAlignmentMultilateral?.length &&
        climateRelatedGoalAlignmentMultilateral?.length > 0 &&
        climateRelatedGoalAlignmentMultilateral.map((item, index) => {
          const titleText = mappedData[item.agreement ?? ''] ?? '';

          return (
            <ClimateRelatedAlignmentTitle
              key={item.agreement ?? '' + index}
              title={mappedData[item.agreement ?? '']}
              text={item.description ?? ''}
              onActionClick={() => {
                showDeleteModal({
                  subtitle:
                    'Are you sure you want to remove this climate-related goal alignment?',
                  content: `You’re about to permanently delete "${titleText}" This action cannot be undone`,
                  onConfirm: () => remove(index)
                });
              }}
            />
          );
        })}
      <GoalsTargetsAndMonitoringControlledSelect
        name={'tempClimateRelatedGoalAlignmentMultilateralAgreements'}
        customGridSize="half"
        inputPlaceholder={
          GOALS_FIELD_INFO.climateRelatedGoalAlignmentMultilateral
            .inputPlaceholder
        }
        disabled={agreementsLeft?.length === 0}
        options={agreementsLeft}
      />
      {tempClimateRelatedGoalAlignmentMultilateralAgreements && (
        <GoalsTargetsAndMonitoringControlledInput
          istextArea
          name={'tempClimateRelatedGoalAlignmentMultilateralDescription'}
          inputDescriptionTitle={
            mappedData[
              tempClimateRelatedGoalAlignmentMultilateralAgreements ?? ''
            ]
          }
          inputDescriptionSubtitle={
            GOALS_FIELD_INFO.climateRelatedGoalAlignmentOtherDescription
              .subtitle
          }
          helperText={
            GOALS_FIELD_INFO.climateRelatedGoalAlignmentOtherDescription.helper
          }
          customGridSize="full"
        />
      )}

      {tempClimateRelatedGoalAlignmentMultilateralAgreements && (
        <ButtonComponent
          onClick={() => {
            append({
              agreement: tempClimateRelatedGoalAlignmentMultilateralAgreements,
              description:
                tempClimateRelatedGoalAlignmentMultilateralDescription ?? ''
            });

            setValue(
              'tempClimateRelatedGoalAlignmentMultilateralAgreements',
              ''
            );
            setValue(
              'tempClimateRelatedGoalAlignmentMultilateralDescription',
              ''
            );
          }}
          customVariant="secondary-m"
        >
          Save and add another
        </ButtonComponent>
      )}
    </Stack>
  );
}
