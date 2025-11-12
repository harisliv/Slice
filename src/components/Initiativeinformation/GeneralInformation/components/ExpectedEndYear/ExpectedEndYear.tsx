import { INITIATIVE_INFORMATION_FIELD_INFO } from '@app/constants';
import { InitiativeProfileNumericControlledInput } from '@app/components';
import type { InitiativeInformationFormData } from '@app/types';
import { useFormContext } from 'react-hook-form';

export default function ExpectedEndYear() {
  const { trigger } = useFormContext<InitiativeInformationFormData>();
  return (
    <InitiativeProfileNumericControlledInput
      name={'expectedEndDate'}
      customGridSize="half"
      inputDescriptionTitle={
        INITIATIVE_INFORMATION_FIELD_INFO.expectedEndDate.title
      }
      inputDescriptionSubtitle={
        INITIATIVE_INFORMATION_FIELD_INFO.expectedEndDate.subtitle
      }
      onChange={() => {
        trigger('launchDate');
      }}
    />
  );
}
