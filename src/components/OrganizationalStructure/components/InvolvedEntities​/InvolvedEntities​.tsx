import { Divider, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { InvolvedEntitiesFormData } from '@app/types';
import LeadOrganizationsFiscalSponsorsFunders from './components/LeadOrganizationsFiscalSponsorsFunders';
import Participants from './components/Participants';
import SignatoriesMembers from './components/SignatoriesMembers';
import SignatoryCriteria from './components/SignatoryCriteria';
import SignatoryFollowUps from './components/SignatoryFollowUps';
import SignatoryFollowUpsOther from './components/SignatoryFollowUpsOther';
import SignatoryRemoval from './components/SignatoryRemoval';
import MemberInformation from './components/MemberInformation';

export default function InvolvedEntities() {
  const { watch } = useFormContext<InvolvedEntitiesFormData>();
  const signatoriesMembers = watch('signatoriesMembers');
  const signatoryFollowUps = watch('signatoryFollowUps');

  const hasSignatories =
    signatoriesMembers && signatoriesMembers.includes('Enrolled Students');
  const hasMembers =
    signatoriesMembers && signatoriesMembers.includes('Registered Students');
  const hasOtherFollowUp =
    signatoryFollowUps && signatoryFollowUps.includes('Other');

  return (
    <Stack spacing={2}>
      <LeadOrganizationsFiscalSponsorsFunders />
      <Divider />
      <Participants />
      <Divider />
      <SignatoriesMembers />
      {hasSignatories && (
        <>
          <Divider />
          <SignatoryCriteria />
          <Divider />
          <SignatoryFollowUps />
          {hasOtherFollowUp && (
            <>
              <Divider />
              <SignatoryFollowUpsOther />
            </>
          )}
          <Divider />
          <SignatoryRemoval />
        </>
      )}
      {hasMembers && (
        <>
          <Divider />
          <MemberInformation />
        </>
      )}
    </Stack>
  );
}
