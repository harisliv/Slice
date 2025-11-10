import { ControlledInput } from '@app/components';

import { CREATE_REPORT_FIELD_INFO } from '@app/constants';

export default function ActionDescription({ index }: { index: number }) {
  return (
    <ControlledInput
      name={`actions.${index}.description`}
      required
      inputDescriptionTitle={CREATE_REPORT_FIELD_INFO.action.description.title}
      inputDescriptionSubtitle={
        CREATE_REPORT_FIELD_INFO.action.description.subtitle
      }
      istextArea
      helperText={CREATE_REPORT_FIELD_INFO.action.description.helper}
    />
  );
}
