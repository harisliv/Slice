import { Paragraph } from '@app/lib/ui';
import { Grid2, Stack } from '@mui/material';
import { CreateReportControlledSelect } from '@app/components';
import { type TimeframeOfInformationFormData } from '@app/types';
import { useFormContext, useWatch } from 'react-hook-form';
import { ControlledDatePicker } from '@app/components/ControlledInput';
import dayjs from 'dayjs';
import { CREATE_REPORT_FIELD_INFO } from '@app/constants';
import {
  findFirstAvailableSlot,
  hasErrorRange
} from '@app/utils/ProgressReporting';
import { useSubmittedReports } from '@app/hooks';

export default function TimeframeOfInformation() {
  const timeframeValue = useWatch({ name: 'timeframeOfInformation' });
  const startDate = useWatch({ name: 'startDate' });
  const endDate =
    startDate &&
    dayjs(startDate).add(1, 'year').subtract(1, 'day').format('DD/MM/YYYY');

  const { setValue, setError, trigger } =
    useFormContext<TimeframeOfInformationFormData>();

  const { allProgressReportsDateRanges = [] } = useSubmittedReports();

  const shouldChange = (date: string | null) => {
    if (!date) {
      return true;
    }
    const isError = hasErrorRange(allProgressReportsDateRanges, date);
    if (isError) {
      setError('startDate', {
        type: 'manual',
        message:
          'Error: The Timeframe does not meet the requirements. The Custom Timeframe of Information shall be 12 months in duration and shall not overlap with a previous Timeframe of Information.'
      });
      setValue('startDate', '');
    }
    return !isError;
  };

  return (
    <Stack spacing={2}>
      <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
        <CreateReportControlledSelect
          name="timeframeOfInformation"
          required
          inputDescriptionTitle={
            CREATE_REPORT_FIELD_INFO.timeframeOfInformation.title
          }
          inputDescriptionSubtitle={
            CREATE_REPORT_FIELD_INFO.timeframeOfInformation.subtitle
          }
          options={[
            {
              label: 'Default',
              value: 'Default'
            },
            {
              label: 'Custom',
              value: 'Custom'
            }
          ]}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'Default') {
              const startDate = findFirstAvailableSlot(
                allProgressReportsDateRanges
              );
              setValue('startDate', startDate);
            }
            trigger('startDate');
          }}
        />
      </Grid2>

      {timeframeValue === 'Custom' && (
        <>
          <Grid2 size={{ sm: 12, xs: 12, xxs: 12 }}>
            <Paragraph variant="small-regular">
              Define the start date of the custom timeframe of Information.
            </Paragraph>
          </Grid2>
          <Grid2 container spacing={2} alignItems={'center'}>
            <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
              <ControlledDatePicker
                name="startDate"
                required
                shouldChange={shouldChange}
                inputDescriptionTitle={CREATE_REPORT_FIELD_INFO.startDate.title}
              />
            </Grid2>

            {startDate && (
              <Grid2 size={{ sm: 6, xs: 12, xxs: 12 }}>
                <Paragraph>
                  {CREATE_REPORT_FIELD_INFO.endDate.title}: {endDate}
                </Paragraph>
              </Grid2>
            )}
          </Grid2>
        </>
      )}
    </Stack>
  );
}
