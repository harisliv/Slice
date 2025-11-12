import {
  FormInputDescription,
  FunctionsFocusesAndThemesControlledMultiSelect,
} from "@app/components";

export default function SustainableGoals() {
  return (
    <>
      <FormInputDescription
        title="Sustainable development goals"
        subtitle="Select the Sustainable Development Goal(s) applicable to the CCI's climate-related goal and area of work."
        required
      />
      <FunctionsFocusesAndThemesControlledMultiSelect
        name="sustainableDevelopmentGoals"
        required
        customGridSize="half"
        maxOptions={17}
        inputDescriptionTitle="Sustainable development goals"
        dropdownEnpoint="SustainableDevelopmentGoals"
      />
    </>
  );
}
