import { FormInputDescription } from '@app/components';
import ControlledInput from '@app/components/ControlledInput';
import { ControlledMultiSelectWithDropdown } from '@app/components/ControlledInput';
import { CREATE_REPORT_FIELD_INFO } from '@app/constants';
import { Stack } from '@mui/system';
import { useFormContext } from 'react-hook-form';

export default function ActionMultilateralProcess({
  index
}: {
  index: number;
}) {
  const { watch, setValue } = useFormContext();
  const contributionToMultilateralProcess = watch(
    `actions.${index}.contributionToMultilateralProcess`
  );
  return (
    <Stack spacing={2}>
      <FormInputDescription
        title={
          CREATE_REPORT_FIELD_INFO.action.contributionToMultilateralProcess
            .title
        }
        subtitle={
          CREATE_REPORT_FIELD_INFO.action.contributionToMultilateralProcess
            .subtitle
        }
      />
      <ControlledMultiSelectWithDropdown
        customGridSize="half"
        name={`actions.${index}.contributionToMultilateralProcess`}
        inputDescriptionTitle={
          CREATE_REPORT_FIELD_INFO.action.contributionToMultilateralProcess
            .title
        }
        dropdownEnpoint="ActionProType"
        onApplyCapture={(value) => {
          if (value.length > 0) {
            // trigger(`actions.${index}.contributionOfTheAction`); // TODO IS THIS NEEDED? REMOVE THESE OR COMMENT THEM
          } else {
            setValue(`actions.${index}.contributionOfTheAction`, null);
          }
        }}
      />

      {contributionToMultilateralProcess?.length > 0 && (
        <ControlledInput
          istextArea
          required
          name={`actions.${index}.contributionOfTheAction`}
          inputDescriptionTitle={
            CREATE_REPORT_FIELD_INFO.action
              .contributionToMultilateralProcessDescription.title
          }
          helperText={
            CREATE_REPORT_FIELD_INFO.action
              .contributionToMultilateralProcessDescription.helper
          }
        />
      )}
    </Stack>
  );
}
