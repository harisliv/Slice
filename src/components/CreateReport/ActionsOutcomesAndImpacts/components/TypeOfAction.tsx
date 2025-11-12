import { FormInputDescription } from "@app/components";
import ControlledInput, {
  ControlledSelectWithDropdown,
} from "@app/components/ControlledInput";

import { CREATE_REPORT_FIELD_INFO } from "@app/constants";
import type { ActionFormData } from "@app/types";
import { Grid2 } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function TypeOfAction({ index }: { index: number }) {
  const { watch } = useFormContext<ActionFormData>();
  const currentAction = watch(`actions.${index}`);

  return (
    <>
      <FormInputDescription
        title={CREATE_REPORT_FIELD_INFO.action.typeOfAction.title}
        subtitle={CREATE_REPORT_FIELD_INFO.action.typeOfAction.subtitle}
      />
      <ControlledSelectWithDropdown
        required
        name={`actions.${index}.typeOfAction`}
        inputDescriptionTitle={
          CREATE_REPORT_FIELD_INFO.action.typeOfAction.title
        }
        dropdownEnpoint="ActionType"
        customGridSize="half"
      />
      {currentAction?.typeOfAction.includes("Other") && (
        <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
          <ControlledInput
            istextArea
            required
            name={`actions.${index}.typeOther`}
            inputDescriptionTitle={
              CREATE_REPORT_FIELD_INFO.action.typeOfActionOther.title
            }
            helperText={
              CREATE_REPORT_FIELD_INFO.action.typeOfActionOther.helper
            }
          />
        </Grid2>
      )}
    </>
  );
}
