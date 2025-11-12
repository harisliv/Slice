import type { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { DatePickerProps } from '@mui/x-date-pickers';
import { Theme } from '@app/lib/general';
import { StyleDatePicker } from './DatePicker.styles';
import { CalendarIcon } from '@app/lib/icons';
import { type CustomSize, gridSizeMap } from '@app/lib/types';
import { Grid2 } from '@mui/material';
import { RequiredLabel } from '../Input';

export default function DatePickerComponent({
  customGridSize = 'full',
  name,
  label,
  required,
  ...props
}: DatePickerProps<Dayjs, boolean> & {
  error: boolean;
  required?: boolean;
  format?: string;
  customGridSize?: CustomSize;
  helperText?: string;
}) {
  return (
    <Grid2 container>
      <Grid2 size={gridSizeMap[customGridSize]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyleDatePicker
            sx={{ borderColor: Theme.palette.primary.azur }}
            format={props.format || 'DD/MM/YYYY'}
            slots={{
              openPickerIcon: CalendarIcon
            }}
            slotProps={{
              field: { clearable: true },
              textField: {
                error: props.error,
                helperText: props.helperText
              }
            }}
            {...props}
            label={
              <RequiredLabel label={label} required={required} fontSize="s" />
            }
          />
        </LocalizationProvider>
      </Grid2>
    </Grid2>
  );
}
