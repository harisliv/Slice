import { FormInputDescription } from "@app/components";
import { CREATE_REPORT_FIELD_INFO } from "@app/constants";
import { Stack } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RemovableItem } from "@app/lib/ui";
import { ControlledMultiSelectWithDropdown } from "@app/components/ControlledInput";

export default function AssociatedTargets({ index }: { index: number }) {
  const { control, watch } = useFormContext();

  const associatedTargets = watch(`actions.${index}.associatedTargets`);

  const { remove } = useFieldArray({
    control,
    name: `actions.${index}.associatedTargets`,
  });

  return (
    <Stack spacing={3}>
      <FormInputDescription
        title={CREATE_REPORT_FIELD_INFO.action.associatedTargets.title}
        subtitle={CREATE_REPORT_FIELD_INFO.action.associatedTargets.subtitle}
      />
      {associatedTargets?.length > 0 &&
        associatedTargets?.map((target: string, arrayIndex: number) => (
          <RemovableItem
            key={`${target}-(${arrayIndex})`}
            label={target}
            onRemove={() => remove(arrayIndex)}
            icon="trash"
          />
        ))}
      <ControlledMultiSelectWithDropdown
        name={`actions.${index}.associatedTargets`}
        inputDescriptionTitle={
          CREATE_REPORT_FIELD_INFO.action.associatedTargets.title
        }
        dropdownEnpoint="Targets"
        customGridSize="half"
      />
    </Stack>
  );
}
