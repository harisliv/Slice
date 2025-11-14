import FormContextProvider from './components/FormContextProvider';
import { useMutateInitiativeProfile } from '@app/hooks';
import { EditModeMainContent } from './components';
import { INITIATIVE_INFORMATION_STEPS } from '@app/constants';
import { StateAndFormStepperProvider } from '@app/components';
import type { IFormActionBar } from '@app/lib/types';
import { useNavigate } from 'react-router';

export default function InitiativeProfileEditMode() {
  const { mutateAsync: mutateInitiativeProfile } = useMutateInitiativeProfile();
  const navigate = useNavigate();

  const formActionBarProps: IFormActionBar = {
    submit: {
      action: async (data) => {
        navigate(`/course-profile`);
        await mutateInitiativeProfile(data);
      },
      title: 'Submit Changes',
      display: true
    },
    next: {
      display: false
    },
    previous: {
      display: false
    },
    exit: {
      display: true,
      title: 'Exit profile edition'
    }
  };

  return (
    <StateAndFormStepperProvider steps={INITIATIVE_INFORMATION_STEPS}>
      <FormContextProvider {...formActionBarProps}>
        <EditModeMainContent />
      </FormContextProvider>
    </StateAndFormStepperProvider>
  );
}
