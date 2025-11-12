import {
  FormInputDescription,
  FunctionsFocusesAndThemesControlledMultiSelect,
} from "@app/components";

export default function Regions() {
  return (
    <>
      <FormInputDescription
        title="Region(s)"
        subtitle="Select the applicable region(s)"
        required
      />
      <FunctionsFocusesAndThemesControlledMultiSelect
        name="regions"
        required
        customGridSize="half"
        inputDescriptionTitle="Regions"
        dropdownEnpoint="Regions"
      />
    </>
  );
}
