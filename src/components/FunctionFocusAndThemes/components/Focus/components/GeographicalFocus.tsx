import { FunctionsFocusesAndThemesControlledSelect } from "@app/components";
import { useFormContext } from "react-hook-form";
import { type FocusesFormData } from "@app/types";

export default function GeographicalFocus() {
  const { setValue } = useFormContext<FocusesFormData>();

  return (
    <FunctionsFocusesAndThemesControlledSelect
      name="initiativeGeographicalFocus"
      required
      customGridSize="half"
      onChange={() => {
        setValue("regions", []);
        setValue("countries", []);
      }}
      inputDescriptionTitle="Geographical focus"
      inputDescriptionSubtitle="Select the applicable geographical area to the implementation of the initiatives work."
      dropdownEnpoint="GeographicalFocusTypes"
    />
  );
}
