import { ControlledInput } from '@app/components';

import { CREATE_REPORT_FIELD_INFO } from '@app/constants';

export default function Outcomes({ index }: { index: number }) {
  return (
    <ControlledInput
      helperText={CREATE_REPORT_FIELD_INFO.action.outcomes.helper}
      name={`actions.${index}.outcomes`}
      required
      inputDescriptionTitle={CREATE_REPORT_FIELD_INFO.action.outcomes.title}
      inputDescriptionSubtitle={
        CREATE_REPORT_FIELD_INFO.action.outcomes.subtitle
      }
      istextArea
    />
  );
}
