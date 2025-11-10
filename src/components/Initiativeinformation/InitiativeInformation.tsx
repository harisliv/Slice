import { Tabs } from '@app/lib/ui';
import GeneralInformation from './GeneralInformation';
import Status from './Status';
import { useLoaderData } from 'react-router';
import ContactInformation from './ContactInformation';

export default function InitiativeInformation() {
  const { initialTab } = useLoaderData() || { initialTab: 0 };

  return (
    <Tabs
      initialTab={initialTab}
      tabs={[
        {
          content: <GeneralInformation />,
          label: 'General Information'
        },
        {
          content: <Status />,
          label: 'Status'
        },
        {
          content: <ContactInformation />,
          label: 'Contact Information'
        }
      ]}
    />
  );
}
