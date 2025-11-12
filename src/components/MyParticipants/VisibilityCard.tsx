import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import type { VisibilityState } from '@tanstack/react-table';

type FilterKey =
  | 'country'
  | 'type'
  | 'category'
  | 'entityOperatingName'
  | 'dateJoined'
  | 'pledge'
  | 'legalName'
  | 'identityType'
  | 'identityNumber'
  | 'businessActivity'
  | 'subnationalGovernment'
  | 'subnationalGovernmentOther'
  | 'participantFocalPoint'
  | 'participantEmail'
  | 'gcapId';

interface VisibilityCardProps {
  visibility: VisibilityState;
  setVisibility: (
    updaterOrValue:
      | VisibilityState
      | ((old: VisibilityState) => VisibilityState)
  ) => void;
}

export function VisibilityCard({
  visibility,
  setVisibility
}: VisibilityCardProps) {
  const handleToggle = (columnId: FilterKey) => {
    setVisibility((prev: VisibilityState) => ({
      ...prev,
      [columnId]: !(prev[columnId] ?? true)
    }));
  };

  return (
    <Stack mb={3} direction="column" justifyContent="flex-end">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['entityOperatingName']}
              onChange={() => handleToggle('entityOperatingName')}
            />
          }
          label="Entity Operating Name"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['country']}
              onChange={() => handleToggle('country')}
            />
          }
          label="Country"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['type']}
              onChange={() => handleToggle('type')}
            />
          }
          label="Type"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['category']}
              onChange={() => handleToggle('category')}
            />
          }
          label="Category"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['dateJoined']}
              onChange={() => handleToggle('dateJoined')}
            />
          }
          label="Date Joined"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['pledge']}
              onChange={() => handleToggle('pledge')}
            />
          }
          label="Pledge"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['legalName']}
              onChange={() => handleToggle('legalName')}
            />
          }
          label="Legal Name"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['identityType']}
              onChange={() => handleToggle('identityType')}
            />
          }
          label="Identity Type"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['identityNumber']}
              onChange={() => handleToggle('identityNumber')}
            />
          }
          label="Identity Number"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['businessActivity']}
              onChange={() => handleToggle('businessActivity')}
            />
          }
          label="Business Activity"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['subnationalGovernment']}
              onChange={() => handleToggle('subnationalGovernment')}
            />
          }
          label="Subnational Government Type"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['subnationalGovernmentOther']}
              onChange={() => handleToggle('subnationalGovernmentOther')}
            />
          }
          label="Subnational Government Other"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['participantFocalPoint']}
              onChange={() => handleToggle('participantFocalPoint')}
            />
          }
          label="Participant Focal Point"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['participantEmail']}
              onChange={() => handleToggle('participantEmail')}
            />
          }
          label="Participant Email"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibility['gcapId']}
              onChange={() => handleToggle('gcapId')}
            />
          }
          label="GCAP ID"
        />
      </FormGroup>
    </Stack>
  );
}
