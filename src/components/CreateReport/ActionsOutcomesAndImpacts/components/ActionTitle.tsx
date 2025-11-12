import { ControlledInput } from '@app/components';
import { CREATE_REPORT_FIELD_INFO } from '@app/constants';

export default function ActionTitle({ index }: { index: number }) {
  return (
    <ControlledInput
      customGridSize="half"
      helperText={CREATE_REPORT_FIELD_INFO.action.title.helper}
      name={`actions.${index}.title`}
      required
      inputDescriptionTitle={CREATE_REPORT_FIELD_INFO.action.title.title}
      inputDescriptionSubtitle={CREATE_REPORT_FIELD_INFO.action.title.subtitle}
    />
  );
}
