import { FunctionsFocusesAndThemesControlledSelect } from '@app/components';

export default function ClimateFocus() {
  return (
    <FunctionsFocusesAndThemesControlledSelect
      dropdownEnpoint="ClimateFocusTypes"
      name="initiativeFocus"
      required
      customGridSize="half"
      inputDescriptionTitle="Climate focus"
      inputDescriptionSubtitle="Select applicable climate focus(es)."
    />
  );
}
