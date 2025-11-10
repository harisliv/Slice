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
import SubnationalGovernmentTypeOtherField from './fields/SubnationalGovernmentTypeOtherField';
import AssignedRolesField from './fields/AssignedRolesField';
import CategoryField from './fields/CategoryField';
import DateJoinedField from './fields/DateJoinedField';
import { gridSizeMap } from '@app/lib/types';
import { SkeletonComponent } from '@app/lib/ui';
import { Box } from '@mui/material';

type TDetailsFields = { schemaType: SCHEMA_TYPE; loading: boolean };

function DetailsFields({ schemaType, loading = false }: TDetailsFields) {
  const { watch } = useFormContext<SmartDropdownData>();
  const selectedType = watch('type');
  const subnationalGovernmentType = watch('subnationalGovernmentType');
  const hasAssignedRoles = schemaType === 'leadOrganizations';

  const isSubnationalGovernment =
    selectedType === 'Subnational Government Agency';

  const hasLegalNameAndIdentity = [
    'Governmental Agency',
    'Private Organization',
    'Inter-Governmental Organization (IGO)',
    'Non-Governmental Organization (NGO)',
    'UN System And Specialized Agency',
    'Party'
  ].includes(selectedType);

  const hasBusinessActivity = [
    'Private Organization',
    'Inter-Governmental Organization (IGO)',
    'Non-Governmental Organization (NGO)',
    'UN System And Specialized Agency',
    'Party'
  ].includes(selectedType);

  const isSubNationalGovernmentTypeOther =
    subnationalGovernmentType === 'Other';

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
              {isSubNationalGovernmentTypeOther ? (
                <SubnationalGovernmentTypeOtherField />
              ) : isParticipantCreation ? (
                <Grid size={gridSizeMap['half']}></Grid>
              ) : null}
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
