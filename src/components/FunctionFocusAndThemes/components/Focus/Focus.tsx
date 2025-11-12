import { Stack } from '@mui/system';
import { useFormContext } from 'react-hook-form';
import { type FocusesFormData } from '@app/types';
import { Divider } from '@mui/material';
import ClimateFocus from './components/ClimateFocus';
import GeographicalFocus from './components/GeographicalFocus';
import Regions from './components/Regions';
import Countries from './components/Countries';

export default function Focus() {
  const { watch } = useFormContext<FocusesFormData>();

  const initiativeGeographicalFocus = watch('initiativeGeographicalFocus');

  return (
    <Stack spacing={3}>
      <ClimateFocus />
      <Divider />
      <GeographicalFocus />

      {initiativeGeographicalFocus === 'Regional' && <Regions />}

      {(initiativeGeographicalFocus === 'Multinational' ||
        initiativeGeographicalFocus === 'National') && <Countries />}
    </Stack>
  );
}
