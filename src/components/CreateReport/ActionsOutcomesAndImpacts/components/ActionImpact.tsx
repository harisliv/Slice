import { ControlledInput } from '@app/components';
import { CREATE_REPORT_FIELD_INFO } from '@app/constants';

export default function ActionImpact({ index }: { index: number }) {
  return (
    <ControlledInput
      helperText={CREATE_REPORT_FIELD_INFO.action.impactExplanation.helper}
      name={`actions.${index}.impactExplanation`}
      required
      inputDescriptionTitle={
        CREATE_REPORT_FIELD_INFO.action.impactExplanation.title
      }
      inputDescriptionSubtitle={
        CREATE_REPORT_FIELD_INFO.action.impactExplanation.subtitle
      }
      istextArea
    />
  );
}
