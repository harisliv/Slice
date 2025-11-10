import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';
import { pledges, type TFilters } from '@app/types';
import DatePicker from '../ControlledInput/DatePicker/DatePicker';
import { ButtonComponent } from '@app/lib/ui';
import type { VisibilityState } from '@tanstack/react-table';
import {
  ControlledSelect,
  ControlledSelectWithDropdown
} from '@app/components/ControlledInput';
interface FiltersProps {
  onSubmit: (data: TFilters) => void;
  onClear: () => void;
  visibility?: VisibilityState;
}

export function Filters({ onSubmit, onClear, visibility = {} }: FiltersProps) {
  const {
    handleSubmit,
    formState: { isDirty, isValid }
  } = useFormContext<TFilters>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={4} columnSpacing={2} padding={'15px 0'}>
        <Grid
          container
          justifyContent={'flex-start'}
          size={{ sm: 12, xs: 12, xxs: 12 }}
        >
          <Grid size={{ sm: 4, xs: 4, xxs: 4 }}>
            <DatePicker
              name="dateJoinedFrom"
              label="Date joined from"
              required={false}
              disabled={!visibility.dateJoined}
            />
          </Grid>
          <Grid size={{ sm: 4, xs: 4, xxs: 4 }}>
            <DatePicker
              name="dateJoinedTo"
              label="Date joined to"
              required={false}
              disabled={!visibility.dateJoined}
            />
          </Grid>
        </Grid>
        <Grid size={{ sm: 4, xs: 4, xxs: 4 }}>
          <ControlledSelectWithDropdown
            fullWidth
            label="Participant type"
            name="type"
            placeholder="Select a Participant Type"
            dropdownEnpoint="ParticipantType"
            disabled={!visibility.type}
            inputProps={{ 'aria-label': 'Select Participant Type' }}
            noOptionsFallbackTitle="No participant type found"
            noOptionsFallbackSubtitle="Please select a different participant type"
          />
        </Grid>

        <Grid size={{ sm: 4, xs: 4, xxs: 4 }}>
          <ControlledSelectWithDropdown
            fullWidth
            label="Subnational government type"
            name="subnationalGovernment"
            dropdownEnpoint="SubNationalGovernmentType"
            placeholder="Subnational Government Type"
            disabled={!visibility.subnationalGovernment}
            inputProps={{ 'aria-label': 'Select Subnational Government Type' }}
            noOptionsFallbackTitle="No Subnational Government Type found"
            noOptionsFallbackSubtitle="Please select a different Subnational Government Type"
          />
        </Grid>
        <Grid size={{ sm: 4, xs: 4, xxs: 4 }}>
          <ControlledSelectWithDropdown
            fullWidth
            label="Country"
            name="country"
            dropdownEnpoint="Countries"
            placeholder="Select a Participant Country"
            disabled={!visibility.country}
            inputProps={{ 'aria-label': 'Select Participant Country' }}
            noOptionsFallbackTitle="No participant country found"
            noOptionsFallbackSubtitle="Please select a different participant country"
          />
        </Grid>
        <Grid size={{ sm: 4, xs: 4, xxs: 4 }}>
          <ControlledSelectWithDropdown
            fullWidth
            label="Category"
            name="category"
            dropdownEnpoint="ParticipantCategory"
            placeholder="Select a Category"
            disabled={!visibility.category}
            inputProps={{ 'aria-label': 'Select Participant Category' }}
            noOptionsFallbackTitle="No participant category found"
            noOptionsFallbackSubtitle="Please select a different participant category"
          />
        </Grid>
        <Grid size={{ sm: 8, xs: 8, xxs: 8 }}>
          <ControlledSelect
            fullWidth
            label="Pledge"
            name="pledge"
            options={pledges?.map((pledge) => ({
              label: pledge.name,
              value: pledge.id
            }))}
            placeholder="Pledge"
            disabled={!visibility.pledge}
            inputProps={{ 'aria-label': 'Select pledge' }}
            noOptionsFallbackTitle="No pledge found"
            noOptionsFallbackSubtitle="Please select a different pledge"
          />
        </Grid>
        <Grid size={{ sm: 4, xs: 4, xxs: 4 }}>
          <ControlledSelectWithDropdown
            fullWidth
            label="Identity type"
            name="identityType"
            dropdownEnpoint="IdentifyProviderType"
            placeholder="Identity type"
            disabled={!visibility.identityType}
            inputProps={{ 'aria-label': 'Select Identity type' }}
            noOptionsFallbackTitle="No Identity type found"
            noOptionsFallbackSubtitle="Please select a different Identity type"
          />
        </Grid>
        <Grid size={{ sm: 8, xs: 8, xxs: 8 }}>
          <ControlledSelectWithDropdown
            fullWidth
            label="Business activity"
            name="businessActivity"
            dropdownEnpoint="BusinessActivities"
            placeholder="Business Activity"
            disabled={!visibility.businessActivity}
            inputProps={{ 'aria-label': 'Select Business Activity' }}
            noOptionsFallbackTitle="No Business acticity found"
            noOptionsFallbackSubtitle="Please select a different Business acticity"
          />
        </Grid>

        <Grid
          container
          justifyContent={'flex-end'}
          size={{ sm: 12, xs: 12, xxs: 12 }}
        >
          <ButtonComponent
            disabled={!isDirty || !isValid}
            onClick={() => onClear()}
            customVariant="secondary-m"
          >
            Clear filters
          </ButtonComponent>
          <ButtonComponent
            disabled={!isDirty || !isValid}
            customVariant="primary-m"
            type="submit"
          >
            Apply filters
          </ButtonComponent>
        </Grid>
      </Grid>
    </form>
  );
}
