import Grid from '@mui/material/Grid2';
import { useFormContext } from 'react-hook-form';
import type { SCHEMA_TYPE, SmartDropdownData } from '@app/types';
import EntityNameField from './fields/EntityNameField';
import CountryField from './fields/CountryField';
import TypeField from './fields/TypeField';
import LegalNameField from './fields/LegalNameField';
import IdentityTypeField from './fields/IdentityTypeField';
import IdentityNumberField from './fields/IdentityNumberField';
import BusinessActivityField from './fields/BusinessActivityField';
import SubnationalGovernmentTypeField from './fields/SubnationalGovernmentTypeField';
import AssignedRolesField from './fields/AssignedRolesField';
import CategoryField from './fields/CategoryField';
import DateJoinedField from './fields/DateJoinedField';
import { SkeletonComponent } from '@app/lib/ui';
import { Box } from '@mui/material';

type TDetailsFields = { schemaType: SCHEMA_TYPE; loading: boolean };

// AccountType values from useDropdownValues
const ACCOUNT_TYPES = [
  'Public University',
  'Private University',
  'Community College',
  'Vocational School',
  'Online Learning Platform',
  'Educational Institution'
];

function DetailsFields({ schemaType, loading = false }: TDetailsFields) {
  const { watch } = useFormContext<SmartDropdownData>();
  const selectedType = watch('type');
  const hasAssignedRoles = schemaType === 'leadOrganizations';

  // Check if selected type is from AccountType dropdown (institutions)
  const isAccountTypeValue = ACCOUNT_TYPES.includes(selectedType);

  // Institutions (AccountType) should show legal name, identity, and business activity
  const hasLegalNameAndIdentity = isAccountTypeValue;

  // Institutions (AccountType) should show business activity
  const hasBusinessActivity = isAccountTypeValue;

  // Subnational government logic removed as it doesn't apply to educational institutions
  const isSubnationalGovernment = false;

  const isParticipantCreation = schemaType === 'participantCreation';

  return (
    <>
      {loading ? (
        <Box
          sx={{
            minHeight: '200px',
            position: 'relative'
          }}
        >
          <SkeletonComponent />
        </Box>
      ) : (
        <Grid container columnSpacing={2} rowSpacing={2}>
          <EntityNameField />

          <CountryField
            customGridSize={isParticipantCreation ? 'third' : 'half'}
          />

          <TypeField
            customGridSize={isParticipantCreation ? 'third' : 'half'}
          />

          {isParticipantCreation && <CategoryField />}
          {isParticipantCreation && !isSubnationalGovernment && (
            <DateJoinedField />
          )}

          {hasLegalNameAndIdentity && (
            <>
              <LegalNameField
                customGridSize={isParticipantCreation ? 'twoThrids' : 'full'}
              />
              <IdentityTypeField />
              <IdentityNumberField />
            </>
          )}

          {hasBusinessActivity && <BusinessActivityField />}

          {isSubnationalGovernment && (
            <>
              <SubnationalGovernmentTypeField />
              {isParticipantCreation && <DateJoinedField />}
              <LegalNameField customGridSize="half" />
            </>
          )}
          {hasAssignedRoles && <AssignedRolesField />}
        </Grid>
      )}
    </>
  );
}

export default DetailsFields;
