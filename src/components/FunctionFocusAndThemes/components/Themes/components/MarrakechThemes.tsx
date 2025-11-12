import {
  FormInputDescription,
  FunctionsFocusesAndThemesControlledMultiSelect
} from '@app/components';

export default function MarrakechThemes() {
  return (
    <>
      <FormInputDescription
        title="Marrakech partnership thematic areas"
        subtitle="Select the thematic area(s) applicable to the Initiative's climate-related goal and work. The list is based on the seven thematic areas of the Marrakech Partnership for Global Climate Action."
        required
      />
      <FunctionsFocusesAndThemesControlledMultiSelect
        name="marrakechPartnershipThemes"
        required
        customGridSize="half"
        inputDescriptionTitle="Marrakech partnership thematic areas"
        dropdownEnpoint="MarrakechPartnershipThemes"
      />
    </>
  );
}
